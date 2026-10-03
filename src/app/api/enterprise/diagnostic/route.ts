import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { getAccountSession } from "@/lib/account-auth";
import { prisma } from "@/lib/prisma";

const diagnosticSchema = z.object({
  companyName: z.string().trim().min(2).max(255),
  contactEmail: z.string().trim().email().max(320),
  region: z.enum(["eu_sovereign", "uk_global", "balkans"]),
  dataMaturity: z.enum(["siloed_legacy", "lakehouse_in_progress", "active_realtime"]),
  primaryPillar: z.enum([
    "sovereign_platform",
    "governed_ai_ml",
    "data_analytics",
    "cloud_hybrid_infra",
    "app_modernization",
    "zero_trust_security",
    "managed_operations",
    "digital_workplace",
  ]),
  complianceZone: z.string().trim().min(2).max(100),
});

const scoreInput = z.object({
  region: diagnosticSchema.shape.region,
  dataMaturity: diagnosticSchema.shape.dataMaturity,
  primaryPillar: diagnosticSchema.shape.primaryPillar,
});

function calculateExposureRisk(input: z.infer<typeof scoreInput>) {
  let score = 30;

  if (input.region === "eu_sovereign") score += 25;
  if (input.dataMaturity === "siloed_legacy") score += 25;
  if (input.primaryPillar === "governed_ai_ml") score += 15;

  return Number(Math.min(score, 98.5).toFixed(2));
}

function buildBlueprint(input: z.infer<typeof diagnosticSchema>, hash: string) {
  return {
    pillar: input.primaryPillar,
    targetArchitecture: "Owner-Governed Hybrid Runtime",
    complianceAdapter:
      input.region === "eu_sovereign"
        ? "SE-Europe sovereign delivery adapter"
        : "UK & Global delivery adapter",
    recommendedPhases: [
      "Phase 1: Observe — runtime telemetry and exposure register",
      "Phase 2: Operate — zero-trust IAM and human approval controls",
      "Phase 3: Optimize — continuous lineage audit and workload modernization",
    ],
    lineageProofHash: hash,
  };
}

function ownerEmails() {
  return new Set(
    (process.env.OWNER_ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 16_384) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  try {
    const input = diagnosticSchema.parse(await request.json());
    const session = await getAccountSession();
    const createdAt = new Date();

    const lineagePayload = JSON.stringify({
      companyName: input.companyName,
      contactEmail: input.contactEmail.toLowerCase(),
      region: input.region,
      dataMaturity: input.dataMaturity,
      primaryPillar: input.primaryPillar,
      complianceZone: input.complianceZone,
      createdAt: createdAt.toISOString(),
    });
    const auditVerificationHash = createHash("sha256")
      .update(lineagePayload)
      .digest("hex");

    const exposureRiskScore = calculateExposureRisk(input);
    const proposalBlueprint = buildBlueprint(input, auditVerificationHash);

    const assessment = await prisma.enterpriseAssessment.create({
      data: {
        userId: session?.id ?? null,
        companyName: input.companyName,
        contactEmail: input.contactEmail,
        region: input.region,
        dataMaturity: input.dataMaturity,
        primaryPillar: input.primaryPillar,
        complianceZone: input.complianceZone,
        exposureRiskScore,
        auditVerificationHash,
        status: "scoped",
        proposalBlueprint,
        createdAt,
      },
    });

    await prisma.auditEvent.create({
      data: {
        workspaceId: session?.workspaceId ?? (await prisma.workspace.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } }))?.id ?? "",
        actorType: session ? "customer" : "public",
        actorId: session?.id ?? null,
        eventType: "enterprise_diagnostic.submitted",
        entityType: "EnterpriseAssessment",
        entityId: assessment.id,
        outcome: "success",
        details: {
          region: input.region,
          primaryPillar: input.primaryPillar,
          auditVerificationHash,
        },
        payloadHash: auditVerificationHash,
      },
    }).catch(() => undefined);

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      verificationHash: auditVerificationHash,
      exposureRiskScore,
      blueprint: proposalBlueprint,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid diagnostic input.", details: error.flatten() }, { status: 400 });
    }

    console.error("[EnterpriseDiagnostic] submission failed", error);
    return NextResponse.json({ error: "Diagnostic could not be registered." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAccountSession();
  if (!session || !ownerEmails().has(session.email.toLowerCase())) {
    return NextResponse.json({ error: "Owner authorization required." }, { status: 403 });
  }

  const assessments = await prisma.enterpriseAssessment.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ assessments });
}
