# Green Credit AI — Product Requirements Document (PRD)

**Version:** 2.0 — Post-Pivot  
**Student Name:** Shivam Biswal
**Competition:** CBSE Skill Expo 2026-27 (National Level)  


---

## 1. Product Overview

Green Credit AI is an AI-powered sustainability intelligence operating system built by students, for schools, institutions, businesses, and individuals. The platform enables users to measure Scope 3 carbon emissions, verify sustainability claims, automate ESG/BRSR reporting, and access AI-driven environmental guidance — including fully offline, without internet connectivity.

The platform is structured as a dual-layer ecosystem:

- **Intelligence Layer (B2B/Institutional):** Carbon analysis, ESG automation, greenwashing detection, supplier verification, Scope 3 reporting
- **Engagement Layer (B2C/Community):** Carbon calculator, eco-challenges, leaderboards, EcoBot assistant, green marketplace, Green Credit Score

### Strategic Positioning

> *"A student-built AI that tells any school exactly how much carbon it produces — and works without internet, using a locally running AI model."*

Green Credit AI is positioned not as a marketplace or generic sustainability app, but as an **AI-native sustainability intelligence infrastructure** — the first of its kind built at the school level in India, with a working live prototype, offline AI capability, and real ESG automation.

---

## 2. Vision Statement

To build an AI-powered sustainability operating system that autonomously measures environmental impact, verifies sustainability claims, automates ESG workflows, and helps schools, organisations, and individuals make data-driven low-emission decisions across the entire value chain — from cradle to grave.

---

## 3. Problem Statement

India contributes approximately **2.79 billion metric tonnes of CO₂ annually.** A significant share of this comes from supply chains, product manufacturing, and everyday consumption — categorised as **Scope 3 emissions.** These are rarely measured, even by large organisations.

| Problem | Impact |
|---|---|
| 70–90% of emissions are Scope 3 — invisible and unmeasured | Companies and schools cannot act on what they cannot see |
| Greenwashing is widespread and unverifiable | Institutions make uninformed procurement decisions |
| Sustainability reports are written manually | Time-consuming, expensive, error-prone |
| No unified tool for schools and communities | Students have no practical way to participate meaningfully |
| Cloud-only AI tools are inaccessible in low-connectivity areas | Rural schools are excluded from sustainability intelligence |
| Fragmented ecosystem — no single platform covers all needs | High cost and complexity for adoption |

---

## 4. Product Goals

### Primary Goals
1. Automate sustainability intelligence workflows using AI agents
2. Provide accurate Scope 3 carbon footprint analysis (cradle to grave)
3. Generate ESG/BRSR/GRI/SDG reports automatically
4. Detect greenwashing and verify supplier sustainability claims
5. Enable sustainability participation through community engagement
6. Support offline AI sustainability assistance using edge inference

### Secondary Goals
1. Create a scalable, open-source-compatible sustainability ecosystem
2. Encourage sustainability awareness among students and communities
3. Build future-ready environmental decision systems
4. Position India's students as contributors to national SDG goals

---

## 5. Core Product Identity

The platform has pivoted from a **marketplace-first sustainability app** to an **AI-native sustainability intelligence infrastructure.** The marketplace, gamification, rewards, and community engagement now act as supporting layers around the intelligence engine.

### ACTRM Operating Framework

| Stage | Description |
|---|---|
| **A — Aggregate** | Bring all suppliers, products, activities, and sustainability data under one unified platform |
| **C — Calculate** | Use AI to compute real carbon, water, and waste footprint of every product and action |
| **T — Track** | Continuously track changes across the value chain with reliable dashboards |
| **R — Reduce** | Identify emission hotspots and provide personalised reduction recommendations |
| **M — Monetize** | Reward sustainable actions through Green Credits; generate revenue via multiple streams |

---

## 6. Platform Architecture

### Two-Layer System

