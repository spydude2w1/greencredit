# Green Credit AI — Tech Stack & Architecture

**Version:** 2.0 — Post-Pivot  
**Team:** Shivam Biswal

---

## Overview

Green Credit AI is built on a modern, fully open-source stack designed for three priorities:

1. **AI-first** — every core feature is powered by an AI model or agent
2. **Edge-capable** — the system runs offline using local models, not just in the cloud
3. **Zero-cost deployable** — the entire prototype was built at ₹700 total

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
│          Next.js · React.js · Tailwind CSS · PWA-ready           │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTPS / REST / WebSocket
┌───────────────────────────────▼──────────────────────────────────┐
│                         API LAYER                                 │
│              FastAPI (Python) · Async · Modular                   │
│         JWT Auth · Role-based access · Rate limiting              │
└──────┬──────────────┬──────────────┬──────────────┬──────────────┘
       │              │              │              │
┌──────▼─────┐ ┌──────▼─────┐ ┌─────▼──────┐ ┌───▼──────────────┐
│  AI/ML     │ │  RAG       │ │  Database  │ │  Edge AI         │
│  Layer     │ │  Layer     │ │  Layer     │ │  Layer           │
│            │ │            │ │            │ │                  │
│ Carbon     │ │ PGVector   │ │ PostgreSQL │ │ LiteRT-LM        │
│ Agent      │ │ Embeddings │ │ Structured │ │ Gemma 4B         │
│ ESG Agent  │ │ Semantic   │ │ Data       │ │ Local RAG        │
│ Greenwash  │ │ Search     │ │ User/Org/  │ │ On-device        │
│ Detection  │ │ Context    │ │ Supplier   │ │ inference        │
│ Compliance │ │ Retrieval  │ │ Records    │ │ Offline-first    │
│ Agent      │ │            │ │            │ │                  │
└────────────┘ └────────────┘ └────────────┘ └──────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────┐
│                      CLOUD INFRASTRUCTURE                         │
│         AWS ECS/Fargate · RDS (PostgreSQL) · S3 · Lambda         │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. Frontend

| Technology | Version / Detail | Purpose |
|---|---|---|
| **Next.js** | 14+ (App Router) | Full-stack React framework, SSR, routing |
| **React.js** | 18+ | Component-based UI |
| **Tailwind CSS** | 3.x | Utility-first responsive styling |
| **TypeScript** | 5.x | Type safety across the frontend |
| **Recharts / D3.js** | Latest | Carbon analytics charts and dashboards |
| **PWA** | Next.js PWA plugin | Installable web app, offline support |

### Key Frontend Modules

| Module | Description |
|---|---|
| Landing Page at / | Product overview, sustainability statistics, demo |
| User Dashboard at /home | Carbon score, eco-challenges, Green Credits, AI recommendations |
| Enterprise Dashboard at /enterprise | ESG analytics, supplier verification, Scope 3 emissions, BRSR reports |
| EcoBot Interface embedded in all pages, offline version only on mobile app | Chat UI, RAG responses, keep offline AI mode on standby for now, we shall work on it later |
| Marketplace at /marketplace| Product browsing, sustainability filters, verified badges |
| Carbon Calculator | Activity input → real-time CO₂ footprint output |
| Challenges | Eco-challenge cards, progress tracking, leaderboard |
| Eco News | Curated sustainability news feed |
| Goal Setting | Environmental goal creation and progress tracking |
| Admin / Seller Portal | Seller onboarding, product verification, sustainability docs upload |

---

## 2. Backend

| Technology | Detail | Purpose |
|---|---|---|
| **FastAPI** | Python 3.11+ | Primary API framework — async, fast, modular |
| **Python** | 3.11+ | Core language for all backend and AI logic |
| **Pydantic v2** | Latest | Data validation and schema enforcement |
| **SQLAlchemy** | 2.x (async) | ORM for database access |
| **Alembic** | Latest | Database migrations |
| **Celery** | Latest | Async task queue (ESG report generation, long AI jobs) |
| **Redis** | Latest | Cache, session management, Celery broker |
| **Uvicorn** | Latest | ASGI server for FastAPI |

### Backend Service Modules

| Service | Responsibility |
|---|---|
| `carbon_service` | Scope 3 calculation, LCA analysis, emission factor lookup |
| `esg_service` | BRSR/GRI/SDG report generation, ESG data collection |
| `greenwash_service` | Supplier claim verification, anomaly detection, trust scoring |
| `rag_service` | RAG pipeline orchestration, context retrieval, LLM calls |
| `marketplace_service` | Product listings, sustainability verification, seller management |
| `challenge_service` | Eco-challenge logic, progress tracking, rewards |
| `credits_service` | Green Credit scoring, leaderboard management |
| `auth_service` | JWT authentication, role-based access, user management |
| `notification_service` | Alerts, challenge reminders, sustainability tips |

