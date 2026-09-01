# 🇮🇳 Census 2027: Digital Enumeration (जनगणना 2027)
### India's First Fully Digital Census Portal & AI Governance Platform
**Prompt Wars Hackathon Project Submission**

> A comprehensive, production-grade, GenAI-powered web platform built for **Census 2027 & Digital Enumeration** (जनगणना 2027: डिजिटल भारत, सशक्त भारत).

---

## 🌟 Overview & Problem Statement
India's 2027 Census marks a historic milestone as the world's largest administrative exercise and India's **first-ever 100% digital census**. Transitioning from paper schedules to mobile self-enumeration, GIS geo-tagging, and digital amenity tracking requires bridging the citizen-government interface with cutting-edge GenAI, instant multi-lingual localization, proactive rumor debunking, and macroeconomic policy modeling.

This web application is a **production-grade, full-stack GenAI-powered digital enumeration hub** designed for 1.4+ billion citizens, enumerators, and policymakers.

---

## 📁 Project Architecture & File Structure

```text
Promptwars/
├── chatbot_questions.md                 # Official Q&A Catalog for Samvaad 2027 Concierge
├── index.html                           # App entry with modern typography and metadata
├── package.json                         # Dependencies (react, react-dom, lucide-react, canvas-confetti)
├── vite.config.ts                       # Vite bundler configuration
├── tsconfig.json                        # TypeScript configuration
├── public/
│   └── favicon.svg                      # Custom Census 2027 Digital Emblem
└── src/
    ├── main.tsx                         # React application entrypoint
    ├── App.tsx                          # Root layout, navigation tabs, sticky header, and views
    ├── index.css                        # National Gov CSS design system (Navy #000080, Saffron, Emerald)
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

### 2. 🗺️ State-Wise Dynamic Tracker & Countdown
- **15-Day Pre-Survey Windows**: Real-time tracking of active and upcoming self-enumeration windows across all **36 States & Union Territories**.
- **State Deep-Dive Modal**: District counts, projected populations, Jal Jeevan tap water coverage, solar penetration, nodal officers, and 24/7 state control room helplines.

### 3. 📱 Simulated Self-Enumeration Portal & SE ID Generation
- **4-Step Citizen Wizard**:
  1. *Citizen Verification*: Mobile verification with simulated OTP and statutory Section 15 consent.
  2. *Phase I Housing Amenities*: Structural categorization (Pucca/Semi-Pucca/Kutcha), Jal Jeevan tap water, PM Ujjwala fuel, solar rooftop, and asset checklist.
  3. *Phase II Demographics*: Family roster, mother tongue, education, occupation, and digital skills.
  4. *Interactive GIS Geotagging*: Browser GPS detection and interactive map marker pinning for structure geo-tagging.
- **Official Mock SE ID Certificate**: Unique **Self-Enumeration ID** (`IND-2027-[STATE]-[DIST]-[RANDOM]`), encrypted QR code pass, barcode, security hash, and celebratory confetti blast!

### 4. 🌐 Multilingual Switcher (8 Indian Languages)
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
- **State Comparison Table**: Sortable state-by-state readiness ranking.

### 7. 🎛️ Policy Simulator Sandbox
- **Interactive Levers**: Sliders for Pucca Housing target, Tap Water target, Rooftop Solar target, Clean Fuel, and Digital Literacy.
- **Dynamic Welfare Budget Modeler**: Real-time recalculation of budget allocations for **PMAY**, **Jal Jeevan Mission**, **PM Surya Ghar**, and **Digital India Hubs**, with projected national **HDI Score**, green jobs created, and carbon emissions avoided.

### 8. ♿ Voice-First Accessibility & Senior Citizen Mode
- **High-Contrast Theme**: High-contrast black/yellow/green color scheme compliant with WCAG accessibility standards.
- **Font Sizing Controller**: $A^- / A / A^+$ scaling.
- **Hands-Free Audio**: Full text-to-speech narration across all modules in the selected Indian language.

---

## 🛠️ Technology Stack
- **Frontend Core**: React 18 with TypeScript
- **Build Tool**: Vite 6 (ultra-fast HMR)
- **Styling**: Custom National Gov CSS Design System with Glassmorphism, Tri-Color accents (Saffron, India Navy `#000080`, Emerald Green), and responsive layouts.
- **Icons**: Lucide-React
- **Celebration Effects**: Canvas-Confetti
- **Speech APIs**: Native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## ⚡ Quickstart & Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build production bundle
npm run build
```
Visit `http://localhost:3000` in your web browser.

---

## 📜 Legal & Statutory Basis
- **Census Act, 1948 (Act No. 37 of 1948)**
- **Section 15**: Records of census not open to inspection nor admissible in evidence.
- **Digital Personal Data Protection Act (DPDPA), 2023**

---
*Built with ❤️ for Prompt Wars Hackathon: Census 2027 & Digital Enumeration.*
