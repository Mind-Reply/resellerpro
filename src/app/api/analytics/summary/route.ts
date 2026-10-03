import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/account-auth";
import { prisma } from "@/lib/prisma";

function dayKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

export async function GET() {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const workspaceId = user.workspaceId;
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [
    customers,
    activeDomains,
    orders,
    services,
    openInvoices,
    paidInvoices,
    acquisitionEvents,
  ] = await Promise.all([
    prisma.customer.count({ where: { workspaceId } }),
    prisma.domain.count({ where: { workspaceId, lifecycleState: { in: ["active", "renewal_due"] } } }),
    prisma.order.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "asc" },
      select: { total: true, tax: true, status: true, currency: true, createdAt: true },
    }),
    prisma.service.count({ where: { workspaceId, state: { in: ["active", "provisioning"] } } }),
    prisma.invoice.findMany({
      where: { workspaceId, status: { in: ["open", "draft"] } },
      select: { total: true, currency: true },
    }),
    prisma.invoice.findMany({
      where: { workspaceId, status: "paid", createdAt: { gte: since } },
      select: { total: true, currency: true, paidAt: true, createdAt: true },
    }),
    prisma.acquisitionEvent.findMany({
      where: { workspaceId, occurredAt: { gte: since } },
      select: { eventType: true, source: true, medium: true, campaign: true, value: true, occurredAt: true },
    }),
  ]);

  const validOrders = orders.filter((order) => order.status !== "refunded");
  const revenue = validOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const openInvoiceValue = openInvoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);

  const revenueMap = new Map<string, number>();
  for (const invoice of paidInvoices) {
    const key = dayKey(invoice.paidAt || invoice.createdAt);
    revenueMap.set(key, (revenueMap.get(key) || 0) + Number(invoice.total));
  }

  const acquisitionMap = new Map<string, number>();
  for (const event of acquisitionEvents) {
    const key = event.eventType || "unknown";
    acquisitionMap.set(key, (acquisitionMap.get(key) || 0) + 1);
  }

  const sourceMap = new Map<string, number>();
  for (const event of acquisitionEvents) {
    const key = event.source || "direct";
    sourceMap.set(key, (sourceMap.get(key) || 0) + 1);
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    source: "persisted platform records",
    summary: {
      customers,
      activeDomains,
      totalOrders: validOrders.length,
      revenue,
      openInvoiceValue,
      activeServices: services,
      paidInvoicesLast30Days: paidInvoices.length,
    },
    revenueSeries: Array.from(revenueMap.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([date, value]) => ({ date, value })),
    acquisition: {
      eventsByType: Array.from(acquisitionMap.entries()).map(([type, count]) => ({ type, count })),
      eventsBySource: Array.from(sourceMap.entries()).map(([source, count]) => ({ source, count })),
      totalEvents: acquisitionEvents.length,
    },
  });
}
