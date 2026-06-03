import { BarChart3, Truck, ShieldAlert, FileText, Bot, type LucideIcon } from "lucide-react";

/* ─── Mission Templates ─── */
export interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  executionPlan: string[];
  healingTrigger: { stepIndex: number; issue: string; resolution: string };
}

export const MISSIONS: MissionTemplate[] = [
  {
    id: "brsr", title: "Generate BRSR Report", icon: "📋",
    description: "Deploy ESG Agent to compile a complete BRSR Core disclosure with AI-verified data sources.",
    executionPlan: ["Aggregate organizational ESG data", "Map disclosures to BRSR Principles 1–9", "Verify data against SEBI guidelines", "Generate AI narrative for Principle 6", "Compile 42-page disclosure document", "Produce cryptographic audit hash"],
    healingTrigger: { stepIndex: 3, issue: "Principle 6 environmental data incomplete — IoT telemetry gap detected.", resolution: "Recovered from alternative source: Grid electricity billing records + solar generation logs." },
  },
  {
    id: "scope3", title: "Identify Scope 3 Emission Hotspots", icon: "🏭",
    description: "Run Scope 3 lifecycle carbon analysis across your entire value chain.",
    executionPlan: ["Index supplier emission factor datasets", "Calculate upstream procurement emissions", "Model employee commute carbon impact", "Analyze downstream distribution routes", "Rank emission hotspots by magnitude", "Generate reduction strategy matrix"],
    healingTrigger: { stepIndex: 1, issue: "Supplier dataset incomplete — 3 of 12 vendors missing emission factors.", resolution: "Substituted industry-average emission factors from GHG Protocol database v2025." },
  },
  {
    id: "supplier", title: "Analyze Supplier Sustainability Risks", icon: "🔍",
    description: "Evaluate vendor ESG performance and identify high-risk partners in your supply chain.",
    executionPlan: ["Retrieve supplier registry data", "Cross-reference ESG certifications", "Run greenwashing detection on claims", "Calculate per-supplier trust scores", "Flag non-compliant vendors", "Generate risk mitigation recommendations"],
    healingTrigger: { stepIndex: 2, issue: "Certification registry API timeout — GOTS verification unavailable.", resolution: "Fallback to cached certification snapshot from last successful sync (48h ago)." },
  },
  {
    id: "verify", title: "Verify Supplier Claims", icon: "🛡️",
    description: "Run AI-powered semantic verification against global sustainability indices.",
    executionPlan: ["Extract verbal claims from supplier reports", "Parse claims into semantic tuples", "Cross-reference against GRI/BRSR/SDG indices", "Run anomaly detection models", "Score claims on confidence scale", "Produce verification audit certificate"],
    healingTrigger: { stepIndex: 3, issue: "Anomaly model returned low-confidence output (< 60%) for 2 claims.", resolution: "Triggered secondary bidirectional cross-referencing model — confidence restored to 89%." },
  },
  {
    id: "esg", title: "Improve ESG Performance", icon: "📊",
    description: "Generate a data-driven sustainability improvement roadmap for your organization.",
    executionPlan: ["Baseline current ESG scores across E/S/G pillars", "Benchmark against industry peers", "Identify highest-impact improvement areas", "Model projected score improvements", "Generate actionable recommendations", "Create 90-day implementation roadmap"],
    healingTrigger: { stepIndex: 2, issue: "Peer benchmark dataset partially unavailable — Education sector comparisons limited.", resolution: "Extended benchmark pool to include Public Services and NGO sectors for representative comparison." },
  },
  {
    id: "roadmap", title: "Generate Sustainability Roadmap", icon: "🗺️",
    description: "Create a comprehensive multi-year sustainability strategy with milestones.",
    executionPlan: ["Analyze current sustainability maturity level", "Define short/medium/long-term objectives", "Map objectives to UN SDG targets", "Calculate resource requirements", "Design milestone tracking framework", "Produce executive-ready roadmap document"],
    healingTrigger: { stepIndex: 3, issue: "SDG target mapping incomplete — Goal 13 sub-indicators missing local context.", resolution: "Injected India-specific NDC (Nationally Determined Contributions) dataset for SDG 13 alignment." },
  },
];

/* ─── Agent Definitions ─── */
export interface AgentDef {
  id: string;
  name: string;
  purpose: string;
  icon: LucideIcon;
  color: string;
  baseTasks: number;
  baseConfidence: number;
}

export const AGENTS: AgentDef[] = [
  { id: "carbon", name: "Carbon Intelligence Agent", purpose: "Scope 1/2/3 carbon footprint analysis & lifecycle assessment", icon: BarChart3, color: "text-info", baseTasks: 142, baseConfidence: 94 },
  { id: "supplier", name: "Supplier Intelligence Agent", purpose: "Vendor sustainability verification & risk scoring", icon: Truck, color: "text-warning", baseTasks: 89, baseConfidence: 91 },
  { id: "greenwash", name: "Greenwashing Detection Agent", purpose: "AI-powered sustainability claim verification", icon: ShieldAlert, color: "text-danger", baseTasks: 67, baseConfidence: 88 },
  { id: "compliance", name: "Compliance Agent", purpose: "BRSR / GRI / ESG framework automation", icon: FileText, color: "text-accent", baseTasks: 78, baseConfidence: 96 },
  { id: "reporting", name: "Reporting Agent", purpose: "Automated report generation & document synthesis", icon: Bot, color: "text-purple-400", baseTasks: 53, baseConfidence: 93 },
];

/* ─── Knowledge Sources ─── */
export const KNOWLEDGE_SOURCES = [
  "ESG Frameworks", "BRSR Standards", "GRI Standards",
  "SDG Frameworks", "Sustainability Reports", "Supplier Records", "Internal Knowledge Base",
];

/* ─── Execution Stages ─── */
export const EXECUTION_STAGES = [
  { label: "Understanding Objective", duration: 1200 },
  { label: "Building Execution Plan", duration: 1400 },
  { label: "Retrieving Sustainability Context", duration: 1800 },
  { label: "Deploying Specialized Agents", duration: 1600 },
  { label: "Running Verification Pipeline", duration: 2000 },
  { label: "Autonomous Recovery Check", duration: 1500 },
  { label: "Generating Deliverables", duration: 1200 },
];

/* ─── Recommended Actions ─── */
export const RECOMMENDED_ACTIONS = [
  { title: "Generate BRSR Report", description: "Compile a full disclosure document from verified data.", icon: "📋" },
  { title: "Schedule Sustainability Audit", description: "Initiate a comprehensive ESG audit cycle.", icon: "🔍" },
  { title: "Flag High-Risk Suppliers", description: "Escalate flagged vendors to compliance team.", icon: "⚠️" },
  { title: "Create Carbon Reduction Plan", description: "Model emission reduction strategies with targets.", icon: "🌱" },
  { title: "Export ESG Summary", description: "Download executive summary for stakeholders.", icon: "📤" },
];
