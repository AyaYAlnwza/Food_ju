import React from 'react';
import { Search, SlidersHorizontal, Calendar } from 'lucide-react';
import { MOCK_MEALS } from '../types';

export const HistoryView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
        <div className="w-10" /> {/* Spacer */}
        <h1 className="text-xl font-bold text-gray-900">Scan History</h1>
        <button className="p-2 text-gray-900">
          <Calendar className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 mt-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search previous scans"
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20"
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">Recent Scans</h2>

        <div className="space-y-4">
          {MOCK_MEALS.map((meal) => (
            <div key={meal.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm border border-gray-50">
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{meal.name}</h3>
                <div className="flex flex-wrap gap-2 mb-1">
                  {meal.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black tracking-wider text-[#FF6B00] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">{meal.timestamp}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-900 leading-none">{meal.calories}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase">kcal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
