import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  ArrowRight,
  ShieldCheck,
  CloudLightning,
  Cpu,
  Camera,
  Play,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface LandingHeroProps {
  onExploreClick: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onExploreClick }) => {
  const { setActiveTab, runDemoTour } = useFarmShield();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase shadow-inner mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>AI-Powered • Multi-Hazard • Crop-Aware • Closed-Loop</span>
        </div>

        {/* Clear Headline as requested */}
        <div className="space-y-2">
          <div className="text-emerald-400 font-mono text-sm sm:text-base font-extrabold uppercase tracking-widest">
            FARM SHIELD AI
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Predict the threat. Protect the crop.
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-emerald-100/90 font-medium max-w-2xl mx-auto">
            Climate-risk intelligence for farmers.
          </p>
        </div>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          FarmShield AI converts raw climate telemetry into crop-specific stress risk, prescribes physical interventions before loss occurs, and verifies field recovery with computer vision.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Open Farm Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={runDemoTour}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Interactive Demo Tour</span>
          </button>
        </div>

        {/* Visual Closed-Loop Pipeline */}
        <div className="mt-12 max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 text-center">
            The FarmShield Closed-Loop Pipeline
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative text-left">
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 group hover:border-sky-500/50 transition">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 font-bold text-xs">
                <CloudLightning className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">Stage 01</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Climate Data</h4>
              <p className="text-xs text-slate-400 mt-1">
                Rainfall spikes, thermal stress & humidity telemetry.
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 group hover:border-emerald-500/50 transition">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 font-bold text-xs">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Stage 02</span>
              <h4 className="text-sm font-bold text-white mt-0.5">AI Risk Engine</h4>
              <p className="text-xs text-slate-400 mt-1">
                Maps hazard against crop phenology & growth stage.
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 group hover:border-amber-500/50 transition">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Stage 03</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Crop Action</h4>
              <p className="text-xs text-slate-400 mt-1">
                Prescriptive drainage & protective advisory before event.
              </p>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 group hover:border-purple-500/50 transition">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 font-bold text-xs">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Stage 04</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Field Verification</h4>
              <p className="text-xs text-slate-400 mt-1">
                Computer vision checks crop recovery & adapts risk score.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap justify-between items-center text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Calibrated for Maharashtra Agro-Climatic Zones (Satara / Solapur / Nashik)</span>
            </div>
            <button
              onClick={onExploreClick}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 mt-1 sm:mt-0 cursor-pointer"
            >
              <span>Explore Problem & Architecture</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
