import React from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import {
  X,
  Bell,
  Clock,
  ArrowRight
} from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, setActiveTab } = useFarmShield();

  if (!isNotificationsOpen) return null;

  const alerts = [
    {
      id: 'notif-1',
      severity: 'HIGH',
      title: '?? HIGH RISK ALERT: Heavy Rainfall Spike',
      message: '70mm rainfall expected over next 36 hours. Green Pea in Flowering stage is highly vulnerable to standing water.',
      time: '15 mins ago',
      actionLabel: 'View Advisory',
      targetTab: 'recommendations',
      badgeBg: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 'notif-2',
      severity: 'MONITOR',
      title: '?? MONITOR: Relative Humidity at 84%',
      message: 'Persistent canopy moisture exceeding 14 hours increases powdery mildew disease favorability.',
      time: '1 hour ago',
      actionLabel: 'Check Multi-Hazard',
      targetTab: 'risk-monitor',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'notif-3',
      severity: 'VERIFIED',
      title: '?? VERIFIED: Field Stress Improving',
      message: 'Recent smartphone snapshot analysis confirmed lateral furrow drainage. Surface ponding receded by 85%.',
      time: '3 hours ago',
      actionLabel: 'Inspect Before/After',
      targetTab: 'verification',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Notification Center</h3>
              <p className="text-xs text-slate-500">Active agro-climatic advisories</p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 overflow-y-auto flex-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition bg-white shadow-xs space-y-2"
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${alert.badgeBg}`}>
                  {alert.severity}
                </span>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {alert.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {alert.message}
              </p>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setActiveTab(alert.targetTab);
                    setIsNotificationsOpen(false);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>{alert.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
          >
            Close Alert Center
          </button>
        </div>
      </div>
    </div>
  );
};
