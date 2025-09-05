import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Navigation, Satellite, Map, ExternalLink, Compass, Route } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MapModalProps {
  location: string;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ location, onClose }) => {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapType, setMapType] = useState<'satellite' | 'roadmap'>('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const initMap = () => {
      // For demo purposes, we'll show a working map interface
      setIsLoading(false);
    };

    // Simulate map loading
    const timer = setTimeout(initMap, 1500);
    return () => clearTimeout(timer);
  }, [location, mapType, language]);

  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location + ', India');
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
  };

  const getDirections = () => {
    const encodedLocation = encodeURIComponent(location + ', India');
    window.open(`https://www.google.com/maps/dir//${encodedLocation}`, '_blank');
  };

  const openInGoogleEarth = () => {
    const encodedLocation = encodeURIComponent(location + ', India');
    window.open(`https://earth.google.com/web/search/${encodedLocation}`, '_blank');
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'hi' ? 'खेत का स्थान' : 'Farm Location',
        text: `${location} - ${language === 'hi' ? 'कार्बन क्रेडिट प्रोजेक्ट' : 'Carbon Credit Project'}`,
        url: `https://www.google.com/maps/search/${encodeURIComponent(location + ', India')}`
      });
    } else {
      navigator.clipboard.writeText(`${location} - https://www.google.com/maps/search/${encodeURIComponent(location + ', India')}`);
      alert(language === 'hi' ? 'स्थान कॉपी हो गया!' : 'Location copied!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6" />
              <div>
                <h3 className="text-lg font-bold">{location}</h3>
                <p className="text-green-100 text-sm">
                  {language === 'hi' ? 'खेत का स्थान' : 'Farm Location'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Map Type Toggle */}
              <div className="flex bg-white bg-opacity-20 rounded-lg p-1">
                <button
                  onClick={() => setMapType('satellite')}
                  className={`p-2 rounded transition-colors ${
                    mapType === 'satellite' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                  title={language === 'hi' ? 'सैटेलाइट व्यू' : 'Satellite View'}
                >
                  <Satellite className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`p-2 rounded transition-colors ${
                    mapType === 'roadmap' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                  title={language === 'hi' ? 'रोड मैप' : 'Road Map'}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={shareLocation}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                title={language === 'hi' ? 'स्थान साझा करें' : 'Share Location'}
              >
                <ExternalLink className="h-5 w-5" />
              </button>
              
              <button
                onClick={onClose}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div ref={mapRef} className="w-full h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'hi' ? 'मैप लोड हो रहा है...' : 'Loading map...'}
                </p>
              </div>
            ) : (
              <div className="w-full h-full relative bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-800 dark:to-emerald-900">
                {/* Mock Map Interface */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-4 border-green-500">
                    <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{location}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {language === 'hi' ? 'कृषि कार्बन प्रोजेक्ट स्थल' : 'Agricultural Carbon Project Site'}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                      <Compass className="h-4 w-4" />
                      <span>{language === 'hi' ? 'GPS निर्देशांक उपलब्ध' : 'GPS coordinates available'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                  <div className="flex flex-col space-y-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400">+</button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400">-</button>
                  </div>
                </div>
                
                {/* Location Info */}
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {language === 'hi' ? 'सक्रिय प्रोजेक्ट' : 'Active Project'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'hi' ? 'कार्बन क्रेडिट्स जेनरेट हो रहे हैं' : 'Generating carbon credits'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 border-t dark:border-gray-600">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              {language === 'hi' ? '🛰️ सैटेलाइट दृश्य में खेत का स्थान' : '🛰️ Farm location in satellite view'}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={openInGoogleEarth}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-1"
              >
                <Satellite className="h-4 w-4" />
                <span>{language === 'hi' ? 'Google Earth' : 'Google Earth'}</span>
              </button>
              <button
                onClick={getDirections}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-1"
              >
                <Route className="h-4 w-4" />
                <span>{language === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </button>
              <button
                onClick={openInGoogleMaps}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{language === 'hi' ? 'Google Maps' : 'Google Maps'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;