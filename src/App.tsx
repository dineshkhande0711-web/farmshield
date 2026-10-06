import React, { useState } from 'react';
import { FarmShieldProvider, useFarmShield } from './context/FarmShieldContext';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { QuickScenarioSelector } from './components/QuickScenarioSelector';
import { CoreDecisionDashboard } from './components/CoreDecisionDashboard';
import { VisualPipeline } from './components/VisualPipeline';
import { IcrisatComparisonCallout } from './components/IcrisatComparisonCallout';
import { ProblemSection } from './components/ProblemSection';
import { ClosedLoopVisual } from './components/ClosedLoopVisual';
import { CurrentRiskCard } from './components/CurrentRiskCard';
import { WeatherForecastCard } from './components/WeatherForecastCard';
import { MultiHazardMonitor } from './components/MultiHazardMonitor';
import { CropStageEngine } from './components/CropStageEngine';
import { RecommendedActionCard } from './components/RecommendedActionCard';
import { CropVerificationPage } from './components/CropVerificationPage';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { RiskHistoryTimeline } from './components/RiskHistoryTimeline';
import { FarmMapView } from './components/FarmMapView';
import { NotificationsModal } from './components/NotificationsModal';
import { WhyExplanationModal } from './components/WhyExplanationModal';
import { HazardDetailModal } from './components/HazardDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { DemoTourRunner } from './components/DemoTourRunner';
import { DataSourcesAndTrust } from './components/DataSourcesAndTrust';
import { FarmProfileModal } from './components/FarmProfileModal';
import {
  Activity,
  Shield,
  ClipboardList,
  Camera,
  History,
  Sprout,
  MapPin
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, farmProfile } = useFarmShield();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const scrollToProblem = () => {
    const el = document.getElementById('problem-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      {activeTab === 'dashboard' && (
        <>
          <LandingHero onExploreClick={scrollToProblem} />
          <ProblemSection />
        </>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Farm Profile Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {farmProfile.farmerName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  {farmProfile.farmerName}'s Farm Dashboard
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Active Monitoring
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {farmProfile.location}
                </span>
                <span className="flex items-center gap-1 font-medium text-emerald-800">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" /> {farmProfile.cropName} • {farmProfile.growthStageName}
                </span>
                <span className="font-mono text-slate-600">
                  Area: <strong>{farmProfile.farmAreaAcres} Acres</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer self-stretch sm:self-auto text-center"
          >
            Edit Farm Details
          </button>
        </div>

        {/* Dynamic Scenario Bar (Immediate Select Crop -> Location -> Stage -> Analyze) */}
        <QuickScenarioSelector />

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 4-Card Decision Dashboard */}
            <CoreDecisionDashboard />

            {/* 6-Stage Visual Intelligence Pipeline */}
            <VisualPipeline />

            {/* ICRISAT Benchmark Differentiation Spotlight */}
            <IcrisatComparisonCallout />

            {/* Closed Loop Continuous Cycle */}
            <ClosedLoopVisual />

            {/* Diagnostic Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6">
                <CurrentRiskCard />
              </div>
              <div className="lg:col-span-6">
                <WeatherForecastCard />
              </div>
            </div>

            <MultiHazardMonitor />
            <CropStageEngine />
            <RecommendedActionCard />
            <BeforeAfterComparison />
            <FarmMapView />
          </div>
        )}

        {activeTab === 'risk-monitor' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CoreDecisionDashboard />
            <VisualPipeline />
            <MultiHazardMonitor />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6">
                <CurrentRiskCard />
              </div>
              <div className="lg:col-span-6">
                <WeatherForecastCard />
              </div>
            </div>
            <CropStageEngine />
            <FarmMapView />
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CoreDecisionDashboard />
            <IcrisatComparisonCallout />
            <RecommendedActionCard />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6">
                <CurrentRiskCard />
              </div>
              <div className="lg:col-span-6">
                <BeforeAfterComparison />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <ClosedLoopVisual />
            <CropVerificationPage />
            <BeforeAfterComparison />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <ClosedLoopVisual />
            <RiskHistoryTimeline />
            <BeforeAfterComparison />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <AdminDashboard />
          </div>
        )}
      </main>

      <DataSourcesAndTrust />
      <DemoTourRunner />

      <WhyExplanationModal />
      <HazardDetailModal />
      <NotificationsModal />
      <FarmProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Mobile Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 flex justify-around items-center shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            activeTab === 'dashboard' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('risk-monitor')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            activeTab === 'risk-monitor' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Hazards</span>
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            activeTab === 'recommendations' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Action</span>
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            activeTab === 'verification' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Verify</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            activeTab === 'history' ? 'text-emerald-700' : 'text-slate-500'
          }`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
        </button>
      </div>
    </div>
  );
};

export function App() {
  return (
    <FarmShieldProvider>
      <AppContent />
    </FarmShieldProvider>
  );
}

export default App;
