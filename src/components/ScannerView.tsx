import React from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Zap, User, X } from 'lucide-react';

interface ScannerViewProps {
  onScan: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onScan }) => {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Simulated Camera Background */}
      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000"
        alt="Food Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-20">
        <button className="bg-[#FF6B00] p-2 rounded-xl">
          <X className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-xl tracking-tight">NutriScan</h1>
        <button className="bg-white/20 backdrop-blur-md p-2 rounded-full">
          <User className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="relative w-72 h-72">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FF6B00] rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF6B00] rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF6B00] rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#FF6B00] rounded-br-3xl" />
          
          {/* Scanning Line Animation */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-[#FF6B00]/50 shadow-[0_0_15px_#FF6B00]"
          />

          {/* Status Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-white text-sm font-medium whitespace-nowrap">Scanning for nutrition...</span>
          </div>
        </div>
      </div>

      {/* Last Scan Preview */}
      <div className="absolute bottom-32 left-6 right-6 z-20">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white">
              <img src="https://em-content.zobj.net/source/apple/354/red-apple_1f34e.png" alt="Apple" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium">Last Scan</p>
              <p className="text-white font-bold">Green Apple</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#FF6B00] font-bold text-lg">52 <span className="text-xs">kcal</span></p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-center z-20">
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
          <ImageIcon className="w-6 h-6" />
        </button>
        
        <button 
          onClick={onScan}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </button>

        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Tabs (Visual only here) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8 text-white/50 text-[10px] font-black tracking-widest uppercase">
        <span className="text-[#FF6B00] border-b-2 border-[#FF6B00] pb-1">Scanner</span>
        <span>Meal Log</span>
        <span>Insights</span>
      </div>
    </div>
  );
};
