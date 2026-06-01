import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Green Credit AI",
  description: "Green Credit AI Cookie Policy. How we use cookies to improve platform experience and sustainability analytics.",
};

export default function CookiesPage() {
  return (
    <div className="text-text-primary">
      <div className="mb-10 pb-8 border-b border-white/[0.04]">
        <p className="text-[9px] text-accent/70 uppercase tracking-[0.3em] font-light mb-3">Legal</p>
        <h1 className="text-3xl font-light text-text-primary tracking-tight mb-3">Cookie Policy</h1>
        <p className="text-[12px] text-text-muted font-extralight">Effective date: 1 June 2026 · Last updated: 1 June 2026</p>
      </div>

      <div className="space-y-8 text-text-secondary font-extralight text-[13px] leading-relaxed">
        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help platforms remember your preferences, maintain session state, and improve user experience.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">2. How We Use Cookies</h2>
          <p className="mb-4">Green Credit AI uses the following categories of cookies:</p>
          <div className="space-y-4">
            {[
              { name: "Essential Cookies", desc: "Required for platform functionality. These enable session management, authentication, and core dashboard operations. Cannot be disabled.", color: "text-accent" },
              { name: "Analytics Cookies", desc: "Help us understand how users interact with the platform. We use aggregated, anonymized data to improve sustainability features and AI model performance.", color: "text-info" },
              { name: "Preference Cookies", desc: "Remember your settings such as dashboard layout, theme preferences, and notification configurations.", color: "text-warning" },
            ].map(cat => (
              <div key={cat.name} className="p-5 rounded border border-white/[0.04] bg-[#0c0c0e]">
                <p className={`text-[12px] font-light mb-1.5 ${cat.color}`}>{cat.name}</p>
                <p className="text-[12px] text-text-muted font-extralight">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">3. Third-Party Cookies</h2>
          <p>We do not place third-party advertising cookies. Analytics services we use are configured to anonymize IP addresses and respect Do Not Track browser signals.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">4. Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Note that disabling essential cookies will impair platform functionality. Most browsers allow you to view and delete stored cookies via Settings → Privacy → Cookies.</p>
        </section>

        <section>
          <h2 className="text-[15px] font-light text-text-primary mb-3">5. Contact</h2>
          <p>Cookie-related questions: <a href="mailto:hello@greencredit.live" className="text-accent/80 hover:text-accent transition-colors">hello@greencredit.live</a></p>
        </section>
      </div>
    </div>
  );
}
