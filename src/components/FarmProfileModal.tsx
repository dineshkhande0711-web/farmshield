import React, { useState } from 'react';
import { useFarmShield } from '../context/FarmShieldContext';
import { CropType, GrowthStage } from '../types';
import {
  X,
  User,
  Save,
  Check
} from 'lucide-react';

interface FarmProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmProfileModal: React.FC<FarmProfileModalProps> = ({ isOpen, onClose }) => {
  const { farmProfile, setFarmProfile, switchCrop, switchCropStage } = useFarmShield();

  const [farmerName, setFarmerName] = useState(farmProfile.farmerName);
  const [location, setLocation] = useState(farmProfile.location);
  const [crop, setCrop] = useState<CropType>(farmProfile.crop);
  const [stage, setStage] = useState<GrowthStage>(farmProfile.growthStage);
  const [acres, setAcres] = useState(farmProfile.farmAreaAcres);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmProfile(prev => ({
      ...prev,
      farmerName,
      location,
      farmAreaAcres: acres
    }));
    switchCrop(crop);
    switchCropStage(stage);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Farm & Field Profile</h3>
              <p className="text-xs text-slate-300">Satara Smallholder Node</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Farmer Name</label>
            <input
              type="text"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Farm Area (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Crop Variety</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value as CropType)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
              >
                <option value="green_pea">Green Pea (????)</option>
                <option value="soybean">Soybean (???????)</option>
                <option value="sugarcane">Sugarcane (??)</option>
                <option value="tomato">Tomato (??????)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Current Growth Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as GrowthStage)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium"
              >
                <option value="germination">Germination (????)</option>
                <option value="vegetative">Vegetative (???)</option>
                <option value="flowering">Flowering (???????? - Sensitive)</option>
                <option value="pod_formation">Pod Formation (????? ????)</option>
                <option value="maturity">Maturity (??????)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between">
              <span>Soil Texture:</span>
              <span className="font-semibold text-slate-700">Black Clay-Loam (???? ????? ????)</span>
            </div>
            <div className="flex justify-between">
              <span>Sowing Date:</span>
              <span className="font-semibold text-slate-700">15 Aug 2026</span>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? 'Saved!' : 'Update Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
