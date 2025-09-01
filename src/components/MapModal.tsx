import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Navigation, Satellite, Map } from 'lucide-react';
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

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const map = new google.maps.Map(mapRef.current!, {
              zoom: 16,
              center: results[0].geometry.location,
              mapTypeId: mapType === 'satellite' ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
            });

            // Custom farm marker
            new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: location,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="23" fill="#22C55E" stroke="white" stroke-width="4"/>
                    <text x="25" y="32" text-anchor="middle" fill="white" font-size="20">🌾</text>
                  </svg>
                `),
                scaledSize: new google.maps.Size(50, 50),
              },
            });

            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      }
    };

    // Load Google Maps API
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_X0Q&libraries=geometry,places`;
      script.onload = initMap;
      script.onerror = () => setIsLoading(false);
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [location, mapType]);

  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
  };

  const getDirections = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/dir//${encodedLocation}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden">
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
                onClick={getDirections}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                title={language === 'hi' ? 'दिशा-निर्देश' : 'Get Directions'}
              >
                <Navigation className="h-5 w-5" />
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
          <div ref={mapRef} className="w-full h-96" />
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600 mb-4">
                  {language === 'hi' ? 'मैप लोड हो रहा है...' : 'Loading map...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-gray-600 text-sm">
              {language === 'hi' ? '🛰️ सैटेलाइट दृश्य में खेत का स्थान' : '🛰️ Farm location in satellite view'}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={getDirections}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
              >
                <Navigation className="h-4 w-4" />
                <span>{language === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </button>
              <button
                onClick={openInGoogleMaps}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                {language === 'hi' ? 'Google Maps में खोलें' : 'Open in Google Maps'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;