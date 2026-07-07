import { BarChart3, Truck, ShieldAlert, FileText, Bot, Database, Globe, Cpu, Wifi, Server, Cloud, type LucideIcon } from "lucide-react";

/* ─── Mission Templates ─── */
export interface MissionResult {
  confidence: number;
  summary: string;
  findings: string[];
  recommendations: string[];
  impact: { label: string; value: string; trend: "up" | "down" | "neutral" }[];
  nextActions: string[];
}

export interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  executionPlan: string[];
  healingTrigger: { stepIndex: number; issue: string; resolution: string };
  result: MissionResult;
}

export const MISSIONS: MissionTemplate[] = [
  {
    id: "brsr", title: "Generate BRSR Report", icon: "📋",
    description: "Deploy ESG Agent to compile a complete BRSR Core disclosure with AI-verified data sources.",
    executionPlan: ["Aggregate organizational ESG data", "Map disclosures to BRSR Principles 1–9", "Verify data against SEBI guidelines", "Generate AI narrative for Principle 6", "Compile 42-page disclosure document", "Produce cryptographic audit hash"],
    healingTrigger: { stepIndex: 3, issue: "Principle 6 environmental data incomplete — IoT telemetry gap detected.", resolution: "Recovered from alternative source: Grid electricity billing records + solar generation logs." },
    result: {
      confidence: 96,
      summary: "Generated a comprehensive BRSR Core disclosure document covering all 9 Principles of responsible business conduct. The report is SEBI-compliant and ready for board review.",
      findings: [
        "Principle 6 (Environment) scored highest at 92/100 — strong renewable energy adoption",
        "Principle 3 (Employee Wellbeing) needs improvement — missing diversity metrics for FY25",
        "Water consumption reduced 18% YoY — exceeds industry benchmark by 7pp",
        "Scope 1+2 emissions down 23% against 2020 baseline — on track for net-zero by 2040",
      ],
      recommendations: [
        "Complete diversity reporting for P3 compliance before Q3 deadline",
        "Integrate IoT telemetry for real-time environmental monitoring",
        "Submit early to SEBI portal to avoid last-minute review delays",
        "Schedule board briefing to walk through key disclosures",
      ],
      impact: [
        { label: "ESG Score", value: "+8.2pts", trend: "up" },
        { label: "Compliance", value: "98.4%", trend: "up" },
        { label: "Data Sources", value: "12", trend: "neutral" },
        { label: "Time Saved", value: "~120hrs", trend: "up" },
      ],
      nextActions: ["Open BRSR Dashboard", "Download Report PDF", "Schedule Board Review"],
    },
  },
  {
    id: "scope3", title: "Identify Scope 3 Emission Hotspots", icon: "🏭",
    description: "Run Scope 3 lifecycle carbon analysis across your entire value chain.",
    executionPlan: ["Index supplier emission factor datasets", "Calculate upstream procurement emissions", "Model employee commute carbon impact", "Analyze downstream distribution routes", "Rank emission hotspots by magnitude", "Generate reduction strategy matrix"],
    healingTrigger: { stepIndex: 1, issue: "Supplier dataset incomplete — 3 of 12 vendors missing emission factors.", resolution: "Substituted industry-average emission factors from GHG Protocol database v2025." },
    result: {
      confidence: 91,
      summary: "Completed full Scope 3 lifecycle analysis across 15 emission categories. Identified 3 critical hotspots contributing 72% of total value chain emissions.",
      findings: [
        "Category 1 (Purchased Goods) accounts for 41% of Scope 3 — largest contributor",
        "Category 4 (Upstream Transport) shows 28% increase QoQ — logistics route inefficiency",
        "Employee commute emissions reduced 15% after hybrid work policy implementation",
        "3 suppliers lack emission factor data — using GHG Protocol industry averages",
      ],
      recommendations: [
        "Engage top 5 suppliers in emission reduction partnership program",
        "Optimize logistics routes — potential 18% reduction in transport emissions",
        "Transition remaining fleet vehicles to electric by 2027",
        "Implement supplier data collection portal for accurate emission factors",
      ],
      impact: [
        { label: "Hotspots Found", value: "3", trend: "neutral" },
        { label: "Potential Reduction", value: "-32%", trend: "down" },
        { label: "Categories Analyzed", value: "15", trend: "neutral" },
        { label: "Suppliers Assessed", value: "12/15", trend: "up" },
      ],
      nextActions: ["Open Carbon Dashboard", "Export Hotspot Map", "Create Reduction Plan"],
    },
  },
  {
    id: "supplier", title: "Analyze Supplier Sustainability Risks", icon: "🔍",
    description: "Evaluate vendor ESG performance and identify high-risk partners in your supply chain.",
    executionPlan: ["Retrieve supplier registry data", "Cross-reference ESG certifications", "Run greenwashing detection on claims", "Calculate per-supplier trust scores", "Flag non-compliant vendors", "Generate risk mitigation recommendations"],
    healingTrigger: { stepIndex: 2, issue: "Certification registry API timeout — GOTS verification unavailable.", resolution: "Fallback to cached certification snapshot from last successful sync (48h ago)." },
    result: {
      confidence: 89,
      summary: "Evaluated 47 suppliers across ESG risk dimensions. Flagged 6 high-risk vendors requiring immediate compliance review.",
      findings: [
        "6 out of 47 suppliers classified as high-risk — primarily in raw material sourcing",
        "12 suppliers have expired or unverifiable ESG certifications",
        "Average supplier trust score: 74/100 — below industry best-practice threshold of 80",
        "2 suppliers flagged for potential greenwashing in sustainability claims",
      ],
      recommendations: [
        "Issue compliance notices to 6 high-risk suppliers with 30-day response deadline",
        "Mandate annual ESG certification renewal for all Tier 1 suppliers",
        "Develop alternative supplier pipeline for critical high-risk categories",
        "Implement continuous monitoring for real-time supplier risk scoring",
      ],
      impact: [
        { label: "High Risk", value: "6", trend: "neutral" },
        { label: "Avg Trust Score", value: "74/100", trend: "up" },
        { label: "Vendors Assessed", value: "47", trend: "neutral" },
        { label: "Greenwash Flags", value: "2", trend: "down" },
      ],
      nextActions: ["Open Supplier Dashboard", "Export Risk Report", "Notify Procurement"],
    },
  },
  {
    id: "verify", title: "Verify Supplier Claims", icon: "🛡️",
    description: "Run AI-powered semantic verification against global sustainability indices.",
    executionPlan: ["Extract verbal claims from supplier reports", "Parse claims into semantic tuples", "Cross-reference against GRI/BRSR/SDG indices", "Run anomaly detection models", "Score claims on confidence scale", "Produce verification audit certificate"],
    healingTrigger: { stepIndex: 3, issue: "Anomaly model returned low-confidence output (< 60%) for 2 claims.", resolution: "Triggered secondary bidirectional cross-referencing model — confidence restored to 89%." },
    result: {
      confidence: 93,
      summary: "Processed 84 sustainability claims from 12 supplier reports. 78 claims verified, 4 flagged as potentially misleading, 2 unverifiable.",
      findings: [
        "92.8% of claims passed primary verification against GRI/BRSR indices",
        "4 claims from 2 suppliers show semantic inconsistency — potential greenwashing",
        "2 claims reference standards that could not be cross-verified (proprietary certifications)",
        "Average claim confidence score: 87/100 across all assessed suppliers",
      ],
      recommendations: [
        "Request supporting documentation for 4 flagged claims within 14 days",
        "Add proprietary certification bodies to verification knowledge base",
        "Generate verification certificates for 78 confirmed claims",
        "Schedule re-verification cycle for Q3 supplier report submissions",
      ],
      impact: [
        { label: "Claims Verified", value: "78/84", trend: "up" },
        { label: "Flags Raised", value: "4", trend: "down" },
        { label: "Avg Confidence", value: "87%", trend: "up" },
        { label: "Reports Processed", value: "12", trend: "neutral" },
      ],
      nextActions: ["View Verification Report", "Export Audit Certificates", "Flag Suppliers"],
    },
  },
  {
    id: "esg", title: "Improve ESG Performance", icon: "📊",
    description: "Generate a data-driven sustainability improvement roadmap for your organization.",
    executionPlan: ["Baseline current ESG scores across E/S/G pillars", "Benchmark against industry peers", "Identify highest-impact improvement areas", "Model projected score improvements", "Generate actionable recommendations", "Create 90-day implementation roadmap"],
    healingTrigger: { stepIndex: 2, issue: "Peer benchmark dataset partially unavailable — Education sector comparisons limited.", resolution: "Extended benchmark pool to include Public Services and NGO sectors for representative comparison." },
    result: {
      confidence: 94,
      summary: "Generated a comprehensive ESG improvement roadmap with 18 actionable initiatives projected to increase composite ESG score by 12 points within 90 days.",
      findings: [
        "Current composite ESG score: 71/100 — ranks in 62nd percentile of industry peers",
        "Environmental pillar strongest (78/100) — driven by renewable energy investments",
        "Social pillar weakest (64/100) — gaps in diversity reporting and community engagement",
        "Governance score (72/100) — board independence ratio below recommended threshold",
      ],
      recommendations: [
        "Prioritize Social pillar improvements — highest ROI for score improvement",
        "Publish diversity and inclusion report by end of Q2",
        "Appoint independent board members to meet 50% independence threshold",
        "Implement quarterly ESG progress reviews with executive sponsorship",
      ],
      impact: [
        { label: "Projected Score", value: "+12pts", trend: "up" },
        { label: "Initiatives", value: "18", trend: "neutral" },
        { label: "Timeline", value: "90 days", trend: "neutral" },
        { label: "Peer Percentile", value: "62nd→78th", trend: "up" },
      ],
      nextActions: ["Open ESG Dashboard", "Download Roadmap", "Schedule Review"],
    },
  },
  {
    id: "roadmap", title: "Generate Sustainability Roadmap", icon: "🗺️",
    description: "Create a comprehensive multi-year sustainability strategy with milestones.",
    executionPlan: ["Analyze current sustainability maturity level", "Define short/medium/long-term objectives", "Map objectives to UN SDG targets", "Calculate resource requirements", "Design milestone tracking framework", "Produce executive-ready roadmap document"],
    healingTrigger: { stepIndex: 3, issue: "SDG target mapping incomplete — Goal 13 sub-indicators missing local context.", resolution: "Injected India-specific NDC (Nationally Determined Contributions) dataset for SDG 13 alignment." },
    result: {
      confidence: 92,
      summary: "Produced a 3-year sustainability roadmap aligned to 8 UN SDG targets with 24 milestones and quarterly progress checkpoints.",
      findings: [
        "Current maturity level: Stage 2 (Developing) — transitioning to Stage 3 (Established)",
        "Strongest alignment with SDG 7 (Clean Energy) and SDG 12 (Responsible Consumption)",
        "Weakest alignment with SDG 13 (Climate Action) — needs India-specific NDC integration",
        "Estimated 34% reduction in carbon intensity achievable within 3-year horizon",
      ],
      recommendations: [
        "Establish quarterly sustainability governance review cadence",
        "Integrate India NDC targets into climate action strategy for SDG 13",
        "Allocate dedicated sustainability budget of 2-3% of operating expenditure",
        "Build internal sustainability capability through training programs",
      ],
      impact: [
        { label: "SDG Targets", value: "8", trend: "neutral" },
        { label: "Milestones", value: "24", trend: "neutral" },
        { label: "Carbon Reduction", value: "-34%", trend: "down" },
        { label: "Maturity Target", value: "Stage 3", trend: "up" },
      ],
      nextActions: ["Download Roadmap PDF", "Present to Board", "Set Milestones"],
    },
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

/* ─── Connectors / Data Sources ─── */
export interface Connector {
  id: string;
  name: string;
  category: string;
  status: "connected" | "pending" | "offline";
  icon: LucideIcon;
  lastSync?: string;
}

export const CONNECTORS: Connector[] = [
  { id: "erp", name: "SAP ERP", category: "Enterprise", status: "connected", icon: Server, lastSync: "2 min ago" },
  { id: "iot", name: "IoT Sensors", category: "Telemetry", status: "connected", icon: Wifi, lastSync: "Live" },
  { id: "supply", name: "Supply Chain API", category: "Logistics", status: "connected", icon: Truck, lastSync: "5 min ago" },
  { id: "esg-db", name: "ESG Database", category: "Intelligence", status: "connected", icon: Database, lastSync: "1 hr ago" },
  { id: "carbon-reg", name: "Carbon Registry", category: "Compliance", status: "pending", icon: Globe, lastSync: "Syncing..." },
  { id: "brsr", name: "BRSR Portal", category: "Regulatory", status: "connected", icon: FileText, lastSync: "12 hr ago" },
  { id: "cloud", name: "Cloud Analytics", category: "Processing", status: "connected", icon: Cloud, lastSync: "3 min ago" },
  { id: "ai-engine", name: "ACTRM Engine", category: "AI Core", status: "connected", icon: Cpu, lastSync: "Live" },
];

/* ─── Quick Actions ─── */
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  missionId: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "qa-scope3", title: "Analyze Scope 3 Emissions", description: "Map value chain carbon hotspots with AI lifecycle analysis", icon: "🏭", missionId: "scope3" },
  { id: "qa-esg", title: "Generate ESG Report", description: "Auto-compile Environmental, Social & Governance disclosures", icon: "📊", missionId: "esg" },
  { id: "qa-brsr", title: "Generate BRSR Report", description: "Build SEBI-compliant sustainability report with AI verification", icon: "📋", missionId: "brsr" },
  { id: "qa-carbon", title: "Run Carbon Analysis", description: "Full lifecycle carbon accounting across Scope 1, 2 & 3", icon: "⚡", missionId: "scope3" },
  { id: "qa-greenwash", title: "Detect Greenwashing", description: "Verify sustainability claims against global indices", icon: "🛡️", missionId: "verify" },
  { id: "qa-supplier", title: "Supplier Intelligence", description: "Risk-score vendors and assess supply chain sustainability", icon: "🔍", missionId: "supplier" },
  { id: "qa-marketplace", title: "Marketplace Recommendations", description: "AI-curated sustainable product and offset recommendations", icon: "🏪", missionId: "esg" },
  { id: "qa-campaign", title: "Launch Community Campaign", description: "Design and deploy eco-engagement campaigns", icon: "🌍", missionId: "roadmap" },
  { id: "qa-lca", title: "Life Cycle Assessment", description: "End-to-end product environmental impact analysis", icon: "♻️", missionId: "scope3" },
];

