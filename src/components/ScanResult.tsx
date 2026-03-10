import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Share2, Plus, ArrowLeft, Zap, Settings } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';
import { useLanguage } from '../lib/LanguageContext';
import { Meal } from '../types';

interface ScanResultProps {
  data: any;
  onBack: () => void;
  onLog: () => void;
}

export const ScanResult: React.FC<ScanResultProps> = ({ data, onBack, onLog }) => {
  const { addMeal } = useNutrition();
  const { t } = useLanguage();

  const handleLogClick = () => {
    if (data) {
      const now = new Date();
      let category: Meal['category'] = 'Snack';
      const hour = now.getHours();
      if (hour >= 5 && hour < 11) category = 'Breakfast';
      else if (hour >= 11 && hour < 15) category = 'Lunch';
      else if (hour >= 17 && hour < 22) category = 'Dinner';

      const newMeal: Meal = {
        id: Date.now().toString(),
        name: data.name || t('unknown_food'),
        calories: data.calories || 0,
        protein: data.protein || 0,
        carbs: data.carbs || 0,
        fat: data.fat || 0,
        tags: data.tags || [],
        timestamp: now.toLocaleString(),
        image: data.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
        category,
      };
      addMeal(newMeal);
    }
    onLog();
  };

  const name = data?.name || t('loading');
  const calories = data?.calories || 0;
  const protein = data?.protein || 0;
  const carbs = data?.carbs || 0;
  const fat = data?.fat || 0;
  const image = data?.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000";

  // Calculate percentages arbitrarily for visual effect (base on 100g total roughly)
  const totalMacros = protein + carbs + fat || 1;
  const proteinPercent = (protein / totalMacros) * 100;
  const carbsPercent = (carbs / totalMacros) * 100;
  const fatPercent = (fat / totalMacros) * 100;

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Image */}
      <div className="h-1/2 w-full relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Header Actions */}
        <div className="absolute top-12 left-6 right-6 flex justify-between">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] rounded-t-[40px] p-8 pb-12 border-t border-white/5"
      >
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8" />

        <div className="flex items-center justify-center gap-2 text-[#FF6B00] text-xs font-black tracking-widest uppercase mb-2">
          <CheckCircle2 className="w-4 h-4" />
          {t('confirm_discovery')}
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">{name}</h2>

        <div className="flex items-baseline justify-center gap-2 mb-10">
          <span className="text-7xl font-black">{calories}</span>
          <span className="text-[#FF6B00] font-bold text-xl">{t('calories')}</span>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: t('protein'), value: `${protein}ก`, color: '#FF4E00', percent: proteinPercent },
            { label: t('carbs_short'), value: `${carbs}ก`, color: '#FBBF24', percent: carbsPercent },
            { label: t('fat'), value: `${fat}ก`, color: '#EF4444', percent: fatPercent },
          ].map((macro) => (
            <div key={macro.label} className="bg-white/5 rounded-3xl p-4 flex flex-col items-center">
              <span className="text-lg font-bold mb-1" style={{ color: macro.color }}>{macro.value}</span>
              <span className="text-[10px] text-white/40 font-black tracking-wider mb-3">{macro.label}</span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${macro.percent}%`, backgroundColor: macro.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleLogClick}
            className="flex-1 bg-[#FF6B00] text-white h-16 rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-[0_0_20px_rgba(255,107,0,0.3)] active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6" />
            {t('add_to_diary')}
          </button>
          <button className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
