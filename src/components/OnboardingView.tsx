import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNutrition } from '../lib/NutritionContext';
import { UserProfile } from '../types';

interface OnboardingViewProps {
    onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
    const { updateUserProfile } = useNutrition();
    const [step, setStep] = useState(1);

    const [profile, setProfile] = useState<Partial<UserProfile>>({
        name: '',
        age: 25,
        gender: 'female',
        weightKg: 65,
        heightCm: 165,
        activityLevel: 'moderately_active',
        goal: 'maintain'
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            updateUserProfile(profile as UserProfile);
            onComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 pb-24 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-3xl" />

            {/* Header / Back */}
            <div className="absolute top-12 left-6 right-6 flex items-center justify-between z-20">
                {step > 1 ? (
                    <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-gray-900" />
                    </button>
                ) : <div className="w-10 h-10" />}
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-[#FF6B00]' : 'w-4 bg-gray-200'}`} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-sm z-10 mt-12"
                >
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">Let's get to know you.</h1>
                                <p className="text-gray-500 font-medium">This helps us personalize your calorie and macro goals.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Your Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    placeholder="e.g. John"
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Biological Sex</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {(['male', 'female'] as const).map(g => (
                                        <button
                                            key={g}
                                            onClick={() => setProfile({ ...profile, gender: g })}
                                            className={`p-4 rounded-2xl border-2 font-bold capitalize transition-colors ${profile.gender === g
                                                    ? 'border-[#FF6B00] bg-[#FF6B00]/5 text-[#FF6B00]'
                                                    : 'border-white bg-white text-gray-400 hover:border-gray-50'
                                                }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">Your measurements?</h1>
                                <p className="text-gray-500 font-medium">Used for TDEE (Total Daily Energy Expenditure) calculation.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Age</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={profile.age || ''}
                                            onChange={e => setProfile({ ...profile, age: Number(e.target.value) })}
                                            className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">yrs</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Height</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={profile.heightCm || ''}
                                            onChange={e => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                                            className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">cm</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Weight</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={profile.weightKg || ''}
                                        onChange={e => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                                        className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">kg</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">What is your goal?</h1>
                                <p className="text-gray-500 font-medium">We'll adjust your daily intake target accordingly.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Goal</label>
                                <div className="space-y-3">
                                    {[
                                        { val: 'lose', label: 'Lose Weight', sub: '-500 kcal/day' },
                                        { val: 'maintain', label: 'Maintain Weight', sub: 'Calculated TDEE' },
                                        { val: 'gain', label: 'Build Muscle', sub: '+500 kcal/day' }
                                    ].map(g => (
                                        <button
                                            key={g.val}
                                            onClick={() => setProfile({ ...profile, goal: g.val as any })}
                                            className={`w-full p-4 rounded-2xl border-2 text-left flex justify-between items-center transition-colors ${profile.goal === g.val
                                                    ? 'border-[#FF6B00] bg-[#FF6B00]/5'
                                                    : 'border-white bg-white hover:border-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <p className={`font-bold ${profile.goal === g.val ? 'text-[#FF6B00]' : 'text-gray-900'}`}>{g.label}</p>
                                                <p className={`text-xs font-medium ${profile.goal === g.val ? 'text-[#FF6B00]/70' : 'text-gray-400'}`}>{g.sub}</p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${profile.goal === g.val ? 'border-[#FF6B00]' : 'border-gray-200'}`}>
                                                {profile.goal === g.val && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black tracking-widest text-gray-400 uppercase mt-4 block">Activity Level</label>
                                <select
                                    value={profile.activityLevel}
                                    onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value as any })}
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-4 font-bold text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                                >
                                    <option value="sedentary">Sedentary (Little/no exercise)</option>
                                    <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                                    <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                                    <option value="very_active">Very Active (6-7 days/week)</option>
                                    <option value="super_active">Super Active (Physical job/training)</option>
                                </select>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                <button className="text-gray-400 font-bold text-sm px-4">Skip</button>
                <button
                    onClick={handleNext}
                    disabled={step === 1 && !profile.name}
                    className="bg-[#FF6B00] text-white px-8 h-14 rounded-full font-bold shadow-lg shadow-[#FF6B00]/30 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                    {step === 3 ? 'Finish' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
