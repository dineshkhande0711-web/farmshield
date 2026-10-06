import React from 'react';
import {
  CloudRain,
  Sun,
  Droplet,
  ThermometerSnowflake,
  Bug,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const hazards = [
    {
      title: 'Excess Rainfall',
      subtitle: 'Waterlogging and root stress',
      icon: CloudRain,
      bg: 'bg-blue-50/80',
      border: 'border-blue-200',
      iconColor: 'text-blue-600',
      accent: 'text-blue-900'
    },
    {
      title: 'Heat Stress',
      subtitle: 'Flower and crop stress',
      icon: Sun,
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      iconColor: 'text-amber-600',
      accent: 'text-amber-900'
    },
    {
      title: 'Water Stress',
      subtitle: 'Moisture deficit',
      icon: Droplet,
      bg: 'bg-cyan-50/80',
      border: 'border-cyan-200',
      iconColor: 'text-cyan-600',
      accent: 'text-cyan-900'
    },
    {
      title: 'Temperature Shock',
      subtitle: 'Growth disruption',
      icon: ThermometerSnowflake,
      bg: 'bg-orange-50/80',
      border: 'border-orange-200',
      iconColor: 'text-orange-600',
      accent: 'text-orange-900'
    },
    {
      title: 'Climate Disease Risk',
      subtitle: 'Favorable disease/pest pressure',
      icon: Bug,
      bg: 'bg-purple-50/80',
      border: 'border-purple-200',
      iconColor: 'text-purple-600',
      accent: 'text-purple-900'
    }
  ];

  return (
    <section id="problem-section" className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            The Agro-Climatic Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Climate Risk Is No Longer One Problem
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Compounding shocks interact dynamically with soil moisture and biological crop stages. An isolated rain forecast cannot protect against localized vulnerability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-12">
          {hazards.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className={`${h.bg} ${h.border} border rounded-xl p-4 transition hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center ${h.iconColor} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-sm font-bold ${h.accent}`}>{h.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">{h.subtitle}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Hazard 0{i + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white p-6 sm:p-8 border border-slate-700 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              The Central Agricultural Gap
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Weather Forecast <span className="text-red-400 font-mono">?</span> Crop Protection
            </h3>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-medium">
              ?Farmers need to know what a weather event means for their specific crop and growth stage?and what action should be taken.?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
              <div className="bg-slate-800/80 rounded-xl p-5 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <XCircle className="w-4 h-4" />
                  Traditional Weather App
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Satellite Telemetry ? 'Rain: 70mm' ? Confused Farmer
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">?</span>
                    <span>Tells what the sky does, not what the root or flower feels.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">?</span>
                    <span>Blind to growth stage (70mm is great for sugarcane, fatal for flowering pea).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-400 font-bold">?</span>
                    <span>One-way broadcast with zero follow-up on field outcome.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-950/50 rounded-xl p-5 border border-emerald-500/40">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle className="w-4 h-4" />
                  FarmShield AI Closed Loop
                </div>
                <p className="text-xs text-emerald-200/80 mb-3">
                  Weather ? Hazard ? Crop Stage ? Action ? Photo ? AI Verify
                </p>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">?</span>
                    <span>Converts raw millimeter forecast into localized physiological vulnerability.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">?</span>
                    <span>Dynamic phenology threshold for germination, flowering, and harvest.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">?</span>
                    <span>Verifies intervention effectiveness with farmer crop snapshots.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
