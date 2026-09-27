import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const BILLING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 39,
    currency: "USD",
    headline: "A controlled starting point for smaller operations",
    priceEnv: "STRIPE_PRICE_STARTER",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 149,
    currency: "USD",
    headline: "More operating room for growing commerce",
    priceEnv: "STRIPE_PRICE_GROWTH",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    currency: "USD",
    headline: "Provisioned commercial engagement for larger operations",
    priceEnv: null,
  },
] as const;

export type BillingPlanId = (typeof BILLING_PLANS)[number]["id"];

function mode() {
  return process.env.STRIPE_BILLING_MODE || "disabled";
}

function priceId(planId: BillingPlanId) {
  const plan = BILLING_PLANS.find((item) => item.id === planId);
  return plan?.priceEnv ? process.env[plan.priceEnv] || "" : "";
}

export function getBillingReadiness() {
  const billingMode = mode();
  const configured = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
  return {
    mode: billingMode,
    configured,
    checkoutEnabled:
      billingMode !== "disabled" &&
      configured &&
      Boolean(priceId("starter") && priceId("growth")),
    webhookEnabled: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}

export function getBillingPlans() {
  const ready = getBillingReadiness();
  return BILLING_PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    monthlyPrice: plan.monthlyPrice,
    currency: plan.currency,
    headline: plan.headline,
    checkoutAvailable: Boolean(plan.priceEnv && ready.checkoutEnabled && priceId(plan.id)),
  }));
}

function assertCheckoutReady() {
  const ready = getBillingReadiness();
  if (!ready.checkoutEnabled) {
    throw new Error("Stripe billing is not enabled for this release.");
  }
}

function safeReturnUrl(value: string) {
  const parsed = new URL(value);
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL;
  if (configuredOrigin && parsed.origin !== new URL(configuredOrigin).origin) {
    throw new Error("returnUrl must remain on the configured application origin.");
  }
  return parsed.toString();
}

export async function createCheckoutSession(input: {
  customerId: string;
  workspaceId: string;
  email: string;
  planId: BillingPlanId;
  returnUrl: string;
}) {
  assertCheckoutReady();

  if (input.planId === "enterprise") {
    throw new Error("Enterprise is provisioned through the commercial workflow.");
  }

  const plan = BILLING_PLANS.find((item) => item.id === input.planId);
  const price = priceId(input.planId);
  if (!plan || !price) throw new Error("Selected billing plan is not configured.");

  const existing = await prisma.subscription.findFirst({
    where: { customerId: input.customerId },
  });

  if (existing && ["active", "trialing", "past_due"].includes(existing.status) && existing.planId === input.planId) {
    throw new Error("This account is already subscribed to the selected plan.");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: safeReturnUrl(input.returnUrl),
    cancel_url: safeReturnUrl(input.returnUrl),
    customer: existing?.stripeCustomerId || undefined,
    customer_email: existing?.stripeCustomerId ? undefined : input.email,
    client_reference_id: input.customerId,
    metadata: {
      customerId: input.customerId,
      workspaceId: input.workspaceId,
      planId: input.planId,
    },
    subscription_data: {
      metadata: {
        customerId: input.customerId,
        workspaceId: input.workspaceId,
        planId: input.planId,
      },
    },
  });

  await prisma.transaction.create({
    data: {
      workspaceId: input.workspaceId,
      customerId: input.customerId,
      subscriptionId: existing?.id,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: existing?.stripeCustomerId || null,
      type: "subscription_checkout",
      description: `${plan.name} subscription checkout`,
      amount: plan.monthlyPrice || 0,
      currency: plan.currency,
      status: "pending",
    },
  });

  return {
    id: session.id,
    url: session.url,
    planId: input.planId,
    mode: mode(),
  };
}

