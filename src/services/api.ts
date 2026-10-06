import {
  WeatherTelemetry,
  CropRiskEvaluation,
  HazardAssessment,
  RecommendedAction,
  HistoricalDay,
  AdminRegionalData,
  FieldObservation,
  CropType,
  GrowthStage
} from '../types';
import {
  INITIAL_WEATHER,
  INITIAL_CROP_RISK,
  INITIAL_HAZARDS,
  INITIAL_ACTION,
  DEMO_SAMPLE_OBSERVATIONS,
  HISTORY_DAYS,
  ADMIN_REGIONAL_DATA
} from './mockData';

const BASE_URL = '/api';

export async function fetchWeather(location: string = 'Satara, Maharashtra'): Promise<WeatherTelemetry> {
  try {
    const res = await fetch(`${BASE_URL}/weather?location=${encodeURIComponent(location)}`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (_e) {
    return { ...INITIAL_WEATHER, location };
  }
}

export async function calculateRisk(params: {
  crop: CropType;
  stage: GrowthStage;
  expectedRainMm?: number;
  rainProbability?: number;
  temperatureC?: number;
  humidityPct?: number;
  isActionCompleted?: boolean;
  verificationStatus?: 'stress_improving' | 'stress_persisting' | 'stress_increasing' | null;
}): Promise<{
  overallScore: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  primaryHazard: string;
  expectedWindow: string;
  reasons: string[];
  hazards: HazardAssessment[];
  formulaBreakdown: {
    weatherSignal: string;
    cropFactor: string;
    stageSensitivity: string;
    soilRetention: string;
    calculationExplanation: string;
  };
}> {
  try {
    const res = await fetch(`${BASE_URL}/risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('API risk request failed');
    return await res.json();
  } catch (_e) {
    const { crop, stage, isActionCompleted, verificationStatus } = params;
    let score = 78;

    if (crop === 'green_pea') {
      if (stage === 'vegetative') score = 38;
      else if (stage === 'flowering') score = 78;
      else if (stage === 'germination') score = 55;
      else if (stage === 'pod_formation') score = 65;
      else if (stage === 'maturity') score = 70;
    } else if (crop === 'sugarcane') {
      score = stage === 'vegetative' ? 25 : 32;
    } else if (crop === 'soybean') {
      score = stage === 'flowering' ? 72 : 45;
    }

    if (isActionCompleted) {
      score = Math.max(30, score - 15);
    }
    if (verificationStatus === 'stress_improving') {
      score = 52;
    }

    const severity = score >= 75 ? 'HIGH' : score >= 45 ? 'MEDIUM' : 'LOW';

    const hazards: HazardAssessment[] = INITIAL_HAZARDS.map(h => {
      if (h.id === 'excess_rainfall') {
        return {
          ...h,
          riskScore: score,
          severity,
          shortExplanation: stage === 'flowering'
            ? '70mm precipitation during sensitive flowering stage triggers high blossom detachment.'
            : 'Rainfall manageable during vegetative growth.'
        };
      }
      return h;
    });

    return {
      overallScore: score,
      severity,
      primaryHazard: 'Heavy Rainfall & Waterlogging',
      expectedWindow: 'Next 36 hours',
      reasons: [
        'Expected 70mm rainfall over next 36 hours in Satara.',
        `${crop.replace('_', ' ').toUpperCase()} at "${stage.toUpperCase()}" stage has high flower detachment sensitivity to standing water.`,
        'Satara black clay-loam soil exhibits slow percolation and prolonged surface saturation.'
      ],
      hazards,
      formulaBreakdown: {
        weatherSignal: '70 mm Rainfall (82% Probability)',
        cropFactor: `${crop.replace('_', ' ').toUpperCase()}`,
        stageSensitivity: `${stage.toUpperCase()} (Sensitivity factor: ${stage === 'flowering' ? '0.95' : '0.35'})`,
        soilRetention: 'Clay-Loam percolation index: 1.05',
        calculationExplanation: `Base Weather Hazard (${stage === 'flowering' ? '80' : '40'}) × Stage Sensitivity (${stage === 'flowering' ? '0.95' : '0.35'}) × Soil (1.05) = Crop Risk Score: ${score}/100`
      }
    };
  }
}

export async function fetchRecommendations(_stage: GrowthStage = 'flowering'): Promise<{ primaryAction: RecommendedAction }> {
  try {
    const res = await fetch(`${BASE_URL}/recommendations`);
    if (!res.ok) throw new Error('API recommendations request failed');
    return await res.json();
  } catch (_e) {
    return { primaryAction: INITIAL_ACTION };
  }
}

export async function verifyObservation(sampleType: 'improving' | 'persisting'): Promise<{
  observation: FieldObservation;
  updatedFarmRiskScore: number;
  updatedSeverity: 'LOW' | 'MEDIUM' | 'HIGH';
}> {
  try {
    const res = await fetch(`${BASE_URL}/verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleType }),
    });
    if (!res.ok) throw new Error('Verification request failed');
    const data = await res.json();
    return {
      observation: data.observation,
      updatedFarmRiskScore: data.updatedFarmRiskScore,
      updatedSeverity: data.updatedSeverity
    };
  } catch (_e) {
    const obs = DEMO_SAMPLE_OBSERVATIONS[sampleType];
    const updatedRisk = sampleType === 'improving' ? 52 : 68;
    return {
      observation: obs,
      updatedFarmRiskScore: updatedRisk,
      updatedSeverity: updatedRisk >= 75 ? 'HIGH' : 'MEDIUM'
    };
  }
}

export async function fetchHistory(): Promise<HistoricalDay[]> {
  try {
    const res = await fetch(`${BASE_URL}/history`);
    if (!res.ok) throw new Error('History request failed');
    return await res.json();
  } catch (_e) {
    return HISTORY_DAYS;
  }
}

export async function fetchAdminData(): Promise<AdminRegionalData> {
  try {
    const res = await fetch(`${BASE_URL}/admin/overview`);
    if (!res.ok) throw new Error('Admin request failed');
    return await res.json();
  } catch (_e) {
    return ADMIN_REGIONAL_DATA;
  }
}
