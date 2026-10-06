import React from 'react';
import { CloudRain, Cpu, AlertTriangle, Sprout, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export const VisualPipeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Weather Data',
      subtitle: 'Telemetry Feed',
      desc: 'Rainfall volume, temperature peaks, humidity & soil moisture telemetry.',
      icon: CloudRain,
      color: 'sky'
    },
    {
      num: '02',
      title: 'AI Risk Engine',
      subtitle: 'Phenology Core',
      desc: 'Normalizes raw weather anomalies against regional agro-climatic baselines.',
      icon: Cpu,
      color: 'indigo'
    },
    {
      num: '03',
      title: 'Hazard Detection',
      subtitle: 'Multi-Threat Matrix',
      desc: 'Categorizes rainfall spike, heatwave, waterlogging, or disease window.',
      icon: AlertTriangle,
      color: 'amber'
    },
    {
      num: '04',
      title: 'Crop + Growth Stage',
      subtitle: 'Vulnerability Index',
      desc: 'Evaluates crop species & active growth stage (e.g. flowering vs vegetative).',
      icon: Sprout,
      color: 'emerald'
    },
    {
      num: '05',
      title: 'Crop Stress Prediction',
      subtitle: 'Agronomic Impact',
      desc: 'Translates climate hazard into physiological damage (e.g. root hypoxia, petal drop).',
      icon: ShieldAlert,
      color: 'rose'
    },
    {
      num: '06',
      title: 'Action Recommendation',
      subtitle: 'Intervention Window',
      desc: 'Prescribes precise, timed physical actions BEFORE crop loss occurs.',
      icon: CheckCircle2,
      color: 'emerald'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>End-to-End Intelligence Pipeline</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            How FarmShield AI Converts Climate Data into Crop Protection
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Weather forecast alone does not equal crop protection. Our multi-stage pipeline maps physics to plant biology.
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            Closed-Loop Decision Logic
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="relative bg-slate-50/70 hover:bg-white rounded-xl p-3.5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-all">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 transition-colors leading-tight">
                  {step.title}
                </h4>
                <p className="text-[10px] font-mono font-semibold text-slate-500 mt-0.5">
                  {step.subtitle}
                </p>
                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none group-hover:text-emerald-400 transition-colors">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Differentiator: Conventional apps stop at Step 01. FarmShield carries the insight all the way to Step 06.</span>
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          AI-assisted risk classification prototype
        </span>
      </div>
    </div>
  );
};
