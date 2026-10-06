import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { ADMIN_REGIONAL_DATA } from '../services/mockData';
import {
  Building2,
  Users,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Search
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { t } = useFarmShield();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('all');

  const filteredFarmers = ADMIN_REGIONAL_DATA.farmers.filter((farmer) => {
    const matchesSearch = farmer.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          farmer.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          farmer.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTaluka = selectedTaluka === 'all' || farmer.taluka.toLowerCase() === selectedTaluka.toLowerCase();
    return matchesSearch && matchesTaluka;
  });

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                Agricultural Extension Officer Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">Satara KVK Node</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              {ADMIN_REGIONAL_DATA.regionName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Regional aggregation of smallholder vulnerability, compound climate hazard alerts, and verified field mitigation compliance.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <Building2 className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-white">KVK Regional Desk</p>
              <p className="text-[11px] text-slate-400">Supervisory Authority</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Monitored Farms</span>
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-4 h-4" /></span>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{ADMIN_REGIONAL_DATA.farmsMonitored}</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">+38 farms</span> onboarded this week
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-red-200 shadow-xs bg-red-50/20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-red-700 uppercase">Active High-Risk Farms</span>
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center"><AlertTriangle className="w-4 h-4" /></span>
          </div>
          <p className="text-3xl font-black text-red-700 mt-2">{ADMIN_REGIONAL_DATA.activeHighRiskFarms}</p>
          <p className="text-xs text-red-600 mt-1 font-medium">
            11.4% of monitored acreage in critical alert
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Verification Compliance</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></span>
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{ADMIN_REGIONAL_DATA.verificationComplianceRate}%</p>
          <p className="text-xs text-emerald-700 mt-1 font-bold">
            1,054 field photos uploaded & verified
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Follow-Up Required</span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><PhoneCall className="w-4 h-4" /></span>
          </div>
          <p className="text-3xl font-black text-amber-600 mt-2">18</p>
          <p className="text-xs text-slate-500 mt-1">
            Unresponsive or persistent stress alerts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Active Regional Hazard Distribution</h3>
            <span className="text-xs text-slate-400 font-mono">Satara District</span>
          </div>

          <div className="space-y-3">
            {ADMIN_REGIONAL_DATA.hazardDistribution.map((h, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-800">{h.name}</span>
                  <span className="text-slate-500 font-mono">{h.count} farms ({h.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${h.percentage}%`, backgroundColor: h.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-900">Crop Acreage & Phenology Stress Index</h3>
            <span className="text-xs text-slate-400 font-mono">Acreage Share</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {ADMIN_REGIONAL_DATA.cropDistribution.map((c, i) => (
              <div key={i} className="py-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">{c.name}</span>
                  <span className="text-slate-400">{c.count} Registered Smallholders</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded font-black text-xs ${
                    c.avgRisk >= 70 ? 'bg-red-100 text-red-800' : c.avgRisk >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Avg Risk: {c.avgRisk}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              High-Risk Farmers Requiring Agricultural Officer Follow-Up
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time intervention priority queue sorted by severity and lack of field verification.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search farmer / village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <select
              value={selectedTaluka}
              onChange={(e) => setSelectedTaluka(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 text-slate-700 font-medium"
            >
              <option value="all">All Talukas</option>
              <option value="wai">Wai</option>
              <option value="karad">Karad</option>
              <option value="koregaon">Koregaon</option>
              <option value="phaltan">Phaltan</option>
              <option value="patan">Patan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-2.5 font-bold">Farmer & Village</th>
                <th className="pb-2.5 font-bold">Crop & Stage</th>
                <th className="pb-2.5 font-bold">Risk Score</th>
                <th className="pb-2.5 font-bold">Primary Hazard</th>
                <th className="pb-2.5 font-bold">Drainage Action</th>
                <th className="pb-2.5 font-bold">AI Verification Status</th>
                <th className="pb-2.5 font-bold text-right">Direct Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 pr-3">
                    <span className="font-bold text-slate-900 block text-sm">{f.farmer}</span>
                    <span className="text-slate-500">{f.village}, Tal. {f.taluka} ({f.acres} ac)</span>
                  </td>

                  <td className="py-3 pr-3">
                    <span className="font-semibold text-slate-800">{f.crop}</span>
                    <span className="text-slate-400 block text-[11px]">{f.stage} Stage</span>
                  </td>

                  <td className="py-3 pr-3">
                    <span className={`px-2 py-0.5 rounded font-black text-xs ${
                      f.riskScore >= 75 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.riskScore}/100 ({f.severity})
                    </span>
                  </td>

                  <td className="py-3 pr-3 text-slate-700 font-medium">
                    {f.primaryHazard}
                  </td>

                  <td className="py-3 pr-3">
                    {f.actionTaken ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3 pr-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      f.verifiedStatus === 'Verified Improving'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : f.verifiedStatus === 'Escalated to KVK'
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {f.verifiedStatus}
                    </span>
                  </td>

                  <td className="py-3 text-right font-mono text-slate-600 font-medium">
                    <a
                      href={`tel:${f.contact}`}
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{f.contact}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
