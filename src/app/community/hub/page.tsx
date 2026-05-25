"use client";

import { motion } from "framer-motion";
import { Users, MapPin, Calendar, Heart, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const initiatives = [
  { id: 1, title: "Bangalore Lake Cleanup Drive", org: "Clean Lakes Foundation", date: "2025-04-12", location: "Ulsoor Lake, Bangalore", type: "Cleanup", participants: 245, spotsLeft: 15, image: "🏞️" },
  { id: 2, title: "Urban Tree Plantation - 1000 Trees", org: "Green Bangalore Trust", date: "2025-04-20", location: "Cubbon Park", type: "Plantation", participants: 180, spotsLeft: 20, image: "🌳" },
  { id: 3, title: "Composting Workshop", org: "Zero Waste India", date: "2025-04-25", location: "Koramangala Community Hall", type: "Workshop", participants: 50, spotsLeft: 8, image: "♻️" },
  { id: 4, title: "Solar Panel Awareness Camp", org: "SunPower India", date: "2025-05-01", location: "AECS Layout", type: "Awareness", participants: 120, spotsLeft: 30, image: "☀️" },
];

const ngos = [
  { name: "Clean Lakes Foundation", focus: "Water Conservation", members: 2400, logo: "💧" },
  { name: "Green Bangalore Trust", focus: "Urban Forestry", members: 3200, logo: "🌿" },
  { name: "Zero Waste India", focus: "Waste Management", members: 1800, logo: "♻️" },
  { name: "Climate Action Network", focus: "Climate Policy", members: 5600, logo: "🌍" },
];

export default function CommunityHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Community Hub <Users className="h-5 w-5 text-cyan-400" /></h1>
        <p className="text-sm text-text-muted mt-1">Local initiatives, NGO partnerships, and community events</p>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initiatives.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border-subtle bg-surface p-5 card-hover">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{event.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{event.type}</span>
                    <span className="text-[10px] text-text-muted">{event.spotsLeft} spots left</span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary">{event.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{event.org}</p>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-text-muted flex items-center gap-1"><Users className="h-3 w-3" />{event.participants} joined</span>
                    <button className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1">
                      Join <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NGO Partners */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">NGO Partners</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ngos.map((ngo, i) => (
            <motion.div key={ngo.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border-subtle bg-surface p-4 text-center card-hover">
              <span className="text-3xl block">{ngo.logo}</span>
              <p className="text-sm font-semibold text-text-primary mt-2">{ngo.name}</p>
              <p className="text-[10px] text-text-muted mt-0.5">{ngo.focus}</p>
              <p className="text-xs text-cyan-400 font-bold mt-2 stat-number">{ngo.members.toLocaleString()} members</p>
              <button className="mt-3 w-full py-1.5 rounded-lg border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/10 transition-colors">
                Partner
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
