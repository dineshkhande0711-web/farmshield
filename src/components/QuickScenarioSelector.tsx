import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { CropType, GrowthStage } from '../types';
import { DEMO_SCENARIOS } from '../services/scenarios';
import { Sparkles, MapPin, Sprout, ArrowRight, Layers, SlidersHorizontal, Check } from 'lucide-react';

export const QuickScenarioSelector: React.FC = () => {
  const {
    farmProfile,
    currentScenarioId,
    selectScenario,
    analyzeRiskCustom
  } = useFarmShield();

  const [selectedCrop, setSelectedCrop] = useState<CropType>(farmProfile.crop);
  const [selectedLocation, setSelectedLocation] = useState<string>(farmProfile.location);
  const [selectedStage, setSelectedStage] = useState<GrowthStage>(farmProfile.growthStage);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await analyzeRiskCustom(selectedCrop, selectedLocation, selectedStage);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 400);
  };

  const handlePresetSelect = (id: 'scenario-a' | 'scenario-b' | 'scenario-c') => {
    selectScenario(id);
    const sc = DEMO_SCENARIOS[id];
    setSelectedCrop(sc.crop);
    setSelectedLocation(sc.location);
    setSelectedStage(sc.growthStage);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-3.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              <SlidersHorizontal className="w-3 h-3 text-emerald-600" />
              Dynamic Simulation & Scenario Engine
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline-block">
              AI-assisted risk classification prototype
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
            Test Multi-Hazard Scenarios: Change Weather & Crop Stage
          </h3>
          <p className="text-xs text-slate-500">
            Witness how FarmShield adjusts risk scores, "Why?" causality, and actions dynamically when parameters change.
          </p>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Presets:</span>
          <button
            onClick={() => handlePresetSelect('scenario-a')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentScenarioId === 'scenario-a'
                ? 'bg-red-500 text-white shadow-xs ring-2 ring-red-300'
                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
            }`}
            title="Heavy rain & waterlogging on flowering pea in Satara"
          >
            {currentScenarioId === 'scenario-a' && <Check className="w-3 h-3" />}
            <span>🔴 Satara Pea (82% Rain)</span>
          </button>

          <button
            onClick={() => handlePresetSelect('scenario-b')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentScenarioId === 'scenario-b'
                ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
            title="Heatwave & moisture deficit on flowering soybean in Solapur"
          >
            {currentScenarioId === 'scenario-b' && <Check className="w-3 h-3" />}
            <span>🟠 Solapur Heat (38.5°C)</span>
          </button>

          <button
            onClick={() => handlePresetSelect('scenario-c')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentScenarioId === 'scenario-c'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Favorable mild conditions for vegetative green pea in Nashik"
          >
            {currentScenarioId === 'scenario-c' && <Check className="w-3 h-3" />}
            <span>🟢 Nashik Mild (24% Low)</span>
          </button>
        </div>
      </div>

      {/* Interactive Selection Bar: Crop -> Location -> Stage -> ANALYZE RISK */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        <div className="sm:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>1. Select Crop</span>
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value as CropType)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden transition cursor-pointer"
          >
            <option value="green_pea">Green Pea (मटार) — Legume</option>
            <option value="soybean">Soybean (सोयाबीन) — Oilseed</option>
            <option value="sugarcane">Sugarcane (ऊस) — Cash Crop</option>
            <option value="tomato">Tomato (टोमॅटो) — Vegetable</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>2. Select Location</span>
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden transition cursor-pointer"
          >
            <option value="Satara, Maharashtra">Satara, Maharashtra (Heavy Rain Zone)</option>
            <option value="Solapur, Maharashtra">Solapur, Maharashtra (Semi-Arid Heat Zone)</option>
            <option value="Nashik, Maharashtra">Nashik, Maharashtra (Temperate Valley)</option>
            <option value="Pune, Maharashtra">Pune, Maharashtra (Deccan Plateau)</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>3. Select Growth Stage</span>
          </label>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value as GrowthStage)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden transition cursor-pointer"
          >
            <option value="flowering">Flowering (Peak Moisture/Heat Sensitive)</option>
            <option value="vegetative">Vegetative (High Biomass Resilience)</option>
            <option value="pod_formation">Pod Formation / Fruit Setting</option>
            <option value="germination">Germination & Emergence</option>
            <option value="maturity">Ripening & Maturity</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl px-4 py-2.5 shadow-md shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer disabled:opacity-60"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Calculating...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ ANALYZE RISK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
