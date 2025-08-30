import React, { useEffect, useRef } from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MapModalProps {
  location: string;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ location, onClose }) => {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (mapRef.current && window.google) {
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const map = new google.maps.Map(mapRef.current!, {
              zoom: 15,
              center: results[0].geometry.location,
              mapTypeId: google.maps.MapTypeId.SATELLITE,
            });

            new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: location,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#22C55E" stroke="white" stroke-width="4"/>
                    <path d="M20 10L25 18H15L20 10Z" fill="white"/>
                    <circle cx="20" cy="25" r="3" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
              },
            });
          }
        });
      }
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_X0Q&libraries=geometry`;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [location]);

  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
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
              <button
                onClick={openInGoogleMaps}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                title={language === 'hi' ? 'Google Maps में खोलें' : 'Open in Google Maps'}
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
          
          {/* Fallback if Google Maps fails to load */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100" id="map-fallback">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                {language === 'hi' ? 'मैप लोड हो रहा है...' : 'Loading map...'}
              </p>
              <button
                onClick={openInGoogleMaps}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {language === 'hi' ? 'Google Maps में देखें' : 'View in Google Maps'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">
              {language === 'hi' ? 'सैटेलाइट दृश्य में खेत का स्थान' : 'Farm location in satellite view'}
            </p>
            <button
              onClick={openInGoogleMaps}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              {language === 'hi' ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;