import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelectorView: React.FC = () => {
    const { setLanguage } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 font-sans selection:bg-[#FF6B00]/30 relative w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center w-full"
            >
                <div className="w-24 h-24 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <Globe className="w-12 h-12" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">Welcome</h1>
                <p className="text-gray-500 mb-10 text-lg">Please select your language<br /><span className="mt-1 block">กรุณาเลือกภาษาของคุณ</span></p>

                <div className="space-y-4 px-4">
                    <button
                        onClick={() => setLanguage('th')}
                        className="w-full bg-[#FF6B00] text-white font-semibold text-lg p-5 rounded-2xl hover:bg-[#E66000] transition-colors shadow-lg shadow-[#FF6B00]/20 flex items-center justify-center space-x-3"
                    >
                        <span className="text-2xl">🇹🇭</span>
                        <span>ภาษาไทย</span>
                    </button>

                    <button
                        onClick={() => setLanguage('en')}
                        className="w-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-lg p-5 rounded-2xl hover:border-[#FF6B00] transition-colors flex items-center justify-center space-x-3 shadow-sm"
                    >
                        <span className="text-2xl">🇺🇸</span>
                        <span>English</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
