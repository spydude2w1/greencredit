<style>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
  body { font-family: 'Libre Baskerville', 'Bookman Old Style', Georgia, serif; font-size: 12pt; line-height: 1.5; text-align: justify; color: #1a1a1a; max-width: 850px; margin: 0 auto; padding: 40px; }
  h1 { font-size: 20pt; font-weight: bold; text-align: center; margin-top: 60px; }
  h2 { font-size: 16pt; font-weight: bold; margin-top: 36px; border-bottom: 1px solid #ccc; padding-bottom: 6px; }
  h3 { font-size: 14pt; font-weight: bold; margin-top: 24px; }
  h4 { font-size: 12pt; font-weight: bold; margin-top: 18px; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 11pt; }
  th, td { border: 1px solid #999; padding: 8px 10px; text-align: left; }
  th { background: #f0f0f0; font-weight: bold; }
  .title-page { text-align: center; page-break-after: always; padding-top: 120px; }
  .title-page h1 { font-size: 24pt; border: none; }
  .abstract { font-style: italic; margin: 20px 40px; }
  blockquote { border-left: 3px solid #2d7a3a; padding-left: 16px; margin: 16px 0; color: #333; }
  .figure-caption { text-align: center; font-size: 10pt; color: #555; margin-top: 6px; }
</style>

<div class="title-page">

# Green Credit AI: An AI-Powered Sustainability Operating System Implementing the ACTRM Framework for Automated Environmental Intelligence Across Enterprise and Community Ecosystems

&nbsp;



&nbsp;

**Authors:**
Shivam Biswal  and  Srishti Vikram Athreya

**Institution:**
AECS Magnolia Maaruti Public School, Bengaluru

**Mentor:**
Eswari Kumaravel

**Date:** 21st June 2026

</div>

---

## Abstract

Sustainability decision-making across organisations and communities remains fundamentally constrained by fragmented carbon data, unmanaged Scope 3 emissions, costly manual ESG reporting, and the proliferation of unverifiable environmental claims. This research investigates these interconnected challenges through a systematic literature review spanning carbon accounting, ESG compliance frameworks, greenwashing detection, AI-driven sustainability intelligence, and behavioural environmental engagement. The study identifies critical gaps in existing sustainability tools  --  specifically, their siloed architectures, measurement-only orientation, enterprise-exclusivity, and failure to bridge institutional intelligence with individual action.

To address these gaps, this paper proposes the ACTRM (Aggregate -- Calculate -- Track -- Reduce -- Monetize) Sustainability Intelligence Framework, a structured lifecycle model that transforms raw environmental data into verified, actionable, and incentivised sustainability outcomes. The framework is implemented through Green Credit AI, a dual-layer platform comprising an Enterprise Intelligence Layer for Scope 3 analysis, ESG automation, and greenwashing detection, and a Community Engagement Layer featuring AI-guided sustainability missions, personalised decision support, and gamified environmental participation.

A functional prototype has been developed as a proof-of-concept, demonstrating the feasibility of AI-driven sustainability workflows including carbon footprint analysis, automated BRSR/GRI report generation, supplier verification, and an edge-capable AI assistant designed for offline deployment in low-connectivity environments. Validation against the identified research gaps confirms that the proposed framework addresses the fragmentation, automation, and accessibility deficits documented in the literature.

The findings suggest that an integrated, AI-native approach to sustainability intelligence  --  one that unifies enterprise compliance with community engagement through a structured lifecycle framework  --  offers a viable path toward democratising environmental decision-making. Future work proposes extending the platform through computer vision verification, satellite monitoring, and predictive carbon modelling.

**Keywords:** Scope 3 Emissions, ESG Automation, BRSR, Greenwashing Detection, Sustainability Intelligence, AI Agents, Edge AI, Carbon Analytics, ACTRM Framework, Life Cycle Assessment

---

## Table of Contents

1. Introduction
2. Literature Review
   - 2.1 Scope 3 Emissions and Supply Chain Carbon Complexity
   - 2.2 ESG Reporting Frameworks and Automation Challenges
   - 2.3 Greenwashing: Detection, Verification, and Trust
   - 2.4 AI in Sustainability Decision-Making
   - 2.5 Behavioural Sustainability and Community Engagement
3. Problem Identification
   - 3.1 Technical Problems
   - 3.2 Business and Economic Problems
   - 3.3 Environmental Problems
   - 3.4 Social Problems
4. Research Gap Analysis
5. Proposed Framework: ACTRM Sustainability Intelligence Lifecycle
6. System Architecture and Design
7. Methodology
8. Prototype Validation
9. Comparative Analysis
10. Innovation Analysis
11. Entrepreneurial Validation and Scalability
12. Discussion
13. Future Work
14. Conclusion
15. References

---

## 1. Introduction

### 1.1 Background

India contributes approximately 2.79 billion metric tonnes of carbon dioxide annually, positioning it as the world's third-largest emitter after China and the United States (Global Carbon Project, 2024). With India's ambitious Panchamrit climate commitments -- including 500 GW of non-fossil fuel capacity and 50% renewable energy share by 2030, announced at COP26 -- the need for robust carbon measurement and sustainability intelligence has never been greater. A disproportionate share of organisational emissions -- estimated between 70% and 90% -- falls within the Scope 3 category: indirect emissions embedded in supply chains, product lifecycles, and downstream consumption patterns (Accenture, 2024; Carbon Direct, 2024). Despite their dominance, Scope 3 emissions remain the least measured, least understood, and least managed component of organisational carbon accounting.

Simultaneously, regulatory frameworks demanding environmental transparency have proliferated across India. The Securities and Exchange Board of India (SEBI) has mandated Business Responsibility and Sustainability Reporting (BRSR) for the top 1,000 listed entities, the Ministry of Environment, Forest and Climate Change (MoEFCC) launched the Green Credit Programme Rules 2023 to incentivise voluntary environmental actions, and the Perform Achieve and Trade (PAT) scheme under the Bureau of Energy Efficiency (BEE) mandates energy efficiency improvements in designated consumers. The Reserve Bank of India (RBI) has also issued guidelines for climate-related financial disclosures for regulated entities. Internationally, the European Union's Carbon Border Adjustment Mechanism (CBAM) directly impacts Indian exporters in steel, aluminium, cement, and fertiliser sectors, requiring product-level carbon footprint data. These frameworks collectively demand audit-grade environmental data that most Indian organisations -- particularly CBSE-affiliated schools, MSMEs, and community institutions -- lack the infrastructure to produce.

Concurrently, greenwashing -- the practice of making misleading or unsubstantiated sustainability claims -- has eroded public and institutional trust in environmental commitments. India's Central Consumer Protection Authority (CCPA) has begun issuing guidelines on environmental advertising claims, reflecting growing regulatory attention to this challenge. Research indicates that the market for greenwashing detection AI is projected to reach USD 9.4 billion by 2034 (AI Magazine, 2024). Existing tools for sustainability management are characterised by fragmentation: carbon calculators measure but do not recommend; ESG platforms report but do not verify; environmental awareness applications educate but do not enable action. No single platform integrates these capabilities within a coherent lifecycle framework.

### 1.2 Research Question

This research is organised around a central question:

> **How can Artificial Intelligence improve sustainability decision-making by addressing fragmented carbon data, Scope 3 emission visibility, greenwashing, and manual ESG reporting across organisations and communities?**

### 1.3 Research Objectives

This study pursues six interconnected objectives:

1. **Investigate** why current sustainability systems fail to provide actionable intelligence beyond measurement.
2. **Analyse** why Scope 3 emissions remain largely unmanaged despite comprising the majority of organisational carbon footprints.
3. **Examine** why ESG reporting remains expensive, complex, and inaccessible to smaller institutions.
4. **Study** why greenwashing persists and why existing verification mechanisms are insufficient.
5. **Explore** why individuals struggle to adopt sustainable behaviours despite high environmental awareness.
6. **Propose** a structured framework  --  the ACTRM Sustainability Intelligence Lifecycle  --  that addresses these gaps through an integrated, AI-powered platform.

### 1.4 Scope and Limitations

This research focuses on the design and prototype validation of the ACTRM framework as implemented in Green Credit AI. The current implementation constitutes a functional prototype intended to demonstrate feasibility rather than a production-grade enterprise deployment. Claims regarding AI capabilities reflect the designed architecture and prototype demonstrations; fully autonomous AI agent operation remains a future development objective. The survey data referenced (n=507) provides directional validation but does not constitute a statistically controlled experimental study.

---

## 2. Literature Review

### 2.1 Scope 3 Emissions and Supply Chain Carbon Complexity

Scope 3 emissions, as defined by the Greenhouse Gas (GHG) Protocol, encompass all indirect emissions occurring across an organisation's value chain  --  from purchased goods and services to end-of-life treatment of sold products. Research consistently demonstrates that these emissions constitute the dominant share of most organisations' carbon footprints, yet remain the most difficult to quantify and manage.

**Data Fragmentation and Inconsistency.** Carbon Direct (2024) identifies data fragmentation as a primary obstacle, noting that suppliers across a value chain frequently employ different calculation methodologies, emission factors, and reporting standards. This heterogeneity renders aggregation and comparison inherently unreliable. The Massachusetts Institute of Technology's Sloan School of Management has documented how inflexible accounting methods create systemic bottlenecks in reporting processes (MIT Sloan, 2024).

**Limited Supply Chain Visibility.** Accenture (2024) reports that most companies lack transparency beyond their Tier 1 suppliers, forcing reliance on generic industry-average emission factors rather than activity-based supplier data. PwC (2024) corroborates this finding, observing that emissions embedded in Tier 2 and deeper supply chain layers  --  often the most carbon-intensive  --  remain effectively invisible to reporting organisations.

**Supplier Engagement Barriers.** Anthesis Group (2024) documents significant challenges in communicating decarbonisation urgency to suppliers, particularly small and medium enterprises lacking the internal resources, expertise, or information systems to track and share emissions data. This creates a systemic data gap that compounds across the value chain.

**Methodological Complexity.** Life Cycle Assessment (LCA), the methodological standard for Scope 3 calculation referenced in ISO 14040/14044, requires tracking environmental impact from raw material extraction through disposal. The Resource Solutions Institute (2024) notes that the complexity of full lifecycle accounting  --  spanning cradle-to-gate and cradle-to-grave analyses  --  exceeds the analytical capacity of most organisations, particularly those outside the enterprise sector.

**Regulatory Acceleration.** The regulatory landscape has intensified significantly. The EU CSRD mandates Scope 3 reporting by 2030, while India's BRSR framework has expanded its scope to cover value chain disclosures (Sweep, 2024). These mandates are transitioning Scope 3 reporting from voluntary best practice to legal requirement, creating urgency for automated solutions.

### 2.2 ESG Reporting Frameworks and Automation Challenges

Environmental, Social, and Governance (ESG) reporting has evolved from a voluntary corporate exercise to a mandatory compliance requirement across multiple jurisdictions. In India, the BRSR framework  --  mandated by SEBI for the top 1,000 listed entities  --  requires detailed disclosures across environmental, social, and governance dimensions, including energy consumption, waste management, water usage, and value chain sustainability metrics.

**Manual Reporting Inefficiency.** Research indicates that approximately 40% of mid-cap Indian firms historically relied on spreadsheets for sustainability data tracking (Market Research Future, 2024). Manual processes are not only labour-intensive but also error-prone, creating audit risks. As data volumes expand with evolving regulatory requirements, spreadsheet-based workflows become operationally unsustainable.

**Multi-Framework Complexity.** Organisations frequently face the challenge of reporting against multiple frameworks simultaneously  --  BRSR for Indian regulators, GRI (Global Reporting Initiative) for international stakeholders, SDG (UN Sustainable Development Goals) for development alignment, and CDP (Carbon Disclosure Project) for investors. Each framework defines distinct metrics, boundaries, and reporting formats, multiplying the compliance burden.

**Assurance Requirements.** The introduction of BRSR Core, requiring mandatory assessment or assurance for key performance indicators, has elevated reporting from self-declaration to audit-grade evidence production. Manual processes typically fail to maintain the audit trails necessary for external verification (Primus Partners, 2025).

**Cost Barriers.** The cost of professional ESG reporting  --  encompassing data collection, analysis, consultant fees, and assurance services  --  places compliance beyond the practical reach of schools, small enterprises, and community organisations. This creates a structural accessibility gap wherein the organisations most in need of sustainability guidance are least equipped to access it.

**Automation as a Strategic Imperative.** Studies suggest that implementing automation tools can reduce compliance costs by approximately 20% while improving data accuracy and audit readiness (Mordor Intelligence, 2025). Modern ESG platforms offer automated data ingestion, real-time emissions calculation using GHG Protocol standards, and centralised audit trails compatible with SEBI's XBRL requirements.

### 2.3 Greenwashing: Detection, Verification, and Trust

Greenwashing  --  the practice of conveying a false impression about the environmental soundness of an organisation's products, services, or practices  --  has become a systemic challenge in sustainability markets.

**Scale and Prevalence.** Research indicates that greenwashing has increased alongside the growth of ESG investing and sustainability marketing. The market for greenwashing detection solutions is projected to reach USD 9.4 billion by 2034, reflecting both the prevalence of misleading claims and the institutional demand for verification capabilities (AI Magazine, 2024). The EU's "Empowering Consumers for the Green Transition" directive specifically targets unsubstantiated environmental claims, signalling regulatory recognition of the problem's scale.

**AI-Driven Detection Methods.** Current research documents several approaches to automated greenwashing identification:

- **Natural Language Processing (NLP):** Transformer-based models such as BERT and ClimateBERT analyse sustainability reports, marketing materials, and corporate communications to identify vague, unsubstantiated, or misleading language by comparison against standardised sustainability benchmarks (Frontiers in AI, 2024).
- **Retrieval-Augmented Generation (RAG):** RAG architectures combine Large Language Model reasoning with external verified datasets, enabling cross-referencing of corporate claims against third-party audit findings, emissions data, and supply chain reports.
- **Cross-Source Data Validation:** Advanced systems aggregate multi-modal data  --  including satellite imagery, IoT sensor readings, and financial disclosures  --  to detect divergence between a company's environmental narrative and its operational reality.

**Trust Deficit.** The proliferation of unverifiable claims has created a trust deficit that affects genuine sustainability practitioners as much as it affects consumers. Research documents a parallel phenomenon of "greenhushing"  --  wherein companies with legitimate sustainability achievements withhold information to avoid scrutiny  --  suggesting that the verification challenge suppresses both deceptive and authentic sustainability communication.

**Verification Gap.** Existing verification mechanisms  --  third-party certifications, self-reported sustainability indices, and manual audit processes  --  are resource-intensive, slow, and prone to the same data fragmentation challenges that affect ESG reporting. No widely accessible tool enables rapid, AI-driven verification of sustainability claims at scale, particularly for smaller organisations and individual consumers.

### 2.4 AI in Sustainability Decision-Making

The application of Artificial Intelligence to sustainability has evolved beyond analytical assistance toward autonomous decision support systems.

**From Measurement to Intelligence.** SAP (2024) documents the shift from manual, spreadsheet-based sustainability reporting toward automated, AI-driven platforms where the objective is not merely compliance but actionable "decision intelligence"  --  identifying emission hotspots, simulating decarbonisation scenarios, and recommending operational changes. This transition represents a fundamental repositioning of sustainability technology from retrospective reporting to prospective decision support.

**AI Agent Architectures.** Contemporary research explores multi-agent systems wherein specialised AI agents handle distinct sustainability tasks  --  carbon calculation, compliance verification, anomaly detection, and recommendation generation  --  coordinated by an orchestration layer. This architectural pattern enables parallel processing of sustainability workflows and separation of concerns between analytical, verification, and advisory functions.

**Edge AI and Accessibility.** Research into on-device AI inference has highlighted transformative potential for contexts with limited connectivity. Model optimisation techniques  --  including quantisation, pruning, and knowledge distillation  --  enable sophisticated language models to operate on resource-constrained hardware. Studies document that running models locally significantly reduces energy footprint while addressing data privacy concerns, as sensitive information need not be transmitted to cloud servers. For rural schools and low-connectivity institutions, edge AI represents the difference between access and exclusion from sustainability intelligence.

**Existing Platform Landscape.** Platforms such as CO2 AI, Persefoni, IBM Envizi, and Watershed represent the current commercial state of AI-driven sustainability management. However, these platforms are characterised by enterprise-only positioning, cloud dependency, and high cost structures that preclude adoption by schools, small organisations, and individual users. None integrates enterprise sustainability intelligence with community-level environmental engagement within a unified framework.

### 2.5 Behavioural Sustainability and Community Engagement

The gap between environmental awareness and sustainable action  --  termed the "value-action gap" in behavioural economics  --  represents a persistent challenge in sustainability engagement.

**Engagement Limitations of Current Tools.** Research documents "engagement decay" as a primary limitation of gamified sustainability applications: users interact initially out of curiosity but fail to maintain long-term participation (Council Fire, 2024). Many consumer-facing carbon tracking apps rely on manual data entry, which is prone to error and inconsistency, while lacking standardised methodologies for emissions calculation across different contexts.

**Measurement Without Action.** A persistent critique in recent literature is that sustainability applications focus exclusively on measurement  --  calculating a carbon footprint score  --  without providing personalised, actionable guidance for reduction. The dominant interaction model presents information passively rather than actively guiding behaviour change through AI-driven recommendations and structured sustainability journeys.

**Systemic versus Individual Focus.** Research notes that consumer-facing sustainability tools tend to address individual responsibility (household energy, diet, transport) while neglecting the intersection between individual choice and systemic change. Applications that connect personal sustainability decisions to broader community and institutional impact demonstrate stronger engagement persistence.

**Community-Driven Models.** Studies indicate that community-based engagement models  --  featuring shared goals, social comparison, and collective progress tracking  --  sustain habits more effectively than individual competition over periods exceeding six months (Busara, 2024). This finding supports the integration of community leaderboards, collaborative challenges, and institutional participation alongside individual sustainability tracking.

---

## 3. Problem Identification

The literature review reveals five interconnected categories of problems that collectively constrain effective sustainability decision-making.

### 3.1 Technical Problems

| Problem | Cause | Current Impact | Existing Limitations | Research Evidence |
|---------|-------|----------------|---------------------|-------------------|
| Fragmented carbon data across value chains | Disparate supplier systems, non-standardised methodologies | Unreliable Scope 3 calculations; reliance on industry averages | No unified aggregation platform for heterogeneous sources | Carbon Direct (2024); MIT Sloan (2024) |
| Manual ESG data collection and reporting | Legacy spreadsheet workflows; no automated data pipelines | High error rates; audit failure risk; 40% of mid-caps use spreadsheets | Existing automation tools are enterprise-priced | Market Research Future (2024); Primus Partners (2025) |
| Cloud-only AI architecture | Dependence on internet connectivity for AI inference | Exclusion of rural schools, low-connectivity areas | No on-device sustainability AI at student-project level | Edge AI Research (2024 -- 2025) |
| Siloed sustainability tools | Separate platforms for carbon, ESG, greenwashing, engagement | No lifecycle view; duplicated data entry; inconsistent results | Integration requires expensive enterprise middleware | SAP (2024); Mordor Intelligence (2025) |

### 3.2 Business and Economic Problems

| Problem | Cause | Current Impact | Existing Limitations | Research Evidence |
|---------|-------|----------------|---------------------|-------------------|
| High cost of ESG compliance | Consultant fees, data management, assurance costs | Schools and SMEs excluded from sustainability reporting | Existing SaaS platforms priced for enterprise budgets | CSTEP (2024); Primus Partners (2025) |
| Supplier verification complexity | Manual audit processes; no scalable verification | Uninformed procurement decisions; greenwashing exposure | Third-party certifications are slow and expensive | Anthesis Group (2024); PwC (2024) |
| No standardised sustainability scoring | Multiple frameworks with incompatible metrics | Cross-organisational comparison is impossible | Industry-average benchmarks lack granularity | GRI Standards (2024); SEBI BRSR (2023) |

### 3.3 Environmental Problems

| Problem | Cause | Current Impact | Existing Limitations | Research Evidence |
|---------|-------|----------------|---------------------|-------------------|
| Scope 3 invisibility | Supply chain opacity beyond Tier 1 | 70 -- 90% of emissions unmeasured and unmanaged | Calculation methods rely on estimates, not actual data | Accenture (2024); GHG Protocol |
| Greenwashing proliferation | No accessible verification tools | Consumer trust erosion; uninformed institutional procurement | NLP detection exists in research but not in accessible tools | Frontiers in AI (2024); EU Consumer Directive |
| Carbon calculators stop at measurement | Design paradigm focused on awareness not action | Users learn their footprint but receive no reduction pathway | No tool connects measurement to AI-driven reduction strategy | IJTSRD (2024); Council Fire (2024) |

### 3.4 Social Problems

| Problem | Cause | Current Impact | Existing Limitations | Research Evidence |
|---------|-------|----------------|---------------------|-------------------|
| Value-action gap in sustainability | Awareness does not translate to behaviour change | 96.3% aware of carbon problem (survey), yet adoption remains low | Gamification produces short-term engagement only | Behavioural Economics Research (2024); Survey (n=507) |
| Student exclusion from sustainability intelligence | Tools designed for enterprise users | No practical mechanism for schools to measure and report impact | School-level sustainability tools are educational only | Edge AI Research (2024); SDG Monitoring Reports |
| Digital divide in sustainability access | Cloud-dependent tools require stable connectivity | Rural and underserved communities excluded from AI-driven guidance | No offline-capable sustainability AI assistant exists for schools | UNEP Digital Divide Reports (2024) |

---

## 4. Research Gap Analysis

This section identifies specific gaps between existing solutions and the needs documented in the literature, positioning each gap as the research justification for a corresponding module in the proposed platform.

### 4.1 Gap Analysis Framework

The analysis follows a structured pattern: **Existing Solution → Identified Limitation → Research Gap → Proposed Response**.

### 4.2 Gap 1: Measurement Without Intelligence

**Existing solutions:** Carbon footprint calculators (e.g., EPA Carbon Calculator, CoolClimate, MyClimate)

**Identified limitation:** These tools calculate emissions but provide no actionable intelligence. The user receives a number (e.g., "8.2 tonnes CO₂e annually") without context, comparison benchmarks, or reduction strategies. Research documents that measurement alone fails to motivate behaviour change (Council Fire, 2024).

**Research gap:** No accessible tool transforms carbon measurement into AI-driven reduction strategy with personalised recommendations, progress tracking, and projected impact modelling.

**Proposed response:** The Carbon Analysis module, integrated within the ACTRM framework's Calculate and Reduce stages, generates not only emissions calculations but also AI-powered hotspot identification and reduction pathways.

### 4.3 Gap 2: Enterprise-Only ESG Automation

**Existing solutions:** ESG platforms (e.g., Persefoni, Watershed, IBM Envizi)

**Identified limitation:** These platforms are designed for large enterprises, priced via SaaS subscription models, and require dedicated sustainability teams for operation. Schools, small businesses, and community institutions  --  which collectively generate significant environmental impact  --  are structurally excluded.

**Research gap:** No ESG automation tool is accessible to schools and smaller organisations, combining low cost, AI-driven data extraction, and multi-framework report generation (BRSR, GRI, SDG) in a unified workflow.

**Proposed response:** The ESG Report Agent automates the reporting pipeline from data upload through AI analysis, compliance verification, and formatted report generation, designed for accessibility by non-specialist users.

### 4.4 Gap 3: Verification Deficit in Sustainability Claims

**Existing solutions:** Third-party certifications (Fair Trade, B Corp), manual audit processes, ESG rating agencies

**Identified limitation:** Verification processes are slow (weeks to months), expensive, and not scalable to the volume of sustainability claims in modern supply chains and consumer markets. No accessible tool enables rapid claim verification by individual consumers or procurement officers.

**Research gap:** No platform provides AI-powered, real-time greenwashing detection accessible to both enterprises (for supplier verification) and individuals (for consumer protection), combining NLP analysis with cross-reference validation.

**Proposed response:** The Greenwashing Detection module, available as both an enterprise feature and a public tool, analyses sustainability claims against established standards and assigns confidence scores.

### 4.5 Gap 4: Passive Education Without Active Guidance

**Existing solutions:** Environmental awareness apps (e.g., JouleBug, Oroeco), sustainability education platforms

**Identified limitation:** These applications provide sustainability education and awareness content but do not offer personalised, AI-driven guidance for individual decision-making. Users learn about environmental concepts but receive no structured pathway for integrating sustainability into daily choices.

**Research gap:** No platform combines AI-powered personalised sustainability mission generation with decision-support analysis for everyday choices (purchases, travel, household decisions), integrated with measurable progress tracking.

**Proposed response:** The Green Credit Pathfinder generates personalised sustainability missions with expected impact estimates and credit rewards, while the Sustainability Copilot provides real-time AI analysis of individual decisions.

### 4.6 Gap 5: No Unified Sustainability Lifecycle Framework

**Existing solutions:** Individual tools addressing specific stages  --  data collection (spreadsheets), calculation (carbon calculators), reporting (ESG platforms), engagement (sustainability apps)

**Identified limitation:** The sustainability tool landscape is fundamentally fragmented. Each tool addresses one stage of the sustainability lifecycle in isolation, requiring users to navigate multiple platforms with incompatible data formats and no shared intelligence layer.

**Research gap:** No framework proposes a structured lifecycle model that unifies data aggregation, emissions calculation, continuous tracking, reduction planning, and incentivisation within a single platform architecture.

**Proposed response:** The ACTRM (Aggregate -- Calculate -- Track -- Reduce -- Monetize) Framework, proposed as a novel contribution of this research, defines five operational stages that transform raw environmental data into verified, actionable, and incentivised sustainability outcomes.

### 4.7 Gap 6: Connectivity-Dependent AI Exclusion

**Existing solutions:** Cloud-based AI sustainability assistants, chatbot interfaces in ESG platforms

**Identified limitation:** All existing AI sustainability tools require internet connectivity for inference, excluding rural schools, underserved communities, and regions with unreliable connectivity. This creates a systematic digital divide in access to sustainability intelligence.

**Research gap:** No sustainability AI assistant is designed for on-device inference, enabling offline operation in low-connectivity environments while maintaining meaningful analytical capability.

**Proposed response:** EcoBot Edge, utilising LiteRT-LM with Gemma 4B for on-device inference and a local RAG pipeline, provides sustainability guidance without cloud dependency.

### 4.8 Summary: Gap-to-Module Mapping

| Research Gap | Existing Solution Category | Gap Description | Green Credit AI Module |
|---|---|---|---|
| Measurement without intelligence | Carbon calculators | No actionable reduction strategies | Carbon Analysis + AI Recommendations |
| Enterprise-only ESG automation | ESG platforms | Inaccessible to schools and SMEs | ESG Report Agent |
| Verification deficit | Certifications, audits | Slow, expensive, not scalable | Greenwashing Detection |
| Passive education | Awareness apps | No personalised AI guidance | Pathfinder + Copilot |
| No unified lifecycle | Fragmented tools | Siloed stages, no integration | ACTRM Framework |
| Connectivity-dependent AI | Cloud-only chatbots | Rural/offline exclusion | EcoBot Edge AI |
