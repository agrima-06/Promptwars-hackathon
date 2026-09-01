# 🇮🇳 Census 2027: Digital Enumeration Web App
### Prompt Wars Hackathon Submission

> A comprehensive, production-grade, GenAI-powered web platform built for **Census 2027 & Digital Enumeration** (जनगणना 2027: डिजिटल भारत, सशक्त भारत).

---

## 🚀 Application Overview

India's 2027 Census marks a historic milestone as the country's first fully digital census. This web application bridges the citizen-government gap by providing an intuitive, accessible, and intelligent portal featuring mobile self-enumeration, GIS geo-tagging, multi-lingual accessibility, real-time GenAI assistance, misinformation debunking, and interactive policy simulation.

---

## 📁 Project Architecture & File Structure

```text
Promptwars/
├── index.html                           # App entry with modern typography and metadata
├── package.json                         # Dependencies (react, react-dom, lucide-react, canvas-confetti)
├── vite.config.ts                       # Vite bundler configuration
├── tsconfig.json                        # TypeScript configuration
├── public/
│   ├── favicon.svg                      # Custom Census 2027 Digital Emblem
│   └── mock_data/                       # Sample data for states, policy metrics, and rumors
└── src/
    ├── main.tsx                         # React application entrypoint
    ├── App.tsx                          # Root layout, navigation tabs, sticky header, and views
    ├── index.css                        # Core CSS design system with glassmorphism & tri-color theme
    │
    ├── context/
    │   ├── LanguageContext.tsx          # Multi-lingual context supporting 8 Indian languages
    │   └── AccessibilityContext.tsx     # High-contrast, font-size scaler, and speech controller
    │
    ├── data/
    │   ├── translations.ts              # Full localization dictionary across all modules
    │   ├── statesData.ts                # 36 States/UTs schedules & 15-day pre-survey windows
    │   ├── censusQuestions.ts           # 31 Phase I Houselisting & Phase II Demographic questions
    │   ├── rumorsData.ts                # Misinformation database with Census Act 1948 citations
    │   └── dashboardData.ts             # Analytics metrics for housing, clean energy, and water
    │
    ├── components/
    │   ├── layout/                      # Header, Footer, and Accessibility Control Bar
    │   ├── concierge/                   # GenAIChatbot and conversational assistant tools
    │   ├── tracker/                     # State Tracker, interactive India map, and countdown timers
    │   ├── selfEnumeration/             # Multi-step wizard, map pinners, and mock SE ID certificates
    │   ├── misinformation/              # Rumor verification tool and legal reference cards
    │   ├── dashboard/                   # Analytics dashboard, KPI metrics, and demographic charts
    │   ├── simulator/                   # Interactive policy sandbox and budget allocation sliders
    │   └── common/                      # Reusable badges, glassmorphism modals, and tooltips
    │
    └── utils/
        ├── speechUtils.ts               # Web Speech API helpers (SpeechRecognition & Synthesis)
        ├── seIdGenerator.ts             # Unique SE ID generation algorithm (IND-2027-ST-DIST-XXXXX)
        └── policyCalculator.ts          # Mathematical modeling for welfare scheme allocations

To run this project locally, make sure you have Node.js installed, then run the following commands:

```bash
# Clone the repository
git clone [https://github.com/agrima-06/Promptwars-hackathon.git](https://github.com/agrima-06/Promptwars-hackathon.git)
cd Promptwars-hackathon

# Install dependencies
npm install

# Start the development server
npm run dev
