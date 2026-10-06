import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  CloudRain,
  Sun,
  Droplets,
  ThermometerSnowflake,
  Bug,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight
} from 'lucide-react';

export const MultiHazardMonitor: React.FC = () => {
  const { hazards, setSelectedHazardDetail, t } = useFarmShield();

  const getIcon = (id: string) => {
    switch (id) {
      case 'excess_rainfall': return CloudRain;
      case 'heat_stress': return Sun;
      case 'water_stress': return Droplets;
      case 'temperature_shock': return ThermometerSnowflake;
      case 'disease_risk': return Bug;
      default: return CloudRain;
    }
  };

  const getTrendIcon = (trend: 'increasing' | 'stable' | 'decreasing') => {
    switch (trend) {
      case 'increasing':
        return <span className="text-red-600 flex items-center text-[10px] font-bold"><TrendingUp className="w-3 h-3 mr-0.5" /> Rising</span>;
      case 'decreasing':
        return <span className="text-emerald-600 flex items-center text-[10px] font-bold"><TrendingDown className="w-3 h-3 mr-0.5" /> Easing</span>;
      default:
        return <span className="text-slate-500 flex items-center text-[10px] font-bold"><Minus className="w-3 h-3 mr-0.5" /> Stable</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t('multiHazardMonitor')}
            </h3>
            <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200">
              5 Compound Signals
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any hazard card to view agronomic trigger thresholds and underlying atmospheric triggers.
          </p>
        </div>

        <span className="text-xs text-slate-400 italic">
          Click card for breakdown
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {hazards.map((h) => {
          const Icon = getIcon(h.id);
          const isHigh = h.severity === 'HIGH' || h.severity === 'CRITICAL';
          const isMedium = h.severity === 'MEDIUM';

          const badgeBg = isHigh
            ? 'bg-red-100 text-red-800 border-red-200'
            : isMedium
            ? 'bg-amber-100 text-amber-800 border-amber-200'
            : 'bg-emerald-100 text-emerald-800 border-emerald-200';

          const cardBorder = isHigh
            ? 'border-red-200 bg-red-50/20 hover:border-red-400'
            : isMedium
            ? 'border-amber-200 bg-amber-50/10 hover:border-amber-400'
            : 'border-slate-200 hover:border-emerald-300';

          return (
            <div
              key={h.id}
              onClick={() => setSelectedHazardDetail(h)}
              className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 ${cardBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isHigh ? 'bg-red-50 text-red-600' : isMedium ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                  } border border-slate-100 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${badgeBg}`}>
                    {h.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{h.name}</h4>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-2xl font-black text-slate-900">{h.riskScore}</span>
                  <span className="text-xs text-slate-400 font-bold">/ 100</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1 font-normal">
                  {h.shortExplanation}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                {getTrendIcon(h.trend)}
                <span className="text-slate-400 group-hover:text-slate-700 flex items-center text-[11px] font-semibold">
                  Why? <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
