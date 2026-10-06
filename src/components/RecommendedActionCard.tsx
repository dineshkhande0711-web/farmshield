import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const RecommendedActionCard: React.FC = () => {
  const {
    recommendedAction,
    markActionCompleted,
    setActiveTab,
    t
  } = useFarmShield();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              {t('recommendedAction')}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
            {recommendedAction.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{recommendedAction.actionWindow}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {recommendedAction.steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition flex items-start gap-3.5 ${
              recommendedAction.isCompleted
                ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                : 'bg-slate-50 border-slate-200/70 text-slate-800'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
              recommendedAction.isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white'
            }`}>
              {recommendedAction.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
            </div>

            <div className="text-xs sm:text-sm font-medium leading-relaxed">
              {step}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200/80 mb-6">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>{t('whyThisAction')}</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed font-normal">
          {recommendedAction.rationale}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          {recommendedAction.isCompleted ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Completed by Farmer • Proceed to Stage 03 (Observe)
            </span>
          ) : (
            <span>Once field furrows are cleared, mark as completed to trigger AI verification.</span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!recommendedAction.isCompleted ? (
            <button
              onClick={markActionCompleted}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('markActionCompleted')}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('verification')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Upload Field Photo for Verification</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
