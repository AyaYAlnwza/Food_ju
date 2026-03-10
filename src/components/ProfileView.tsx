import React, { useState } from 'react';
import { ChevronLeft, Settings, User, Target, Smartphone, CreditCard, HelpCircle, LogOut, ChevronRight, LayoutGrid, X } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';
import { useLanguage } from '../lib/LanguageContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export const ProfileView: React.FC = () => {
  const { userProfile, dailyGoal, updateUserProfile } = useNutrition();
  const { t, language, setLanguage } = useLanguage();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [isEditingAppSettings, setIsEditingAppSettings] = useState(false);
  const [showFutureAlert, setShowFutureAlert] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editProfile, setEditProfile] = useState(userProfile);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveProfile = () => {
    if (editProfile) {
      updateUserProfile(editProfile);
    }
    setIsEditingGoal(false);
  };

  const handleSaveAppSettings = () => {
    if (editProfile) {
      updateUserProfile(editProfile);
    }
    setIsEditingAppSettings(false);
  };

  const menuItems = [
    {
      section: t('personal_info'),
      items: [
        { icon: Target, label: t('edit_personal_goals'), sub: t('goals_sub'), color: '#FF6B00' },
        { icon: Smartphone, label: t('connected_devices'), sub: 'Apple Health, Fitbit', color: '#FBBF24' },
      ]
    },
    {
      section: t('usage'),
      items: [
        { icon: CreditCard, label: t('active_package'), sub: 'AHelp+ Gold (รายปี)', color: '#FF6B00' },
      ]
    },
    {
      section: t('settings'),
      items: [
        { icon: LayoutGrid, label: t('app_settings'), sub: t('app_settings_sub'), color: '#FBBF24' },
        { icon: HelpCircle, label: t('help_support'), sub: t('help_support_sub'), color: '#EF4444' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#150505] text-white pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 flex items-center justify-center">
        <h1 className="text-xl font-bold">{t('profile')}</h1>
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
        <p className="text-white/40 text-xs font-medium">{t('member_since_today')}</p>
      </div>

      <div className="px-6 space-y-8">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">{section.section}</h3>
            <div className="space-y-3">
              {section.items.map((item) => {
                const Icon = item.icon;

                if (item.label === t('edit_personal_goals')) {
                  return (
                    <div key={item.label} className="w-full bg-white/5 border border-white/5 rounded-[24px] p-4 flex flex-col gap-2 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-white leading-tight">{item.label}</p>
                          <p className="text-xs text-white/40 font-medium">{t('goal_label')} {dailyGoal} {t('cal_per_day')}</p>
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
                          {isEditingGoal ? t('save') : t('edit')}
                        </button>
                      </div>

                      {isEditingGoal && editProfile && (
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4 pb-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{t('current_weight')}</span>
                            <input
                              type="number"
                              value={editProfile.weightKg}
                              onChange={(e) => setEditProfile({ ...editProfile, weightKg: Number(e.target.value) })}
                              className="w-20 bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-right outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{t('target_goal')}</span>
                            <select
                              value={editProfile.goal}
                              onChange={(e) => setEditProfile({ ...editProfile, goal: e.target.value as any })}
                              className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 outline-none text-right focus:border-[#FF6B00] *:bg-[#150505]"
                            >
                              <option value="lose">{t('lose_weight')}</option>
                              <option value="maintain">{t('maintain_weight')}</option>
                              <option value="gain">{t('gain_muscle')}</option>
                            </select>
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{t('activity_level')}</span>
                            <select
                              value={editProfile.activityLevel}
                              onChange={(e) => setEditProfile({ ...editProfile, activityLevel: e.target.value as any })}
                              className="bg-black/50 border border-white/10 text-right w-40 truncate rounded-lg px-2 py-1 outline-none flex-1 ml-4 focus:border-[#FF6B00] *:bg-[#150505]"
                            >
                              <option value="sedentary">{t('sedentary')}</option>
                              <option value="lightly_active">{t('lightly_active')}</option>
                              <option value="moderately_active">{t('moderately_active')}</option>
                              <option value="very_active">{t('very_active')}</option>
                              <option value="super_active">{t('super_active')}</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.label === t('app_settings')) {
                  return (
                    <div key={item.label} className="w-full bg-white/5 border border-white/5 rounded-[24px] p-4 flex flex-col gap-2 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-white leading-tight">{item.label}</p>
                          <p className="text-xs text-white/40 font-medium">{item.sub}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (isEditingAppSettings) {
                              handleSaveAppSettings();
                            } else {
                              setIsEditingAppSettings(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${isEditingAppSettings ? 'bg-[#FF6B00] text-white' : 'bg-white/10 text-white/80'}`}
                        >
                          {isEditingAppSettings ? t('save') : t('edit')}
                        </button>
                      </div>

                      {isEditingAppSettings && editProfile && (
                        <div className="mt-4 space-y-3 border-t border-white/10 pt-4 pb-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{t('app_settings_name')}</span>
                            <input
                              type="text"
                              value={editProfile.name || ''}
                              onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                              className="w-32 bg-black/50 border border-white/10 rounded-lg px-2 py-1 text-right outline-none focus:border-[#FF6B00]"
                            />
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">{t('app_settings_language')}</span>
                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value as 'en' | 'th')}
                              className="bg-black/50 border border-white/10 rounded-lg px-2 py-1 outline-none text-right focus:border-[#FF6B00] *:bg-[#150505]"
                            >
                              <option value="en">English</option>
                              <option value="th">ภาษาไทย</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === t('connected_devices') || item.label === t('active_package')) {
                        setShowFutureAlert(true);
                      } else if (item.label === t('help_support')) {
                        setShowContactModal(true);
                      }
                    }}
                    className="w-full bg-white/5 border border-white/5 rounded-[24px] p-4 flex items-center gap-4 active:bg-white/10 transition-colors"
                  >
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

        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 h-16 rounded-[24px] flex items-center justify-center gap-2 font-bold text-lg active:scale-95 transition-transform mt-4"
        >
          <LogOut className="w-5 h-5" />
          {t('logout')}
        </button>
      </div>

      {showFutureAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('future_feature_title')}</h3>
            <p className="text-white/60 text-sm mb-6">{t('future_feature_desc')}</p>
            <button
              onClick={() => setShowFutureAlert(false)}
              className="w-full bg-[#FF6B00] text-white font-bold h-12 rounded-xl active:scale-95 transition-transform"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/20 flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t('contact_us_title')}</h3>

            <div className="w-full space-y-3 mb-6 bg-black/30 rounded-2xl p-4 border border-white/5">
              <div className="flex flex-col items-start text-left w-full">
                <span className="text-[10px] font-black tracking-widest text-[#FF6B00] uppercase mb-1">{t('contact_email')}</span>
                <a href="mailto:jackkungthe@gmail.com" className="text-white font-medium text-sm">jackkungthe@gmail.com</a>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="flex flex-col items-start text-left w-full">
                <span className="text-[10px] font-black tracking-widest text-[#FF6B00] uppercase mb-1">{t('contact_line')}</span>
                <span className="text-white font-medium text-sm">0931615440</span>
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-[#FF6B00] text-white font-bold h-12 rounded-xl active:scale-95 transition-transform"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
