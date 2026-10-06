import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  X,
  Cpu,
  Sprout,
  Sparkles
} from 'lucide-react';

export const WhyExplanationModal: React.FC = () => {
  const { isWhyModalOpen, setIsWhyModalOpen, cropRisk, farmProfile, weather } = useFarmShield();

  if (!isWhyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-white">
                  WHY THIS RISK? — Explainable AI Breakdown
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  Transparent
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                FarmShield AI exposes its physiological reasoning equation instead of generating a black-box number.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhyModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Visual Formula Stack Card */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Multivariate Phenological Risk Equation
            </span>

            <div className="space-y-2.5 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-600">[1] Weather Signal (Precipitation Spike)</span>
                <span className="font-bold text-blue-700">{weather.expectedRainfallMm} mm / 36h (Prob: {weather.rainProbability}%)</span>
              </div>

              <div className="text-center text-slate-400 font-black text-sm">+</div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-600">[2] Crop Biological Species</span>
                <span className="font-bold text-emerald-800">{farmProfile.cropName.split(' ')[0]} (Legume / Pisum sativum)</span>
              </div>

              <div className="text-center text-slate-400 font-black text-sm">+</div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-600">[3] Growth Stage Sensitivity Factor</span>
                <span className="font-bold text-amber-700">{farmProfile.growthStageName.split(' ')[0]} (Factor: 0.95)</span>
              </div>

              <div className="text-center text-slate-400 font-black text-sm">+</div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-slate-600">[4] Soil Texture Percolation Buffer</span>
                <span className="font-bold text-purple-700">Clay-Loam Saturation (1.05)</span>
              </div>

              <div className="border-t-2 border-slate-300 pt-2 flex items-center justify-between font-black text-sm sm:text-base text-slate-900">
                <span>RESULTING CROP RISK:</span>
                <span className="text-red-600 font-black">{cropRisk.overallScore} / 100 ({cropRisk.severity} RISK)</span>
              </div>
            </div>
          </div>

          {/* Agronomic Context Explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" />
              Agronomic Rationale
            </h4>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>1. Why is 70mm dangerous right now?</strong> If Green Pea was in the early vegetative stage, this moisture would be safely absorbed by developing roots with minimal yield loss.
              </p>
              <p>
                <strong>2. The Flowering Vulnerability:</strong> During anthesis (flowering), legume flowers have fragile pedicels and delicate pollen grains. Prolonged standing water triggers sudden flower drop and inhibits bee pollination.
              </p>
              <p>
                <strong>3. Soil Water Retention:</strong> Satara's deep black clay-loam soils have high plasticity and slow internal percolation, causing surface water to stand for 24-48 hours unless lateral drainage cuts are made.
              </p>
            </div>
          </div>

          {/* Explainable AI Commitment */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Zero Black-Box Guarantee:</strong> FarmShield explains every risk score with transparent agronomic rules so extension officers and farmers can trust the recommendations before executing expensive fieldwork.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={() => setIsWhyModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
