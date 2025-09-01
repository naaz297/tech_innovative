import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageDetector = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.languages[0];
    
    // Check if Hindi is preferred
    if (browserLang.startsWith('hi') || browserLang.includes('IN')) {
      setLanguage('hi');
    } else {
      setLanguage('en');
    }

    // Also check user's location for better language detection
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If user is in India, prefer Hindi
          const { latitude, longitude } = position.coords;
          // India coordinates roughly: 8°N to 37°N, 68°E to 97°E
          if (latitude >= 8 && latitude <= 37 && longitude >= 68 && longitude <= 97) {
            setLanguage('hi');
          }
        },
        () => {
          // Fallback to browser language detection
        }
      );
    }
  }, [setLanguage]);

  return null;
};

export default LanguageDetector;