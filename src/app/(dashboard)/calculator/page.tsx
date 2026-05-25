"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Car, Utensils, Zap, ShoppingBag, Plane, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "transport", label: "Transport", icon: Car, color: "text-info" },
  { id: "food", label: "Food & Diet", icon: Utensils, color: "text-accent" },
  { id: "energy", label: "Home Energy", icon: Zap, color: "text-warning" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-purple-400" },
  { id: "travel", label: "Travel", icon: Plane, color: "text-cyan-400" },
];

const questions: Record<string, { label: string; options: { text: string; co2: number }[] }[]> = {
  transport: [
    { label: "Daily commute method?", options: [
      { text: "Car (petrol)", co2: 4.6 }, { text: "Car (diesel)", co2: 5.2 }, { text: "Motorcycle", co2: 2.8 },
      { text: "Bus / Metro", co2: 0.9 }, { text: "Bicycle / Walk", co2: 0 }, { text: "Electric vehicle", co2: 0.5 }
    ]},
    { label: "Average daily distance (km)?", options: [
      { text: "< 5 km", co2: 0.5 }, { text: "5-15 km", co2: 1.5 }, { text: "15-30 km", co2: 3 }, { text: "30+ km", co2: 5 }
    ]},
  ],
  food: [
    { label: "Diet type?", options: [
      { text: "Vegan", co2: 1.5 }, { text: "Vegetarian", co2: 2.5 }, { text: "Non-veg (occasional)", co2: 4 }, { text: "Non-veg (daily)", co2: 6 }
    ]},
    { label: "Food sourcing?", options: [
      { text: "Mostly local / organic", co2: 0.5 }, { text: "Mix of local and imported", co2: 1.5 }, { text: "Mostly packaged / imported", co2: 3 }
    ]},
  ],
  energy: [
    { label: "Electricity source?", options: [
      { text: "Solar / Renewable", co2: 0.5 }, { text: "Grid (mixed)", co2: 3 }, { text: "Generator / Diesel", co2: 6 }
    ]},
    { label: "Monthly electricity bill?", options: [
      { text: "< ₹1,000", co2: 1 }, { text: "₹1,000-3,000", co2: 3 }, { text: "₹3,000-5,000", co2: 5 }, { text: "> ₹5,000", co2: 7 }
    ]},
  ],
  shopping: [
    { label: "Shopping frequency?", options: [
      { text: "Minimal (need-based)", co2: 0.5 }, { text: "Moderate (monthly)", co2: 2 }, { text: "Frequent (weekly)", co2: 4 }
    ]},
  ],
  travel: [
    { label: "Flights per year?", options: [
      { text: "None", co2: 0 }, { text: "1-2 domestic", co2: 3 }, { text: "3-5 domestic", co2: 6 }, { text: "International", co2: 12 }
    ]},
  ],
};

export default function CalculatorPage() {
  const [activeCategory, setActiveCategory] = useState("transport");
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [showResults, setShowResults] = useState(false);

  const selectAnswer = (catId: string, qIdx: number, co2: number) => {
    setAnswers((prev) => {
      const catAnswers = [...(prev[catId] || [])];
      catAnswers[qIdx] = co2;
      return { ...prev, [catId]: catAnswers };
    });
  };

  const totalCO2 = Object.values(answers).flat().reduce((a, b) => a + (b || 0), 0);
  const monthlyEstimate = totalCO2 * 4.3;
  const yearlyEstimate = monthlyEstimate * 12;
  const indianAvg = 1900; // kg/year

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            Carbon Calculator <Calculator className="h-5 w-5 text-accent" />
          </h1>
          <p className="text-sm text-text-muted mt-1">Estimate your weekly carbon footprint</p>
        </div>
        {showResults && (
          <button onClick={() => { setShowResults(false); setAnswers({}); }} className="text-xs text-accent flex items-center gap-1 hover:underline">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Live Counter */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center glow-green">
        <p className="text-xs text-text-muted uppercase tracking-wider">Estimated Weekly Footprint</p>
        <motion.p key={totalCO2} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-5xl font-bold text-accent stat-number mt-2">
          {totalCO2.toFixed(1)}
        </motion.p>
        <p className="text-sm text-text-muted mt-1">kg CO₂e / week</p>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-muted">
          <span>Monthly: <strong className="text-text-primary">{monthlyEstimate.toFixed(0)} kg</strong></span>
          <span>Yearly: <strong className={cn("stat-number", yearlyEstimate < indianAvg ? "text-accent" : "text-warning")}>{yearlyEstimate.toFixed(0)} kg</strong></span>
          <span>India avg: <strong className="text-text-primary">{indianAvg} kg/yr</strong></span>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeCategory === cat.id ? "bg-accent/10 text-accent border border-accent/20" : "bg-surface border border-border-subtle text-text-muted hover:text-text-primary")}>
            <cat.icon className="h-4 w-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions[activeCategory]?.map((q, qIdx) => (
          <motion.div key={`${activeCategory}-${qIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qIdx * 0.1 }}
            className="rounded-xl border border-border-subtle bg-surface p-5">
            <p className="text-sm font-semibold text-text-primary mb-3">{q.label}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {q.options.map((opt) => (
                <button key={opt.text} onClick={() => selectAnswer(activeCategory, qIdx, opt.co2)}
                  className={cn("p-3 rounded-lg border text-left text-xs transition-all",
                    answers[activeCategory]?.[qIdx] === opt.co2
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border-subtle hover:border-accent/30 text-text-secondary hover:text-text-primary")}>
                  <span className="block font-medium">{opt.text}</span>
                  <span className="text-[10px] text-text-muted mt-0.5 block">{opt.co2} kg CO₂/week</span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
