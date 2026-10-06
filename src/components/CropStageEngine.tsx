import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { GrowthStage } from '../types';
import {
  ArrowRight,
  Sliders
} from 'lucide-react';

export const CropStageEngine: React.FC = () => {
  const { farmProfile, switchCropStage, cropRisk, t } = useFarmShield();

  const stages: { id: GrowthStage; label: string; sensitivity: string; vulnerable: boolean }[] = [
    { id: 'germination', label: 'Germination', sensitivity: 'Moderate', vulnerable: false },
    { id: 'vegetative', label: 'Vegetative', sensitivity: 'Low', vulnerable: false },
    { id: 'flowering', label: 'Flowering (Active)', sensitivity: 'Critical (0.95)', vulnerable: true },
    { id: 'pod_formation', label: 'Pod Formation', sensitivity: 'High (0.70)', vulnerable: true },
    { id: 'maturity', label: 'Harvest/Maturity', sensitivity: 'Moderate', vulnerable: false }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t('whyCropStageMatters')} — The Core Differentiator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            The exact same 70mm rainfall produces radically different risk profiles depending on phenological growth stage.
          </p>
        </div>

        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
          Phenology Matrix Active
        </span>
      </div>

      <div className="mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            Simulate Different Growth Stages for Green Pea:
          </span>
          <span className="text-slate-400 font-normal">(Click a stage to recompute risk live)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {stages.map((st) => {
            const isSelected = farmProfile.growthStage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => switchCropStage(st.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition text-left flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{st.label.split(' ')[0]}</span>
                  {st.vulnerable && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
                    }`}>
                      Vulnerable
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-mono ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  Sens: {st.sensitivity}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        <div className="md:col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-200 text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {t('weatherCondition')}
          </span>
          <h4 className="text-base font-extrabold text-blue-900 mt-1">
            70 mm Heavy Rainfall
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            High precipitation spike over 36 hours. Saturated topsoil conditions.
          </p>
        </div>

        <div className="hidden md:flex justify-center text-slate-400">
          <ArrowRight className="w-5 h-5 text-slate-400" />
        </div>

        <div className="md:col-span-2 bg-amber-50/70 rounded-xl p-4 border border-amber-200 text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
            {t('systemInterpretation')}
          </span>
          <h4 className="text-base font-extrabold text-amber-950 mt-1">
            {farmProfile.growthStage === 'flowering' ? 'High Moisture Sensitivity' : 'Resilient Root Resistance'}
          </h4>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
            {farmProfile.growthStage === 'flowering'
              ? 'Flowering Green Pea cannot tolerate standing water; causes blossom abortion and flower drop.'
              : 'Crop can absorb soil water with minimal foliar detachment during this growth stage.'}
          </p>
        </div>

        <div className="hidden md:flex justify-center text-slate-400">
          <ArrowRight className="w-5 h-5 text-slate-400" />
        </div>

        <div className={`md:col-span-2 rounded-xl p-4 border text-left ${
          cropRisk.overallScore >= 75
            ? 'bg-red-50 border-red-200 text-red-950'
            : cropRisk.overallScore >= 45
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
            {t('resultHeading')}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h4 className="text-lg font-black tracking-tight">
              {cropRisk.severity} CROP RISK
            </h4>
            <span className="text-xs font-mono font-extrabold">({cropRisk.overallScore}/100)</span>
          </div>
          <p className="text-xs opacity-80 mt-1 leading-relaxed">
            {cropRisk.overallScore >= 75
              ? 'Urgent drainage intervention required before rainfall.'
              : 'Routine field scouting; no immediate threat.'}
          </p>
        </div>
      </div>
    </div>
  );
};
