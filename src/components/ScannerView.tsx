import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, Zap, User, X, Loader2 } from 'lucide-react';
import { analyzeFoodImage } from '../lib/gemini';
import { useLanguage } from '../lib/LanguageContext';

interface ScannerViewProps {
  onScan: (data: any) => void;
  onClose: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onScan, onClose }) => {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setMediaStream(stream);
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

  const toggleFlash = async () => {
    if (!mediaStream) return;
    const videoTrack = mediaStream.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      // Check if browser supports torch (flash)
      const capabilities = videoTrack.getCapabilities() as any;
      if (capabilities.torch) {
        const nextFlashState = !isFlashOn;
        await videoTrack.applyConstraints({
          advanced: [{ torch: nextFlashState } as any]
        });
        setIsFlashOn(nextFlashState);
      } else {
        alert(t('flash_not_supported') || 'Flash is not supported on this device.');
      }
    } catch (err) {
      console.error("Error toggling flash:", err);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;
      try {
        const result = await analyzeFoodImage(base64Image, language);
        result.image = base64Image;
        onScan(result);
      } catch (error) {
        console.error("Scan failed:", error);
        alert(t('scan_failed'));
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
        const result = await analyzeFoodImage(base64Image, language);
        result.image = base64Image;
        onScan(result);
      } catch (error) {
        console.error("Scan failed:", error);
        alert(t('scan_failed'));
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
        <h1 className="text-white font-bold text-xl tracking-tight absolute left-1/2 -translate-x-1/2">NutriScan</h1>
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
                <span className="text-white text-sm font-medium whitespace-nowrap">{t('analyzing_food')}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-center z-20">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <ImageIcon className="w-6 h-6" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

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

        <button
          onClick={toggleFlash}
          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-colors ${isFlashOn ? 'bg-[#FF6B00]' : 'bg-white/10'}`}
        >
          <Zap className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
