---

## 5. Proposed Framework: ACTRM Sustainability Intelligence Lifecycle

### 5.1 Framework Overview

The ACTRM Framework is proposed as a novel Sustainability Intelligence Lifecycle model comprising five operational stages that transform raw environmental data into verified, actionable, and incentivised sustainability outcomes. Unlike existing frameworks that address individual aspects of sustainability management, ACTRM provides a structured, end-to-end lifecycle that integrates data collection, analysis, monitoring, intervention, and reward within a unified architecture.

The framework is grounded in the research findings documented in Sections 2 -- 4, with each stage directly addressing identified limitations in existing approaches.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    ACTRM Sustainability Intelligence Lifecycle           │
│                                                                          │
│   AGGREGATE ──► CALCULATE ──► TRACK ──► REDUCE ──► MONETIZE            │
│      │              │            │          │           │                │
│   Unified data   AI-powered   Continuous  Actionable  Incentivised     │
│   ingestion      emissions    monitoring  reduction   sustainable      │
│   from value     analysis     dashboards  pathways    behaviour        │
│   chain          with LCA     and alerts  and AI      through          │
│   sources        methodology              guidance    rewards          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Stage 1: Aggregate

**Research justification:** Carbon Direct (2024) and MIT Sloan (2024) document that data fragmentation across disparate supplier systems, invoice formats, and reporting standards is the primary obstacle to reliable Scope 3 accounting. Organisations cannot act on what they cannot see  --  and current tools do not provide a unified aggregation mechanism for heterogeneous sustainability data sources.

**Function:** The Aggregate stage addresses this gap by providing unified data ingestion from multiple source types  --  supplier invoices, ESG documents, transport logs, procurement records, utility bills, and sustainability certifications. The stage normalises heterogeneous data formats into a standardised schema suitable for AI-driven analysis.

**Design rationale:** By establishing aggregation as the first stage of the lifecycle, the framework ensures that all subsequent analysis, tracking, and recommendation operates on a comprehensive, normalised dataset rather than fragmented, source-specific information.

### 5.3 Stage 2: Calculate

**Research justification:** The literature identifies two critical limitations in existing carbon calculation approaches: (a) reliance on generic industry-average emission factors rather than activity-based data (Accenture, 2024), and (b) the absence of actionable intelligence beyond raw emissions numbers (Council Fire, 2024; IJTSRD, 2024).

**Function:** The Calculate stage employs AI-powered emissions analysis using Life Cycle Assessment (LCA) methodology, referencing established emission factor databases (IPCC, GHG Protocol, ecoinvent). The stage produces not merely aggregate emissions figures but scope-classified breakdowns (Scope 1, 2, 3), confidence scores reflecting data quality, and hotspot identification highlighting the highest-impact emissions sources.

**Design rationale:** Calculation is positioned as an analytical function rather than a mere arithmetic one. By combining emission factor lookup with AI-driven hotspot identification, the Calculate stage generates the actionable intelligence that existing carbon calculators lack.

### 5.4 Stage 3: Track

**Research justification:** Primus Partners (2025) and Mordor Intelligence (2025) document that manual, periodic sustainability reporting provides only static snapshots, limiting organisations' ability to use environmental data for real-time decision-making. The shift from retrospective reporting to continuous monitoring is identified as a prerequisite for effective sustainability management.

**Function:** The Track stage provides continuous monitoring through real-time dashboards displaying ESG compliance scores, emissions trend analytics, supplier verification status, and value chain impact distribution. The stage supports temporal analysis, enabling organisations to observe the impact of operational changes over time.

**Design rationale:** Continuous tracking transforms sustainability data from a periodic compliance exercise into an operational management tool. By maintaining persistent visibility over environmental metrics, organisations can identify emerging risks and validate the effectiveness of reduction interventions.

### 5.5 Stage 4: Reduce

**Research justification:** The literature consistently identifies a critical gap between sustainability measurement and actionable reduction strategy. Carbon calculators produce numbers; existing platforms produce reports. Neither provides personalised, AI-driven reduction recommendations that translate analytical findings into operational changes (SAP, 2024; Council Fire, 2024).

**Function:** The Reduce stage generates AI-powered reduction recommendations based on the emissions analysis and tracking data produced by preceding stages. Recommendations include emission source substitution (lower-carbon suppliers or materials), operational efficiency improvements, value chain optimisation, and personalised behaviour change guidance for individual users.

