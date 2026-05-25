// B2B Enterprise Mock Data
export const orgProfile = {
  name: "AECS MMPS, Bengaluru",
  type: "Educational Institution",
  employees: 120,
  esgScore: 78,
  brrsStatus: "In Progress",
  lastAudit: "2025-03-15",
};

export const esgScores = {
  overall: 78,
  environmental: 82,
  social: 75,
  governance: 74,
  brsr: 80,
  gri: 72,
  sdg: 76,
};

export const scopeEmissions = [
  { scope: "Scope 1", value: 45, label: "Direct Emissions", color: "#ef4444" },
  { scope: "Scope 2", value: 120, label: "Energy Indirect", color: "#f59e0b" },
  { scope: "Scope 3", value: 680, label: "Value Chain", color: "#3b82f6" },
];

export const emissionsByCategory = [
  { category: "Purchased Goods", value: 280, scope: 3, color: "#3b82f6" },
  { category: "Transportation", value: 145, scope: 3, color: "#22c55e" },
  { category: "Employee Commuting", value: 95, scope: 3, color: "#8b5cf6" },
  { category: "Electricity", value: 120, scope: 2, color: "#f59e0b" },
  { category: "Waste", value: 65, scope: 3, color: "#ef4444" },
  { category: "Business Travel", value: 55, scope: 3, color: "#06b6d4" },
  { category: "Fuel Combustion", value: 45, scope: 1, color: "#ec4899" },
  { category: "Water Usage", value: 40, scope: 3, color: "#14b8a6" },
];

export const emissionTrend = [
  { year: "2020", total: 920, scope1: 55, scope2: 140, scope3: 725 },
  { year: "2021", total: 890, scope1: 52, scope2: 135, scope3: 703 },
  { year: "2022", total: 870, scope1: 50, scope2: 130, scope3: 690 },
  { year: "2023", total: 865, scope1: 48, scope2: 127, scope3: 690 },
  { year: "2024", total: 845, scope1: 45, scope2: 120, scope3: 680 },
];

export const supplierRisk = [
  { status: "Verified", count: 18, color: "#22c55e" },
  { status: "Pending", count: 7, color: "#f59e0b" },
  { status: "Flagged", count: 3, color: "#ef4444" },
  { status: "Under Review", count: 4, color: "#3b82f6" },
];

export const recentReports = [
  { id: "r1", title: "Q4 2025 BRSR Report", framework: "BRSR", status: "Completed", date: "2025-12-15", pages: 42 },
  { id: "r2", title: "Annual GRI Disclosure", framework: "GRI", status: "In Progress", date: "2026-02-20", pages: 0 },
  { id: "r3", title: "SDG Progress Report", framework: "SDG", status: "Completed", date: "2025-12-10", pages: 28 },
  { id: "r4", title: "CDP Climate Response", framework: "CDP", status: "Draft", date: "2026-03-01", pages: 15 },
];

export const aiInsights = [
  {
    id: "i1",
    title: "Scope 3 Hotspot Detected",
    description: "Purchased goods account for 33% of total emissions. Consider switching 3 suppliers with lower carbon alternatives.",
    severity: "high",
    category: "Carbon",
    action: "Review Suppliers",
  },
  {
    id: "i2",
    title: "BRSR Compliance Gap",
    description: "Section B (Management & Process) has 4 unfilled indicators. Deadline is 45 days away.",
    severity: "medium",
    category: "Compliance",
    action: "Complete Report",
  },
  {
    id: "i3",
    title: "Energy Reduction Opportunity",
    description: "Solar installation on campus roof could reduce Scope 2 emissions by 40%. ROI: 3.2 years.",
    severity: "low",
    category: "Recommendation",
    action: "View Analysis",
  },
  {
    id: "i4",
    title: "Supplier Verification Alert",
    description: "3 suppliers have outdated sustainability certifications. Re-verification recommended.",
    severity: "medium",
    category: "Verification",
    action: "Verify Now",
  },
];

export const valueChainData = [
  { stage: "Raw Materials", emissions: 180, percentage: 21 },
  { stage: "Manufacturing", emissions: 150, percentage: 18 },
  { stage: "Packaging", emissions: 45, percentage: 5 },
  { stage: "Transport", emissions: 145, percentage: 17 },
  { stage: "Retail", emissions: 35, percentage: 4 },
  { stage: "Consumer Use", emissions: 220, percentage: 26 },
  { stage: "End of Life", emissions: 70, percentage: 8 },
];

