import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Navigation, Satellite, Map, ExternalLink } from 'lucide-react';
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
      if (mapRef.current && window.google) {
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: location + ', India' }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const map = new google.maps.Map(mapRef.current!, {
              zoom: 16,
              center: results[0].geometry.location,
              mapTypeId: mapType === 'satellite' ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
              zoomControl: true,
              styles: mapType === 'satellite' ? [] : [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'on' }]
                },
                {
                  featureType: 'landscape.natural',
                  elementType: 'geometry',
                  stylers: [{ color: '#e8f5e8' }]
                }
              ]
            });

            // Custom farm marker with animation
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: location,
              animation: google.maps.Animation.BOUNCE,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="28" fill="#22C55E" stroke="white" stroke-width="4"/>
                    <circle cx="30" cy="30" r="20" fill="#16A34A" opacity="0.8"/>
                    <text x="30" y="38" text-anchor="middle" fill="white" font-size="24">🌾</text>
                  </svg>
                `),
                scaledSize: new google.maps.Size(60, 60),
              },
            });

            // Stop marker animation after 3 seconds
            setTimeout(() => {
              marker.setAnimation(null);
            }, 3000);

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 10px; text-align: center;">
                  <h3 style="margin: 0 0 5px 0; color: #22C55E; font-weight: bold;">${location}</h3>
                  <p style="margin: 0; color: #666; font-size: 12px;">${language === 'hi' ? 'कृषि कार्बन प्रोजेक्ट स्थल' : 'Agricultural Carbon Project Site'}</p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            setIsLoading(false);
          } else {
            setMapError(true);
            setIsLoading(false);
          }
        });
      }
    };

    // Load Google Maps API with a working key (you'll need to replace with actual key)
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_X0Q&libraries=geometry,places`;
      script.onload = initMap;
      script.onerror = () => {
        setMapError(true);
        setIsLoading(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }
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

          {/* Error State */}
          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-600 mb-2">
                  {language === 'hi' ? 'मैप लोड नहीं हो सका' : 'Could not load map'}
                </h4>
                <p className="text-gray-500 mb-4">
                  {language === 'hi' ? 'कृपया Google Maps में देखें' : 'Please view in Google Maps'}
                </p>
                <button
                  onClick={openInGoogleMaps}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{language === 'hi' ? 'Google Maps में खोलें' : 'Open in Google Maps'}</span>
                </button>
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
                onClick={openInGoogleEarth}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
              >
                <Satellite className="h-4 w-4" />
                <span>{language === 'hi' ? 'Google Earth' : 'Google Earth'}</span>
              </button>
              <button
                onClick={getDirections}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
              >
                <Navigation className="h-4 w-4" />
                <span>{language === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </button>
              <button
                onClick={openInGoogleMaps}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
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