export async function getSubscription(customerId: string) {
  return prisma.subscription.findFirst({
    where: { customerId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listTransactions(customerId: string, offset = 0, limit = 50) {
  return prisma.transaction.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    skip: Math.max(0, Math.min(offset, 10000)),
    take: Math.max(1, Math.min(limit, 100)),
  });
}

async function upsertSubscriptionFromObject(object: any, eventType: string) {
  const stripeSubscriptionId = String(object.id || "");
  if (!stripeSubscriptionId) return;

  const customerId = String(object.metadata?.customerId || "");
  const workspaceId = String(object.metadata?.workspaceId || "");
  const planId = String(object.metadata?.planId || "growth");

  let existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId },
  });

  if (!customerId && existing) {
    const resolvedCustomer = existing.customerId;
    const resolvedWorkspace = existing.workspaceId;
    await prisma.subscription.update({
      where: { id: existing.id },
      data: {
        status: eventType === "customer.subscription.deleted" ? "canceled" : String(object.status || "unknown"),
        currentPeriodStart: object.current_period_start ? new Date(Number(object.current_period_start) * 1000) : null,
        currentPeriodEnd: object.current_period_end ? new Date(Number(object.current_period_end) * 1000) : null,
        cancelAtPeriodEnd: Boolean(object.cancel_at_period_end),
      },
    });
    void resolvedCustomer;
    void resolvedWorkspace;
    return;
  }

  if (!customerId || !workspaceId) return;

  existing = await prisma.subscription.findFirst({
    where: { customerId },
  });

  const data = {
    workspaceId,
    customerId,
    planId,
    status: eventType === "customer.subscription.deleted" ? "canceled" : String(object.status || "unknown"),
    stripeCustomerId: object.customer ? String(object.customer) : null,
    stripeSubscriptionId,
    currentPeriodStart: object.current_period_start ? new Date(Number(object.current_period_start) * 1000) : null,
    currentPeriodEnd: object.current_period_end ? new Date(Number(object.current_period_end) * 1000) : null,
    cancelAtPeriodEnd: Boolean(object.cancel_at_period_end),
  };

  if (existing) {
    await prisma.subscription.update({ where: { id: existing.id }, data });
  } else {
    await prisma.subscription.create({ data });
  }
}

export async function handleStripeWebhook(rawBody: string, signature: string) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("Stripe webhook secret is not configured.");

  const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });

  if (existing?.status === "processed") {
    return { received: true, duplicate: true, eventId: event.id };
  }

  if (!existing) {
    await prisma.webhookEvent.create({
      data: {
        stripeEventId: event.id,
        type: event.type,
        status: "processing",
      },
    });
  } else {
    await prisma.webhookEvent.update({
      where: { id: existing.id },
      data: { status: "processing", type: event.type },
    });
  }

  try {
    const object = event.data.object as any;

    if (event.type === "checkout.session.completed") {
      const customerId = String(object.metadata?.customerId || object.client_reference_id || "");
      const workspaceId = String(object.metadata?.workspaceId || "");
      const planId = String(object.metadata?.planId || "growth");
      const stripeSubscriptionId = object.subscription ? String(object.subscription) : null;
      const stripeCustomerId = object.customer ? String(object.customer) : null;

      if (customerId && workspaceId) {
        const existingSubscription = await prisma.subscription.findFirst({ where: { customerId } });
        const subscription = existingSubscription
          ? await prisma.subscription.update({
              where: { id: existingSubscription.id },
              data: {
                workspaceId,
                planId,
                status: stripeSubscriptionId ? "active" : "incomplete",
                stripeCustomerId,
                stripeSubscriptionId,
              },
            })
          : await prisma.subscription.create({
              data: {
                workspaceId,
                customerId,
                planId,
                status: stripeSubscriptionId ? "active" : "incomplete",
                stripeCustomerId,
                stripeSubscriptionId,
              },
            });

        await prisma.transaction.updateMany({
          where: { stripeCheckoutSessionId: String(object.id) },
          data: {
            subscriptionId: subscription.id,
            stripeCustomerId,
            stripeSubscriptionId,
            status: "paid",
          },
        });
      }
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await upsertSubscriptionFromObject(object, event.type);
    } else if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
      const stripeSubscriptionId = object.subscription ? String(object.subscription) : null;
      const subscription = stripeSubscriptionId
        ? await prisma.subscription.findUnique({ where: { stripeSubscriptionId } })
        : null;

      if (subscription) {
        const status = event.type === "invoice.paid" ? "paid" : "failed";
        const amount = Number(object.amount_paid ?? object.amount_due ?? 0) / 100;
        await prisma.transaction.upsert({
          where: { stripeInvoiceId: String(object.id) },
          update: {
            stripePaymentIntentId: object.payment_intent ? String(object.payment_intent) : null,
            status,
            amount,
            currency: String(object.currency || "usd").toUpperCase(),
          },
          create: {
            workspaceId: subscription.workspaceId,
            customerId: subscription.customerId,
            subscriptionId: subscription.id,
            stripeInvoiceId: String(object.id),
            stripePaymentIntentId: object.payment_intent ? String(object.payment_intent) : null,
            stripeCustomerId: subscription.stripeCustomerId,
            stripeSubscriptionId,
            type: "subscription_invoice",
            description: event.type === "invoice.paid" ? "Subscription invoice paid" : "Subscription payment failed",
            amount,
            currency: String(object.currency || "usd").toUpperCase(),
            status,
          },
        });
      }
    }

    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: { status: "processed", processedAt: new Date() },
    });

    return { received: true, processed: true, eventId: event.id };
  } catch (error) {
    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: { status: "failed" },
    });
    throw error;
  }
}
