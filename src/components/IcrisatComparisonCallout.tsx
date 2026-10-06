import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';

export const IcrisatComparisonCallout: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-7 border border-emerald-500/30 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Core Innovation & Strategic Benchmark</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            AgriTech Benchmark: ICRISAT & IMD Advisories
          </span>
        </div>

        <div className="max-w-3xl mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            “FarmShield doesn’t stop at weather prediction. It connects the predicted hazard to crop-stage-specific stress and a concrete intervention.”
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Existing agro-advisories (such as ICRISAT climate dashboards or IMD bulletins) provide regional forecasts and static tips. FarmShield AI builds an autonomous, continuous closed loop that protects the crop before damage occurs and verifies post-action recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Conventional Agro-Advisories (ICRISAT / IMD)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>Provides general weather statistics (e.g. "Rainfall 70mm expected").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>Advisories are static, generic bulletins sent via SMS without stage adaptation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">•</span>
                  <span>Zero field verification loop: No tracking of whether interventions succeeded.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-2.5 border-t border-slate-700/50 text-[11px] font-mono text-slate-400">
              Output: Passive prediction & text advisory
            </div>
          </div>

          <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-500/40 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 text-emerald-400/20 pointer-events-none">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FarmShield AI Closed-Loop Engine</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-100 mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Hazard × Phenology:</strong> Maps rain to root hypoxia during sensitive flowering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span><strong>Prescriptive Decision:</strong> Clear action window before rain starts (e.g. dig 10m furrows).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span><strong>AI Vision Verification:</strong> Field photos verify standing water removal & adapt risk score.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-2.5 border-t border-emerald-800/60 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
              <span>PREDICT → PROTECT → OBSERVE → VERIFY → ADAPT</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
