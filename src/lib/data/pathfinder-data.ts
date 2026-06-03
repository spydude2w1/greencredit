export interface PathfinderMission {
  id: string;
  title: string;
  category: string;
  impactEstimate: string;
  reward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  durationDays: number;
}

export const PATHFINDER_MISSIONS: PathfinderMission[] = [
  {
    id: "m_energy_1",
    title: "Reduce Household Energy Usage",
    category: "Energy Reduction",
    impactEstimate: "4.2kg CO₂e",
    reward: 40,
    difficulty: "Medium",
    durationDays: 7,
  },
  {
    id: "m_transport_1",
    title: "Switch to Public Transit",
    category: "Transportation",
    impactEstimate: "12.5kg CO₂e",
    reward: 120,
    difficulty: "Hard",
    durationDays: 5,
  },
  {
    id: "m_waste_1",
    title: "Zero Single-Use Plastics",
    category: "Waste Management",
    impactEstimate: "1.8kg CO₂e",
    reward: 35,
    difficulty: "Easy",
    durationDays: 3,
  },
  {
    id: "m_food_1",
    title: "Plant-Based Weekend",
    category: "Sustainable Consumption",
    impactEstimate: "8.4kg CO₂e",
    reward: 60,
    difficulty: "Medium",
    durationDays: 2,
  },
  {
    id: "m_water_1",
    title: "Optimize Water Usage",
    category: "Water Conservation",
    impactEstimate: "0.5kg CO₂e",
    reward: 20,
    difficulty: "Easy",
    durationDays: 7,
  },
];

export interface CopilotAnalysis {
  id: string;
  title: string;
  type: string;
  impactLevel: "Low" | "Medium" | "High";
  score?: number;
  details: { label: string; value: string }[];
  recommendation: string;
}

export const COPILOT_SCENARIOS: CopilotAnalysis[] = [
  {
    id: "c_laptop",
    title: "Laptop Purchase",
    type: "Purchase Analysis",
    impactLevel: "Medium",
    score: 82,
    details: [
      { label: "Expected Lifespan", value: "6 Years" },
      { label: "E-Waste Risk", value: "Low" },
    ],
    recommendation: "Choose a repairable model with modular components to maximize lifespan.",
  },
  {
    id: "c_travel",
    title: "Bengaluru to Chennai Trip",
    type: "Travel Analysis",
    impactLevel: "High",
    details: [
      { label: "Flight", value: "145kg CO₂e" },
      { label: "Bus", value: "41kg CO₂e" },
      { label: "Train", value: "34kg CO₂e" },
    ],
    recommendation: "Train travel is highly recommended. It reduces your footprint by 76% compared to flying.",
  },
  {
    id: "c_household",
    title: "Monthly Household Audit",
    type: "Household Analysis",
    impactLevel: "High",
    score: 65,
    details: [
      { label: "Highest Impact", value: "Cooling / AC" },
      { label: "Secondary", value: "Water Heating" },
    ],
    recommendation: "Increase AC temperature setting by 2°C. Generate the 'Reduce Household Energy Usage' mission.",
  },
];
