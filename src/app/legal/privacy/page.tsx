import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Green Credit AI",
  description: "Green Credit AI Privacy Policy. How we collect, use, and protect your personal and sustainability data.",
};

export default function PrivacyPage() {
  return (
    <div className="text-text-primary">
      <div className="mb-10 pb-8 border-b border-white/[0.04]">
        <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-3">Legal</p>
        <h1 className="text-3xl font-light text-text-primary tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-[12px] text-text-muted font-extralight">Effective date: 1 June 2026 · Last updated: 1 June 2026</p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none space-y-8 text-text-secondary font-extralight text-[13px] leading-relaxed">
        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">1. Introduction</h2>
          <p>Green Credit AI ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered sustainability operating platform at greencredit.live and related services.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect information you provide directly, including:</p>
          <ul className="space-y-1.5 pl-4">
            {["Account registration data (name, email, organization)", "Sustainability data you upload (ESG reports, carbon data, supplier records)", "Usage data and interaction logs within the platform", "Communications you send to us"].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-accent/40 mt-1.5 shrink-0">—</span>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="space-y-1.5 pl-4">
            {["Provide, operate, and maintain our sustainability intelligence platform", "Process and analyze your environmental data using our AI systems", "Generate ESG reports, carbon analyses, and sustainability scores", "Improve our AI models and platform capabilities", "Communicate with you about platform updates and sustainability insights", "Comply with legal obligations"].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-accent/40 mt-1.5 shrink-0">—</span>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data. Sustainability data is encrypted in transit and at rest. Access controls ensure only authorized personnel can access your organizational data. However, no method of internet transmission is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">5. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with trusted service providers who assist us in operating the platform, subject to confidentiality agreements. We may disclose data when required by law or to protect our rights.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">6. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="space-y-1.5 pl-4">
            {["Access the personal data we hold about you", "Request correction of inaccurate data", "Request deletion of your data", "Object to or restrict our processing of your data", "Data portability"].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-accent/40 mt-1.5 shrink-0">—</span>{item}</li>
            ))}
          </ul>
          <p className="mt-3">To exercise these rights, contact us at privacy@greencredit.live.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">7. Contact</h2>
          <p>For privacy-related questions, please contact us at: <a href="mailto:hello@greencredit.live" className="text-accent/80 hover:text-accent transition-colors">hello@greencredit.live</a> · Green Credit AI, Bengaluru, India.</p>
        </section>
      </div>
    </div>
  );
}
