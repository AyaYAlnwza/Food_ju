/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ScannerView } from './components/ScannerView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { ScanResult } from './components/ScanResult';
import { OnboardingView } from './components/OnboardingView';
import { useNutrition } from './lib/NutritionContext';

type Screen = 'home' | 'scan' | 'history' | 'stats' | 'profile' | 'scan-result';

export default function App() {
  const { userProfile } = useNutrition();
  const [activeTab, setActiveTab] = useState<Screen>('home');
  const [previousTab, setPreviousTab] = useState<Screen>('home');
  const [scanData, setScanData] = useState<any>(null);

  // If there's no user profile, force onboarding
  if (!userProfile) {
    return <OnboardingView onComplete={() => { }} />;
  }

  const handleTabChange = (tab: string) => {
    setPreviousTab(activeTab);
    setActiveTab(tab as Screen);
  };

  const handleScan = (data: any) => {
    setScanData(data);
    setActiveTab('scan-result');
  };

  const handleBackFromScan = () => {
    setActiveTab('scan');
  };

  const handleLogMeal = () => {
    setActiveTab('home');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'scan':
        return <ScannerView onScan={handleScan} onClose={() => setActiveTab('home')} />;
      case 'history':
        return <HistoryView />;
      case 'profile':
        return <ProfileView />;
      case 'scan-result':
        return <ScanResult data={scanData} onBack={handleBackFromScan} onLog={handleLogMeal} />;
      case 'stats':
        return <HomeView />; // Placeholder
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#FF6B00]/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {activeTab !== 'scan' && activeTab !== 'scan-result' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
