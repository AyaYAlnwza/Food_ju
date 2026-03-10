import React, { useState } from 'react';
import { ChevronLeft, Settings, User, Target, Smartphone, CreditCard, HelpCircle, LogOut, ChevronRight, LayoutGrid } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';

export const ProfileView: React.FC = () => {
  const { userProfile, dailyGoal, updateUserProfile } = useNutrition();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editProfile, setEditProfile] = useState(userProfile);

  const handleSaveProfile = () => {
    if (editProfile) {
      updateUserProfile(editProfile);
    }
    setIsEditingGoal(false);
  };

  const menuItems = [
    {
      section: 'ข้อมูลส่วนตัว',
      items: [
        { icon: Target, label: 'แก้ไขเป้าหมายส่วนตัว', sub: 'น้ำหนัก, กิจกรรม, เป้าหมายแคลอรี', color: '#FF6B00' },
        { icon: Smartphone, label: 'อุปกรณ์ที่เชื่อมต่อ', sub: 'Apple Health, Fitbit', color: '#FBBF24' },
      ]
    },
    {
      section: 'การใช้งาน',
      items: [
        { icon: CreditCard, label: 'แพ็คเกจที่ใช้งาน', sub: 'NutriScan Gold (รายปี)', color: '#FF6B00' },
      ]
    },
    {
      section: 'การตั้งค่า',
      items: [
        { icon: LayoutGrid, label: 'ตั้งค่าแอปพลิเคชัน', sub: 'การแจ้งเตือน, หน่วยวัด, ภาษา', color: '#FBBF24' },
        { icon: HelpCircle, label: 'ช่วยเหลือและสนับสนุน', sub: 'คำถามที่พบบ่อย, ติดต่อเรา', color: '#EF4444' },
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
        <h1 className="text-xl font-bold">โปรไฟล์</h1>
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
        <h2 className="text-2xl font-bold mb-1">{userProfile?.name || 'User'}</h2>
        <div className="flex items-center gap-2 text-[#FF6B00] text-sm font-bold mb-1">
          <div className="w-4 h-4 rounded-full bg-[#FF6B00] flex items-center justify-center">
            <span className="text-[10px] text-white">★</span>
          </div>
          Gold Member
        </div>
        <p className="text-white/40 text-xs font-medium">สมาชิกตั้งแต่ วันนี้</p>
      </div>

      <div className="px-6 space-y-8">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">{section.section}</h3>
            <div className="space-y-3">
              {section.items.map((item) => {
                const Icon = item.icon;

                if (item.label === 'แก้ไขเป้าหมายส่วนตัว') {
                  return (
                    <div key={item.label} className="w-full bg-white/5 border border-white/5 rounded-[24px] p-4 flex flex-col gap-2 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-white leading-tight">{item.label}</p>
                          <p className="text-xs text-white/40 font-medium">เป้าหมาย: {dailyGoal} แคลอรี/วัน</p>
                        </div>
                        <button
                          onClick={() => {
                            if (isEditingGoal) {
                              handleSaveProfile();
                            } else {
                              setIsEditingGoal(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${isEditingGoal ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-white/80'}`}
                        >
                          {isEditingGoal ? 'บันทึก' : 'แก้ไข'}
                        </button>
                      </div>

                      {isEditingGoal && editProfile && (
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4 pb-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">น้ำหนักปัจจุบัน (กก.)</span>
                            <input
                              type="number"
                              value={editProfile.weightKg}
                              onChange={(e) => setEditProfile({ ...editProfile, weightKg: Number(e.target.value) })}
                              className="w-20 bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-right outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">เป้าหมายเป้าหมาย</span>
                            <select
                              value={editProfile.goal}
                              onChange={(e) => setEditProfile({ ...editProfile, goal: e.target.value as any })}
                              className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 outline-none text-right focus:border-[#FF6B00] *:bg-[#150505]"
                            >
                              <option value="lose">ลดน้ำหนัก</option>
                              <option value="maintain">รักษาน้ำหนัก</option>
                              <option value="gain">เพิ่มกล้ามเนื้อ</option>
                            </select>
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">ระดับการทำกิจกรรม</span>
                            <select
                              value={editProfile.activityLevel}
                              onChange={(e) => setEditProfile({ ...editProfile, activityLevel: e.target.value as any })}
                              className="bg-black/50 border border-white/10 text-right w-40 truncate rounded-lg px-2 py-1 outline-none flex-1 ml-4 focus:border-[#FF6B00] *:bg-[#150505]"
                            >
                              <option value="sedentary">ไม่ออกกำลังกาย</option>
                              <option value="lightly_active">ออกกำลังกายน้อย</option>
                              <option value="moderately_active">ออกกำลังกายปานกลาง</option>
                              <option value="very_active">ออกกำลังกายหนัก</option>
                              <option value="super_active">ออกกำลังกายหนักมาก</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

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
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};