/* ─── Intent Pattern Router ─── */
export interface IntentPattern {
  keywords: RegExp;
  missionId: string;
}

export const INTENT_PATTERNS: IntentPattern[] = [
  { keywords: /\b(scope\s*3|value\s*chain|upstream|downstream)\b/i, missionId: "scope3" },
  { keywords: /\b(carbon|emission|footprint|co2|ghg)\b/i, missionId: "scope3" },
  { keywords: /\b(supplier|vendor|supply\s*chain|procurement)\b/i, missionId: "supplier" },
  { keywords: /\b(greenwash|greenwashing|claim|verify|verification)\b/i, missionId: "verify" },
  { keywords: /\b(brsr|sebi|disclosure)\b/i, missionId: "brsr" },
  { keywords: /\b(esg|environmental|social|governance)\b/i, missionId: "esg" },
  { keywords: /\b(gri|sdg|sustainable\s*development)\b/i, missionId: "roadmap" },
  { keywords: /\b(lca|life\s*cycle|lifecycle)\b/i, missionId: "scope3" },
  { keywords: /\b(report|generate|compile)\b/i, missionId: "brsr" },
  { keywords: /\b(roadmap|strategy|plan|recommend|predict|optimize)\b/i, missionId: "roadmap" },
  { keywords: /\b(marketplace|credits|offset)\b/i, missionId: "esg" },
  { keywords: /\b(community|challenge|campaign)\b/i, missionId: "roadmap" },
  { keywords: /\b(dashboard|analytics|score)\b/i, missionId: "esg" },
];

