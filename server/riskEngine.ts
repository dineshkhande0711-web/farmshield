export interface RiskInput {
  crop: string;
  stage: string;
  expectedRainMm: number;
  rainProbability: number;
  temperatureC: number;
  humidityPct: number;
  isActionCompleted?: boolean;
  verificationStatus?: 'stress_improving' | 'stress_persisting' | 'stress_increasing' | null;
}

export interface HazardResult {
  id: string;
  name: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  shortExplanation: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  agronomicImpact: string;
}

export interface RiskEvaluationResult {
  overallScore: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  primaryHazard: string;
  expectedWindow: string;
  reasons: string[];
  hazards: HazardResult[];
  formulaBreakdown: {
    weatherSignal: string;
    cropFactor: string;
    stageSensitivity: string;
    soilRetention: string;
    calculationExplanation: string;
  };
  recommendations: {
    timing: 'before_event' | 'during_event' | 'after_event';
    title: string;
    steps: string[];
    rationale: string;
    actionWindow: string;
  }[];
}

const STAGE_SENSITIVITY: Record<string, Record<string, { rain: number; heat: number; drought: number; disease: number }>> = {
  green_pea: {
    germination: { rain: 0.65, heat: 0.45, drought: 0.70, disease: 0.40 },
    vegetative: { rain: 0.35, heat: 0.50, drought: 0.60, disease: 0.50 },
    flowering: { rain: 0.95, heat: 0.85, drought: 0.80, disease: 0.85 },
    pod_formation: { rain: 0.70, heat: 0.75, drought: 0.75, disease: 0.80 },
    maturity: { rain: 0.85, heat: 0.40, drought: 0.30, disease: 0.60 },
  },
  soybean: {
    germination: { rain: 0.50, heat: 0.40, drought: 0.65, disease: 0.45 },
    vegetative: { rain: 0.30, heat: 0.45, drought: 0.55, disease: 0.40 },
    flowering: { rain: 0.75, heat: 0.80, drought: 0.85, disease: 0.70 },
    pod_formation: { rain: 0.70, heat: 0.75, drought: 0.80, disease: 0.75 },
    maturity: { rain: 0.80, heat: 0.30, drought: 0.30, disease: 0.50 },
  },
  sugarcane: {
    germination: { rain: 0.40, heat: 0.40, drought: 0.60, disease: 0.30 },
    vegetative: { rain: 0.20, heat: 0.30, drought: 0.50, disease: 0.35 },
    flowering: { rain: 0.30, heat: 0.40, drought: 0.50, disease: 0.40 },
    pod_formation: { rain: 0.25, heat: 0.35, drought: 0.45, disease: 0.35 },
    maturity: { rain: 0.35, heat: 0.30, drought: 0.30, disease: 0.30 },
  }
};

