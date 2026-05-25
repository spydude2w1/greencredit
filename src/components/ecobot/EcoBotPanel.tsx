"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Zap, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "Calculate my carbon footprint",
  "Explain Scope 3 emissions",
  "Suggest eco challenges",
  "What is BRSR reporting?",
  "Tips to reduce emissions",
  "How does greenwashing detection work?",
];

const AI_RESPONSES: Record<string, string> = {
  "Calculate my carbon footprint": "Based on your recent activity data, I can help estimate your carbon footprint. The average Indian individual produces approximately **1.9 tonnes of CO₂** annually.\n\nHere's a quick breakdown of common sources:\n\n• **Transport**: ~35% of personal emissions\n• **Food & Diet**: ~25% of personal emissions\n• **Energy (home)**: ~22% of personal emissions\n• **Shopping & goods**: ~18% of personal emissions\n\nWould you like me to run a detailed calculation? Head to the **Carbon Calculator** for a full analysis.",
  "Explain Scope 3 emissions": "**Scope 3 emissions** are all indirect emissions that occur in a company's value chain — both upstream and downstream.\n\nThey typically account for **70–90%** of a company's total carbon footprint, yet are the hardest to measure.\n\n**15 Categories:**\n1. Purchased goods & services\n2. Capital goods\n3. Fuel & energy activities\n4. Transportation & distribution (upstream)\n5. Waste generated\n6. Business travel\n7. Employee commuting\n8. Leased assets (upstream)\n9–15. Downstream activities\n\nGreen Credit AI's **Carbon Agent** automates Scope 3 measurement using LCA datasets and AI inference.",
  "Suggest eco challenges": "Here are some active challenges you can join:\n\n🌱 **30-Day Carbon Diet** — Reduce your footprint by 20%\n♻️ **Zero Plastic Week** — Eliminate single-use plastics\n🚲 **Green Commute Challenge** — Use sustainable transport for 14 days\n🌍 **Community Earth Action** — Participate in local cleanup\n\nEach challenge earns **Green Credits** and boosts your sustainability score. Visit the **Challenges** page to get started!",
  "What is BRSR reporting?": "**BRSR** (Business Responsibility and Sustainability Reporting) is India's mandatory ESG reporting framework by SEBI.\n\n**Key Facts:**\n• Required for top **1,000 listed companies** in India\n• Covers **9 principles** of responsible business conduct\n• Includes **Essential** and **Leadership** indicators\n• Reports on environmental, social, and governance metrics\n\nGreen Credit AI's **ESG Agent** can auto-generate BRSR reports from your organizational data, saving hundreds of hours of manual work.",
  "Tips to reduce emissions": "Here are **5 high-impact actions** to reduce your carbon footprint:\n\n1. 🚗 **Switch commute** — Public transport or cycling can save 2.5t CO₂/year\n2. 🥦 **Reduce meat** — Plant-based meals cut food emissions by 50%\n3. ⚡ **Switch to renewables** — Solar/wind energy for home use\n4. 🛍️ **Buy verified green** — Check sustainability scores on our marketplace\n5. 🌳 **Offset remaining** — Support verified carbon offset projects\n\nYour current score suggests focusing on **transport and energy** first.",
  "How does greenwashing detection work?": "Our **Verification Agent** uses a multi-step AI pipeline:\n\n1. **Claim Extraction** — NLP parses sustainability claims from reports, websites, and marketing\n2. **Cross-Reference** — Claims are checked against GRI, BRSR, and SDG standards\n3. **Anomaly Detection** — ML models flag statistical inconsistencies\n4. **Trust Scoring** — Each supplier gets a score (0–100)\n\n**Red flags detected:**\n• Vague language (\"eco-friendly\" without data)\n• Missing certifications\n• Inconsistent emission reports\n• Unverifiable claims\n\nTry it yourself on the **Greenwash Detection** page!",
};

const DEFAULT_RESPONSE = "I'm analyzing your query using our sustainability knowledge base. For detailed analysis, try the specific tools in the dashboard — Carbon Analysis, ESG Reports, or Greenwash Detection. I'm here to help guide you through any sustainability question!";

interface EcoBotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EcoBotPanel({ isOpen, onClose }: EcoBotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm **EcoBot**, your AI sustainability assistant. I can help with carbon calculations, ESG guidance, sustainability tips, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const responseText = AI_RESPONSES[text.trim()] || DEFAULT_RESPONSE;

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  }, [isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 z-50 h-screen w-[420px] max-w-full flex flex-col border-l border-border bg-surface"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-lg gradient-green flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-surface" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  EcoBot AI
                  <Zap className="h-3.5 w-3.5 text-accent" />
                </h2>
                <p className="text-[11px] text-text-muted">Sustainability Intelligence</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-surface-raised transition-colors text-text-muted hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-accent text-white rounded-tr-sm"
                      : "bg-surface-raised border border-border-subtle text-text-primary rounded-tl-sm"
                  )}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br />")
                        .replace(/• /g, "• "),
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-text-muted"
              >
                <div className="flex items-center gap-1 bg-surface-raised border border-border-subtle rounded-xl px-4 py-3 rounded-tl-sm">
                  <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                  <span className="text-xs text-text-muted">EcoBot is thinking</span>
                  <span className="flex gap-1 ml-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: "200ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-typing-dot" style={{ animationDelay: "400ms" }} />
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-5 pb-3">
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.slice(0, 3).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                  className="text-[11px] px-2.5 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-text-secondary hover:text-accent hover:border-accent/30 transition-all disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EcoBot anything..."
                disabled={isTyping}
                className="flex-1 h-10 rounded-lg bg-background border border-border-subtle px-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 rounded-lg gradient-green flex items-center justify-center text-white disabled:opacity-50 hover:opacity-90 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
