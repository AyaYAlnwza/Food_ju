import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Calendar } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';
import { useLanguage } from '../lib/LanguageContext';

export const HistoryView: React.FC = () => {
  const { meals } = useNutrition();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const filteredMeals = useMemo(() => {
    let result = meals;

    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const targetYear = parseInt(parts[0], 10);
        const targetMonth = parseInt(parts[1], 10) - 1;
        const targetDay = parseInt(parts[2], 10);

        result = result.filter(meal => {
          const d = new Date(meal.timestamp);
          if (isNaN(d.getTime())) return false;
          return d.getFullYear() === targetYear &&
            d.getMonth() === targetMonth &&
            d.getDate() === targetDay;
        });
      }
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(meal =>
        meal.name.toLowerCase().includes(lowerQuery) ||
        meal.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [meals, searchQuery, selectedDate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
        <div className="w-10" /> {/* Spacer */}
        <h1 className="text-xl font-bold text-gray-900">{t('meal_history')}</h1>
        <div className="relative">
          <button
            className="p-2 text-gray-900"
            onClick={() => (document.getElementById('history-date-picker') as HTMLInputElement)?.showPicker()}
          >
            <Calendar className="w-6 h-6" />
          </button>
          <input
            type="date"
            id="history-date-picker"
            className="absolute right-0 top-full opacity-0 pointer-events-none w-0 h-0"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_history')}
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20"
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase">
            {selectedDate ? (() => {
              const [y, m, d] = selectedDate.split('-');
              return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString();
            })() : t('recent_scanned_food')}
          </h2>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className="text-xs font-bold text-[#FF6B00]"
            >
              {t('clear') || 'Clear Filter'}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredMeals.length === 0 ? (
            <div className="text-center text-gray-400 py-8">{t('no_meals_found')}</div>
          ) : filteredMeals.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-50">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{meal.name}</h3>
                <div className="flex flex-wrap gap-2 mb-1">
                  {meal.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-black tracking-wider text-[#FF6B00] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">{(() => {
                  const d = new Date(meal.timestamp);
                  return isNaN(d.getTime()) ? meal.timestamp : d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
                })()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-900 leading-none">{meal.calories}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase">{t('cal_short')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
