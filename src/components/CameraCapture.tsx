import React, { useRef, useState, useCallback } from 'react';
import { Camera, RotateCcw, Check, X, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CameraCaptureProps {
  onCapture: (photo: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Stop existing stream if any
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(language === 'hi' 
        ? 'कैमरा एक्सेस नहीं हो सका। कृपया अनुमति दें।' 
        : 'Could not access camera. Please allow permission.'
      );
      onClose();
    }
  }, [facingMode, stream, onClose, language]);

  React.useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedPhoto(photoData);
      }
    }
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onCapture(capturedPhoto);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onClose();
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {language === 'hi' ? '📸 खेत की तस्वीर लें' : '📸 Take Farm Photo'}
          </h3>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="text-white text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 animate-pulse" />
              <p className="text-lg">
                {language === 'hi' ? 'कैमरा लोड हो रहा है...' : 'Loading camera...'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {language === 'hi' ? 'कृपया कैमरा अनुमति दें' : 'Please allow camera permission'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {!capturedPhoto ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={capturedPhoto}
                alt="Captured farm"
                className="w-full h-full object-cover"
              />
            )}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Overlay */}
            {!capturedPhoto && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white border-opacity-50" />
                  ))}
                </div>
                
                {/* Center Focus */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 border-2 border-white border-opacity-70 rounded-lg"></div>
                </div>

                {/* Instructions */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 p-3 rounded-lg text-white text-center">
                    <p className="text-sm">
                      {language === 'hi' 
                        ? '🌾 खेत को फ्रेम के बीच में रखें' 
                        : '🌾 Keep the farm in the center of frame'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black bg-opacity-90 p-6">
        {!capturedPhoto ? (
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <button
              onClick={capturePhoto}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 p-6 rounded-full transition-all transform hover:scale-110 disabled:opacity-50 shadow-lg"
            >
              <Camera className="h-8 w-8 text-gray-800" />
            </button>
            
            <button
              onClick={switchCamera}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors"
              title={language === 'hi' ? 'कैमरा बदलें' : 'Switch camera'}
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={retakePhoto}
              className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="h-6 w-6" />
              <span className="hidden sm:block">
                {language === 'hi' ? 'दोबारा लें' : 'Retake'}
              </span>
            </button>
            
            <button
              onClick={confirmPhoto}
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full transition-all transform hover:scale-110 flex items-center space-x-2 shadow-lg"
            >
              <Check className="h-6 w-6" />
              <span className="hidden sm:block">
                {language === 'hi' ? 'उपयोग करें' : 'Use Photo'}
              </span>
            </button>
          </div>
        )}

        {/* Camera Info */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-xs">
            {language === 'hi' 
              ? `कैमरा: ${facingMode === 'environment' ? 'पीछे' : 'सामने'} | गुणवत्ता: उच्च`
              : `Camera: ${facingMode === 'environment' ? 'Back' : 'Front'} | Quality: High`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;