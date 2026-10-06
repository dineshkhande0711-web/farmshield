# FarmShield AI 🛡️🌾
### AI-Powered Multi-Hazard Climate Impact & Early Intervention System for Agriculture

> **“From Climate Prediction to Crop Protection.”**  
> *PCCOE International Grand Challenge 2026 — Track: AI for Climate Change*

---

## 🌾 The Problem: Weather Forecast ≠ Crop Protection

Generic weather forecasts tell farmers when it might rain, but **never what that rain actually means for their specific crop and growth stage**—or what physical countermeasure must be executed before crop loss occurs.

Conventional agro-advisory platforms (such as basic SMS bulletins or ICRISAT dashboards) broadcast broad regional weather predictions without a closed-loop verification mechanism. 

**FarmShield AI bridges this gap:**
> *"FarmShield doesn't stop at weather prediction. It connects the predicted hazard to crop-stage-specific stress, prescribes timed physical interventions before damage occurs, and verifies field implementation with an adaptive feedback loop."*

---

## 🔄 The FarmShield Continuous Closed Loop

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 01 PREDICT  │ ──> │ 02 PROTECT  │ ──> │ 03 OBSERVE  │ ──> │  04 VERIFY  │ ──> │  05 ADAPT   │
│ Climate Data│     │ Action Plan │     │ Field Photos│     │ AI Vision   │     │ Updated Risk│
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

1. **PREDICT**: Ingests multi-hazard environmental telemetry (precipitation volume, heat peaks, vapor deficit, soil saturation).
2. **PROTECT**: Evaluates the hazard against crop phenology (e.g. Green Pea during sensitive Flowering stage) and generates prescriptive countermeasures with specific intervention windows.
3. **OBSERVE**: Farmer implements physical countermeasures (e.g., digging lateral drainage trenches) and captures ground-truth field imagery.
4. **VERIFY**: Computer vision feature analysis verifies water removal, standing pool resolution, and foliar recovery.
5. **ADAPT**: Farm risk scores recalculate dynamically (e.g. from 82/100 HIGH down to 52/100 MEDIUM), closing the loop.

---

## ⚡ Key Innovations & Features

### 1. 4-Card Core Decision Dashboard
Designed around the philosophy: **“AI should produce a decision, not just a prediction.”**
- **Climate Risk Status**: Real-time severity classification (e.g., `HIGH 🔴 82/100`).
- **3-Column Weather Grid**: Immediate telemetry readings (`34°C` Temperature, `82 mm` Rain, `87%` Humidity).
- **AI Risk Analysis**: Multi-hazard breakdown (`Excess Rainfall 82%`, `Heat Stress 67%`, `Waterlogging 74%`).
- **What Should The Farmer Do?**: Specific physical action checklist (e.g., *“Improve drainage: clear furrows at 10m intervals”*, *“Avoid irrigation”*, *“Monitor crop stress”*).

### 2. Explainable AI "Why?" Phenology Engine
Farmers and agricultural officers don't have to guess why a score is high:
- **Alert**: `HIGH WATERLOGGING RISK — 82%`
- **Why?**:
  - Heavy rainfall expected (82 mm in next 36 hours)
  - High soil moisture (Satara black clay-loam saturation index at 87%)
  - Crop is in flowering stage (High flower detachment and root hypoxia sensitivity)
- **Recommended Action**: Open lateral drainage channels immediately to prevent blossom loss.

### 3. Visual 6-Stage Intelligence Pipeline
```
Weather Data → AI Risk Engine → Hazard Detection → Crop + Growth Stage → Crop Stress Prediction → Action Recommendation
```

### 4. Interactive Simulation & Multi-Hazard Presets
Evaluate three distinct real-world agricultural scenarios with one click:
- **🔴 Scenario A: Satara Pea (82% Heavy Rain)**: Waterlogging threat during flowering stage in black clay-loam soil.
- **🟠 Scenario B: Solapur Soybean (38.5°C Heatwave)**: Moisture deficit and flower abortion under extreme thermal stress.
- **🟢 Scenario C: Nashik Pea (24% Low Risk)**: Favorable mild growing season for vegetative stage development.

### 5. Multi-Hazard Risk Monitor
Simultaneous monitoring across 5 primary climate perils:
- 🌧 **Rainfall Risk** (Waterlogging & root suffocation)
- ☀️ **Heat Stress** (Pollen desiccation & thermal scorch)
- 💧 **Water Stress** (Vapor pressure deficit & drought)
- 🌡 **Temperature Shock** (Diurnal fluctuation anomalies)
- 🦠 **Disease Favorability** (Canopy wetness & fungal sporulation)

### 6. Multilingual Decision Support
Full interface localized in:
- English
- मराठी (Marathi)
- हिंदी (Hindi)

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite 6
- **UI Components & Icons**: Lucide-react, Canvas-Confetti, Recharts
- **Backend API**: Node.js, Express 4, TSX (TypeScript Execute)
- **Agronomic Knowledge Base**: ICAR & KVK phenology matrices calibrated for Maharashtra agro-climatic zones
- **AI / Computer Vision Pipeline**: Feature analysis for surface water ponding, chlorosis detection, and canopy integrity
- **Serving Architecture**: Unified Express server providing pre-rendered accessible semantic HTML (zero blank states) with seamless React client-side hydration

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dineshkhande0711-web/farmshield.git
   cd farmshield
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Start the backend API & unified production server:**
   ```bash
   npx tsx server/index.ts
   ```
   Backend runs on [http://localhost:5000](http://localhost:5000) with active endpoints:
   - `GET /api/weather` — Weather telemetry feed
   - `POST /api/risk` — Multi-hazard crop risk calculation
   - `GET /api/recommendations` — Prescriptive action generator
   - `GET /api/crops` — Phenological catalog and stage thresholds
   - `POST /api/verification` — AI vision verification simulator
   - `GET /api/history` — 5-day risk and intervention timeline
   - `GET /api/admin/overview` — Regional agricultural officer dashboard

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👥 Authors & Team Credits

- **Dinesh Khande** — *Lead Architecture & Agronomic Logic*
- **Akshay Ryakawar** — *Full-Stack Development & AI Integration*
- **Sanskar Penshanwar** — *Data Modeling & UI/UX Systems*

*JSPM College of Engineering, Savitribai Phule Pune University (SPPU)*  
*Participating in PCCOE International Grand Challenge 2026 (AI for Climate Change Track)*

---

## 📜 License & Disclaimer

FarmShield AI is developed as an AI-assisted decision-support prototype. It complements official meteorological advisories and agronomist guidance. Distributed under the MIT License.