```
┌─────────────────────────────────────────────────────────┐
│              CORE INTELLIGENCE LAYER                     │
│  AI Carbon Engine · ESG AI Agent · Scope 3 Vendor Layer │
│  Greenwashing Detection · Knowledge Graph               │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│           ENGAGEMENT & ECOSYSTEM LAYER                   │
│  Green Marketplace · Green Credit Score · Eco Challenges │
│  Community Leaderboard · EcoBot · Eco News              │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Core Features

### 7.1 AI Carbon Footprint Engine

AI-powered system that calculates Scope 3 emissions and environmental impact across products, suppliers, activities, and value chains.

**Inputs:**
- Procurement data, supplier information, product lifecycle data
- User activity data (transport, energy, food)
- Invoice and document uploads

**Outputs:**
- Carbon footprint estimates (kg CO₂e)
- Emission hotspot identification
- Value chain analysis (cradle to grave)
- Personalised reduction recommendations

**Method:** LCA (Life Cycle Assessment) datasets + emission factor libraries + AI inference

---

### 7.2 ESG / BRSR / GRI Automation Agent

AI agent that automates the full sustainability reporting workflow — from raw data to formatted, submission-ready reports.

**Pipeline:**
```
Data Collection → AI Analysis → Claim Verification → Report Generation → Publishing
```

**Standards Supported:** BRSR (India), GRI (Global), SDG (UN), CDP

**Key benefit:** Eliminates hours of manual ESG documentation for schools and companies

---

### 7.3 Greenwashing Detection System

AI-powered verification layer that analyses supplier and product sustainability claims, compares them against known standards, and assigns confidence and trust scores.

**Capabilities:**
- Supplier sustainability claim analysis
- Anomaly detection via AI
- Trust score assignment (0–100)
- Misleading claim flagging
- Environmental risk scoring

**Why it matters:** Allows institutions to make genuinely informed procurement decisions

---

### 7.4 EcoBot — AI Sustainability Agent (Edge + Cloud)

AI-powered RAG sustainability assistant that provides environmental guidance, carbon reduction recommendations, and eco-friendly insights.

**Cloud mode:** LLM + RAG pipeline via API  
**Edge mode (key innovation):** Runs locally using **LiteRT-LM + Gemma 4B** — no internet required

**Edge AI capabilities:**
- Full offline AI sustainability assistance
- On-device RAG pipeline
- Zero cloud dependency for basic queries
- Deployable in schools with no connectivity
- Strong data privacy (no data leaves the device)

> This transforms EcoBot from a chatbot into a deployable sustainability intelligence assistant — the first of its kind at the student project level.

---

### 7.5 Scope 3 Vendor Intelligence Layer

Supplier onboarding and verification system that assigns LCA-based sustainability impact scores.

**Functions:**
- Supplier sustainability data collection
- Verified impact badge assignment
- Corporate procurement access gateway
- Scope 3 supplier ranking

---

### 7.6 Green Credit Score

A sustainability scoring system — like a financial credit score, but for environmental impact.

**Points earned for:**
- Buying verified green products
- Participating in eco-challenges
- Logging carbon-reducing activities
- Completing sustainability goals

**Leaderboards:** Individual, school, corporate

---

### 7.7 Verified Green Marketplace

B2B and B2C marketplace featuring only verified eco-friendly products with full carbon transparency.

**Features:**
- Sustainability scores on every product
- Carbon footprint, water usage, environmental impact data
- Filters: plastic-free, carbon-neutral, biodegradable
- B2B bulk procurement for schools and offices
- B2C access for eco-conscious consumers

---

### 7.8 Sustainability Challenges & Community Engagement

Gamified eco-challenge system encouraging sustainable behaviour change.

**Examples:**
- 30-Day Carbon Diet (target: 20% reduction)
- Zero Plastic Week
- Green Commute Challenge
- Community Earth Action

**Rewards:** Green Credit points, leaderboard ranking, achievement badges

---

### 7.9 AI-Based Sustainability Scoring

AI-generated sustainability scores based on activity logs, carbon impact, and verified eco-actions.

**Score types:** Individual · Supplier · Organisation · Environmental impact

---

### 7.10 Blockchain-Backed Verification (Future)

Tamper-resistant verification layer for sustainability actions and environmental records.

> Note: Designed for verification and transparency only — not cryptocurrency.

**Functions:** Store verified actions · Maintain audit trails · Track community contributions

---

### 7.11 Value Chain & Lifecycle Analysis

Tracks environmental impact from raw materials to disposal.

**Lifecycle stages covered:**
Raw Materials → Manufacturing → Packaging → Transport → Retail → Consumer Use → Waste Management

---

## 8. AI Agent System

The platform operates through five specialised AI agents running in parallel:

| Agent | Function |
|---|---|
| **Carbon Agent** | Calculates Scope 3 emissions using LCA and supplier data |
| **Compliance Agent** | Validates data against BRSR, GRI, SDG standards |
| **Verification Agent** | Detects anomalies and suspicious sustainability claims |
| **Recommendation Agent** | Suggests greener alternatives and reduction strategies |
| **EcoBot Edge Agent** | Provides local, offline AI sustainability guidance |

---

## 9. User Segments

| Segment | Use Case |
|---|---|
| **Schools & Colleges** | Campus carbon footprint, eco-challenges, SDG reporting |
| **Corporates & SMEs** | Scope 3 measurement, supply chain ESG, BRSR compliance |
| **Individual Students** | Personal carbon tracking, green marketplace, challenges |
| **Suppliers & Vendors** | Verified sustainability credentials, procurement access |
| **Government / NGOs** | Policy research, national sustainability monitoring |
| **Low-connectivity areas** | Offline AI assistant (EcoBot Edge) — no internet needed |

---

## 10. Implementation Roadmap

### Year 1 — Foundation
- Pilot in 5 schools with marketplace and eco-challenges
- Launch AI carbon calculator and EcoBot (cloud)
- Onboard 20 verified sellers
- EcoBot Edge AI (offline) prototype

### Year 2 — Scale
- Full e-commerce launch with subscription eco-boxes
- Recycling hubs at schools
- Expand to 50 schools and first corporate partners
- ESG Agent production-ready for BRSR filing

### Year 3 — Global
- International seller onboarding
- Advanced AI carbon tracking
- Scale to 500+ institutions across multiple countries
- AgriDrone integration

---

## 11. Revenue Streams

| Stream | Description |
|---|---|
| Marketplace commission | % on every verified green product sold |
| SaaS subscriptions | Schools and companies pay for ESG dashboard access |
| ESG reporting services | AI-generated BRSR/GRI reports for compliance |
| Carbon credit commission | % on offset purchases |
| Premium plans | Advanced analytics, custom branding, enterprise tier |
| Eco-boxes | Monthly curated sustainable product kits |
| AI Plugin licensing | Green shopping intelligence for third-party platforms |
| Sustain Gun / events | Gamified product sales and school events |

---

## 12. Competitive Advantage

| Differentiator | Green Credit AI | Competitors (e.g. Nivora AI, Watershed) |
|---|---|---|
| Edge AI (offline) | ✅ LiteRT-LM + Gemma 4B | ❌ Cloud-only |
| Live working prototype | ✅ greencredit.life | Varies |
| Student + enterprise dual layer | ✅ | ❌ Usually one or the other |
| Greenwashing detection | ✅ AI anomaly detection | ❌ Rarely included |
| Gamified engagement | ✅ Challenges, leaderboards | ❌ |
| Cost | ✅ ₹0 open-source stack | Typically paid/SaaS |
| School-first positioning | ✅ | ❌ Enterprise-first |

---

## 13. Market Context

| Metric | Value |
|---|---|
| Sustainability platforms market (2024) | $1.3B |
| Projected market size (2029) | $3.7B |
| CAGR | 23% |
| Indian ESG annual spend | ₹25,000+ crore |
| Scope 3 mandatory reporting (EU CSRD) | 2030 |
| Survey: willing to pay more for green | 81.7% of 507 respondents |
| Survey: want product carbon footprint data | 80.5% |

---

## 14. Survey Validation

**Sample size:** 507 respondents  
**Demographics:** 56.8% students, 26.4% professionals, 11.6% others

| Insight | Result |
|---|---|
| Aware of carbon emission problem | 96.3% |
| Currently use green products | 77.5% |
| Want product carbon footprint info | 80.5% |
| Willing to pay more for verified green | 81.7% |

**Conclusion:** High awareness + high intent + no trusted platform = the exact gap Green Credit AI fills.

---

## 15. Future Advancements

| Feature | Description |
|---|---|
| AgriDrone Integration | AI farming drone for seed planting, crop health, and farm emission tracking |
| Voice + Multilingual EcoBot | Expand edge AI to regional languages and voice input |
| Computer Vision Verification | Image recognition to verify recycling, tree planting, eco-actions |
| Autonomous Sustainability Engine | Predictive AI to simulate and optimise emission reduction across value chains |
| Satellite & Geospatial Monitoring | Environmental datasets and geospatial intelligence for macro-level tracking |
| Carbon Credit Marketplace | Verified carbon offset earning and trading for institutions |
| Regulatory API Integration | Direct BRSR submission to government portals |
| National Sustainability Network | Cross-school, cross-region sustainability intelligence grid |

---

## 16. Cost Structure

### Prototype Cost (Current)

| Item | Cost |
|---|---|
| Frontend (Next.js, Tailwind) | ₹0 |
| Backend (FastAPI, Python) | ₹0 |
| Database (PostgreSQL, PGVector) | ₹0 |
| Edge AI (Gemma 4B, LiteRT-LM) | ₹0 |
| Cloud (AWS Free Tier) | ₹0 |
| Domain (greencredit.live) | ₹200 |
| Miscellaneous | ₹500 |
| **Total** | **₹700** |

### Production Cost Structure

**Fixed:** Platform development · Sustainability experts · ESG compliance  
**Variable:** Logistics · Marketing · School workshops and events

---

## 17. Team

| Member | Role |
|---|---|
| Yuvaan | Product strategy, marketing, commerce, analytical thinking |
| Hamza | Research, problem analysis, unconventional ideation |
| Shivam | Development, AI integration, design, system architecture |

**School:** AECS MMPS, Bengaluru  
**Mentor:** Eswari Kumaravel

---

## 18. Conclusion

Green Credit AI is not a concept — it is a live, working platform built from scratch by Shivam Biswal at near-zero cost, using state-of-the-art AI tools. It solves a real and growing problem: the invisibility of environmental impact at the school, supplier, and individual level.

By combining AI agents, edge AI inference, ESG automation, and greenwashing detection into one system — and making it work even without internet — the platform demonstrates that world-class sustainability intelligence can be built by students, for students, at scale.

The project is technically advanced, socially impactful, practically implemented, and nationally relevant.