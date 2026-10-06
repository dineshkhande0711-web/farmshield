import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  AlertTriangle,
  HelpCircle,
  Clock,
  Sprout,
  ArrowDownRight
} from 'lucide-react';

export const CurrentRiskCard: React.FC = () => {
  const { cropRisk, farmProfile, setIsWhyModalOpen, t } = useFarmShield();

  const isHigh = cropRisk.severity === 'HIGH' || cropRisk.overallScore >= 75;
  const isMedium = cropRisk.severity === 'MEDIUM';

  const badgeColor = isHigh
    ? 'bg-red-500 text-white'
    : isMedium
    ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  const ringColor = isHigh
    ? 'stroke-red-500 text-red-500'
    : isMedium
    ? 'stroke-amber-500 text-amber-500'
    : 'stroke-emerald-500 text-emerald-500';

  const cardBorder = isHigh ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200';

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (cropRisk.overallScore / 100) * circumference;

  return (
    <div className={`bg-white rounded-2xl p-6 border ${cardBorder} shadow-sm relative overflow-hidden flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              {t('currentCropRisk')}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
              {t('demoDataWarning')}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {cropRisk.primaryHazard}
            </h2>
            <span className={`px-2.5 py-1 rounded-md text-xs font-black tracking-wide uppercase ${badgeColor}`}>
              {cropRisk.severity}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsWhyModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200"
          title="Click to view mathematical reasoning and crop stage sensitivity breakdown"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
          <span>Why? (AI)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-2">
        <div className="md:col-span-5 flex items-center justify-center sm:justify-start gap-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-slate-100 fill-none"
                strokeWidth="11"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                className={`${ringColor} fill-none transition-all duration-700 ease-out`}
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">
                {cropRisk.overallScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400 -mt-1">/ 100</span>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <p className="text-xs font-bold text-slate-500 uppercase">{t('riskScore')}</p>
            <p className="text-sm font-extrabold text-slate-900">
              {cropRisk.overallScore >= 75 ? 'Critical Field Risk' : cropRisk.overallScore >= 45 ? 'Elevated Alert' : 'Safe Baseline'}
            </p>
            {cropRisk.updatedAfterVerification && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                <ArrowDownRight className="w-3.5 h-3.5" /> Reduced from 78
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">Expected Window</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">{cropRisk.expectedWindow}</p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium">Active Crop & Stage</span>
            </div>
            <p className="text-xs font-bold text-emerald-900 mt-1">
              {farmProfile.cropName.split(' ')[0]} — {farmProfile.growthStageName.split(' ')[0]}
            </p>
          </div>

          <div className="col-span-2 pt-2 border-t border-slate-200/60 text-xs">
            <span className="text-slate-500">Soil Drainage Index: </span>
            <span className="font-semibold text-slate-800">Clay-Loam (High Saturation Retention)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            {t('whyHighRisk')}
          </h4>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-600 pl-1">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
            <span>Heavy rainfall (70mm expected) exceeds Satara natural infiltration capacity.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
            <span><strong>Flowering stage is acutely moisture-sensitive:</strong> excess water causes flower drop and pollen rot.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
            <span>Standing-water risk is elevated in furrow depressions without lateral drainage outlets.</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-[11px]">Telemetry ID: FS-78-SAT-09</span>
        <button
          onClick={() => setIsWhyModalOpen(true)}
          className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Inspect AI Decision Formula</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
