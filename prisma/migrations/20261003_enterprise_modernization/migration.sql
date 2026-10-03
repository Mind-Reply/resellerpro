CREATE TABLE "EnterpriseAssessment" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "companyName" TEXT NOT NULL,
  "contactEmail" TEXT NOT NULL,
  "region" TEXT NOT NULL,
  "dataMaturity" TEXT NOT NULL,
  "primaryPillar" TEXT NOT NULL,
  "complianceZone" TEXT NOT NULL,
  "exposureRiskScore" DECIMAL(5,2) NOT NULL,
  "auditVerificationHash" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending_review',
  "proposalBlueprint" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "EnterpriseAssessment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "EnterpriseAssessment_auditVerificationHash_key"
  ON "EnterpriseAssessment"("auditVerificationHash");
CREATE INDEX "EnterpriseAssessment_status_createdAt_idx"
  ON "EnterpriseAssessment"("status", "createdAt");
CREATE INDEX "EnterpriseAssessment_contactEmail_idx"
  ON "EnterpriseAssessment"("contactEmail");
CREATE INDEX "EnterpriseAssessment_region_primaryPillar_idx"
  ON "EnterpriseAssessment"("region", "primaryPillar");
