import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  ArrowRight,
  TrendingDown,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const BeforeAfterComparison: React.FC = () => {
  const { t } = useFarmShield();

  const trendData = [
    { stage: 'Baseline', score: 48, label: 'Early Rain' },
    { stage: 'Warning', score: 78, label: '70mm Spike (High)' },
    { stage: 'Action', score: 63, label: 'Drainage Dug' },
    { stage: 'Verified', score: 52, label: 'AI Verified (Improving)' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t('beforeAfterComparison')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Closing the loop: field evidence feeds into the risk engine to verify risk mitigation.
          </p>
        </div>

        <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          DEMO FIELD RECORD: SATARA-26
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-6">
        <div className="md:col-span-4 bg-red-50/40 rounded-xl p-4 border border-red-200">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-mono font-bold text-red-700 uppercase tracking-wider">
              {t('beforeIntervention')}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-500 text-white uppercase">
              HIGH RISK (78)
            </span>
          </div>

          <div className="rounded-lg overflow-hidden h-36 border border-red-200 mb-3 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
              alt="Field Before Intervention"
              className="w-full h-full object-cover opacity-85"
            />
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Observed Stress:</span>
              <span className="font-bold text-red-700">Standing Water (3cm)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Crop Vulnerability:</span>
              <span className="font-bold text-slate-900">Flower Abortion Risk</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col items-center justify-center text-slate-400 my-2 md:my-0">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <ArrowRight className="w-5 h-5 hidden md:block" />
            <ArrowDownRight className="w-5 h-5 md:hidden" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 mt-1 uppercase">Advisory</span>
        </div>

        <div className="md:col-span-4 bg-emerald-50/40 rounded-xl p-4 border border-emerald-200">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
              {t('afterIntervention')}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-white uppercase">
              MEDIUM RISK (52)
            </span>
          </div>

          <div className="rounded-lg overflow-hidden h-36 border border-emerald-200 mb-3 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80"
              alt="Field After Intervention"
              className="w-full h-full object-cover opacity-85"
            />
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Observed Stress:</span>
              <span className="font-bold text-emerald-700">Improving (Water Receded)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Canopy Condition:</span>
              <span className="font-bold text-emerald-900">Flower Set Preserved</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col justify-between text-center h-full">
          <div>
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {t('updatedFarmRisk')}
            </span>
            <div className="my-3">
              <span className="text-4xl font-black text-white">52</span>
              <span className="text-xs text-slate-400 font-bold ml-1">/ 100</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <TrendingDown className="w-3.5 h-3.5" />
              26 Point Risk Reduction
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-tight font-light">
            Risk safely reduced from Critical (78) to Managed (52) via timely field drainage.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <span>Temporal Risk Progression (Before ? Action ? Verified After)</span>
          </span>
          <span className="text-emerald-700 font-mono font-bold text-[11px]">Active Closed-Loop</span>
        </div>

        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(val: number) => [`${val} / 100`, 'Risk Score']}
                contentStyle={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '8px', fontSize: '11px', border: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#059669' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
