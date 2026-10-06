import {
  WeatherTelemetry,
  CropRiskEvaluation,
  HazardAssessment,
  RecommendedAction,
  HistoricalDay,
  AdminRegionalData,
  FieldObservation
} from '../types';

export const INITIAL_WEATHER: WeatherTelemetry = {
  location: 'Satara, Maharashtra',
  temperature: 27,
  feelsLike: 30,
  rainProbability: 82,
  expectedRainfallMm: 70,
  humidity: 84,
  windSpeedKmh: 14,
  pressureHpa: 1008,
  condition: 'Heavy Rainfall Alert',
  forecastWindow: 'Next 36 hours',
  isSimulated: true,
  dataSource: 'India Meteorological Department (Simulated Telemetry Feed)',
  forecastDays: [
    { day: 'Today', date: '15 Sep', tempMax: 28, tempMin: 22, rainMm: 70, rainProb: 82, humidity: 84, condition: 'Heavy Rain' },
    { day: 'Tomorrow', date: '16 Sep', tempMax: 26, tempMin: 21, rainMm: 45, rainProb: 70, humidity: 88, condition: 'Moderate Showers' },
    { day: 'Thursday', date: '17 Sep', tempMax: 29, tempMin: 20, rainMm: 12, rainProb: 35, humidity: 76, condition: 'Scattered Showers' }
  ]
};

export const INITIAL_HAZARDS: HazardAssessment[] = [
  {
    id: 'excess_rainfall',
    name: 'Rainfall Risk',
    icon: 'CloudRain',
    severity: 'HIGH',
    riskScore: 78,
    shortExplanation: '70mm precipitation expected; exceeds Satara clay loam absorption rate.',
    trend: 'increasing',
    telemetryTrigger: '70mm in next 36 hrs (> threshold of 45mm)',
    agronomicImpact: 'Root hypoxia and high risk of flower drop in Green Pea.'
  },
  {
    id: 'heat_stress',
    name: 'Heat Stress',
    icon: 'Sun',
    severity: 'LOW',
    riskScore: 18,
    shortExplanation: 'Daytime high 28°C; optimal for vegetative and floral development.',
    trend: 'stable',
    telemetryTrigger: 'Max temp 28°C (< critical threshold of 32°C)',
    agronomicImpact: 'Pollen viability is preserved.'
  },
  {
    id: 'water_stress',
    name: 'Water Stress',
    icon: 'Droplets',
    severity: 'MEDIUM',
    riskScore: 42,
    shortExplanation: 'Moisture surplus rather than deficit; root suffocation risk elevated.',
    trend: 'increasing',
    telemetryTrigger: 'Soil moisture saturation index: 88%',
    agronomicImpact: 'Excess moisture inhibits nitrogen fixation in legume root nodules.'
  },
  {
    id: 'temperature_shock',
    name: 'Temperature Shock',
    icon: 'ThermometerSnowflake',
    severity: 'LOW',
    riskScore: 22,
    shortExplanation: 'Diurnal swing is 6°C; gentle temperature gradient.',
    trend: 'stable',
    telemetryTrigger: 'Diurnal fluctuation: 22°C - 28°C',
    agronomicImpact: 'No thermal shock to cellular membranes.'
  },
  {
    id: 'disease_risk',
    name: 'Disease Favorability',
    icon: 'Bug',
    severity: 'MEDIUM',
    riskScore: 56,
    shortExplanation: '84% humidity + 27°C creates favorable fungal sporulation window.',
    trend: 'increasing',
    telemetryTrigger: 'Persistent canopy wetness > 14 hours',
    agronomicImpact: 'Elevates likelihood of Powdery Mildew and Phytophthora root rot.'
  }
];

export const INITIAL_CROP_RISK: CropRiskEvaluation = {
  overallScore: 78,
  severity: 'HIGH',
  primaryHazard: 'Heavy Rainfall & Waterlogging',
  expectedWindow: 'Next 36 hours',
  cropStageSummary: 'Green Pea — Flowering Stage',
  reasons: [
    'Heavy rainfall (70mm) expected over the next 36 hours in Satara.',
    'Green Pea is currently in the "Flowering" stage—the most vulnerable phenological phase.',
    'Standing water causes immediate blossom abortion and poor pod set.',
    'Local black clay loam soil has high water retention and slow percolation.'
  ],
  formulaBreakdown: {
    weatherSignal: '70 mm Rainfall (82% Probability)',
    cropFactor: 'Green Pea (Pisum sativum) — Legume family',
    stageSensitivity: 'Flowering Stage (Sensitivity Factor: 0.95)',
    soilRetention: 'Black Clay Loam (Percolation index: 1.05)',
    calculationExplanation: 'Base Rain Hazard (80) × Flowering Vulnerability (0.95) × Soil Retention (1.05) - Baseline Buffer = 78 / 100 (HIGH RISK)'
  }
};

