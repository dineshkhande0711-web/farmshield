import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  Database,
  Satellite,
  CloudSun,
  Camera,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

export const DataSourcesAndTrust: React.FC = () => {
  const { t } = useFarmShield();

  const sources = [
    {
      name: 'India Meteorological Department (IMD)',
      type: 'Radar & Weather Stations',
      status: 'Planned Integration',
      desc: 'High-resolution gridded quantitative precipitation forecasts & Doppler telemetry.',
      icon: CloudSun
    },
    {
      name: 'Satellite Soil Moisture (Copernicus / Sentinel-2)',
      type: 'Earth Observation',
      status: 'Planned Integration',
      desc: 'Surface & root-zone soil saturation indices to benchmark waterlogging susceptibility.',
      icon: Satellite
    },
    {
      name: 'Farmer Field Observations',
      type: 'Ground-Truth Vision',
      status: 'Active in Prototype',
      desc: 'Mobile smartphone photo/video uploads analyzed for visible crop stress recovery trends.',
      icon: Camera
    },
    {
      name: 'ICAR & KVK Agronomic Rules',
      type: 'Crop Phenology Matrix',
      status: 'Active in Prototype',
      desc: 'Calibrated stage-specific moisture sensitivity thresholds for Maharashtra agro-climatic zones.',
      icon: BookOpen
    }
  ];

  return (
    <footer className="mt-12 pt-8 pb-12 border-t border-slate-200 bg-slate-50 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t('dataSources')}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sources.map((s, i) => {
              const Icon = s.icon;
              const isPlanned = s.status === 'Planned Integration';
              return (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isPlanned ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {s.status}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 leading-snug">{s.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{s.type}</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200/90 text-slate-600 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-800 block mb-0.5">
              Trust & Advisory Disclaimer
            </span>
            <p className="text-[11px] sm:text-xs">
              {t('disclaimer')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
          <div>
            <strong>FarmShield AI</strong> ? PCCOE International Grand Challenge 2026 (Pune, India) ? AI for Climate Change
          </div>
          <div className="font-medium text-slate-500">
            Dinesh Khande ? Akshay Ryakawar ? Sanskar Penshanwar (JSPM COE, SPPU)
          </div>
        </div>
      </div>
    </footer>
  );
};
