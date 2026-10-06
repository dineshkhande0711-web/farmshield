import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { evaluateCropRisk } from './riskEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Weather Telemetry
app.get('/api/weather', (req, res) => {
  const location = (req.query.location as string) || 'Satara, Maharashtra';
  res.json({
    location,
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
    dataSource: 'IMD Satara Station & AWS Telemetry (Simulated)',
    forecastDays: [
      { day: 'Today', date: '17 Sep', tempMax: 34, tempMin: 23, rainMm: 82, rainProb: 87, humidity: 87, condition: 'Heavy Downpour' },
      { day: 'Tomorrow', date: '18 Sep', tempMax: 29, tempMin: 22, rainMm: 45, rainProb: 75, humidity: 90, condition: 'Moderate Showers' },
      { day: 'Friday', date: '19 Sep', tempMax: 28, tempMin: 21, rainMm: 15, rainProb: 40, humidity: 78, condition: 'Scattered Light Rain' }
    ]
  });
});

// 2. Risk Calculation
app.post('/api/risk', (req, res) => {
  const {
    crop = 'green_pea',
    stage = 'flowering',
    expectedRainMm = 82,
    rainProbability = 87,
    temperatureC = 34,
    humidityPct = 87,
    isActionCompleted = false,
    verificationStatus = null
  } = req.body || {};

  const evaluation = evaluateCropRisk({
    crop,
    stage,
    expectedRainMm,
    rainProbability,
    temperatureC,
    humidityPct,
    isActionCompleted,
    verificationStatus
  });

  res.json(evaluation);
});

// 3. Recommended Actions
app.get('/api/recommendations', (_req, res) => {
  res.json({
    primaryAction: {
      id: 'act-drainage-satara',
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
    }
  });
});

// 4. Crop Phenology Catalog
app.get('/api/crops', (_req, res) => {
  res.json([
    {
      id: 'green_pea',
      name: 'Green Pea (मटार)',
      stages: [
        { id: 'germination', name: 'Germination (उगवण)', days: '1-10' },
        { id: 'vegetative', name: 'Vegetative (वाढ)', days: '11-30' },
        { id: 'flowering', name: 'Flowering (फुलधारणा)', days: '31-50', isVulnerable: true, vulnerabilityNote: 'Highly sensitive to waterlogging; causes flower drop & hypoxia' },
        { id: 'pod_formation', name: 'Pod Formation (शेंगा भरणे)', days: '51-70' },
        { id: 'maturity', name: 'Maturity / Harvest (पक्वता)', days: '71-85' }
      ]
    },
    {
      id: 'soybean',
      name: 'Soybean (सोयाबीन)',
      stages: [
        { id: 'germination', name: 'Germination', days: '1-7' },
        { id: 'vegetative', name: 'Vegetative', days: '8-35' },
        { id: 'flowering', name: 'Flowering', days: '36-55', isVulnerable: true, vulnerabilityNote: 'Extreme sensitivity to thermal heatwave (>32°C pollen abortion)' },
        { id: 'pod_formation', name: 'Pod Formation', days: '56-80' },
        { id: 'maturity', name: 'Harvest', days: '81-100' }
      ]
    },
    {
      id: 'sugarcane',
      name: 'Sugarcane (ऊस)',
      stages: [
        { id: 'germination', name: 'Germination', days: '1-30' },
        { id: 'vegetative', name: 'Tillering & Grand Growth', days: '31-180' },
        { id: 'maturity', name: 'Ripening / Harvest', days: '181-360' }
      ]
    }
  ]);
});

