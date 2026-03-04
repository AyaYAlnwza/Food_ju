import React from 'react';
import { ChevronLeft, Settings, User, Target, Smartphone, CreditCard, HelpCircle, LogOut, ChevronRight, LayoutGrid } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const menuItems = [
    {
      section: 'PERSONAL DATA',
      items: [
        { icon: Target, label: 'Edit Personal Goals', sub: 'Height, Weight, Target Calories', color: '#FF6B00' },
        { icon: Smartphone, label: 'Connected Devices', sub: 'Apple Health, Fitbit', color: '#FBBF24' },
      ]
    },
    {
      section: 'SUBSCRIPTION',
      items: [
        { icon: CreditCard, label: 'Subscription Plan', sub: 'NutriScan Gold (Annual)', color: '#FF6B00' },
      ]
    },
    {
      section: 'PREFERENCES',
      items: [
        { icon: LayoutGrid, label: 'App Settings', sub: 'Notifications, Units, Language', color: '#FBBF24' },
        { icon: HelpCircle, label: 'Support & Help', sub: 'FAQ, Contact us', color: '#EF4444' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#150505] text-white pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-[#FF6B00] p-1">
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <User className="w-20 h-20 text-white/20" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 bg-[#FF6B00] text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#150505]">
            PRO
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1">John Harrison</h2>
        <div className="flex items-center gap-2 text-[#FF6B00] text-sm font-bold mb-1">
          <div className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center">
            <span className="text-[10px] text-white">★</span>
          </div>
          Gold Member
        </div>
        <p className="text-white/40 text-xs font-medium">Member since January 2023</p>
      </div>

      <div className="px-6 space-y-8">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">{section.section}</h3>
            <div className="space-y-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} className="w-full bg-white/5 border border-white/5 rounded-[24px] p-4 flex items-center gap-4 active:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-white leading-tight">{item.label}</p>
                      <p className="text-xs text-white/40 font-medium">{item.sub}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button className="w-full bg-red-500/10 border border-red-500/20 text-red-500 h-16 rounded-[24px] flex items-center justify-center gap-2 font-bold text-lg active:scale-95 transition-transform mt-4">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};