export const INITIAL_ACTION: RecommendedAction = {
  id: 'action-satara-pea-1',
  timing: 'before_event',
  timingLabel: 'Action Window: Before Rainfall',
  title: 'Inspect & Clear Lateral Drainage Pathways',
  steps: [
    'Inspect existing contour drainage trenches and clear sediment and weeds where safe.',
    'Dig shallow lateral exit furrows at 10-meter intervals directed toward natural downward gradient.',
    'Halt any planned supplemental micro-irrigation immediately.',
    'Identify field depressions and create quick outlet notches to prevent ponding.'
  ],
  rationale: 'FarmShield detected elevated rainfall risk during a moisture-sensitive crop stage. Proactive drainage clearance prevents waterlogging before rainfall begins.',
  actionWindow: 'Next 12–24 hours (Before heavy rainfall begins)',
  isCompleted: false
};

export const DEMO_SAMPLE_OBSERVATIONS: Record<string, FieldObservation> = {
  improving: {
    id: 'obs-verified-improving',
    timestamp: 'Today at 03:45 PM',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
    imageLabel: 'Field After Drainage Clearance',
    stageLabel: 'After Intervention',
    stressStatus: 'stress_improving',
    statusLabel: '🟢 Stress Improving',
    confidenceScore: 93,
    findings: {
      standingWaterDetected: false,
      waterLevelDescription: 'Water successfully channeled through newly dug lateral furrows; no standing surface water.',
      visibleLeafStress: 'Normal green foliar coloration; leaf turgor recovering steadily.',
      canopyCondition: 'Flowering canopy intact; flower retention healthy across surveyed rows.',
      changeFromPrevious: 'Substantial improvement: 85% reduction in visible water ponding compared to baseline photo.'
    },
    causalDisclaimer: 'AI-assisted crop stress observation based on computer vision feature analysis. Trend comparison indicates favorable recovery.'
  },
  persisting: {
    id: 'obs-verified-persisting',
    timestamp: 'Today at 03:45 PM',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    imageLabel: 'Field Baseline / Before Intervention',
    stageLabel: 'Before Intervention',
    stressStatus: 'stress_persisting',
    statusLabel: '🟡 Stress Persisting',
    confidenceScore: 89,
    findings: {
      standingWaterDetected: true,
      waterLevelDescription: 'Water accumulation in row furrows reaching 2.5–3.5 cm depth.',
      visibleLeafStress: 'Early chlorosis (yellowing) observed along lower leaf margins.',
      canopyCondition: 'Flower count normal but petiole drooping observed under saturated soil.',
      changeFromPrevious: 'Minimal change from previous snapshot; drainage appears obstructed at boundary.'
    },
    causalDisclaimer: 'AI-assisted crop stress observation based on computer vision feature analysis. Trend comparison indicates persisting stress.'
  }
};