---

## 3. Database

| Technology | Purpose |
|---|---|
| **PostgreSQL 16** | Primary relational database — all structured data |
| **PGVector** | Vector storage for embeddings, semantic search, AI context |
| **Redis** | Session cache, real-time leaderboard, Celery task queue |

### Core Database Schema (High-Level)

```
Users              → id, profile, sustainability_score, green_credits, activity_logs
Organisations      → id, org_data, esg_metrics, supplier_records, brsr_reports
Suppliers          → id, sustainability_claims, verification_status, trust_score
Carbon Records     → id, user_id, activity_type, co2_kg, scope, timestamp
ESG Reports        → id, org_id, framework (BRSR/GRI/SDG), data, status, generated_at
Challenges         → id, title, category, duration, reward_credits, participants
UserChallenge      → user_id, challenge_id, progress, completed, credits_earned
Products           → id, name, description, carbon_footprint, sustainability_score, seller_id
Purchases          → id, user_id, product_id, green_credits_earned, timestamp
Achievements       → id, user_id, badge_type, earned_at
EcoActions         → id, user_id, action_type, verified, credits_earned
Goals              → id, user_id, title, category, target_value, unit, target_date
EcoNews            → id, title, summary, source, published_at
Vectors (PGVector) → id, entity_type, entity_id, embedding, metadata
```

---

## 4. AI & Machine Learning

### 4.1 Cloud AI System

| Component | Technology | Purpose |
|---|---|---|
| **LLM** | Gemini API (Google) / GPT-4o | Primary language model for agents |
| **Embeddings** | text-embedding-3-small / Gemini | RAG vector generation |
| **RAG Framework** | LangChain / LlamaIndex | Retrieval-augmented generation pipeline |
| **Carbon Engine** | Custom ML + LCA datasets | Scope 3 emission calculation |
| **Anomaly Detection** | Scikit-learn / custom rules | Greenwashing claim verification |

### 4.2 Edge AI System (Key Innovation)

| Component | Technology | Purpose |
|---|---|---|
| **Runtime** | **LiteRT-LM** (formerly TensorFlow Lite LLM) | On-device LLM inference |
| **Model** | **Gemma 4B** (open weights, Google) | Local language model |
| **RAG (local)** | ChromaDB embedded / FAISS | On-device vector retrieval |
| **Inference** | CPU/GPU-agnostic | Runs on standard laptops, no GPU needed |

**Why this matters:** EcoBot can answer sustainability questions, calculate carbon footprints, and guide users **with zero internet connection.** This is the most technically advanced component of the project and directly comparable to or exceeding what enterprise sustainability tools offer.

### 4.3 AI Agent Architecture

```
User Query / Data Input
         │
         ▼
┌─────────────────────────────────────────────────┐
│              AGENT ORCHESTRATOR                  │
│        (routes to appropriate agent)             │
└──────┬──────┬──────┬──────┬──────────────────────┘
       │      │      │      │
   ┌───▼──┐ ┌─▼───┐ ┌▼────┐ ┌▼────────────────┐
   │Carbon│ │ESG  │ │Green│ │EcoBot Edge      │
   │Agent │ │Agent│ │wash │ │(Offline / Cloud)│
   └──────┘ └─────┘ └─────┘ └─────────────────┘
       │      │      │      │
       └──────┴──────┴──────┘
                  │
          ┌───────▼────────┐
          │ Response Layer  │
          │ Dashboard / API │
          └────────────────┘
```

### 4.4 Carbon Calculation Method

```
Input Data (activity / product / supplier)
    │
    ▼
Emission Factor Lookup (IPCC, GHG Protocol, ecoinvent)
    │
    ▼
LCA Analysis (cradle-to-gate / cradle-to-grave)
    │
    ▼
Scope Classification (1 / 2 / 3)
    │
    ▼
CO₂e Output + Confidence Score + Hotspot Flags
```

### 4.5 ESG Report Generation Pipeline

```
Raw Data Upload (CSV / Invoice / Manual) or Automated Sensor Input Scaffolding
    │
    ▼
AI Data Extraction & Structuring
    │
    ▼
Compliance Agent (BRSR / GRI / SDG check)
    │
    ▼
Report Template Population
    │
    ▼
AI Narrative Generation
    │
    ▼
Final Report (PDF / downloadable)
```

---

## 5. Cloud Infrastructure

| Service | Provider | Purpose |
|---|---|---|
| **Container orchestration** | AWS ECS / Fargate | Run FastAPI backend services |
| **Database** | AWS RDS (PostgreSQL) | Managed relational database |
| **Object storage** | AWS S3 | Reports, marketplace images, ESG documents |
| **Async tasks** | AWS Lambda | On-demand AI report generation |
| **CDN** | AWS CloudFront | Static frontend delivery |
| **DNS** | AWS Route 53 | Domain management |
| **Secrets** | AWS Secrets Manager | API keys, DB credentials |
| **CI/CD** | GitHub Actions / Bitbucket Pipelines | Automated test and deploy |