export function evaluateCropRisk(input: RiskInput): RiskEvaluationResult {
  const crop = input.crop.toLowerCase();
  const stage = input.stage.toLowerCase();
  
  const cropMatrix = STAGE_SENSITIVITY[crop] || STAGE_SENSITIVITY['green_pea'];
  const stageWeights = cropMatrix[stage] || cropMatrix['flowering'];

  let rainScore = Math.min(100, Math.round((input.expectedRainMm / 80) * 80 + (input.rainProbability * 0.2)));
  if (input.expectedRainMm >= 60) rainScore = Math.max(rainScore, 82);

  let heatScore = 15;
  if (input.temperatureC > 35) heatScore = 85;
  else if (input.temperatureC > 32) heatScore = 65;
  else if (input.temperatureC > 29) heatScore = 38;

  let waterStressScore = 20;
  if (input.expectedRainMm < 5 && input.humidityPct < 45) waterStressScore = 60;

  let tempShockScore = input.temperatureC > 34 || input.temperatureC < 14 ? 55 : 22;
  let diseaseScore = (input.humidityPct > 78 && input.temperatureC >= 20 && input.temperatureC <= 29) ? 68 : 28;

  const adjustedRainScore = Math.min(100, Math.round(rainScore * stageWeights.rain * 1.05));
  const adjustedHeatScore = Math.min(100, Math.round(heatScore * stageWeights.heat));
  const adjustedWaterScore = Math.min(100, Math.round(waterStressScore * stageWeights.drought));
  const adjustedTempShock = Math.min(100, Math.round(tempShockScore * 0.7));
  const adjustedDiseaseScore = Math.min(100, Math.round(diseaseScore * stageWeights.disease));

  const getSeverity = (score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' => {
    if (score >= 75) return 'HIGH';
    if (score >= 45) return 'MEDIUM';
    return 'LOW';
  };

  const hazards: HazardResult[] = [
    {
      id: 'excess_rainfall',
      name: 'Rainfall Risk',
      severity: getSeverity(adjustedRainScore),
      score: adjustedRainScore,
      shortExplanation: input.expectedRainMm >= 50 ? 'Heavy precipitation exceeding field percolation capacity' : 'Manageable precipitation levels',
      trend: 'increasing',
      agronomicImpact: 'Root hypoxia and blossom detachment under saturated topsoil conditions'
    },
    {
      id: 'heat_stress',
      name: 'Heat Stress',
      severity: getSeverity(adjustedHeatScore),
      score: adjustedHeatScore,
      shortExplanation: input.temperatureC > 32 ? 'Elevated midday thermal accumulation' : 'Thermal conditions within optimal photosynthetic range',
      trend: 'stable',
      agronomicImpact: 'Pollen desiccation occurs above 32°C during anthesis'
    },
    {
      id: 'water_stress',
      name: 'Water Stress',
      severity: getSeverity(adjustedWaterScore),
      score: adjustedWaterScore,
      shortExplanation: 'Adequate near-term moisture; no imminent drought deficit',
      trend: 'decreasing',
      agronomicImpact: 'Root zone moisture currently exceeds field capacity'
    },
    {
      id: 'temperature_shock',
      name: 'Temperature Shock',
      severity: getSeverity(adjustedTempShock),
      score: adjustedTempShock,
      shortExplanation: 'Diurnal swings stabilized by maritime moisture front',
      trend: 'stable',
      agronomicImpact: 'Cellular membrane stability maintained'
    },
    {
      id: 'disease_risk',
      name: 'Disease Favorability',
      severity: getSeverity(adjustedDiseaseScore),
      score: adjustedDiseaseScore,
      shortExplanation: input.humidityPct > 75 ? 'Persistent canopy wetness elevates fungal spore germination' : 'Low pathogen pressure window',
      trend: 'increasing',
      agronomicImpact: 'Favorable environment for Powdery Mildew and Root Rot complexes'
    }
  ];

  let overallScore = adjustedRainScore;
  if (input.isActionCompleted) {
    overallScore = Math.max(30, overallScore - 15);
  }
  if (input.verificationStatus === 'stress_improving') {
    overallScore = 52;
  } else if (input.verificationStatus === 'stress_increasing') {
    overallScore = Math.min(95, overallScore + 12);
  }

  const severity = getSeverity(overallScore);

  return {
    overallScore,
    severity,
    primaryHazard: 'Heavy Rainfall',
    expectedWindow: 'Next 36 hours',
    reasons: [
      `Expected rainfall of ${input.expectedRainMm} mm over the next 36 hours.`,
      `${crop.replace('_', ' ').toUpperCase()} at "${stage.toUpperCase()}" stage has high flower detachment sensitivity to standing water.`,
      `Local black clay-loam soil in Satara exhibits high moisture retention and slow drainage.`
    ],
    hazards,
    formulaBreakdown: {
      weatherSignal: `${input.expectedRainMm} mm rain (${input.rainProbability}% probability)`,
      cropFactor: `${crop.replace('_', ' ').toUpperCase()}`,
      stageSensitivity: `${stage.toUpperCase()} (Multiplier: ${stageWeights.rain})`,
      soilRetention: 'Clay-Loam percolation index: 1.05',
      calculationExplanation: `Base Weather Hazard (${rainScore}) × Stage Vulnerability (${stageWeights.rain}) × Soil Retention (1.05) = Crop Risk Score: ${overallScore}/100`
    },
    recommendations: [
      {
        timing: 'before_event',
        title: 'Inspect & Clear Drainage Pathways',
        steps: [
          'Inspect existing contour drainage trenches and remove debris/weeds where safe.',
          'Dig shallow lateral exit furrows at 10-meter intervals toward natural slope.',
          'Halt all pending supplemental micro-irrigation immediately.',
          'Monitor field depressions and low-lying corners for water pooling.'
        ],
        rationale: 'FarmShield detected elevated rainfall risk during a moisture-sensitive flowering stage. Prompt surface drainage prevents standing root hypoxia.',
        actionWindow: 'Next 12–24 hours (Before heavy rainfall begins)'
      }
    ]
  };
}
