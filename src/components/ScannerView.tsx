import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Zap, User, X, Loader2 } from 'lucide-react';
import { analyzeFoodImage } from '../lib/gemini';

interface ScannerViewProps {
  onScan: (data: any) => void;
  onClose: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;

    setIsScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);

      try {
        const result = await analyzeFoodImage(base64Image);
        result.image = base64Image;
        onScan(result);
      } catch (error) {
        console.error("Scan failed:", error);
        alert("ไม่สามารถวิเคราะห์รูปภาพได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setIsScanning(false);
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Real Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-20">
        <button onClick={onClose} className="bg-[#FF6B00] p-2 rounded-xl active:scale-95 transition-transform">
          <X className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-xl tracking-tight">NutriScan</h1>
        <button className="bg-white/20 backdrop-blur-md p-2 rounded-full">
          <User className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Scanning Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="relative w-72 h-72">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FF6B00] rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#FF6B00] rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#FF6B00] rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#FF6B00] rounded-br-3xl" />

          {/* Scanning Animation only when loading */}
          {isScanning && (
            <>
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-[#FF6B00]/80 shadow-[0_0_15px_#FF6B00]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#FF6B00]/50 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-[#FF6B00] animate-spin" />
                <span className="text-white text-sm font-medium whitespace-nowrap">กำลังวิเคราะห์อาหาร...</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-center z-20">
        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
          <ImageIcon className="w-6 h-6" />
        </button>

        <button
          onClick={captureAndScan}
          disabled={isScanning}
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center group transition-transform ${isScanning ? 'border-gray-500 scale-95 opacity-50' : 'border-white active:scale-95'}`}
        >
          <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex items-center justify-center">
            {isScanning ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </div>
        </button>

        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
          <Zap className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
