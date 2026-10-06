import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Language,
  FarmProfile,
  WeatherTelemetry,
  CropRiskEvaluation,
  HazardAssessment,
  RecommendedAction,
  FieldObservation,
  CropType,
  GrowthStage
} from '../types';
import {
  DEMO_SAMPLE_OBSERVATIONS
} from '../services/mockData';
import { DEMO_SCENARIOS } from '../services/scenarios';
import { calculateRisk } from '../services/api';
import { translations } from '../utils/translations';
import confetti from 'canvas-confetti';

interface FarmShieldContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  farmProfile: FarmProfile;
  setFarmProfile: React.Dispatch<React.SetStateAction<FarmProfile>>;
  weather: WeatherTelemetry;
  setWeather: React.Dispatch<React.SetStateAction<WeatherTelemetry>>;
  cropRisk: CropRiskEvaluation;
  hazards: HazardAssessment[];
  recommendedAction: RecommendedAction;
  markActionCompleted: () => void;
  observations: FieldObservation[];
  addObservation: (obs: FieldObservation, newRiskScore: number) => void;
  isWhyModalOpen: boolean;
  setIsWhyModalOpen: (open: boolean) => void;
  selectedHazardDetail: HazardAssessment | null;
  setSelectedHazardDetail: (hazard: HazardAssessment | null) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  unreadCount: number;
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  isDemoRunning: boolean;
  demoStep: number;
  runDemoTour: () => void;
  stopDemoTour: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  resetDemoScenario: () => void;
  switchCropStage: (stage: GrowthStage) => void;
  switchCrop: (crop: CropType) => void;
  switchLocation: (location: string) => void;
  currentScenarioId: 'scenario-a' | 'scenario-b' | 'scenario-c';
  selectScenario: (scenarioId: 'scenario-a' | 'scenario-b' | 'scenario-c') => void;
  analyzeRiskCustom: (crop: CropType, location: string, stage: GrowthStage) => Promise<void>;
  t: (key: keyof typeof translations['en']) => string;
}

const FarmShieldContext = createContext<FarmShieldContextType | undefined>(undefined);

const INITIAL_SCENARIO = DEMO_SCENARIOS['scenario-a'];

