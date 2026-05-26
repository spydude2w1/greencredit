"use client";

import { Settings, User, Bell, Shield, Palette } from "lucide-react";

const sections = [
  { icon: User, label: "Organization Profile", desc: "Manage legal entity names, primary industry tags, and contact metrics." },
  { icon: Bell, label: "Notification Channels", desc: "Configure direct alerts, supplier trigger logs, and compliance deadline notifications." },
  { icon: Shield, label: "Access & Security", desc: "Manage client passwords, federated 2FA nodes, and API authentication keys." },
  { icon: Palette, label: "System Preferences", desc: "Customize dashboard viewport settings, default frameworks, and telemetry data retention." },
];

export default function EnterpriseSettingsPage() {
  return (
    <div className="space-y-8 font-sans text-text-primary antialiased">
      {/* Header */}
      <div className="pb-2 border-b border-white/[0.02]">
        <h1 className="text-xl font-light text-text-primary flex items-center gap-2 tracking-tight">
          System Settings
          <Settings className="h-4.5 w-4.5 text-text-muted" />
        </h1>
        <p className="text-[12px] text-text-muted font-light mt-1.5 leading-relaxed">
          Manage your organizational profiles, stream keys, and platform preferences.
        </p>
      </div>

      <div className="space-y-3.5 max-w-2xl">
        {sections.map((s) => (
          <div key={s.label} className="rounded border border-white/[0.03] bg-[#0c0c0e] p-5 flex items-center gap-4 hover:border-white/[0.08] transition-colors cursor-pointer select-none">
            <div className="h-9 w-9 rounded bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0">
              <s.icon className="h-4 w-4 text-text-muted opacity-80" />
            </div>
            <div>
              <p className="text-[12.5px] font-normal text-text-primary tracking-tight leading-none">{s.label}</p>
              <p className="text-[11px] text-text-muted font-light mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
