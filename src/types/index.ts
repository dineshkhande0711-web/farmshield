export type Language = 'en' | 'mr' | 'hi';

export type GrowthStage = 'germination' | 'vegetative' | 'flowering' | 'pod_formation' | 'maturity';

export type CropType = 'green_pea' | 'soybean' | 'sugarcane' | 'cotton' | 'wheat' | 'tomato';

export type HazardType = 'excess_rainfall' | 'heat_stress' | 'water_stress' | 'temperature_shock' | 'disease_risk';

export type HazardSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface FarmProfile {
  id: string;
  farmerName: string;
  location: string;
  district: string;
  state: string;
  crop: CropType;
  cropName: string;
  growthStage: GrowthStage;
  growthStageName: string;
  farmAreaAcres: number;
  soilType: string;
  sowingDate: string;
}

export interface HazardAssessment {
  id: HazardType;
  name: string;
  icon: string;
  severity: HazardSeverity;
  riskScore: number;
  shortExplanation: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  telemetryTrigger: string;
  agronomicImpact: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  rainMm: number;
  rainProb: number;
  humidity: number;
  condition: string;
}

export interface WeatherTelemetry {
  location: string;
  temperature: number;
  feelsLike: number;
  rainProbability: number;
  expectedRainfallMm: number;
  humidity: number;
  windSpeedKmh: number;
  pressureHpa: number;
  condition: string;
  forecastWindow: string;
  isSimulated: boolean;
  dataSource: string;
  forecastDays: WeatherDay[];
}

export interface FormulaBreakdown {
  weatherSignal: string;
  cropFactor: string;
  stageSensitivity: string;
  soilRetention: string;
  calculationExplanation: string;
}

export interface CropRiskEvaluation {
  overallScore: number;
  severity: HazardSeverity;
  primaryHazard: string;
  expectedWindow: string;
  cropStageSummary: string;
  reasons: string[];
  formulaBreakdown: FormulaBreakdown;
  updatedAfterVerification?: boolean;
  verificationDelta?: number;
}

export interface RecommendedAction {
  id: string;
  timing: 'before_event' | 'during_event' | 'after_event';
  timingLabel: string;
  title: string;
  steps: string[];
  rationale: string;
  actionWindow: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface FieldObservation {
  id: string;
  timestamp: string;
  imageUrl: string;
  imageLabel: string;
  stageLabel: 'Before Intervention' | 'After Intervention' | 'Field Check';
  stressStatus: 'stress_improving' | 'stress_persisting' | 'stress_increasing';
  statusLabel: string;
  confidenceScore: number;
  findings: {
    standingWaterDetected: boolean;
    waterLevelDescription: string;
    visibleLeafStress: string;
    canopyCondition: string;
    changeFromPrevious: string;
  };
  causalDisclaimer: string;
}

export interface HistoricalDay {
  dayId: string;
  dayLabel: string;
  date: string;
  riskLevel: HazardSeverity;
  riskScore: number;
  weatherCondition: string;
  rainfallMm: number;
  temperatureC: number;
  hazard: string;
  cropStage: string;
  recommendation: string;
  actionStatus: string;
  observationSummary?: string;
  updatedRiskScore?: number;
}

export interface AdminFarmerAlert {
  id: string;
  farmer: string;
  village: string;
  taluka: string;
  crop: string;
  stage: string;
  acres: number;
  riskScore: number;
  severity: HazardSeverity;
  primaryHazard: string;
  actionTaken: boolean;
  verifiedStatus: 'Verified Improving' | 'Pending Verification' | 'Escalated to KVK';
  contact: string;
}

export interface AdminRegionalData {
  regionName: string;
  farmsMonitored: number;
  activeHighRiskFarms: number;
  verificationComplianceRate: number;
  hazardDistribution: { name: string; count: number; percentage: number; color: string }[];
  cropDistribution: { name: string; count: number; avgRisk: number }[];
  farmers: AdminFarmerAlert[];
}
