# 🇮🇳 JanData: Census 2027 Digital Enumeration (जनगणना 2027)
### India's First Fully Digital Census Portal & AI Governance Platform
**Prompt Wars Hackathon Project Submission • Digital India Initiative**

> **JanData directly solves the challenge of modernizing the decennial census by transitioning from legacy paper-based enumeration to a secure, paperless, Digital India ecosystem, fostering citizen engagement (Jan Bhagidari) and enabling real-time data-driven policy making.**

---

## 🌟 Overview & Problem Statement
India's 2027 Census marks a historic milestone as the world's largest administrative exercise and India's **first-ever 100% digital, paperless census**. 

Transitioning from legacy paper schedules to mobile self-enumeration, sovereign GIS geo-tagging, and automated amenity tracking requires bridging the citizen-government interface with cutting-edge GenAI, instant multi-lingual localization across 8 Indian languages, proactive rumor debunking under **Section 15 of the Census Act 1948**, and macroeconomic policy budget modeling.

**JanData** is a **production-grade, full-stack GenAI-powered digital enumeration platform** engineered for 1.44+ billion citizens, enumerators, and policymakers.

---

## 🏛️ Strategic Pillars & Problem Alignment
1. **Paperless Governance**: 100% digital self-enumeration with instant unique SE ID passes (`IND-2027-[STATE]-[DIST]-XXXXXX`) and encrypted QR codes for rapid 60-second enumerator validation.
2. **Citizen Engagement (Jan Bhagidari)**: Multi-lingual GenAI AI Concierge (`Samvaad 2027`) and AI Misinformation Buster debunking phishing scams and WhatsApp forwards.
3. **Data-Driven Policy Making**: Interactive Policy Sandbox modeling ₹1,80,000+ Cr flagship central schemes (PMAY, Jal Jeevan Mission, PM Surya Ghar, Ujjwala) with real-time HDI and carbon avoidance projections.
4. **Statutory Confidentiality**: Rigid compliance with **Section 15 of the Census Act, 1948** guaranteeing absolute confidentiality, zero data-sharing with tax/police authorities, and total immunity from court subpoenas.

---

## 📁 Project Architecture & File Structure

```text
Promptwars/
├── chatbot_questions.md                 # Official Q&A Catalog for Samvaad 2027 Concierge
├── index.html                           # App entry with modern typography and metadata
├── package.json                         # Dependencies (react, react-dom, vitest, lucide-react, canvas-confetti)
├── vite.config.ts                       # Vite bundler configuration
├── vitest.config.ts                     # Vitest automated test runner configuration
├── tsconfig.json                        # Strict TypeScript configuration
├── public/
│   └── favicon.svg                      # Custom Census 2027 Digital Emblem & National Seal
└── src/
    ├── main.tsx                         # React application entrypoint
    ├── App.tsx                          # Root layout, navigation tabs, sticky header, and views
    ├── index.css                        # National Gov CSS design system (Navy #000080, Saffron, Emerald)
    ├── setupTests.ts                    # Vitest environment setup with JSDOM and browser mocks
    │
    ├── __tests__/                       # Comprehensive Automated Test Suite (100% Pass Rate)
    │   ├── seIdGenerator.test.ts        # Mock SE ID format, checksum & QR integrity tests
    │   ├── policyCalculator.test.ts     # Welfare budget recalculation & edge case tests
    │   ├── censusData.test.ts           # 31 Phase 1 parameters & 36 States/UTs validation
    │   ├── LanguageContext.test.tsx     # 8-language localization & storage sync tests
    │   ├── SelfEnumerationWizard.test.tsx # 4-step wizard & Section 15 legal consent tests
    │   ├── Header.test.tsx              # Three-line branding & tab navigation tests
    │   ├── StateTracker.test.tsx        # Dynamic rollout schedule & modal inspection tests
    │   ├── aiConciergeEngine.test.ts    # Statutory GenAI response engine tests
    │   └── dateUtils.test.ts            # Text-based date formatting utility tests
    │
    ├── context/
    │   ├── LanguageContext.tsx          # Multi-lingual context supporting 8 Indian languages
    │   └── AccessibilityContext.tsx     # High-contrast, font-size scaler, and speech controller
    │
    ├── data/
    │   ├── translations.ts              # Full localization dictionary across 8 languages
    │   ├── statesData.ts                # 36 States/UTs schedules & 15-day pre-survey windows
    │   ├── censusQuestions.ts           # 31 Phase I Houselisting & Phase II Demographic questions
    │   ├── rumorsData.ts                # Misinformation database with Census Act 1948 citations
    │   └── dashboardData.ts             # Analytics metrics for housing, clean energy, and water
    │
    ├── components/
    │   ├── layout/                      # Header, Footer, and Accessibility Control Bar
    │   ├── concierge/                   # GenAIChatbot with multilingual voice & prompt pills
    │   ├── tracker/                     # State Tracker, interactive India map, and countdown timers
    │   ├── selfEnumeration/             # Multi-step wizard, map pinners, and mock SE ID certificates
    │   ├── misinformation/              # Rumor verification tool and legal reference cards
    │   ├── dashboard/                   # Analytics dashboard, KPI metrics, and demographic charts
    │   ├── simulator/                   # Interactive policy sandbox and budget allocation sliders
    │   └── common/                      # Reusable badges, glassmorphism modals, and tooltips
    │
    └── utils/
        ├── dateUtils.ts                 # Text-based date formatters (15 Apr 2026 to 30 Apr 2026)
        ├── speechUtils.ts               # Language-aware Web Speech API helpers
        ├── seIdGenerator.ts             # Unique SE ID generation algorithm (IND-2027-ST-DIST-XXXXX)
        ├── aiConciergeEngine.ts         # GenAI knowledge engine grounded in ORGI protocols
        └── policyCalculator.ts          # Mathematical modeling for welfare scheme allocations
```

