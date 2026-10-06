import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { HISTORY_DAYS } from '../services/mockData';
import { HistoricalDay } from '../types';
import {
  Calendar,
  CloudRain,
  ShieldCheck,
  Camera,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const RiskHistoryTimeline: React.FC = () => {
  const { t } = useFarmShield();
  const [selectedDay, setSelectedDay] = useState<HistoricalDay>(HISTORY_DAYS[1]);

  const chartData = HISTORY_DAYS.map((d) => ({
    day: d.dayLabel,
    score: d.riskScore,
    severity: d.riskLevel,
    rainfall: d.rainfallMm,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {t('riskHistory')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            5-day temporal log tracking climate hazards, farmer interventions, and verified risk trajectory.
          </p>
        </div>

        <span className="text-xs text-slate-400 italic">
          Click any day below to inspect full event log
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {HISTORY_DAYS.map((day) => {
          const isSelected = selectedDay.dayId === day.dayId;
          const isHigh = day.riskLevel === 'HIGH';
          const isMedium = day.riskLevel === 'MEDIUM';

          const badgeBg = isHigh ? 'bg-red-500 text-white' : isMedium ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white';

          return (
            <div
              key={day.dayId}
              onClick={() => setSelectedDay(day)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50'
                  : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {day.dayLabel}
                  </span>
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${badgeBg}`}>
                    {day.riskLevel}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-xl font-black">{day.riskScore}</span>
                  <span className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>/ 100</span>
                </div>
                <p className={`text-[11px] truncate mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {day.weatherCondition.split(',')[0]}
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t text-[10px] font-bold flex items-center justify-between ${
                isSelected ? 'border-slate-800 text-emerald-400' : 'border-slate-200 text-slate-400'
              }`}>
                <span>{day.date}</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900">
                {selectedDay.dayLabel} Deep Dive ({selectedDay.date})
              </span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                selectedDay.riskLevel === 'HIGH' ? 'bg-red-500 text-white' : selectedDay.riskLevel === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {selectedDay.riskLevel} RISK ({selectedDay.riskScore}/100)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Crop Stage: <strong>{selectedDay.cropStage}</strong>
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Status: <span className="font-bold text-emerald-700">{selectedDay.actionStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold mb-1">
              <CloudRain className="w-4 h-4 text-sky-600" />
              <span>Weather & Hazard</span>
            </div>
            <p className="font-bold text-slate-900 text-sm">{selectedDay.weatherCondition}</p>
            <p className="text-slate-500 mt-1">Primary Hazard: {selectedDay.hazard}</p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Recommended Action</span>
            </div>
            <p className="font-bold text-slate-900 leading-snug">{selectedDay.recommendation}</p>
            <p className="text-emerald-700 mt-1 font-semibold">Status: {selectedDay.actionStatus}</p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-bold mb-1">
              <Camera className="w-4 h-4 text-purple-600" />
              <span>Field Observation & Recalibration</span>
            </div>
            <p className="text-slate-800 leading-snug">
              {selectedDay.observationSummary || 'Routine monitoring recorded; no escalation required.'}
            </p>
            {selectedDay.updatedRiskScore && (
              <p className="text-emerald-700 font-bold mt-1">
                Updated Risk Score: {selectedDay.updatedRiskScore} / 100
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="h-36 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(val: number) => [`${val} / 100`, 'Risk Score']}
              contentStyle={{ backgroundColor: '#0f172a', color: '#ffffff', borderRadius: '8px', fontSize: '11px', border: 'none' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#0f172a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
