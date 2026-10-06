import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  MapPin,
  Compass,
  Info
} from 'lucide-react';

export const FarmMapView: React.FC = () => {
  const { farmProfile, cropRisk, t } = useFarmShield();
  const [activeLayer, setActiveLayer] = useState<'radar' | 'moisture' | 'risk'>('radar');

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t('farmMap')} ? {farmProfile.location}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Micro-climate zone: Western Ghats Transition Zone (Zone MH-4, Satara)
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveLayer('radar')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              activeLayer === 'radar' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Precipitation Radar
          </button>
          <button
            onClick={() => setActiveLayer('moisture')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              activeLayer === 'moisture' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Soil Moisture
          </button>
          <button
            onClick={() => setActiveLayer('risk')}
            className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
              activeLayer === 'risk' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cluster Risk
          </button>
        </div>
      </div>

      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <path
            d="M -20,120 Q 150,180 320,100 T 700,160 T 1100,80"
            fill="none"
            stroke="#0284c7"
            strokeWidth="6"
          />
          <path
            d="M 200,-20 Q 300,150 450,220 T 900,320"
            fill="none"
            stroke="#0369a1"
            strokeWidth="4"
          />
          <circle cx="350" cy="180" r="90" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="350" cy="180" r="160" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {activeLayer === 'radar' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/30 via-blue-500/20 to-transparent pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}>
            <div className="absolute top-12 left-1/3 w-72 h-72 rounded-full bg-blue-500/25 blur-2xl"></div>
            <div className="absolute bottom-8 right-1/4 w-80 h-80 rounded-full bg-red-500/15 blur-3xl"></div>
          </div>
        )}

        {activeLayer === 'moisture' && (
          <div className="absolute inset-0 bg-emerald-900/20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-red-500/30 animate-ping"></span>
            <div className="w-10 h-10 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
          </div>

          <div className="mt-2 bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-slate-700 shadow-2xl text-center max-w-xs">
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white">{farmProfile.farmerName}'s Farm</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {farmProfile.cropName} ? {farmProfile.growthStageName.split(' ')[0]} ({farmProfile.farmAreaAcres} ac)
            </p>
            <div className="mt-1 pt-1 border-t border-slate-800 flex justify-between gap-3 text-[10px] font-mono text-emerald-400 font-bold">
              <span>Risk: {cropRisk.overallScore}/100</span>
              <span className="text-sky-300">Rain: 70mm</span>
            </div>
          </div>
        </div>

        <div className="absolute top-16 left-24 flex items-center gap-1.5 opacity-75">
          <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white/60"></div>
          <span className="text-[10px] text-slate-300 font-mono bg-slate-900/70 px-1.5 py-0.5 rounded">
            Wai Cluster (Risk 68)
          </span>
        </div>

        <div className="absolute bottom-16 right-32 flex items-center gap-1.5 opacity-75">
          <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-white/60"></div>
          <span className="text-[10px] text-slate-300 font-mono bg-slate-900/70 px-1.5 py-0.5 rounded">
            Karad North (Risk 82)
          </span>
        </div>

        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-[10px] text-slate-300 space-y-1">
          <div className="font-bold text-slate-200 uppercase tracking-wider text-[9px]">
            Layer: {activeLayer.toUpperCase()} (SIMULATED)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>High Risk (&gt;75)</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 ml-1"></span>
            <span>Medium (45-74)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1"></span>
            <span>Low (&lt;45)</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-slate-400 flex items-center gap-1 text-[10px] font-mono">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>17.6805? N, 74.0183? E</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Simulated spatial visualization. Planned production integration: Sentinel-2 SAR + IMD Doppler Radar API.</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Satara Tehsil Grid</span>
      </div>
    </div>
  );
};
