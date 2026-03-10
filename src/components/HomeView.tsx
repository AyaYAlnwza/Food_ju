import React from 'react';
import { Menu, Camera, ChevronRight, LayoutGrid } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';
import { useLanguage } from '../lib/LanguageContext';

export const HomeView: React.FC = () => {
  const { meals, dailyGoal } = useNutrition();
  const { t } = useLanguage();

  const today = new Date().toLocaleDateString();
  const todaysMeals = meals.filter(meal => new Date(meal.timestamp).toLocaleDateString() === today);

  const totalCalories = todaysMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const totalProtein = todaysMeals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const totalCarbs = todaysMeals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const totalFat = todaysMeals.reduce((sum, meal) => sum + (meal.fat || 0), 0);

  const caloriePercent = Math.min(100, Math.round((totalCalories / dailyGoal) * 100));
  const caloriesLeft = Math.max(0, dailyGoal - totalCalories);

  // Rough guidelines: 30% Protein (4kcal/g), 40% Carbs (4kcal/g), 30% Fat (9kcal/g)
  const goalProtein = Math.round((dailyGoal * 0.3) / 4);
  const goalCarbs = Math.round((dailyGoal * 0.4) / 4);
  const goalFat = Math.round((dailyGoal * 0.3) / 9);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-900">AHelp+</h1>
      </div>

      <div className="px-6">
        {/* Calorie Progress */}
        <div className="flex flex-col items-center justify-center py-8 relative">
          <div className="w-64 h-64 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 110}
                strokeDashoffset={2 * Math.PI * 110 * (1 - (caloriePercent / 100))}
                strokeLinecap="round"
                className="text-[#FF6B00] transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-black tracking-widest text-gray-400 uppercase mb-1">{t('left')}</span>
              <span className="text-5xl font-black text-gray-900">{caloriesLeft.toLocaleString()}</span>
              <span className="text-xl font-bold text-[#FF6B00]">{t('calories')}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 font-medium mb-2">{t('daily_goal')} <span className="text-gray-900 font-bold">{dailyGoal.toLocaleString()} {t('calories')}</span></p>
            <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
              {t('goal_reached')} {caloriePercent}%
            </span>
          </div>
        </div>

        {/* Daily Macros */}
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-lg font-bold text-gray-900">{t('daily_macros')}</h2>
          <button className="text-[#FF6B00] text-sm font-bold">{t('details')}</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: t('protein'), value: `${Math.round(totalProtein)}ก/${goalProtein}ก`, color: '#FF4E00', icon: '🍴', percent: Math.min(100, (totalProtein / goalProtein) * 100) || 0 },
            { label: t('carbs'), value: `${Math.round(totalCarbs)}ก/${goalCarbs}ก`, color: '#FBBF24', icon: '🧬', percent: Math.min(100, (totalCarbs / goalCarbs) * 100) || 0 },
            { label: t('fat'), value: `${Math.round(totalFat)}ก/${goalFat}ก`, color: '#EF4444', icon: '💧', percent: Math.min(100, (totalFat / goalFat) * 100) || 0 },
          ].map((macro) => (
            <div key={macro.label} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center">
              <span className="text-xl mb-2">{macro.icon}</span>
              <span className="text-[10px] text-gray-400 font-black tracking-wider mb-1 uppercase">{macro.label}</span>
              <span className="text-xs font-bold text-gray-900 mb-3">{macro.value}</span>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${macro.percent}%`, backgroundColor: macro.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Meals */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">{t('recent_meals')}</h2>
          <button className="text-[#FF6B00] text-sm font-bold">{t('see_all')}</button>
        </div>

        <div className="space-y-4">
          {meals.length === 0 ? (
            <div className="text-center text-gray-400 py-8">{t('no_meals_yet')}</div>
          ) : meals.slice(0, 3).map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-50">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight">{meal.name}</h3>
                <p className="text-xs text-gray-400 font-medium">
                  {meal.category} • {new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900 leading-none">{meal.calories}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase">{t('cal_short')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
