import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export const WeatherForecastCard: React.FC = () => {
  const { weather, t } = useFarmShield();

  const chartData = weather.forecastDays.map((d) => ({
    name: d.day,
    rainMm: d.rainMm,
    temp: d.tempMax,
    prob: d.rainProb,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                {t('weatherForecast')}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-bold">
                {t('demoDataWarning')}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              {weather.location}
            </h3>
            <p className="text-xs text-slate-500">
              {weather.dataSource}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200 text-xs font-bold">
            <CloudRain className="w-4 h-4 text-blue-600 animate-bounce" />
            <span>{weather.condition}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Thermometer className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('temperature')}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">{weather.temperature}°C</span>
              <span className="text-[10px] text-slate-400">(Feels {weather.feelsLike}°)</span>
            </div>
          </div>

          <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-200/70">
            <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{t('expectedRainfall')}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-black text-blue-900">{weather.expectedRainfallMm}</span>
              <span className="text-xs font-bold text-blue-700">mm / 36h</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>{t('humidity')}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">{weather.humidity}%</span>
              <span className="text-[10px] text-slate-400">(Rain Prob {weather.rainProbability}%)</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>{t('wind')}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">{weather.windSpeedKmh}</span>
              <span className="text-xs font-medium text-slate-500">km/h WSW</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 mb-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {t('next3Days')} (Precipitation Spike)
            </span>
            <span className="text-slate-400 font-mono text-[10px]">Unit: mm</span>
          </div>

          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`${val} mm`, 'Rainfall']}
                  labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Bar dataKey="rainMm" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rainMm >= 60 ? '#ef4444' : entry.rainMm >= 30 ? '#0284c7' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 border border-slate-800 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
          <Cpu className="w-4 h-4" />
        </div>
        <div className="text-xs leading-relaxed">
          <span className="font-extrabold text-emerald-400 block mb-0.5">
            Weather alone is not the final output.
          </span>
          <span className="text-slate-300">
            FarmShield feeds these meteorological signals into the crop phenology engine to determine field-level physiological vulnerability.
          </span>
        </div>
      </div>
    </div>
  );
};
