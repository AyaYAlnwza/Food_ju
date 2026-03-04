import React from 'react';
import { Menu, Camera, ChevronRight, LayoutGrid } from 'lucide-react';
import { MOCK_MEALS } from '../types';

export const HomeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <Menu className="w-5 h-5 text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">NutriScan</h1>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <LayoutGrid className="w-5 h-5 text-gray-900" />
        </button>
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
                strokeDashoffset={2 * Math.PI * 110 * (1 - 0.65)}
                strokeLinecap="round"
                className="text-[#FF6B00]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-black tracking-widest text-gray-400 uppercase mb-1">Left</span>
              <span className="text-5xl font-black text-gray-900">1,200</span>
              <span className="text-xl font-bold text-[#FF6B00]">kcal</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 font-medium mb-2">Daily Goal: <span className="text-gray-900 font-bold">2,500 kcal</span></p>
            <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
              65% Reached
            </span>
          </div>
        </div>

        {/* Daily Macros */}
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-lg font-bold text-gray-900">Daily Macros</h2>
          <button className="text-[#FF6B00] text-sm font-bold">Details</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'PROTEIN', value: '85g/150g', color: '#FF4E00', icon: '🍴', percent: 56 },
            { label: 'CARBS', value: '120g/200g', color: '#FBBF24', icon: '🧬', percent: 60 },
            { label: 'FATS', value: '45g/70g', color: '#EF4444', icon: '💧', percent: 64 },
          ].map((macro) => (
            <div key={macro.label} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center">
              <span className="text-xl mb-2">{macro.icon}</span>
              <span className="text-[10px] text-gray-400 font-black tracking-wider mb-1 uppercase">{macro.label}</span>
              <span className="text-xs font-bold text-gray-900 mb-3">{macro.value}</span>
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${macro.percent}%`, backgroundColor: macro.color }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Meals */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Meals</h2>
          <button className="text-[#FF6B00] text-sm font-bold">View All</button>
        </div>

        <div className="space-y-4">
          {MOCK_MEALS.slice(0, 2).map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-50">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight">{meal.name}</h3>
                <p className="text-xs text-gray-400 font-medium">{meal.category} • {meal.timestamp.split(',')[1]?.trim() || '12:30 PM'}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900 leading-none">{meal.calories}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase">kcal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