---

## 🚀 Key Modules & Capabilities

### 1. 🤖 GenAI Census Concierge (`Samvaad 2027`)
- **Conversational Intelligence**: Grounded in official ORGI guidelines and the **Census Act, 1948**.
- **Comprehensive Question Bank**: Explains all **31 Phase I parameters** (housing structures, drinking water sources, PM Surya Ghar solar, latrine types, electronic assets) and **Phase II Demographics** (family roster, mother tongue, caste/tribe classification under Presidential and State Gazette orders).
- **Voice-First Navigation**: Speech-to-text voice input and SpeechSynthesis audio read-aloud in regional Indian accents.
- **Copy & Share**: Real-time response streaming, markdown formatting, and suggested follow-up prompts.

### 2. 🗺️ State-Wise Dynamic Tracker & Rollout Schedule
- **15-Day Pre-Survey Windows**: Real-time tracking of active and upcoming self-enumeration windows across all **36 States & Union Territories**.
- **State Deep-Dive Modal**: District counts, projected populations, Jal Jeevan tap water coverage, solar penetration, nodal officers, and 24/7 state control room helplines.
- **Text-Based Dates**: Clear, non-ambiguous text date formatting (`15 Apr 2026 to 30 Apr 2026`).

### 3. 📱 Simulated Self-Enumeration Portal & SE ID Generation
- **4-Step Citizen Wizard**:
  1. *Citizen Verification*: Mobile verification with simulated OTP and statutory Section 15 consent.
  2. *Phase I Housing Amenities*: Structural categorization (Pucca/Semi-Pucca/Kutcha), Jal Jeevan tap water, PM Ujjwala fuel, solar rooftop, and asset checklist.
  3. *Phase II Demographics*: Family roster, mother tongue, education, occupation, and digital skills.
  4. *Interactive GIS Geotagging*: Browser GPS detection and interactive map marker pinning for structure geo-tagging.
- **Official Mock SE ID Certificate**: Unique **Self-Enumeration ID** (`IND-2027-[STATE]-[DIST]-[RANDOM]`), encrypted QR code pass, barcode, security hash, and celebratory confetti blast!

### 4. 🌐 Multilingual Switcher (8 Scheduled Indian Languages)
- Instant client-side localization across:
  - **English**
  - **हिन्दी (Hindi)**
  - **தமிழ் (Tamil)**
  - **తెలుగు (Telugu)**
  - **বাংলা (Bengali)**
  - **मराठी (Marathi)**
  - **ગુજરાતી (Gujarati)**
  - **ಕನ್ನಡ (Kannada)**

### 5. 🛡️ AI Misinformation Buster & Privacy Verifier
- **Rumor Testing Sandbox**: Citizens can paste any forwarded WhatsApp claim to receive an instant legal evaluation with a **Trust Score (0–100%)**.
- **Section 15 Immunity Highlight**: Explains statutory confidentiality under Section 15 of the Census Act 1948 (census data cannot be shared with tax authorities, police, or produced as court evidence).
- **Scam Alerts**: Protects citizens from fraudulent phishing asking for banking OTPs or PINs.

### 6. 📊 Smart Data Insights Dashboard
- **Macro-Economic Metrics**: Projected national population (1.442B), 335M census houses, Jal Jeevan coverage (84.8%), clean cooking (89.2%), and rooftop solar (26.4%).
- **Transformation Curves**: Pucca vs Kutcha housing shift (2011 to 2027) and multi-year amenity penetration curves.
- **Functional Filters**: Real-time filtering by State/UT and Sector (All India, Urban, Rural).

### 7. 🎛️ Policy Simulator Sandbox
- **Interactive Levers**: Sliders for Pucca Housing target, Tap Water target, Rooftop Solar target, Clean Fuel, and Digital Literacy.
- **Dynamic Welfare Budget Modeler**: Real-time recalculation of budget allocations for **PMAY**, **Jal Jeevan Mission**, **PM Surya Ghar**, and **Digital India Hubs**, with projected national **HDI Score**, green jobs created, and carbon emissions avoided.

### 8. ♿ Voice-First Accessibility & Senior Citizen Mode
- **High-Contrast Theme**: High-contrast black/yellow/green color scheme compliant with WCAG accessibility standards.
- **Font Sizing Controller**: $A^- / A / A^+$ scaling.
- **Hands-Free Audio**: Full text-to-speech narration across all modules in the selected Indian language.

---

## 🧪 Comprehensive Automated Test Suite

The codebase features full test coverage powered by **Vitest** and **React Testing Library**:

```bash
# Run full automated test suite
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with code coverage
npm run test:coverage
```

### Test Suite Results:
- **9 / 9 Test Files Passed (100%)**
- **34 / 34 Tests Passed (100%)**

---

## 🛠️ Technology Stack
- **Frontend Core**: React 18 with Strict TypeScript
- **Testing Engine**: Vitest 4, React Testing Library, JSDOM
- **Build Tool**: Vite 6 (ultra-fast HMR & optimized production bundling)
- **Styling**: Custom National Gov CSS Design System with Glassmorphism, Tri-Color accents (Saffron, India Navy `#000080`, Emerald Green), and responsive layouts.
- **Icons**: Lucide-React
- **Celebration Effects**: Canvas-Confetti
- **Speech APIs**: Native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## 📜 Legal & Statutory Basis
- **Census Act, 1948 (Act No. 37 of 1948)**
- **Section 15**: Records of census not open to inspection nor admissible in evidence against any individual in court or tax proceedings.
- **Digital Personal Data Protection Act (DPDPA), 2023**

---
*Built with ❤️ for Prompt Wars Hackathon: Census 2027 & Digital Enumeration.*