**Design rationale:** The Reduce stage represents the framework's transition from analytical intelligence to decision support. By positioning reduction as a dedicated lifecycle stage  --  rather than an optional add-on to reporting  --  the framework ensures that every measurement leads to a structured intervention pathway.

### 5.6 Stage 5: Monetize

**Research justification:** Behavioural sustainability research documents that awareness and measurement alone are insufficient to sustain environmental engagement. Incentive mechanisms  --  whether financial, social, or gamified  --  are necessary to bridge the value-action gap and maintain long-term participation (Busara, 2024; Frontiers in Behavioural Science, 2024).

**Function:** The Monetize stage incentivises sustainable behaviour through the Green Credit scoring system, sustainability trust badges for verified suppliers, and community recognition through leaderboards and achievement systems. The stage also encompasses potential revenue pathways through marketplace commission, ESG reporting services, and carbon credit facilitation.

**Design rationale:** By establishing incentivisation as the final lifecycle stage, the framework creates a positive feedback loop: sustainable actions generate credits that motivate further engagement, which produces additional environmental data for the Aggregate stage, completing the lifecycle cycle.

### 5.7 Framework Contribution

The ACTRM Framework contributes to sustainability literature by proposing a structured lifecycle model that explicitly addresses the fragmentation, measurement-only orientation, and incentive deficit documented in existing approaches. Each stage is justified through research evidence and designed to produce outputs that feed subsequent stages, creating an integrated sustainability intelligence pipeline rather than a collection of independent tools.

---

## 6. System Architecture and Design

### 6.1 Dual-Layer Architecture

The platform is designed as a dual-layer system reflecting the research finding that effective sustainability management requires both institutional intelligence and individual engagement (Section 2.5):

**Intelligence Layer (B2B/Enterprise):** Serves organisations, schools, and suppliers with carbon analysis, ESG report automation, greenwashing detection, supplier verification, and compliance management. This layer addresses the technical and business problems documented in Section 3.1 and 3.2.

**Engagement Layer (B2C/Community):** Serves individuals, students, and community members with personal carbon tracking, AI-guided sustainability missions (Pathfinder), decision-support analysis (Sustainability Copilot), community challenges, leaderboards, and greenwashing awareness tools. This layer addresses the social and behavioural problems documented in Section 3.4.

