import { CropType, GrowthStage, HazardAssessment, WeatherTelemetry, CropRiskEvaluation, RecommendedAction } from '../types';

export interface DemoScenario {
  id: 'scenario-a' | 'scenario-b' | 'scenario-c';
  label: string;
  badge: string;
  badgeColor: string;
  crop: CropType;
  cropName: string;
  growthStage: GrowthStage;
  growthStageName: string;
  location: string;
  district: string;
  state: string;
  farmAreaAcres: number;
  soilType: string;
  weather: WeatherTelemetry;
  cropRisk: CropRiskEvaluation;
  hazards: HazardAssessment[];
  recommendedAction: RecommendedAction;
  whyTitle: string;
  whyBullets: string[];
  actionItems: {
    icon: string;
    title: string;
    desc: string;
    actionable: string;
  }[];
}

export const DEMO_SCENARIOS: Record<'scenario-a' | 'scenario-b' | 'scenario-c', DemoScenario> = {
  'scenario-a': {
    id: 'scenario-a',
    label: 'Scenario A: Heavy Rainfall & Waterlogging',
    badge: 'HIGH RISK 82%',
    badgeColor: 'bg-red-500 text-white',
    crop: 'green_pea',
    cropName: 'Green Pea (मटार)',
    growthStage: 'flowering',
    growthStageName: 'Flowering (फुलधारणा)',
    location: 'Satara, Maharashtra',
    district: 'Satara',
    state: 'Maharashtra',
    farmAreaAcres: 2.5,
    soilType: 'Black Clay-Loam (काळी कसदार माती)',
    weather: {
      location: 'Satara, Maharashtra',
      temperature: 34,
      feelsLike: 37,
      rainProbability: 87,
      expectedRainfallMm: 82,
      humidity: 87,
      windSpeedKmh: 16,
      pressureHpa: 1007,
      condition: 'Heavy Rainfall Alert (82 mm)',
      forecastWindow: 'Next 36 hours',
      isSimulated: true,
      dataSource: 'IMD Satara Station & Copernicus High-Res Moisture (Simulated)',
      forecastDays: [
        { day: 'Today', date: '17 Sep', tempMax: 34, tempMin: 23, rainMm: 82, rainProb: 87, humidity: 87, condition: 'Heavy Downpour' },
        { day: 'Tomorrow', date: '18 Sep', tempMax: 29, tempMin: 22, rainMm: 45, rainProb: 75, humidity: 90, condition: 'Moderate Showers' },
        { day: 'Friday', date: '19 Sep', tempMax: 28, tempMin: 21, rainMm: 15, rainProb: 40, humidity: 78, condition: 'Scattered Rain' }
      ]
    },
    cropRisk: {
      overallScore: 82,
      severity: 'HIGH',
      primaryHazard: 'Excess Rainfall & Waterlogging',
      expectedWindow: 'Next 36 hours',
      cropStageSummary: 'Green Pea — Flowering Stage',
      reasons: [
        'Heavy rainfall (82 mm) expected over the next 36 hours in Satara district.',
        'Crop is in peak Flowering stage—the most vulnerable phenological phase.',
        'High soil moisture in Satara black clay-loam traps standing water around root zone.',
        'Standing water causes rapid flower detachment, petal rot, and root hypoxia.'
      ],
      formulaBreakdown: {
        weatherSignal: '82 mm Rainfall (87% Probability, 87% Humidity)',
        cropFactor: 'Green Pea (Pisum sativum) — Taproot legume',
        stageSensitivity: 'Flowering Stage (Phenology Multiplier: 0.95)',
        soilRetention: 'Black Clay-Loam (Percolation Index: 1.05)',
        calculationExplanation: 'Base Precipitation Hazard (85) × Flowering Vulnerability (0.95) × Soil Retention (1.05) - Baseline Buffer = 82 / 100 (HIGH RISK)'
      }
    },
    hazards: [
      {
        id: 'excess_rainfall',
        name: 'Excess Rainfall',
        icon: 'CloudRain',
        severity: 'HIGH',
        riskScore: 82,
        shortExplanation: '82mm precipitation expected; exceeds clay-loam absorption capacity.',
        trend: 'increasing',
        telemetryTrigger: '82mm in next 36 hrs (> threshold 45mm)',
        agronomicImpact: 'Root hypoxia and severe flower drop in green pea crop.'
      },
      {
        id: 'water_stress',
        name: 'Waterlogging Risk',
        icon: 'Droplets',
        severity: 'HIGH',
        riskScore: 74,
        shortExplanation: 'Saturation index 91%; furrow ponding imminent.',
        trend: 'increasing',
        telemetryTrigger: 'Topsoil saturation > 85%',
        agronomicImpact: 'Suffocation of root nodules, halting nitrogen fixation.'
      },
      {
        id: 'heat_stress',
        name: 'Heat Stress',
        icon: 'Sun',
        severity: 'MEDIUM',
        riskScore: 67,
        shortExplanation: 'High ambient temperature (34°C) combined with high humidity.',
        trend: 'stable',
        telemetryTrigger: 'Daytime peak: 34°C with 87% RH',
        agronomicImpact: 'Elevates transpiration stress during rain breaks.'
      },
      {
        id: 'disease_risk',
        name: 'Disease Favorability',
        icon: 'Bug',
        severity: 'MEDIUM',
        riskScore: 65,
        shortExplanation: 'Warm humid canopy creates fungal sporulation window.',
        trend: 'increasing',
        telemetryTrigger: 'Leaf wetness duration > 16 hours',
        agronomicImpact: 'High risk of Powdery Mildew and Phytophthora root rot.'
      },
      {
        id: 'temperature_shock',
        name: 'Temperature Shock',
        icon: 'ThermometerSnowflake',
        severity: 'LOW',
        riskScore: 24,
        shortExplanation: 'Stable diurnal fluctuation without cold front.',
        trend: 'stable',
        telemetryTrigger: 'Diurnal swing: 11°C',
        agronomicImpact: 'Cellular membranes remain stable.'
      }
    ],
    recommendedAction: {
      id: 'action-satara-pea-rain',
      timing: 'before_event',
      timingLabel: 'Action Window: Before Rainfall (Next 12–24h)',
      title: 'Inspect & Open Lateral Field Drainage Channels',
      steps: [
        'Inspect existing contour drainage trenches and clear silt blockages immediately.',
        'Dig shallow lateral exit furrows at 10-meter intervals directed toward natural field slope.',
        'Halt all pending supplemental micro-irrigation immediately.',
        'Monitor field depressions and low-lying corners for water pooling.'
      ],
      rationale: 'FarmShield detected 82mm rainfall risk during flowering stage. Proactive drainage clearance prevents waterlogging and flower detachment before rainfall peaks.',
      actionWindow: 'Next 12–24 hours (Before heavy rainfall begins)',
      isCompleted: false
    },
    whyTitle: 'Why is Waterlogging Risk 82%?',
    whyBullets: [
      'Heavy rainfall expected (82 mm in next 36 hours)',
      'High soil moisture (Black clay-loam saturation index at 87%)',
      'Crop is in flowering stage (Highly sensitive to root hypoxia & flower drop)'
    ],
    actionItems: [
      {
        icon: 'AlertTriangle',
        title: 'Improve field drainage',
        desc: 'Clear contour trenches and dig lateral furrows at 10m intervals.',
        actionable: 'Open Drainage Channels'
      },
      {
        icon: 'Droplets',
        title: 'Avoid additional irrigation',
        desc: 'Immediately stop all drip and sprinkler irrigation lines.',
        actionable: 'Halt Irrigation'
      },
      {
        icon: 'Sprout',
        title: 'Monitor crop stress',
        desc: 'Watch for standing water in furrows and flower detachment.',
        actionable: 'Upload Field Photo'
      }
    ]
  },
  'scenario-b': {
    id: 'scenario-b',
    label: 'Scenario B: Extreme Heat & Water Deficit',
    badge: 'MOD-HIGH RISK 68%',
    badgeColor: 'bg-amber-500 text-white',
    crop: 'soybean',
    cropName: 'Soybean (सोयाबीन)',
    growthStage: 'flowering',
    growthStageName: 'Flowering / Podding (फुलधारणा)',
    location: 'Solapur, Maharashtra',
    district: 'Solapur',
    state: 'Maharashtra',
    farmAreaAcres: 3.5,
    soilType: 'Medium Black / Sandy Loam',
    weather: {
      location: 'Solapur, Maharashtra',
      temperature: 38.5,
      feelsLike: 41,
      rainProbability: 12,
      expectedRainfallMm: 3,
      humidity: 28,
      windSpeedKmh: 19,
      pressureHpa: 1012,
      condition: 'Severe Heatwave Alert (38.5°C)',
      forecastWindow: 'Next 48 hours',
      isSimulated: true,
      dataSource: 'IMD Solapur & AWS Dryland Telemetry (Simulated)',
      forecastDays: [
        { day: 'Today', date: '17 Sep', tempMax: 38.5, tempMin: 27, rainMm: 3, rainProb: 12, humidity: 28, condition: 'Extreme Heat' },
        { day: 'Tomorrow', date: '18 Sep', tempMax: 39.0, tempMin: 28, rainMm: 0, rainProb: 5, humidity: 25, condition: 'Sunny / Heatwave' },
        { day: 'Friday', date: '19 Sep', tempMax: 37.5, tempMin: 26, rainMm: 2, rainProb: 15, humidity: 32, condition: 'Clear Skies' }
      ]
    },
    cropRisk: {
      overallScore: 68,
      severity: 'MEDIUM',
      primaryHazard: 'Heat Stress & Soil Moisture Deficit',
      expectedWindow: 'Next 48 hours',
      cropStageSummary: 'Soybean — Flowering & Podding',
      reasons: [
        'Ambient canopy temperature reaches 38.5°C (exceeds critical 32°C anthesis threshold).',
        'Relative humidity plunged to 28% with negligible rainfall (3 mm).',
        'High atmospheric vapor pressure deficit (VPD) triggers severe stomatal closure.',
        'Flowering soybean suffers flower abortion and poor pod set under intense thermal stress.'
      ],
      formulaBreakdown: {
        weatherSignal: '38.5°C Max Temp, 28% Humidity, 3 mm Precipitation',
        cropFactor: 'Soybean (Glycine max) — Legume oilseed',
        stageSensitivity: 'Flowering & Pod Formation (Sensitivity Multiplier: 0.85)',
        soilRetention: 'Sandy Loam (Rapid moisture evaporation index: 1.15)',
        calculationExplanation: 'Thermal Stress (85) × Anthesis Multiplier (0.85) × Vapor Deficit (1.10) - Soil Buffer = 68 / 100 (MODERATE-HIGH RISK)'
      }
    },
    hazards: [
      {
        id: 'heat_stress',
        name: 'Heat Stress',
        icon: 'Sun',
        severity: 'HIGH',
        riskScore: 85,
        shortExplanation: 'Midday temperature 38.5°C; exceeds physiological tolerance threshold.',
        trend: 'increasing',
        telemetryTrigger: 'Max temp 38.5°C (> threshold 32°C)',
        agronomicImpact: 'Pollen desiccation and severe flower drop in soybean.'
      },
      {
        id: 'water_stress',
        name: 'Moisture Deficit',
        icon: 'Droplets',
        severity: 'HIGH',
        riskScore: 74,
        shortExplanation: 'Severe soil moisture deficit; root-zone dryout accelerated by wind.',
        trend: 'increasing',
        telemetryTrigger: 'Soil moisture saturation: 22%',
        agronomicImpact: 'Leaf rolling, stomatal shutdown, and impaired photosynthetic yield.'
      },
      {
        id: 'temperature_shock',
        name: 'Temperature Shock',
        icon: 'ThermometerSnowflake',
        severity: 'MEDIUM',
        riskScore: 66,
        shortExplanation: 'Heatwave spike of +5.5°C above seasonal climatology baseline.',
        trend: 'increasing',
        telemetryTrigger: 'Canopy temperature anomaly: +5.5°C',
        agronomicImpact: 'Thermal stress to cellular membranes.'
      },
      {
        id: 'excess_rainfall',
        name: 'Excess Rainfall',
        icon: 'CloudRain',
        severity: 'LOW',
        riskScore: 8,
        shortExplanation: 'Dry conditions; zero waterlogging concern.',
        trend: 'stable',
        telemetryTrigger: 'Rainfall: 3mm over 48h',
        agronomicImpact: 'None.'
      },
      {
        id: 'disease_risk',
        name: 'Disease Favorability',
        icon: 'Bug',
        severity: 'LOW',
        riskScore: 19,
        shortExplanation: 'Low humidity suppresses foliar fungal spore germination.',
        trend: 'decreasing',
        telemetryTrigger: 'Relative humidity < 35%',
        agronomicImpact: 'Minimal fungal pathogen activity.'
      }
    ],
    recommendedAction: {
      id: 'action-solapur-soybean-heat',
      timing: 'before_event',
      timingLabel: 'Action Window: Immediate (Early Morning / Evening)',
      title: 'Schedule Nocturnal Micro-Irrigation & Anti-Transpirant Mulching',
      steps: [
        'Schedule pulsed micro-drip irrigation exclusively during late evening (8 PM - 11 PM) or dawn.',
        'Avoid flood or overhead sprinkling during peak daylight to prevent scalding.',
        'Apply straw or biomass mulch layer (5–7 cm) along crop rows to conserve soil moisture.',
        'Spray 3% Kaolin clay suspension or brassinosteroid mist to reduce foliar transpiration.'
      ],
      rationale: 'FarmShield detected extreme 38.5°C heat during flowering. Nocturnal irrigation and protective mulching prevent flower abortion without thermal shock.',
      actionWindow: 'Next 12–24 hours (Pre-heatwave peak)',
      isCompleted: false
    },
    whyTitle: 'Why is Heat & Drought Risk 68%?',
    whyBullets: [
      'Canopy temperature reaches 38.5°C (exceeds 32°C pollen viability threshold)',
      'Relative humidity dropped to 28% with severe soil moisture deficit',
      'Soybean is in flowering stage (High susceptibility to flower drop & pod abortion)'
    ],
    actionItems: [
      {
        icon: 'Droplets',
        title: 'Schedule nocturnal irrigation',
        desc: 'Irrigate via drip only during early dawn or late evening.',
        actionable: 'Set Drip Schedule'
      },
      {
        icon: 'ShieldAlert',
        title: 'Apply mulch / anti-transpirant',
        desc: 'Spread straw mulch or apply 3% Kaolin foliar protective spray.',
        actionable: 'Apply Mulch'
      },
      {
        icon: 'Thermometer',
        title: 'Monitor canopy heat stress',
        desc: 'Check leaf wilting index and root zone soil cracking.',
        actionable: 'Inspect Stress'
      }
    ]
  },
  'scenario-c': {
    id: 'scenario-c',
    label: 'Scenario C: Optimal Mild Season',
    badge: 'LOW RISK 24%',
    badgeColor: 'bg-emerald-600 text-white',
    crop: 'green_pea',
    cropName: 'Green Pea (मटार)',
    growthStage: 'vegetative',
    growthStageName: 'Vegetative Growth (शाकीय वाढ)',
    location: 'Nashik, Maharashtra',
    district: 'Nashik',
    state: 'Maharashtra',
    farmAreaAcres: 2.0,
    soilType: 'Loamy Alluvial Soil (कसदार गाळाची जमीन)',
    weather: {
      location: 'Nashik, Maharashtra',
      temperature: 24,
      feelsLike: 25,
      rainProbability: 35,
      expectedRainfallMm: 12,
      humidity: 62,
      windSpeedKmh: 11,
      pressureHpa: 1014,
      condition: 'Favorable Agro-Weather (Mild 24°C)',
      forecastWindow: 'Next 72 hours',
      isSimulated: true,
      dataSource: 'IMD Nashik Regional Agro-Met Station (Simulated)',
      forecastDays: [
        { day: 'Today', date: '17 Sep', tempMax: 24, tempMin: 18, rainMm: 12, rainProb: 35, humidity: 62, condition: 'Partly Sunny / Light Rain' },
        { day: 'Tomorrow', date: '18 Sep', tempMax: 25, tempMin: 18, rainMm: 5, rainProb: 25, humidity: 58, condition: 'Mild / Sunny' },
        { day: 'Friday', date: '19 Sep', tempMax: 26, tempMin: 19, rainMm: 0, rainProb: 15, humidity: 55, condition: 'Clear Skies' }
      ]
    },
    cropRisk: {
      overallScore: 24,
      severity: 'LOW',
      primaryHazard: 'Favorable Agro-Weather (Low Hazard)',
      expectedWindow: 'Next 72 hours',
      cropStageSummary: 'Green Pea — Vegetative Growth',
      reasons: [
        'Optimal temperature (24°C) aligns with peak photosynthetic assimilation rate.',
        'Moderate rainfall (12 mm) naturally replenishes soil root zone without waterlogging.',
        'Crop is in robust vegetative stage with deep root vigor and low hazard sensitivity.',
        'No immediate temperature shock, water excess, or drought deficit detected.'
      ],
      formulaBreakdown: {
        weatherSignal: '12 mm Rain, 24°C Temp, 62% Humidity (Optimal Range)',
        cropFactor: 'Green Pea (Pisum sativum) — Vegetative foliage',
        stageSensitivity: 'Vegetative Stage (Phenology Multiplier: 0.35)',
        soilRetention: 'Loamy Alluvial (Optimum percolation index: 0.90)',
        calculationExplanation: 'Mild Climate Signal (25) × Vegetative Multiplier (0.35) × Soil Balance (0.90) = 24 / 100 (LOW RISK)'
      }
    },
    hazards: [
      {
        id: 'excess_rainfall',
        name: 'Excess Rainfall',
        icon: 'CloudRain',
        severity: 'LOW',
        riskScore: 20,
        shortExplanation: 'Light 12mm rain easily absorbed by loamy soil profile.',
        trend: 'stable',
        telemetryTrigger: 'Precipitation 12mm (< threshold 40mm)',
        agronomicImpact: 'Favorable soil moisture recharge.'
      },
      {
        id: 'heat_stress',
        name: 'Heat Stress',
        icon: 'Sun',
        severity: 'LOW',
        riskScore: 15,
        shortExplanation: 'Ambient 24°C is in the prime comfort zone for green pea.',
        trend: 'stable',
        telemetryTrigger: 'Peak daytime temp: 24°C',
        agronomicImpact: 'Optimal vegetative branching.'
      },
      {
        id: 'water_stress',
        name: 'Water Stress',
        icon: 'Droplets',
        severity: 'LOW',
        riskScore: 22,
        shortExplanation: 'Soil moisture balanced around 55% field capacity.',
        trend: 'stable',
        telemetryTrigger: 'Soil moisture: 55%',
        agronomicImpact: 'Vigorous vegetative growth.'
      },
      {
        id: 'disease_risk',
        name: 'Disease Favorability',
        icon: 'Bug',
        severity: 'LOW',
        riskScore: 25,
        shortExplanation: 'Good canopy ventilation; low humidity suppresses fungal spores.',
        trend: 'stable',
        telemetryTrigger: 'Humidity 62%, leaf wetness < 4h',
        agronomicImpact: 'Low foliar disease incidence.'
      },
      {
        id: 'temperature_shock',
        name: 'Temperature Shock',
        icon: 'ThermometerSnowflake',
        severity: 'LOW',
        riskScore: 18,
        shortExplanation: 'Normal diurnal curve of 6°C.',
        trend: 'stable',
        telemetryTrigger: 'Diurnal swing: 6°C',
        agronomicImpact: 'No thermal shock.'
      }
    ],
    recommendedAction: {
      id: 'action-nashik-pea-mild',
      timing: 'before_event',
      timingLabel: 'Routine Maintenance Window',
      title: 'Routine Field Inspection & Precautionary Bund Maintenance',
      steps: [
        'Conduct regular weekly field walkthrough to monitor vegetative stem elongation.',
        'Apply scheduled bio-fertilizer / Rhizobium inoculant to boost root nodule development.',
        'Clear peripheral farm drainage channels as standard monsoon preparedness.',
        'Maintain existing light micro-irrigation schedule as per soil tensiometer readings.'
      ],
      rationale: 'FarmShield detected optimal agro-climatic conditions during vegetative growth. Standard management maintains strong crop vigor without emergency action.',
      actionWindow: 'Next 3–5 days (Routine farm schedule)',
      isCompleted: false
    },
    whyTitle: 'Why is the Risk Low (24%)?',
    whyBullets: [
      'Mild temperature (24°C) is ideal for green pea photosynthetic growth',
      'Gentle rain (12 mm) satisfies crop water requirements without standing pool risk',
      'Crop is in vegetative stage (High natural resilience and low hazard vulnerability)'
    ],
    actionItems: [
      {
        icon: 'CheckCircle2',
        title: 'Routine crop inspection',
        desc: 'Weekly survey of foliar health and nodule development.',
        actionable: 'Log Field Check'
      },
      {
        icon: 'Sprout',
        title: 'Maintain bio-fertilizer schedule',
        desc: 'Apply regular organic manure or Rhizobium liquid culture.',
        actionable: 'Maintain Schedule'
      },
      {
        icon: 'Wrench',
        title: 'Keep boundary trenches clear',
        desc: 'Routine maintenance of drainage ditches before next monsoon front.',
        actionable: 'Precautionary Check'
      }
    ]
  }
};
