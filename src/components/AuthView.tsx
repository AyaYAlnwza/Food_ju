import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useLanguage } from '../lib/LanguageContext';
import { Activity, AlertCircle, Globe } from 'lucide-react';

export const AuthView: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err: any) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(err.message || 'An error occurred during authentication');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col p-6 font-sans selection:bg-[#FF6B00]/30 relative w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-center w-full"
            >
                {/* Language Toggle */}
                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                        <Globe className="w-4 h-4 text-[#FF6B00]" />
                        <span>{language === 'en' ? 'ไทย' : 'EN'}</span>
                    </button>
                </div>

                <div className="flex items-center space-x-3 mb-10 justify-center">
                    <div className="w-16 h-16 bg-[#FF6B00] rounded-[1.5rem] flex items-center justify-center transform rotate-3 shadow-lg shadow-[#FF6B00]/20">
                        <Activity className="text-white w-10 h-10" />
                    </div>
                    <span className="text-4xl font-bold font-display tracking-tight text-gray-900">AHelp+</span>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center font-display">
                        {t('welcome')}
                    </h2>
                    <p className="text-gray-500 mb-8 text-center">
                        {t('login_desc')}
                    </p>

                    {error && (
                        <div className="mb-6 w-full p-4 bg-red-50 text-red-600 rounded-2xl flex items-start space-x-3 text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-lg py-4 px-6 rounded-2xl hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex justify-center items-center space-x-3"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                                <Activity className="w-6 h-6 text-slate-400" />
                            </motion.div>
                        ) : (
                            <>
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>{t('login_google')}</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
