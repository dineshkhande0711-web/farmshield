import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { DEMO_SAMPLE_OBSERVATIONS } from '../services/mockData';
import { verifyObservation } from '../services/api';
import {
  UploadCloud,
  Camera,
  RefreshCw,
  Sparkles,
  Info,
  Shield
} from 'lucide-react';

export const CropVerificationPage: React.FC = () => {
  const {
    observations,
    addObservation,
    t
  } = useFarmShield();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [_selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<'improving' | 'persisting'>('improving');

  const handleSimulateVerification = async (type: 'improving' | 'persisting') => {
    setIsAnalyzing(true);
    setSelectedSample(type);
    
    setTimeout(async () => {
      const result = await verifyObservation(type);
      addObservation(result.observation, result.updatedFarmRiskScore);
      setIsAnalyzing(false);
    }, 900);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      handleSimulateVerification('improving');
    }
  };

  const latestObs = observations[0] || DEMO_SAMPLE_OBSERVATIONS['improving'];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                Closed Loop: Stage 04 & 05
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {t('verificationPageTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Upload post-intervention field imagery. Computer vision assesses visible surface moisture, foliar recovery trends, and updates the farm risk index.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 font-mono">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>AI Verification Model v2.4</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-600" />
              <span>{t('uploadFieldImage')} / {t('uploadFieldVideo')}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Farmer smartphone field capture (JPEG, PNG, MP4 up to 50MB)
            </p>

            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/20 group">
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-emerald-600 mb-2 transition" />
              <p className="text-xs font-bold text-slate-800">
                Click to browse photo or drag & drop here
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Camera snapshot from field furrow level recommended
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('orSelectDemoPhoto')}</span>
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleSimulateVerification('improving')}
                disabled={isAnalyzing}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  selectedSample === 'improving'
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-200 text-slate-700'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Sample A</span>
                  <p className="text-xs font-bold mt-0.5">Treated Furrow (Improving)</p>
                  <p className="text-[11px] text-slate-500 mt-1">Water receded; turgor healthy</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 mt-2">Run AI Check ?</span>
              </button>

              <button
                onClick={() => handleSimulateVerification('persisting')}
                disabled={isAnalyzing}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  selectedSample === 'persisting'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-200 text-slate-700'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">Sample B</span>
                  <p className="text-xs font-bold mt-0.5">Obstructed Furrow (Persisting)</p>
                  <p className="text-[11px] text-slate-500 mt-1">Standing puddle remains</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-600 mt-2">Run AI Check ?</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                  {t('aiAssistedObservation')}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {isAnalyzing ? 'Analyzing Field Snapshot...' : latestObs.statusLabel}
                </h3>
              </div>

              {!isAnalyzing && (
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                  Confidence: {latestObs.confidenceScore}%
                </span>
              )}
            </div>

            <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-200 bg-slate-900 h-44">
              <img
                src={previewUrl || latestObs.imageUrl}
                alt="Field Observation Snapshot"
                className={`w-full h-full object-cover transition duration-500 ${isAnalyzing ? 'opacity-40 blur-xs' : 'opacity-90'}`}
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium border border-slate-700">
                {latestObs.imageLabel} ? {latestObs.timestamp}
              </div>
              {isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
                  <RefreshCw className="w-7 h-7 text-emerald-400 animate-spin" />
                  <span className="text-xs font-bold">Running Feature Extraction...</span>
                </div>
              )}
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">{t('standingWaterDetected')}:</span>
                <span className={`font-bold ${latestObs.findings.standingWaterDetected ? 'text-red-600' : 'text-emerald-700'}`}>
                  {latestObs.findings.standingWaterDetected ? 'Yes (2.5?3.5cm depth)' : 'No (Drained through furrows)'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">{t('visibleLeafStress')}:</span>
                <span className="font-bold text-slate-800">
                  {latestObs.findings.visibleLeafStress}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">{t('canopyCondition')}:</span>
                <span className="font-bold text-slate-800">
                  {latestObs.findings.canopyCondition}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex justify-between items-center">
                <span className="text-emerald-900 font-medium">{t('changeFromPrevious')}:</span>
                <span className="font-bold text-emerald-800">
                  {latestObs.findings.changeFromPrevious}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Methodological Note:</strong> {latestObs.causalDisclaimer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