export const suppliers = [
  { id: "s1", name: "EcoSupply India", industry: "Office Supplies", trustScore: 92, status: "Verified", lastAudit: "2025-01-10", emissions: 12.5, claims: 8, flagged: 0, certifications: ["ISO 14001", "FSC"] },
  { id: "s2", name: "GreenPrint Solutions", industry: "Printing", trustScore: 88, status: "Verified", lastAudit: "2024-11-20", emissions: 18.2, claims: 6, flagged: 0, certifications: ["ISO 14001"] },
  { id: "s3", name: "FreshFarm Organics", industry: "Food & Catering", trustScore: 76, status: "Pending", lastAudit: "2024-09-15", emissions: 45.8, claims: 12, flagged: 2, certifications: ["FSSAI"] },
  { id: "s4", name: "Metro Transport Co.", industry: "Logistics", trustScore: 45, status: "Flagged", lastAudit: "2024-06-20", emissions: 89.3, claims: 15, flagged: 5, certifications: [] },
  { id: "s5", name: "SolarTech Systems", industry: "Energy", trustScore: 95, status: "Verified", lastAudit: "2025-02-01", emissions: 5.2, claims: 4, flagged: 0, certifications: ["ISO 14001", "ISO 50001", "BIS"] },
  { id: "s6", name: "CleanWater Corp", industry: "Water Management", trustScore: 83, status: "Verified", lastAudit: "2024-12-05", emissions: 22.1, claims: 7, flagged: 1, certifications: ["ISO 14001"] },
  { id: "s7", name: "QuickBuild Materials", industry: "Construction", trustScore: 38, status: "Flagged", lastAudit: "2024-04-10", emissions: 120.5, claims: 18, flagged: 7, certifications: [] },
  { id: "s8", name: "BioWaste Solutions", industry: "Waste Management", trustScore: 71, status: "Under Review", lastAudit: "2024-10-25", emissions: 34.7, claims: 9, flagged: 2, certifications: ["ISO 14001"] },
];

export const greenwashResults = {
  supplier: "Metro Transport Co.",
  overallScore: 45,
  riskLevel: "High",
  scannedClaims: 15,
  flaggedClaims: 5,
  confidence: 87,
  claims: [
    { id: "gc1", text: "100% carbon neutral fleet", status: "Flagged", reason: "No carbon offset certificates found. Fleet includes 60% diesel vehicles.", confidence: 92 },
    { id: "gc2", text: "ISO 14001 certified operations", status: "Flagged", reason: "Certification expired 8 months ago. No renewal evidence.", confidence: 95 },
    { id: "gc3", text: "Uses renewable energy for warehouses", status: "Flagged", reason: "Energy audit shows 85% grid electricity usage. No solar/wind installations detected.", confidence: 88 },
    { id: "gc4", text: "Zero waste to landfill policy", status: "Flagged", reason: "Waste reports show 35% landfill disposal. Policy claim is misleading.", confidence: 91 },
    { id: "gc5", text: "Electric vehicle transition plan", status: "Flagged", reason: "Plan exists but only 5% EV adoption. Timeline vague.", confidence: 78 },
    { id: "gc6", text: "Employee sustainability training", status: "Verified", reason: "Training records confirmed for 80% of staff.", confidence: 85 },
    { id: "gc7", text: "Community cleanup partnerships", status: "Verified", reason: "Active partnerships with 3 local NGOs confirmed.", confidence: 90 },
  ],
};

export const esrReportSteps = [
  { id: 1, title: "Select Framework", description: "Choose reporting standard" },
  { id: 2, title: "Input Data", description: "Upload organizational data" },
  { id: 3, title: "AI Analysis", description: "Automated compliance check" },
  { id: 4, title: "Review & Export", description: "Preview and download report" },
];

export const carbonAnalysisSteps = [
  { id: 1, title: "Data Extraction", description: "Parsing uploaded documents...", duration: 2000 },
  { id: 2, title: "Emission Factor Lookup", description: "Matching against IPCC database...", duration: 1500 },
  { id: 3, title: "LCA Analysis", description: "Running lifecycle assessment...", duration: 3000 },
  { id: 4, title: "Scope Classification", description: "Categorizing by Scope 1/2/3...", duration: 1000 },
  { id: 5, title: "Hotspot Detection", description: "Identifying emission hotspots...", duration: 2000 },
  { id: 6, title: "Recommendations", description: "Generating reduction strategies...", duration: 1500 },
];