export function resolveIntent(input: string): MissionTemplate {
  for (const pattern of INTENT_PATTERNS) {
    if (pattern.keywords.test(input)) {
      const mission = MISSIONS.find(m => m.id === pattern.missionId);
      if (mission) return mission;
    }
  }
  return MISSIONS[0]; // default fallback
}

/* ─── Mission History (Mock) ─── */
export interface MissionHistoryEntry {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "failed";
  timestamp: string;
  confidence?: number;
  missionId: string;
}

export const MISSION_HISTORY: MissionHistoryEntry[] = [
  { id: "mh-1", title: "BRSR Q1 Report Generation", status: "completed", timestamp: "2h ago", confidence: 96, missionId: "brsr" },
  { id: "mh-2", title: "Scope 3 Hotspot Analysis", status: "completed", timestamp: "5h ago", confidence: 91, missionId: "scope3" },
  { id: "mh-3", title: "Supplier Risk Assessment", status: "completed", timestamp: "1d ago", confidence: 89, missionId: "supplier" },
  { id: "mh-4", title: "Greenwash Detection — Q4 Claims", status: "completed", timestamp: "2d ago", confidence: 93, missionId: "verify" },
  { id: "mh-5", title: "ESG Improvement Roadmap", status: "completed", timestamp: "3d ago", confidence: 94, missionId: "esg" },
  { id: "mh-6", title: "Sustainability Strategy 2026–2028", status: "completed", timestamp: "5d ago", confidence: 92, missionId: "roadmap" },
];

/* ─── Execution Pipeline Stages (for animated timeline) ─── */
export const PIPELINE_STAGES = [
  { label: "Routing request", sublabel: "Intent classification" },
  { label: "ACTRM Engine", sublabel: "Policy orchestration" },
  { label: "Carbon Engine", sublabel: "Emission analysis" },
  { label: "Supplier Layer", sublabel: "Vendor intelligence" },
  { label: "Knowledge Base", sublabel: "Semantic retrieval" },
  { label: "Recommendation Engine", sublabel: "Generating insights" },
];
