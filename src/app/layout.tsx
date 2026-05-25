import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green Credit AI — AI-Powered Sustainability Intelligence",
  description:
    "An AI-powered sustainability operating platform that combines enterprise sustainability intelligence with community-driven environmental engagement. Scope 3 carbon analysis, ESG automation, greenwashing detection, and more.",
  keywords: [
    "sustainability",
    "AI",
    "carbon footprint",
    "ESG",
    "BRSR",
    "greenwashing",
    "Scope 3",
    "green credit",
    "climate tech",
  ],
  authors: [{ name: "Green Credit AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