---

## 6. ESG & Sustainability Frameworks

| Framework | Usage in Platform |
|---|---|
| **BRSR** (Business Responsibility & Sustainability Reporting) | Primary Indian ESG standard — automated report generation |
| **GRI** (Global Reporting Initiative) | International standard — parallel report output |
| **SDG** (UN Sustainable Development Goals) | Goal mapping and progress tracking |
| **CDP** (Carbon Disclosure Project) | Future integration for carbon disclosure |
| **GHG Protocol** | Scope 1/2/3 emission categorisation standard |
| **ISO 14040/14044** | LCA methodology reference |
| **ecoinvent** | Emission factor database for carbon calculations |

---

## 7. Security

| Measure | Implementation |
|---|---|
| Authentication | JWT (JSON Web Tokens) with refresh token rotation |
| Authorisation | Role-based access control (Student / School / Corporate / Admin) |
| Data encryption | AES-256 at rest, TLS 1.3 in transit |
| API security | Rate limiting, input validation via Pydantic, CORS policy |
| Secrets management | AWS Secrets Manager — no hardcoded credentials |
| Edge AI privacy | All on-device inference stays on device — no data sent to cloud |

---

## 8. Performance & Scalability

| Requirement | Approach |
|---|---|
| API response time | Async FastAPI + Redis cache → target < 200ms |
| AI response time (cloud) | Streaming LLM responses via SSE |
| AI response time (edge) | LiteRT-LM local inference → 1–3s on standard hardware |
| Database scaling | PGVector index optimisation, read replicas on RDS |
| Horizontal scaling | ECS Fargate auto-scaling based on load |
| Multi-tenancy | Organisation-level data isolation via row-level security |

---

## 9. Development Tools

| Tool | Purpose |
|---|---|
| **Antigravity** | Primary IDE |
| **Git + GitHub** | Version control |
| **Docker** | Local dev containers |
| **Postman** | API testing |
| **pytest** | Backend unit and integration tests |
| **ESLint + Prettier** | Frontend code quality |
| **Vercel** | Frontend preview deployments |

---

## 10. Data Sources & Integrations

| Source | Type | Usage |
|---|---|---|
| IPCC emission factors | Database | Carbon calculation reference |
| GHG Protocol datasets | Database | Scope 3 emission factors |
| ecoinvent | LCA database | Product lifecycle emissions |
| BRSR framework docs | Standard | ESG report template |
| GRI standards | Standard | International report template |
| Google Gemini API | AI API | Cloud LLM inference |
| Gemma 4B (open weights) | Local model | Edge AI inference |

---

## 11. Edge AI — Technical Detail

This is the platform's most unique technical component.

### What it is
EcoBot Edge is a version of the sustainability AI assistant that runs entirely on the user's device — no internet, no API calls, no cloud dependency.

### How it works

```
User Query (typed / spoken)
    │
    ▼
Local RAG Retrieval (ChromaDB embedded)
    │  (retrieves relevant sustainability knowledge chunks)
    ▼
LiteRT-LM Runtime
    │  (executes Gemma 4B inference on-device)
    ▼
Response Generation
    │  (sustainability guidance, carbon tips, eco recommendations)
    ▼
User Dashboard / Chat Interface
```

### Why it is innovative
- Gemma 4B runs on CPUs — no GPU or specialised hardware required
- LiteRT-LM is Google's production-optimised local inference runtime
- The entire RAG pipeline (retrieval + generation) happens on-device
- First known implementation of this at the student/school level in India
- Directly comparable to enterprise offline AI tools — at zero cost

---

## 12. Cost Summary

| Component | Cost |
|---|---|
| All open-source software (Next.js, FastAPI, PostgreSQL, etc.) | ₹0 |
| Gemma 4B model weights | ₹0 (open weights) |
| LiteRT-LM runtime | ₹0 (open source) |
| AWS Free Tier hosting | ₹0 |
| Gemini API (student quota) | ₹0 |
| Domain (greencredit.live) | ₹200 |
| Miscellaneous | ₹500 |
| **Total prototype cost** | **₹700** |

---

## 13. Future Tech Additions

| Feature | Technology |
|---|---|
| AgriDrone | Computer vision (YOLO) + autonomous navigation + sensor fusion |
| Computer vision verification | YOLO / MobileNet for recycling and eco-action verification |
| Satellite monitoring | Google Earth Engine API + geospatial ML |
| Blockchain audit trails | Ethereum L2 (Polygon) or Hyperledger Fabric — verification only |
| Predictive carbon engine | Time-series ML (Prophet / LSTM) for emission forecasting |
| Regulatory API | SEBI / MCA BRSR portal API integration |

---
