import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { DEMO_SCENARIOS } from '../services/scenarios';
import {
  Thermometer,
  CloudRain,
  Droplets,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sprout,
  Sun
} from 'lucide-react';

export const CoreDecisionDashboard: React.FC = () => {
  const {
    cropRisk,
    weather,
    farmProfile,
    recommendedAction,
    markActionCompleted,
    setIsWhyModalOpen,
    setActiveTab,
    currentScenarioId
  } = useFarmShield();

  const currentScenario = DEMO_SCENARIOS[currentScenarioId] || DEMO_SCENARIOS['scenario-a'];

  const isHigh = cropRisk.overallScore >= 75 || cropRisk.severity === 'HIGH';
  const isMedium = cropRisk.overallScore >= 45 && cropRisk.overallScore < 75;

  const riskBadgeColor = isHigh
    ? 'bg-red-500 text-white border-red-600'
    : isMedium
    ? 'bg-amber-500 text-white border-amber-600'
    : 'bg-emerald-600 text-white border-emerald-700';

  const riskBorderColor = isHigh
    ? 'border-red-300 ring-2 ring-red-100'
    : isMedium
    ? 'border-amber-300 ring-2 ring-amber-100'
    : 'border-emerald-300 ring-2 ring-emerald-100';

  return (
    <section className="space-y-6">
      {/* 4-Card Main Layout */}
      <div className={`bg-white rounded-3xl border ${riskBorderColor} shadow-md overflow-hidden transition-all duration-300`}>
        {/* Card Header: FARM SHIELD AI + Climate Risk Status */}
        <div className="bg-slate-900 text-white px-6 py-5 sm:px-8 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-black tracking-widest text-emerald-400 uppercase">
                FARM SHIELD AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Decision-First Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 flex items-center gap-3">
              <span>Climate Risk:</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-sm sm:text-base font-extrabold uppercase border ${riskBadgeColor}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                <span>{cropRisk.severity} ({cropRisk.overallScore}/100)</span>
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-2">
              <span>Target: <strong>{farmProfile.cropName.split(' ')[0]} ({farmProfile.growthStageName.split(' ')[0]})</strong></span>
              <span>•</span>
              <span>Location: <strong>{farmProfile.location}</strong></span>
              <span>•</span>
              <span className="text-emerald-400">Primary Threat: <strong>{cropRisk.primaryHazard}</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-left sm:text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Core Principle</span>
              <span className="text-xs font-bold text-emerald-300">
                “AI should produce a decision, not just a prediction.”
              </span>
            </div>
            <button
              onClick={() => setIsWhyModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition cursor-pointer shadow-sm shrink-0"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Explain Why?</span>
            </button>
          </div>
        </div>

        {/* 3-Column Weather Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-b border-slate-200 bg-slate-50/70">
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Temperature
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {weather.temperature}°C
              </div>
              <span className="text-[11px] text-slate-500">
                Feels like {weather.feelsLike}°C
              </span>
            </div>
          </div>

          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Rainfall
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {weather.expectedRainfallMm} mm
              </div>
              <span className="text-[11px] text-slate-500">
                {weather.rainProbability}% probability in 36h
              </span>
            </div>
          </div>

          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Humidity
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {weather.humidity}%
              </div>
              <span className="text-[11px] text-slate-500">
                Saturation index elevated
              </span>
            </div>
          </div>
        </div>

        {/* AI Risk Analysis + What Should The Farmer Do (2 Major Decision Sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Card 3: AI RISK ANALYSIS */}
          <div className="lg:col-span-6 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Multi-Hazard Engine
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  AI RISK ANALYSIS
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                Prototype Heuristics
              </span>
            </div>

            <p className="text-xs text-slate-500">
              FarmShield calculates stress indices by weighting weather telemetry against crop stage sensitivity:
            </p>

            <div className="space-y-3.5 pt-1">
              {currentScenario.hazards.slice(0, 3).map((hazard) => {
                const isItemHigh = hazard.riskScore >= 70;
                const isItemMed = hazard.riskScore >= 40 && hazard.riskScore < 70;
                const barColor = isItemHigh ? 'bg-red-500' : isItemMed ? 'bg-amber-500' : 'bg-emerald-500';

                return (
                  <div key={hazard.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {hazard.id === 'excess_rainfall' && <CloudRain className="w-4 h-4 text-sky-600" />}
                        {hazard.id === 'heat_stress' && <Sun className="w-4 h-4 text-amber-600" />}
                        {hazard.id === 'water_stress' && <Droplets className="w-4 h-4 text-blue-600" />}
                        {hazard.id === 'disease_risk' && <AlertTriangle className="w-4 h-4 text-purple-600" />}
                        <span className="text-xs font-bold text-slate-900">{hazard.name}</span>
                      </div>
                      <span className="text-xs font-black font-mono text-slate-900">{hazard.riskScore}%</span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${barColor} h-2 rounded-full transition-all duration-700`}
                        style={{ width: `${hazard.riskScore}%` }}
                      ></div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      {hazard.shortExplanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: WHAT SHOULD THE FARMER DO? */}
          <div className="lg:col-span-6 p-6 sm:p-7 space-y-4 bg-emerald-50/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    Actionable Prescriptions
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    WHAT SHOULD THE FARMER DO?
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {recommendedAction.actionWindow}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-2">
                Execute these high-priority physical interventions before the weather threshold is crossed:
              </p>

              <div className="space-y-3 pt-3">
                {currentScenario.actionItems.map((action, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3 hover:border-emerald-300 transition"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      {i === 0 && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {i === 1 && <Droplets className="w-4 h-4 text-sky-600" />}
                      {i === 2 && <Sprout className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={markActionCompleted}
                disabled={recommendedAction.isCompleted}
                className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  recommendedAction.isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-98'
                }`}
              >
                {recommendedAction.isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Action Completed ✓ (Risk Reduced)</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mark Action as Completed</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveTab('verification')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Verify with Photo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent "Why?" Feature Breakdown Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-emerald-50 rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
              {currentScenario.whyTitle}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Explainable AI Phenology Breakdown
            </span>
          </div>

          <button
            onClick={() => setIsWhyModalOpen(true)}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
          >
            <span>View Full Mathematical Calculation</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {currentScenario.whyBullets.map((bullet, idx) => (
            <div key={idx} className="bg-white/90 p-3.5 rounded-xl border border-amber-100 flex items-start gap-2.5 shadow-2xs">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-700 leading-snug">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold text-emerald-900 uppercase">Recommended Action:</span>
            <span className="text-slate-700 font-semibold">{currentScenario.recommendedAction.title}</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 font-bold">
            {currentScenario.recommendedAction.timingLabel}
          </span>
        </div>
      </div>
    </section>
  );
};
