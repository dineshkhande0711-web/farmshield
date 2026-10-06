import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  X,
  Activity
} from 'lucide-react';

export const HazardDetailModal: React.FC = () => {
  const { selectedHazardDetail, setSelectedHazardDetail, farmProfile } = useFarmShield();

  if (!selectedHazardDetail) return null;

  const h = selectedHazardDetail;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center border border-slate-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{h.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  h.severity === 'HIGH' ? 'bg-red-500 text-white' : h.severity === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {h.severity}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-mono">Hazard Score: {h.riskScore} / 100</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedHazardDetail(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Telemetry Trigger Condition</span>
            <p className="font-bold text-slate-900 text-sm">{h.telemetryTrigger}</p>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-amber-950">
            <span className="font-bold text-amber-800 uppercase text-[10px] block mb-1">Agronomic Impact on {farmProfile.cropName.split(' ')[0]}</span>
            <p className="font-medium text-xs leading-relaxed">{h.agronomicImpact}</p>
          </div>

          <div>
            <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Assessment Explanation</span>
            <p className="text-slate-700 text-xs leading-relaxed">{h.shortExplanation}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
            <span>Model Ref: IMD-PHENOL-26</span>
            <button
              onClick={() => setSelectedHazardDetail(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
