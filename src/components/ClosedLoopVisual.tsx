import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  CloudRain,
  ShieldCheck,
  Camera,
  Cpu,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export const ClosedLoopVisual: React.FC = () => {
  const { activeTab, setActiveTab, demoStep, isDemoRunning } = useFarmShield();

  const steps = [
    {
      num: '01',
      id: 'predict',
      name: 'PREDICT',
      label: 'Detect Climate Hazards',
      desc: 'Ingests real-time weather telemetry to flag rainfall spikes, heatwaves, or drought.',
      icon: CloudRain,
      tab: 'dashboard',
      color: 'sky',
      activeOnDemo: [1, 2, 3]
    },
    {
      num: '02',
      id: 'protect',
      name: 'PROTECT',
      label: 'Stage-Specific Action',
      desc: 'Evaluates crop phenology (e.g. Green Pea at flowering) and generates prescriptive advisory.',
      icon: ShieldCheck,
      tab: 'recommendations',
      color: 'emerald',
      activeOnDemo: [4, 5]
    },
    {
      num: '03',
      id: 'observe',
      name: 'OBSERVE',
      label: 'Farmer Field Evidence',
      desc: 'Farmer implements drainage advisory and captures field smartphone photo or video.',
      icon: Camera,
      tab: 'verification',
      color: 'amber',
      activeOnDemo: [6]
    },
    {
      num: '04',
      id: 'verify',
      name: 'VERIFY',
      label: 'AI Stress Analysis',
      desc: 'Computer vision evaluates standing water reduction, canopy turgor & stress trend.',
      icon: Cpu,
      tab: 'verification',
      color: 'purple',
      activeOnDemo: [7]
    },
    {
      num: '05',
      id: 'adapt',
      name: 'ADAPT',
      label: 'Update Risk & Calibrate',
      desc: 'Recalibrates farm risk score from 78 to 52, updates history, and issues adaptive advice.',
      icon: RefreshCw,
      tab: 'history',
      color: 'emerald',
      activeOnDemo: [8]
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              ?
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              The Signature Continuous Closed Loop
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            PREDICT ? PROTECT ? OBSERVE ? VERIFY ? ADAPT ? Closing the gap between forecast and field outcome.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Continuous Feedback Cycle</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCurrentlyActive = isDemoRunning
            ? step.activeOnDemo.includes(demoStep)
            : activeTab === step.tab;

          return (
            <div
              key={step.num}
              onClick={() => setActiveTab(step.tab)}
              className={`rounded-xl p-4 border transition cursor-pointer flex flex-col justify-between relative group ${
                isCurrentlyActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50'
                  : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-900 border-slate-200/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-extrabold ${isCurrentlyActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {step.num}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCurrentlyActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white shadow-xs text-slate-600 border border-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isCurrentlyActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {step.name}
                </h4>
                <p className={`text-sm font-bold mt-0.5 ${isCurrentlyActive ? 'text-white' : 'text-slate-900'}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-2 leading-relaxed ${isCurrentlyActive ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t text-[11px] font-medium flex items-center justify-between ${
                isCurrentlyActive ? 'border-slate-800 text-emerald-400' : 'border-slate-200 text-slate-400 group-hover:text-emerald-700'
              }`}>
                <span>Inspect Stage</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 bg-emerald-50/80 rounded-xl px-4 py-2.5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-900 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>The Closed-Loop Difference:</strong> Stage 05 field verification automatically recalibrates Stage 01 continuous risk models.
          </span>
        </div>
        <span className="text-[11px] text-emerald-700 font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 shrink-0">
          05 ADAPT ? 01 PREDICT
        </span>
      </div>
    </div>
  );
};
