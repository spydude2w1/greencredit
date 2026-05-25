"use client";

import { Settings, User, Bell, Shield, Leaf } from "lucide-react";

const sections = [
  { icon: User, label: "Profile", desc: "Name, school, avatar, bio" },
  { icon: Bell, label: "Notifications", desc: "Challenge reminders, credit updates, community events" },
  { icon: Shield, label: "Privacy", desc: "Leaderboard visibility, data sharing preferences" },
  { icon: Leaf, label: "Sustainability Preferences", desc: "Diet type, commute method, energy source defaults" },
];

export default function CommunitySettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">Settings <Settings className="h-5 w-5 text-text-muted" /></h1>
        <p className="text-sm text-text-muted mt-1">Manage your community profile and preferences</p>
      </div>
      <div className="space-y-3 max-w-2xl">
        {sections.map((s) => (
          <div key={s.label} className="rounded-xl border border-border-subtle bg-surface p-5 flex items-center gap-4 card-hover cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-surface-raised flex items-center justify-center shrink-0">
              <s.icon className="h-5 w-5 text-text-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{s.label}</p>
              <p className="text-xs text-text-muted">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
