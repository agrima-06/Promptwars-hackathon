readme_content = """# Census 2027: Digital Enumeration Web App (Prompt Wars Hackathon)

A comprehensive, production-grade, GenAI-powered web application for **"Census 2027 & Digital Enumeration" (जनगणना 2027: डिजिटल भारत, सशक्त भारत)** under the Prompt Wars Hackathon challenge.

## Application Overview
India's 2027 Census is historic: the country's first fully digital census with mobile self-enumeration, GIS geo-tagging, digital amenity tracking, and multi-lingual citizen access. This application bridges the citizen-government interface with cutting-edge GenAI, accessibility, state-wise schedules, misinformation debunking, and predictive policy simulation.

---

## Proposed Project Structure & Architecture
Promptwars/
├── index.html                           # App entry with modern typography and metadata
├── package.json                         # Dependencies (react, react-dom, lucide-react, canvas-confetti)
├── vite.config.ts                       # Vite bundler configuration
├── tsconfig.json                        # TypeScript configuration
├── public/
│   ├── favicon.svg                      # Custom Census 2027 Ashoka/Digital Emblem
│   └── mock_data/                       # Sample data for states, policy metrics, and rumors
└── src/
├── main.tsx                         # React application entrypoint
├── App.tsx                          # Root layout, navigation tabs, sticky header, and views
├── index.css                        # Core CSS design system with glassmorphism and tri-color theme
│
├── context/
│   ├── LanguageContext.tsx          # Multi-lingual context supporting 8 Indian languages (EN, HI, TA, TE, BN, MR, GU, KN)
│   └── AccessibilityContext.tsx     # High-contrast, font-size scaler, and speech synthesis controller
│
├── data/
│   ├── translations.ts              # Full localization dictionary across all modules
│   ├── statesData.ts                # 36 States/UTs with Phase 1 & 2 schedules and 15-day pre-survey windows
│   ├── censusQuestions.ts           # 31 Phase I Houselisting & Phase II Demographic official questions
│   ├── rumorsData.ts                # Misinformation database with verified legal citations (Census Act 1948)
│   └── dashboardData.ts             # Analytics metrics for housing, clean energy, and water
│
├── components/
│   ├── layout/                      # Header, Footer, and Accessibility Control Bar
│   ├── concierge/                   # GenAIChatbot and conversational assistant tools
│   ├── tracker/                     # State Tracker, interactive India map, and countdown timers
│   ├── selfEnumeration/             # Multi-step wizard, map pinners, and mock SE ID certificates with QR codes
│   ├── misinformation/              # Rumor verification tool and Census Act legal reference cards
│   ├── dashboard/                   # Analytics dashboard, KPI metric cards, and demographic charts
│   ├── simulator/                   # Interactive policy sandbox and dynamic budget allocation sliders
│   └── common/                      # Reusable badges, glassmorphism modals, and tooltips
│
└── utils/
├── speechUtils.ts               # Web Speech API helpers (SpeechRecognition & SpeechSynthesis)
├── seIdGenerator.ts             # Unique SE ID generation algorithm (format: IND-2027-ST-DIST-XXXXX)
└── policyCalculator.ts          # Mathematical modeling for welfare scheme allocations


---

## Key Features & User Experience Highlights

1. **GenAI Census Concierge (Interactive Chatbot)**: Specialized persona ("Samvaad 2027") answering all 31 Houselisting and Phase II population questions with multilingual support and text-to-speech read-aloud options.
2. **State-Wise Dynamic Tracker & Interactive India Map**: Real-time tracking of active 15-day pre-survey self-enumeration windows across all 28 States and 8 Union Territories.
3. **Simulated Self-Enumeration Portal & Geo-Pinning**: Step-by-step citizen portal featuring mobile verification, Phase 1 housing amenities, Phase 2 family roster, GIS geo-tagging, and official Mock SE ID certificate generation with QR codes and confetti.
4. **Instant Multilingual Switcher**: Seamless client-side localization across 8 Indian languages (English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada).
5. **AI Misinformation Buster & Legal Fact Checker**: Rumor-checking tool powered by GenAI evaluating authenticity with Trust Scores and legal citations under the Census Act 1948.
6. **Smart Data Insights Dashboard**: Clean data visualization charts tracking housing trends, clean energy transition, literacy growth, and tap water coverage.
7. **Voice-First Accessibility & Audio Assistant**: Hands-free voice form inputs and text-to-speech audio reader equipped with high-contrast mode and font scaling (A- / A / A+).
8. **Policy Simulator Sandbox**: Interactive scenario testing allowing policymakers and citizens to model how budget allocations shift based on demographic variables (PMAY, Jal Jeevan Mission, PM Surya Ghar).

---

## Getting Started & Installation

To run this project locally, make sure you have Node.js installed, then run the following commands:

```bash
# Clone the repository
git clone [https://github.com/agrima-06/Promptwars-hackathon.git](https://github.com/agrima-06/Promptwars-hackathon.git)
cd Promptwars-hackathon

# Install dependencies
npm install

# Start the development server
npm run dev
