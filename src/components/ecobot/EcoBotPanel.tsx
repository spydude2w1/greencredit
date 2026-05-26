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
  "Calculate my carbon footprint": "Based on your recent activity data, I can estimate your carbon footprint. The average Indian individual produces approximately **1.9 tonnes of CO₂** annually.\n\nHere's a quick breakdown of common sources:\n\n• **Transport**: ~35% of personal emissions\n• **Food & Diet**: ~25% of personal emissions\n• **Energy (home)**: ~22% of personal emissions\n• **Shopping & goods**: ~18% of personal emissions\n\nWould you like me to run a detailed calculation? Head to the **Carbon Calculator** for a full analysis.",
  "Explain Scope 3 emissions": "**Scope 3 emissions** are all indirect emissions that occur in a company's value chain — both upstream and downstream.\n\nThey typically account for **70–90%** of a company's total carbon footprint, yet are the hardest to measure.\n\n**Key Categories:**\n1. Purchased goods & services\n2. Transportation & distribution\n3. Waste generated\n4. Business travel & commuting\n\nGreen Credit AI's **Carbon Agent** automates Scope 3 measurement using LCA datasets and AI inference.",
  "Suggest eco challenges": "Here are some active challenges you can join:\n\n🌱 **30-Day Carbon Diet** — Reduce footprint by 20%\n♻️ **Zero Plastic Week** — Eliminate single-use plastics\n🚲 **Green Commute Challenge** — Use sustainable transport for 14 days\n\nEach challenge earns **Green Credits** and boosts your sustainability score. Visit the **Challenges** page to get started!",
  "What is BRSR reporting?": "**BRSR** (Business Responsibility and Sustainability Reporting) is India's mandatory ESG reporting framework by SEBI.\n\n**Key Facts:**\n• Required for top **1,000 listed companies** in India\n• Covers **9 principles** of responsible business conduct\n• Reports on environmental, social, and governance metrics\n\nGreen Credit AI's **ESG Agent** can auto-generate BRSR reports from your organizational data, saving hundreds of hours of manual work.",
  "Tips to reduce emissions": "Here are **high-impact actions** to reduce your footprint:\n\n1. 🚗 **Switch commute** — Public transport or cycling can save 2.5t CO₂/year\n2. 🥦 **Reduce meat** — Plant-based meals cut food emissions by 50%\n3. ⚡ **Switch to renewables** — Solar/wind energy for home use\n\nYour current score suggests focusing on **transport and energy** first.",
  "How does greenwashing detection work?": "Our **Verification Agent** uses a multi-step AI pipeline:\n\n1. **Claim Extraction** — NLP parses sustainability claims from reports & marketing\n2. **Cross-Reference** — Claims are checked against GRI, BRSR, and SDG standards\n3. **Anomaly Detection** — ML models flag statistical inconsistencies\n4. **Trust Scoring** — Each supplier gets a score (0–100)\n\nTry it yourself on the **Greenwash Detection** page!",
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
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 600));

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
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed right-0 top-0 z-50 h-screen w-[440px] max-w-full flex flex-col border-l border-white/[0.03] bg-[#0c0c0e]"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-18 px-6 border-b border-white/[0.02]">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="h-9.5 w-9.5 rounded bg-accent/5 border border-accent/15 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-accent" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent border border-[#0c0c0e]" />
              </div>
              <div>
                <h2 className="text-[13.5px] font-normal text-text-primary flex items-center gap-1.5 tracking-tight leading-none">
                  EcoBot Assistant
                  <Zap className="h-3.5 w-3.5 text-accent" />
                </h2>
                <p className="text-[11px] text-text-muted font-light mt-1.5">Sustainability Intelligence Engine</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded flex items-center justify-center hover:bg-white/[0.02] transition-colors text-text-muted hover:text-text-primary"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4.5 no-scrollbar">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded px-4.5 py-3.5 text-[13.5px] leading-relaxed",
                    msg.role === "user"
                      ? "bg-accent/10 border border-accent/15 text-accent/90"
                      : "bg-[#09090b] border border-white/[0.03] text-text-primary font-light"
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-text-muted"
              >
                <div className="flex items-center gap-2 bg-[#09090b] border border-white/[0.03] rounded px-4.5 py-3.5">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                  <span className="text-[12px] font-light text-text-muted">EcoBot is computing</span>
                  <span className="flex gap-1.5 ml-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2.5">
              {QUICK_PROMPTS.slice(0, 3).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isTyping}
                  className="text-[10.5px] font-normal uppercase tracking-wider px-3.5 py-2 bg-[#09090b] border border-white/[0.03] text-text-muted hover:text-accent hover:border-accent/20 rounded transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-5 border-t border-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask EcoBot anything..."
                disabled={isTyping}
                className="flex-1 h-10 rounded bg-[#09090b] border border-white/[0.06] px-4.5 text-[13.5px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/30 transition-colors disabled:opacity-50 font-light"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 rounded gradient-green flex items-center justify-center text-white disabled:opacity-50 hover:opacity-95 transition-opacity"
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
