import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Protection — Green Credit AI",
  description: "Green Credit AI Data Protection Policy. How sustainability and personal data is safeguarded under Indian data protection law.",
};

export default function DataProtectionPage() {
  return (
    <div className="text-text-primary">
      <div className="mb-10 pb-8 border-b border-white/[0.04]">
        <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-3">Legal</p>
        <h1 className="text-3xl font-light text-text-primary tracking-tight mb-3">Data Protection</h1>
        <p className="text-[12px] text-text-muted font-extralight">Effective date: 1 June 2026 · Aligned with DPDP Act 2023</p>
      </div>

      <div className="space-y-8 text-text-secondary font-extralight text-[13px] leading-relaxed">
        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">1. Our Commitment</h2>
          <p>Green Credit AI is committed to handling all personal and organizational data with the highest standards of care, transparency, and security. We comply with the Digital Personal Data Protection (DPDP) Act 2023 of India and applicable international data protection standards.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">2. Data We Process</h2>
          <div className="space-y-3">
            {[
              { label: "Personal Data", desc: "Names, email addresses, organization affiliations, and account credentials." },
              { label: "Sustainability Data", desc: "ESG reports, carbon footprint records, supplier documents, and environmental metrics you upload." },
              { label: "Usage Data", desc: "Platform interaction logs, feature usage patterns, and AI query history." },
              { label: "Technical Data", desc: "IP addresses, device identifiers, and browser information for security purposes." },
            ].map(item => (
              <div key={item.label} className="flex gap-3">
                <span className="text-accent/40 shrink-0 mt-0.5">—</span>
                <div><span className="text-text-primary font-light">{item.label}:</span> {item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">3. Legal Basis for Processing</h2>
          <p>We process data on the basis of: (a) your consent at registration, (b) contractual necessity to deliver platform services, (c) legitimate interests in improving our sustainability AI systems, and (d) legal obligations.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">4. Security Measures</h2>
          <p className="mb-3">Technical and organizational measures we implement:</p>
          <ul className="space-y-1.5 pl-4">
            {["AES-256 encryption for data at rest", "TLS 1.3 for all data in transit", "Role-based access control (RBAC) on all platform systems", "Regular security audits and penetration testing", "Incident response and breach notification procedures"].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-accent/40 mt-1.5 shrink-0">—</span>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">5. Data Retention</h2>
          <p>We retain personal data for as long as your account is active plus 2 years, or as required by law. Sustainability data you upload is retained for the duration of your subscription. You may request deletion at any time.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">6. Cross-Border Transfers</h2>
          <p>Your data is primarily processed and stored in India. If data is transferred internationally (e.g., to AI processing infrastructure), such transfers comply with applicable data protection frameworks and adequacy standards.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">7. Contact Our Data Team</h2>
          <p>For data protection requests, inquiries, or to exercise your rights under the DPDP Act: <a href="mailto:hello@greencredit.live" className="text-accent/80 hover:text-accent transition-colors">hello@greencredit.live</a> · Green Credit AI, Bengaluru, Karnataka, India.</p>
        </section>
      </div>
    </div>
  );
}