export const HISTORY_DAYS: HistoricalDay[] = [
  {
    dayId: 'd1',
    dayLabel: 'Day 1',
    date: '12 Sep 2026',
    riskLevel: 'MEDIUM',
    riskScore: 48,
    weatherCondition: 'Cloudy, 10mm light rain',
    rainfallMm: 10,
    temperatureC: 28,
    hazard: 'Early moisture build-up',
    cropStage: 'Late Vegetative / Early Buds',
    recommendation: 'Monitor field contour bunds and prepare furrow tools.',
    actionStatus: 'Completed by Farmer'
  },
  {
    dayId: 'd2',
    dayLabel: 'Day 2',
    date: '13 Sep 2026',
    riskLevel: 'HIGH',
    riskScore: 78,
    weatherCondition: '70mm Heavy Rainfall Alert',
    rainfallMm: 70,
    temperatureC: 27,
    hazard: 'Excess Rainfall & Waterlogging',
    cropStage: 'Flowering (Peak Sensitivity)',
    recommendation: 'Dig lateral furrows and clear drainage pathways before rain.',
    actionStatus: 'Advisory Dispatched',
    observationSummary: 'Before: Standing water observed in rows; Risk: 78/100',
    updatedRiskScore: 78
  },
  {
    dayId: 'd3',
    dayLabel: 'Day 3',
    date: '14 Sep 2026',
    riskLevel: 'HIGH',
    riskScore: 75,
    weatherCondition: '45mm Continued Downpour',
    rainfallMm: 45,
    temperatureC: 26,
    hazard: 'Sustained Saturated Soil',
    cropStage: 'Flowering',
    recommendation: 'Ensure lateral trenches flow steadily into natural nullah.',
    actionStatus: 'Action Performed'
  },
  {
    dayId: 'd4',
    dayLabel: 'Day 4',
    date: '15 Sep 2026',
    riskLevel: 'MEDIUM',
    riskScore: 52,
    weatherCondition: '15mm Light Showers',
    rainfallMm: 15,
    temperatureC: 27,
    hazard: 'Receding Water / Mild Moisture',
    cropStage: 'Flowering',
    recommendation: 'Field image verification confirmed water drainage. Maintain furrow pathways.',
    actionStatus: 'Verified Improving',
    observationSummary: 'After: Surface water receded; leaf turgor restored. Risk dropped to 52/100',
    updatedRiskScore: 52
  },
  {
    dayId: 'd5',
    dayLabel: 'Day 5',
    date: '16 Sep 2026',
    riskLevel: 'LOW',
    riskScore: 24,
    weatherCondition: 'Partly Sunny / Clear Skies',
    rainfallMm: 0,
    temperatureC: 29,
    hazard: 'Safe Agro-Climatic Window',
    cropStage: 'Early Podding',
    recommendation: 'Optimal growth conditions. Resume standard bio-fertilizer schedule.',
    actionStatus: 'Scheduled'
  }
];

export const ADMIN_REGIONAL_DATA: AdminRegionalData = {
  regionName: 'Satara District, Maharashtra',
  farmsMonitored: 1248,
  activeHighRiskFarms: 142,
  verificationComplianceRate: 84.5,
  hazardDistribution: [
    { name: 'Excess Rainfall / Waterlogging', count: 108, percentage: 76, color: '#0284c7' },
    { name: 'Disease Favorability', count: 22, percentage: 15, color: '#9333ea' },
    { name: 'Heat Stress', count: 8, percentage: 6, color: '#ea580c' },
    { name: 'Water Deficit', count: 4, percentage: 3, color: '#10b981' }
  ],
  cropDistribution: [
    { name: 'Green Pea', count: 432, avgRisk: 74 },
    { name: 'Soybean', count: 380, avgRisk: 58 },
    { name: 'Sugarcane', count: 290, avgRisk: 32 },
    { name: 'Vegetables / Tomato', count: 146, avgRisk: 68 }
  ],
  farmers: [
    { id: 'f-101', farmer: 'Dinesh Khande', village: 'Wai', taluka: 'Wai', crop: 'Green Pea', stage: 'Flowering', acres: 2.5, riskScore: 78, severity: 'HIGH', primaryHazard: 'Heavy Rainfall', actionTaken: true, verifiedStatus: 'Verified Improving', contact: '+91 98220 14820' },
    { id: 'f-102', farmer: 'Akshay Ryakawar', village: 'Karad Rural', taluka: 'Karad', crop: 'Green Pea', stage: 'Flowering', acres: 3.0, riskScore: 82, severity: 'HIGH', primaryHazard: 'Excess Rainfall', actionTaken: true, verifiedStatus: 'Pending Verification', contact: '+91 98221 35910' },
    { id: 'f-103', farmer: 'Sanskar Penshanwar', village: 'Koregaon', taluka: 'Koregaon', crop: 'Soybean', stage: 'Podding', acres: 4.2, riskScore: 68, severity: 'MEDIUM', primaryHazard: 'Disease Favorability', actionTaken: false, verifiedStatus: 'Pending Verification', contact: '+91 98222 47120' },
    { id: 'f-104', farmer: 'Ramesh Patil', village: 'Phaltan', taluka: 'Phaltan', crop: 'Green Pea', stage: 'Flowering', acres: 1.8, riskScore: 88, severity: 'HIGH', primaryHazard: 'Waterlogging', actionTaken: false, verifiedStatus: 'Escalated to KVK', contact: '+91 98223 89201' },
    { id: 'f-105', farmer: 'Suresh Deshmukh', village: 'Patan', taluka: 'Patan', crop: 'Sugarcane', stage: 'Tillering', acres: 5.0, riskScore: 28, severity: 'LOW', primaryHazard: 'Low Risk', actionTaken: true, verifiedStatus: 'Verified Improving', contact: '+91 98224 51042' }
  ]
};
