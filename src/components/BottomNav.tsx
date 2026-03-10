import React from 'react';
import { Home, History, Camera, BarChart3, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'หน้าหลัก', icon: Home },
    { id: 'scan', label: 'สแกน', icon: Camera, isCenter: true },
    { id: 'history', label: 'ประวัติ', icon: History },
    { id: 'stats', label: 'สถิติ', icon: BarChart3 },
    { id: 'profile', label: 'โปรไฟล์', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isCenter) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative -top-8 bg-[#FF6B00] p-4 rounded-full shadow-lg shadow-orange-200 border-4 border-white transition-transform active:scale-90"
            >
              <Icon className="w-7 h-7 text-white" />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-[#FF6B00]" : "text-gray-400"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-bold tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