```
┌────────────────────────────────────────────────────────────────────┐
│                  GREEN CREDIT AI PLATFORM ARCHITECTURE             │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            CORE INTELLIGENCE LAYER (Enterprise)              │  │
│  │  AI Carbon Engine  and  ESG AI Agent  and  Scope 3 Vendor Layer      │  │
│  │  Greenwashing Detection  and  Knowledge Base                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │          ENGAGEMENT & ECOSYSTEM LAYER (Community)            │  │
│  │  Green Credit Pathfinder  and  Sustainability Copilot            │  │
│  │  Carbon Calculator  and  Eco Challenges  and  Community Leaderboard  │  │
│  │  EcoBot AI  and  Greenwash Scanner                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              INFRASTRUCTURE LAYER                             │  │
│  │  Next.js Frontend  and  FastAPI Backend  and  PostgreSQL + PGVector  │  │
│  │  AI/ML Engine (Gemini/GPT)  and  Edge AI (LiteRT-LM + Gemma 4B) │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### 6.2 AI Agent System

The platform's intelligence capabilities are distributed across five specialised AI agents, each designed to address a specific research-identified problem:

| Agent | Research Problem Addressed | Function | ACTRM Stage |
|---|---|---|---|
| **Carbon Agent** | Scope 3 invisibility (Section 3.3) | Calculates emissions using LCA and supplier data across the full value chain | Calculate |
| **Compliance Agent** | Multi-framework reporting complexity (Section 3.2) | Validates data against BRSR, GRI, SDG standards and generates formatted reports | Track |
| **Verification Agent** | Greenwashing proliferation (Section 3.3) | Detects anomalies and suspicious sustainability claims through NLP analysis | Reduce |
| **Recommendation Agent** | Measurement without intelligence (Section 3.3) | Suggests greener alternatives, supplier switches, and reduction strategies | Reduce |
| **EcoBot Edge Agent** | Connectivity-dependent AI exclusion (Section 3.4) | Provides local, offline AI sustainability guidance via on-device inference | All stages |

### 6.3 Technology Stack

The technology stack was selected to achieve three research-driven priorities: AI-first architecture, edge-capability, and zero-cost deployability.

**Frontend:** Next.js 14+ (App Router) with React.js and TypeScript, providing server-side rendering, component-based architecture, and progressive web application capability. Recharts and D3.js provide data visualisation for sustainability analytics dashboards.

**Backend:** FastAPI (Python 3.11+) with asynchronous request handling, Pydantic v2 for data validation, SQLAlchemy 2.x for database access, and Celery for asynchronous task processing of long-running AI operations such as ESG report generation.

**Database:** PostgreSQL 16 for structured relational data (users, organisations, suppliers, carbon records, ESG reports), with PGVector for vector storage enabling semantic search and AI context retrieval through the RAG pipeline.

**AI/ML:** Cloud inference via Gemini API and GPT-4o for primary language model operations; text-embedding-3-small for vector generation; LangChain/LlamaIndex for RAG pipeline orchestration; Scikit-learn for anomaly detection in greenwashing verification.

**Edge AI:** LiteRT-LM runtime with Gemma 4B model weights for on-device inference; ChromaDB/FAISS for local vector retrieval. This architecture enables the full RAG pipeline (retrieval + generation) to execute on-device without internet connectivity.

### 6.4 Evidence-Based Design Decisions

Each major architectural decision is traced to a research finding:

| Design Decision | Research Justification | Limitation Addressed |
|---|---|---|
| Dual-layer architecture (Enterprise + Community) | Enterprise-only platforms exclude individuals and schools (Section 4.3) | Accessibility gap in sustainability intelligence |
| Multi-agent AI system | Single-model approaches cannot handle diverse sustainability tasks with consistent quality | Complexity of simultaneous carbon, compliance, and verification workflows |
| Edge AI capability | Cloud dependency excludes low-connectivity environments (Section 4.7) | Digital divide in sustainability access |
| ACTRM lifecycle integration | Fragmented tools address individual stages in isolation (Section 4.6) | Absence of unified sustainability lifecycle framework |
| Open-source technology stack | Enterprise ESG platforms are prohibitively expensive for schools (Section 3.2) | Cost barrier to sustainability intelligence adoption |
| Total prototype cost: Rs. 700 | Demonstrates that world-class sustainability intelligence can be built at near-zero cost | Economic exclusion from sustainability tools |

---

## 7. Methodology

### 7.1 Research Design

This study employs a mixed-methods research design combining:

1. **Systematic Literature Review:** Analysis of academic publications, industry reports, and regulatory documents across five domains (Scope 3 emissions, ESG reporting, greenwashing, AI sustainability, behavioural sustainability) to establish the theoretical foundation and identify research gaps.

2. **Problem Analysis:** Structured identification and categorisation of sustainability decision-making challenges across technical, business, environmental, and social dimensions, supported by evidence from the literature review.

3. **Framework Development:** Proposal of the ACTRM Sustainability Intelligence Lifecycle as a structured response to identified gaps, with each framework stage justified through specific research findings.

4. **Prototype Development:** Implementation of a functional proof-of-concept platform demonstrating the proposed framework's feasibility, built using the technology stack documented in Section 6.3.

5. **Survey Validation:** Analysis of primary survey data (n=507 respondents) to validate problem relevance and user demand.

### 7.2 Literature Review Methodology

The literature review followed a structured search protocol across multiple databases and sources:

**Search domains:** Academic databases (Google Scholar, IEEE Xplore, MDPI, Frontiers, ResearchGate), industry reports (Accenture, PwC, McKinsey, Mordor Intelligence, Grand View Research), regulatory documents (SEBI, European Commission, GHG Protocol), and technology documentation.

**Search terms included:** "Scope 3 emissions challenges," "ESG reporting automation," "BRSR compliance India," "greenwashing detection AI," "sustainability decision intelligence," "carbon calculator limitations," "behavioural sustainability gamification," "edge AI on-device inference," "rural education AI accessibility."

**Timeframe:** Primary focus on publications from 2023 -- 2026, with foundational framework references (GHG Protocol, ISO 14040, GRI Standards) from earlier periods.

**Inclusion criteria:** Peer-reviewed publications, reports from recognised industry analysts, official regulatory documents, and documentation from established sustainability frameworks.

### 7.3 Survey Methodology

A primary survey was conducted with 507 respondents to validate the relevance of identified sustainability problems and assess demand for the proposed solution.

**Sample composition:** 56.8% students, 26.4% working professionals, 11.6% educators and other demographics.

**Key findings:**

| Survey Question | Response | Sample |
|---|---|---|
| Awareness of carbon emission problem | 96.3% aware | n=507 |
| Currently using green products | 77.5% yes | n=507 |
| Want product carbon footprint information | 80.5% yes | n=507 |
| Willing to pay more for verified green products | 81.7% yes | n=507 |

**Interpretation:** The survey reveals a critical market insight: high environmental awareness (96.3%) coupled with high demand for carbon transparency (80.5%) and willingness to pay for verification (81.7%), but no trusted platform exists to serve this demand. This validates the research gap documented in Section 4  --  the absence of accessible, AI-driven sustainability intelligence that bridges awareness and action.

### 7.4 Prototype Development Methodology

The prototype was developed iteratively over the 2025 -- 2026 academic year, following a feature-priority sequence aligned with the ACTRM framework:

1. **Phase 1:** Core platform architecture  --  landing page, authentication, dual-dashboard framework
2. **Phase 2:** Enterprise Intelligence  --  carbon analysis interfaces, ESG report generation workflows, supplier verification panels
3. **Phase 3:** Community Engagement  --  Green Credit Pathfinder, Sustainability Copilot, greenwash scanner, community challenges and leaderboards
4. **Phase 4:** AI Integration  --  EcoBot conversational interface, AI agent orchestration, edge AI prototype
5. **Phase 5:** Public tools  --  standalone carbon calculator and greenwash detector accessible without authentication

**Development constraints:** The prototype was developed by a team of three students as a school-level project, using exclusively open-source technologies, with a total development cost of Rs. 700 (approximately USD 8.40).

---

## 8. Prototype Validation

### 8.1 Validation Framework

The prototype serves as a proof-of-concept to demonstrate the feasibility of the ACTRM framework. Validation is structured around the mapping of research findings to prototype features and expected benefits.

### 8.2 Feature-to-Research Mapping

| Research Finding | Prototype Feature | ACTRM Stage | Expected Benefit | Validation Status |
|---|---|---|---|---|
| Scope 3 emissions constitute 70 -- 90% of organisational carbon but remain unmeasured | Enterprise Carbon Analysis dashboard with scope-classified emissions, value chain breakdown, and hotspot identification | Calculate | Organisations can identify their highest-impact emission sources for targeted reduction | Prototype implemented  --  demonstrates scope classification, value chain visualisation, and emissions trend analytics |
| Manual ESG reporting costs are prohibitive for schools and SMEs | ESG Report Agent generating BRSR/GRI formatted reports from uploaded data | Calculate → Track | Reduces reporting time and cost; enables school-level ESG compliance | Prototype implemented  --  demonstrates report generation workflow with framework selection and status tracking |
| Greenwashing erodes trust in sustainability claims | Greenwashing Detection module with NLP-based claim analysis and trust scoring | Reduce | Enables informed procurement decisions; reduces exposure to misleading claims | Prototype implemented  --  demonstrates claim input, analysis simulation, and confidence scoring |
| Carbon calculators measure but do not recommend | AI-powered reduction recommendations integrated with carbon analysis | Reduce | Users receive actionable strategies, not just numbers | Prototype implemented  --  demonstrates AI insight generation with impact categorisation |
| Environmental awareness does not translate to sustained action | Green Credit Pathfinder with AI-generated personalised sustainability missions | Reduce → Monetize | Structured, gamified journeys with progress tracking sustain engagement | Prototype implemented  --  demonstrates mission generation, difficulty scaling, impact estimation, and credit rewards |
| No personalised AI guidance for individual sustainability decisions | Sustainability Copilot providing real-time analysis of purchase, travel, and household decisions | Reduce | Users receive context-specific sustainability guidance at point of decision | Prototype implemented  --  demonstrates scenario-based analysis with impact scoring and recommendations |
| Cloud-dependent AI excludes low-connectivity environments | EcoBot Edge AI using LiteRT-LM + Gemma 4B for on-device inference | All stages | Sustainability intelligence accessible without internet; data remains on-device | Architecture designed  --  demonstrates cloud-mode conversational interface; edge deployment as future objective |
| Fragmented tools address individual stages in isolation | ACTRM Framework integrating all stages within unified platform architecture | All stages | Single platform replaces multiple disconnected tools | Prototype implemented  --  demonstrates unified dual-dashboard with enterprise and community modules |
| Community engagement models outperform individual competition for sustained behaviour change | Community leaderboard, eco-challenges, and school-level participation | Monetize | Social comparison and collective goals sustain participation beyond initial engagement | Prototype implemented  --  demonstrates leaderboard with school identification, ranking, and credit tracking |

### 8.3 Prototype Scope and Limitations

It is important to distinguish between implemented functionality and designed future capabilities:

**Implemented in prototype:**
- Complete frontend interface for both Enterprise and Community platforms
- Interactive dashboards with real-time data visualisation (emissions by scope, supplier verification, value chain analysis, ESG scores)
- AI-simulated workflows for carbon analysis, ESG reporting, greenwashing detection, and sustainability recommendations
- Green Credit Pathfinder with mission generation, progress tracking, and credit system
- Sustainability Copilot with scenario-based decision analysis
- Community features including leaderboard, challenges, recent activity tracking
- Public tools (Carbon Calculator, Greenwash Detector) accessible without authentication
- ACTRM Framework visualisation on landing page
- EcoBot conversational interface (cloud mode)

**Designed but not fully deployed in prototype:**
- Fully autonomous AI agent operation (currently simulated with realistic data flows)
- Live API integration with external emission factor databases
- EcoBot Edge AI on-device inference (architecture designed; deployment requires device-specific optimisation)
- Production database with real organisational data (prototype uses representative demonstration data)
- Blockchain-backed verification trails (designed for future implementation)

This distinction is academically important: the prototype demonstrates *feasibility* of the ACTRM framework's design principles, while production-grade autonomy remains a future development objective.

---

## 9. Comparative Analysis

### 9.1 Comparison Methodology

The following comparison evaluates Green Credit AI against four categories of existing sustainability tools, assessing coverage across ten capabilities identified as critical in the literature review.

### 9.2 Comparative Matrix

| Capability | Traditional Carbon Calculators | Enterprise ESG Platforms | Sustainability Reporting Tools | Environmental Awareness Apps | **Green Credit AI** |
|---|---|---|---|---|---|
| **Scope 3 Lifecycle Analysis** | Partial  --  activity-level only | Yes  --  enterprise data | Partial  --  report-focused | No | **Yes  --  value chain, cradle-to-grave** |
| **ESG Report Automation** | No | Yes  --  enterprise-priced | Yes  --  manual workflow | No | **Yes  --  AI-automated, multi-framework** |
| **AI Decision Support** | No | Limited  --  dashboard analytics | No | No | **Yes  --  Carbon Agent, Copilot, Pathfinder** |
| **Greenwashing Detection** | No | Rare  --  limited to supplier screening | No | No | **Yes  --  NLP analysis, trust scoring** |
| **Community Engagement** | No | No | No | Yes  --  gamification focus | **Yes  --  challenges, leaderboard, Pathfinder** |
| **Workflow Automation** | No | Yes  --  enterprise workflows | Partial | No | **Yes  --  ACTRM lifecycle pipeline** |
| **Agentic AI Intelligence** | No | Emerging  --  single-agent | No | No | **Yes  --  multi-agent orchestration** |
| **Value Chain Mapping** | No | Yes  --  Tier 1 suppliers | Partial | No | **Yes  --  multi-tier visualisation** |
| **Personalised Sustainability Guidance** | No | No | No | Limited  --  generic tips | **Yes  --  AI Copilot, Pathfinder missions** |
| **Offline AI Capability** | No | No | No | No | **Yes  --  LiteRT-LM + Gemma 4B Edge AI** |
| **School/SME Accessibility** | Yes (free) | No (enterprise-priced) | Partial (expensive) | Yes (free) | **Yes  --  Rs. 700 total prototype cost** |

### 9.3 Comparative Findings

The comparison reveals three distinctive characteristics of the Green Credit AI approach:

**1. Lifecycle Integration:** While existing tools address individual capabilities, Green Credit AI is the only platform that integrates all ten assessed capabilities within a unified lifecycle framework (ACTRM). This eliminates the need for users to navigate multiple disconnected tools.

**2. Dual-Layer Architecture:** No assessed competitor combines enterprise-grade sustainability intelligence (Scope 3 analysis, ESG automation, supplier verification) with community-level engagement (personal tracking, gamified challenges, AI-guided missions) within a single platform.

**3. Accessibility:** Green Credit AI is uniquely positioned at the intersection of enterprise capability and school-level accessibility. Enterprise ESG platforms offer comparable intelligence but at prohibitive cost; environmental awareness apps offer comparable accessibility but without analytical depth.
