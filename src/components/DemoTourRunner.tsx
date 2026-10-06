import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  ArrowRight,
  ArrowLeft,
  X,
  RotateCcw
} from 'lucide-react';

export const DemoTourRunner: React.FC = () => {
  const {
    isDemoRunning,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    stopDemoTour,
    resetDemoScenario
  } = useFarmShield();

  if (!isDemoRunning) return null;

  const demoStepsInfo = [
    {
      step: 1,
      title: 'Step 1: Weather Telemetry Ingested',
      desc: 'IMD simulated radar detects approaching 70mm rainfall spike over Satara in next 36 hours.',
      badge: 'Weather Detected'
    },
    {
      step: 2,
      title: 'Step 2: Multi-Hazard Engine Identifies Risk',
      desc: 'Heavy precipitation triggers severe waterlogging hazard, compounding with high soil saturation.',
      badge: 'Hazard Identified'
    },
    {
      step: 3,
      title: 'Step 3: Crop-Stage Vulnerability Computed',
      desc: 'Green Pea in "Flowering" stage has 0.95 sensitivity. Risk escalates to HIGH (78/100).',
      badge: 'Risk Calculated (78/100)'
    },
    {
      step: 4,
      title: 'Step 4: Prescriptive Protective Advisory Dispatched',
      desc: 'System sends specific pre-rainfall action: Dig lateral exit furrows and clear contour drainage.',
      badge: 'Advisory Generated'
    },
    {
      step: 5,
      title: 'Step 5: Farmer Completes Advisory in Field',
      desc: 'Farmer clears drainage pathways and marks action as completed on mobile dashboard.',
      badge: 'Action Completed'
    },
    {
      step: 6,
      title: 'Step 6: Field Evidence Uploaded',
      desc: 'Farmer captures smartphone field photograph of treated furrows for AI verification.',
      badge: 'Photo Uploaded'
    },
    {
      step: 7,
      title: 'Step 7: AI Computer Vision Verification',
      desc: 'CV model detects water receding through furrows & leaf turgor recovering. Status: 🟢 Stress Improving.',
      badge: 'AI Verified Improving'
    },
    {
      step: 8,
      title: 'Step 8: Adaptive Closed Loop Risk Recalibration',
      desc: 'Farm risk dynamically recalibrates from 78 down to 52 / 100. Continuous protection loop closed!',
      badge: 'Risk Recalibrated (52/100)'
    }
  ];

  const currentInfo = demoStepsInfo[demoStep - 1] || demoStepsInfo[0];

  return (
    <aside aria-label="Interactive Demo Controller" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-3xl bg-slate-950/95 backdrop-blur-md text-white rounded-2xl p-4 sm:p-5 border border-emerald-500/40 shadow-2xl shadow-black/60 animate-in slide-in-from-bottom-5 duration-300">
      
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
            Hackathon Live Demo Walkthrough
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Step {demoStep} of 8
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoScenario}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={stopDemoTour}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              {currentInfo.title}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              {currentInfo.badge}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            {currentInfo.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          {demoStep > 1 && (
            <button
              onClick={prevDemoStep}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {demoStep < 8 ? (
            <button
              onClick={nextDemoStep}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-md shadow-emerald-500/20"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={resetDemoScenario}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-md shadow-emerald-500/20"
            >
              <span>Finish & Reset</span>
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-1.5 mt-3 pt-2 border-t border-slate-800/80">
        {demoStepsInfo.map((s) => (
          <div
            key={s.step}
            className={`h-1 rounded-full flex-1 transition-all ${
              demoStep >= s.step ? 'bg-emerald-400' : 'bg-slate-800'
            }`}
          ></div>
        ))}
      </div>

      {demoStep === 8 && (
        <div className="mt-2.5 p-2 bg-emerald-950/80 rounded-lg border border-emerald-500/30 text-center text-xs text-emerald-300 font-semibold">
          ⭐ FarmShield converted a climate signal into a continuous crop-protection workflow.
        </div>
      )}

    </aside>
  );
};