// 5. AI Field Verification
app.post('/api/verification', (req, res) => {
  const { sampleType = 'improving' } = req.body || {};
  if (sampleType === 'improving') {
    res.json({
      status: 'success',
      observation: {
        id: `obs-${Date.now()}`,
        timestamp: new Date().toISOString(),
        stressStatus: 'stress_improving',
        statusLabel: '🟢 Stress Improving',
        confidenceScore: 94,
        findings: {
          standingWaterDetected: false,
          waterLevelDescription: 'Water successfully channeled through lateral furrows; no standing ponding observed.',
          visibleLeafStress: 'Normal foliar coloration; leaf turgor recovering steadily.',
          canopyCondition: 'Flowering canopy intact; minimal blossom drop detected.',
          changeFromPrevious: 'Clear reduction in surface moisture and visible soil saturation compared to baseline.'
        },
        causalDisclaimer: 'AI-assisted crop stress observation based on visible features. Trend comparison indicates favorable recovery.'
      },
      updatedFarmRiskScore: 52,
      updatedSeverity: 'MEDIUM'
    });
  } else {
    res.json({
      status: 'success',
      observation: {
        id: `obs-${Date.now()}`,
        timestamp: new Date().toISOString(),
        stressStatus: 'stress_persisting',
        statusLabel: '🟡 Stress Persisting',
        confidenceScore: 88,
        findings: {
          standingWaterDetected: true,
          waterLevelDescription: 'Partial water accumulation in lower field furrow lines.',
          visibleLeafStress: 'Slight yellowing along leaf margins due to saturated root zone.',
          canopyCondition: 'Flowering intact but subsoil remains waterlogged.',
          changeFromPrevious: 'Minor reduction in surface pooling, but drainage remains slow.'
        },
        causalDisclaimer: 'AI-assisted crop stress observation based on visible features. Trend comparison indicates persisting stress.'
      },
      updatedFarmRiskScore: 68,
      updatedSeverity: 'MEDIUM'
    });
  }
});

// 6. Risk History
app.get('/api/history', (_req, res) => {
  res.json([
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
      cropStage: 'Late Vegetative',
      recommendation: 'Monitor contour drainage',
      actionStatus: 'Completed'
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
      recommendation: 'Dig lateral furrows and clear drainage pathways',
      actionStatus: 'Completed by Farmer',
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
      recommendation: 'Ensure lateral trenches flow into canal',
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
      recommendation: 'Optimal growth conditions. Resume standard organic schedule.',
      actionStatus: 'Scheduled'
    }
  ]);
});

// 7. Regional Officer Overview
app.get('/api/admin/overview', (_req, res) => {
  res.json({
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
      { id: 'f-101', farmer: 'Dinesh Khande', village: 'Wai', taluka: 'Wai', crop: 'Green Pea', stage: 'Flowering', acres: 2.5, riskScore: 82, severity: 'HIGH', primaryHazard: 'Excess Rainfall', actionTaken: true, verifiedStatus: 'Verified Improving', contact: '+91 98220 14820' },
      { id: 'f-102', farmer: 'Akshay Ryakawar', village: 'Karad Rural', taluka: 'Karad', crop: 'Green Pea', stage: 'Flowering', acres: 3.0, riskScore: 82, severity: 'HIGH', primaryHazard: 'Excess Rainfall', actionTaken: true, verifiedStatus: 'Pending Verification', contact: '+91 98221 35910' },
      { id: 'f-103', farmer: 'Sanskar Penshanwar', village: 'Koregaon', taluka: 'Koregaon', crop: 'Soybean', stage: 'Podding', acres: 4.2, riskScore: 68, severity: 'MEDIUM', primaryHazard: 'Disease Favorability', actionTaken: false, verifiedStatus: 'Pending Verification', contact: '+91 98222 47120' },
      { id: 'f-104', farmer: 'Ramesh Patil', village: 'Phaltan', taluka: 'Phaltan', crop: 'Green Pea', stage: 'Flowering', acres: 1.8, riskScore: 88, severity: 'HIGH', primaryHazard: 'Waterlogging', actionTaken: false, verifiedStatus: 'Escalated to KVK', contact: '+91 98223 89201' },
      { id: 'f-105', farmer: 'Suresh Deshmukh', village: 'Patan', taluka: 'Patan', crop: 'Sugarcane', stage: 'Tillering', acres: 5.0, riskScore: 28, severity: 'LOW', primaryHazard: 'Low Risk', actionTaken: true, verifiedStatus: 'Verified Improving', contact: '+91 98224 51042' }
    ]
  });
});

// Serve static production build
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FarmShield AI Server running on port ${PORT}`);
});
