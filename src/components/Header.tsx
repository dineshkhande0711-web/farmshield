import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { Language } from '../types';
import {
  Shield,
  Bell,
  Play,
  Languages,
  User,
  Menu,
  X,
  Sprout,
  Activity,
  ClipboardList,
  Camera,
  History,
  Building2
} from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  const {
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    farmProfile,
    unreadCount,
    setIsNotificationsOpen,
    demoMode,
    setDemoMode,
    runDemoTour,
    isDemoRunning,
    t
  } = useFarmShield();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: Activity },
    { id: 'risk-monitor', label: t('navRiskMonitor'), icon: Shield },
    { id: 'recommendations', label: t('navRecommendations'), icon: ClipboardList },
    { id: 'verification', label: t('navCropHealth'), icon: Camera },
    { id: 'history', label: t('navHistory'), icon: History },
    { id: 'admin', label: t('navAdmin'), icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="bg-slate-900 text-slate-200 px-4 py-1 text-xs flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium tracking-wide text-emerald-300">FARMSHIELD LIVE</span>
          <span className="hidden sm:inline text-slate-400">• PCCOE Grand Challenge 2026</span>
          <span className="hidden md:inline text-slate-400">• AI for Climate Change</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-mono">
            DEMO / SIMULATED DATA
          </span>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className="text-[11px] hover:text-white underline text-slate-300 cursor-pointer"
          >
            {demoMode ? 'Demo Mode: ON' : 'Demo Mode: OFF'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  FarmShield<span className="text-emerald-600 font-extrabold"> AI</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Closed-Loop
                </span>
              </div>
              <p className="hidden sm:block text-[11px] font-medium text-slate-500 leading-tight">
                {t('tagline')}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            
            <button
              onClick={runDemoTour}
              disabled={isDemoRunning}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
                isDemoRunning
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-95'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{isDemoRunning ? 'Demo Running...' : t('runDemoButton')}</span>
              <span className="sm:hidden">Demo</span>
            </button>

            <div className="relative flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs font-medium text-slate-700">
              <Languages className="w-3.5 h-3.5 ml-1.5 text-slate-400 hidden sm:inline" />
              {(['en', 'mr', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs">
                {farmProfile.farmerName.charAt(0)}
              </div>
              <div className="leading-none">
                <p className="text-xs font-bold text-slate-900 truncate max-w-[90px]">{farmProfile.farmerName.split(' ')[0]}</p>
                <p className="text-[10px] text-slate-500 truncate">{farmProfile.location.split(',')[0]}</p>
              </div>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900">{farmProfile.cropName}</span>
                <span className="text-emerald-700"> • {farmProfile.growthStageName.split(' ')[0]}</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
              {farmProfile.farmAreaAcres} Acres
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    isActive ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                onOpenProfile();
                setIsMobileMenuOpen(false);
              }}
              className="text-emerald-700 font-semibold flex items-center gap-1.5"
            >
              <User className="w-4 h-4" /> Edit Farm Profile
            </button>
            <span className="text-slate-400 font-mono text-[10px]">Satara, Maharashtra</span>
          </div>
        </div>
      )}
    </header>
  );
};