export const FarmShieldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentScenarioId, setCurrentScenarioId] = useState<'scenario-a' | 'scenario-b' | 'scenario-c'>('scenario-a');

  const [farmProfile, setFarmProfile] = useState<FarmProfile>({
    id: 'farm-satara-01',
    farmerName: 'Dinesh Khande',
    location: INITIAL_SCENARIO.location,
    district: INITIAL_SCENARIO.district,
    state: INITIAL_SCENARIO.state,
    crop: INITIAL_SCENARIO.crop,
    cropName: INITIAL_SCENARIO.cropName,
    growthStage: INITIAL_SCENARIO.growthStage,
    growthStageName: INITIAL_SCENARIO.growthStageName,
    farmAreaAcres: INITIAL_SCENARIO.farmAreaAcres,
    soilType: INITIAL_SCENARIO.soilType,
    sowingDate: '15 Aug 2026'
  });

  const [weather, setWeather] = useState<WeatherTelemetry>(INITIAL_SCENARIO.weather);
  const [cropRisk, setCropRisk] = useState<CropRiskEvaluation>(INITIAL_SCENARIO.cropRisk);
  const [hazards, setHazards] = useState<HazardAssessment[]>(INITIAL_SCENARIO.hazards);
  const [recommendedAction, setRecommendedAction] = useState<RecommendedAction>(INITIAL_SCENARIO.recommendedAction);

  const [observations, setObservations] = useState<FieldObservation[]>([
    DEMO_SAMPLE_OBSERVATIONS['persisting']
  ]);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [selectedHazardDetail, setSelectedHazardDetail] = useState<HazardAssessment | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [unreadCount] = useState<number>(3);
  
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  const t = useCallback((key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  const selectScenario = useCallback((scenarioId: 'scenario-a' | 'scenario-b' | 'scenario-c') => {
    const sc = DEMO_SCENARIOS[scenarioId];
    if (!sc) return;

    setCurrentScenarioId(scenarioId);
    setFarmProfile(prev => ({
      ...prev,
      location: sc.location,
      district: sc.district,
      state: sc.state,
      crop: sc.crop,
      cropName: sc.cropName,
      growthStage: sc.growthStage,
      growthStageName: sc.growthStageName,
      farmAreaAcres: sc.farmAreaAcres,
      soilType: sc.soilType
    }));
    setWeather(sc.weather);
    setCropRisk(sc.cropRisk);
    setHazards(sc.hazards);
    setRecommendedAction(sc.recommendedAction);
    setObservations([DEMO_SAMPLE_OBSERVATIONS['persisting']]);
  }, []);

  const updateRisk = useCallback(async (
    crop: CropType,
    stage: GrowthStage,
    isCompleted: boolean,
    verificationStatus: 'stress_improving' | 'stress_persisting' | 'stress_increasing' | null = null,
    currentWeatherTelemetry = weather
  ) => {
    const result = await calculateRisk({
      crop,
      stage,
      expectedRainMm: currentWeatherTelemetry.expectedRainfallMm,
      rainProbability: currentWeatherTelemetry.rainProbability,
      temperatureC: currentWeatherTelemetry.temperature,
      humidityPct: currentWeatherTelemetry.humidity,
      isActionCompleted: isCompleted,
      verificationStatus
    });

    setCropRisk({
      overallScore: result.overallScore,
      severity: result.severity,
      primaryHazard: result.primaryHazard,
      expectedWindow: result.expectedWindow,
      cropStageSummary: `${crop === 'green_pea' ? 'Green Pea' : crop} — ${stage.charAt(0).toUpperCase() + stage.slice(1)}`,
      reasons: result.reasons,
      formulaBreakdown: result.formulaBreakdown,
      updatedAfterVerification: verificationStatus === 'stress_improving',
      verificationDelta: verificationStatus === 'stress_improving' ? -26 : undefined
    });

    setHazards(result.hazards);
  }, [weather]);

  const switchCropStage = (stage: GrowthStage) => {
    const stageName = stage === 'flowering' ? 'Flowering (फुलधारणा)' :
      stage === 'vegetative' ? 'Vegetative (वाढ)' :
      stage === 'pod_formation' ? 'Pod Formation (शेंगा भरणे)' :
      stage === 'germination' ? 'Germination (उगवण)' : 'Maturity (पक्वता)';
    
    setFarmProfile(prev => ({
      ...prev,
      growthStage: stage,
      growthStageName: stageName
    }));

    updateRisk(farmProfile.crop, stage, recommendedAction.isCompleted);
  };

  const switchCrop = (crop: CropType) => {
    const cropName = crop === 'green_pea' ? 'Green Pea (मटार)' :
      crop === 'soybean' ? 'Soybean (सोयाबीन)' :
      crop === 'sugarcane' ? 'Sugarcane (ऊस)' : 'Tomato (टोमॅटो)';

    setFarmProfile(prev => ({
      ...prev,
      crop,
      cropName
    }));

    updateRisk(crop, farmProfile.growthStage, recommendedAction.isCompleted);
  };

  const switchLocation = (location: string) => {
    const district = location.split(',')[0].trim();
    setFarmProfile(prev => ({
      ...prev,
      location,
      district
    }));
  };

  const analyzeRiskCustom = async (crop: CropType, location: string, stage: GrowthStage) => {
    switchLocation(location);
    switchCrop(crop);
    switchCropStage(stage);

    let temp = weather.temperature;
    let rain = weather.expectedRainfallMm;
    let humidity = weather.humidity;

    if (location.includes('Solapur')) {
      temp = 38.5;
      rain = 4;
      humidity = 28;
    } else if (location.includes('Satara')) {
      temp = 34;
      rain = 82;
      humidity = 87;
    } else if (location.includes('Nashik')) {
      temp = 24;
      rain = 12;
      humidity = 62;
    } else if (location.includes('Pune')) {
      temp = 29;
      rain = 45;
      humidity = 76;
    }

    const updatedWeather: WeatherTelemetry = {
      ...weather,
      location,
      temperature: temp,
      expectedRainfallMm: rain,
      humidity
    };

    setWeather(updatedWeather);
    await updateRisk(crop, stage, false, null, updatedWeather);
  };

  const markActionCompleted = () => {
    setRecommendedAction(prev => ({
      ...prev,
      isCompleted: true,
      completedAt: 'Just now'
    }));

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    updateRisk(farmProfile.crop, farmProfile.growthStage, true);
  };

  const addObservation = (obs: FieldObservation, _newRiskScore: number) => {
    setObservations(prev => [obs, ...prev]);
    
    if (obs.stressStatus === 'stress_improving') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      updateRisk(farmProfile.crop, farmProfile.growthStage, true, 'stress_improving');
    }
  };

  const runDemoTour = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
    setActiveTab('dashboard');
  };

  const stopDemoTour = () => {
    setIsDemoRunning(false);
  };

  const nextDemoStep = () => {
    setDemoStep(prev => Math.min(8, prev + 1));
  };

  const prevDemoStep = () => {
    setDemoStep(prev => Math.max(1, prev - 1));
  };

  const resetDemoScenario = () => {
    selectScenario('scenario-a');
    setDemoStep(1);
    setIsDemoRunning(false);
    setActiveTab('dashboard');
  };

  useEffect(() => {
    if (!isDemoRunning) return;

    if (demoStep === 1 || demoStep === 2 || demoStep === 3) {
      setActiveTab('dashboard');
    } else if (demoStep === 4) {
      setActiveTab('recommendations');
    } else if (demoStep === 5) {
      setActiveTab('recommendations');
      if (!recommendedAction.isCompleted) {
        markActionCompleted();
      }
    } else if (demoStep === 6) {
      setActiveTab('verification');
    } else if (demoStep === 7) {
      setActiveTab('verification');
      addObservation(DEMO_SAMPLE_OBSERVATIONS['improving'], 52);
    } else if (demoStep === 8) {
      setActiveTab('history');
    }
  }, [demoStep, isDemoRunning]);

  return (
    <FarmShieldContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        farmProfile,
        setFarmProfile,
        weather,
        setWeather,
        cropRisk,
        hazards,
        recommendedAction,
        markActionCompleted,
        observations,
        addObservation,
        isWhyModalOpen,
        setIsWhyModalOpen,
        selectedHazardDetail,
        setSelectedHazardDetail,
        isNotificationsOpen,
        setIsNotificationsOpen,
        unreadCount,
        demoMode,
        setDemoMode,
        isDemoRunning,
        demoStep,
        runDemoTour,
        stopDemoTour,
        nextDemoStep,
        prevDemoStep,
        resetDemoScenario,
        switchCropStage,
        switchCrop,
        switchLocation,
        currentScenarioId,
        selectScenario,
        analyzeRiskCustom,
        t
      }}
    >
      {children}
    </FarmShieldContext.Provider>
  );
};

export const useFarmShield = () => {
  const context = useContext(FarmShieldContext);
  if (!context) {
    throw new Error('useFarmShield must be used within a FarmShieldProvider');
  }
  return context;
};
