import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageDetector = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Detect browser language first
    const browserLang = navigator.language || navigator.languages[0];
    
    // Map browser languages to our supported languages
    const languageMap: { [key: string]: any } = {
      'hi': 'hi', 'hi-IN': 'hi',
      'en': 'en', 'en-US': 'en', 'en-GB': 'en', 'en-IN': 'hi', // English in India defaults to Hindi
      'bn': 'bn', 'bn-BD': 'bn', 'bn-IN': 'bn',
      'ta': 'ta', 'ta-IN': 'ta', 'ta-LK': 'ta',
      'te': 'te', 'te-IN': 'te',
      'mr': 'mr', 'mr-IN': 'mr',
      'gu': 'gu', 'gu-IN': 'gu',
      'kn': 'kn', 'kn-IN': 'kn',
      'ml': 'ml', 'ml-IN': 'ml',
      'pa': 'pa', 'pa-IN': 'pa',
      'or': 'or', 'or-IN': 'or',
      'as': 'as', 'as-IN': 'as'
    };

    // Set language based on browser
    const detectedLang = languageMap[browserLang] || 'hi';
    setLanguage(detectedLang);

    // Enhanced location-based language detection
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Indian state-wise language mapping based on coordinates
          let stateLang = 'hi'; // Default to Hindi
          
          // West Bengal & Bangladesh region
          if (latitude >= 21.5 && latitude <= 27.5 && longitude >= 87 && longitude <= 93) {
            stateLang = 'bn';
          }
          // Tamil Nadu region
          else if (latitude >= 8 && latitude <= 13.5 && longitude >= 76.5 && longitude <= 80.5) {
            stateLang = 'ta';
          }
          // Andhra Pradesh & Telangana region
          else if (latitude >= 12.5 && latitude <= 19.5 && longitude >= 77 && longitude <= 84.5) {
            stateLang = 'te';
          }
          // Maharashtra region
          else if (latitude >= 15.5 && latitude <= 22 && longitude >= 72.5 && longitude <= 80.5) {
            stateLang = 'mr';
          }
          // Gujarat region
          else if (latitude >= 20 && latitude <= 24.5 && longitude >= 68.5 && longitude <= 74.5) {
            stateLang = 'gu';
          }
          // Karnataka region
          else if (latitude >= 11.5 && latitude <= 18.5 && longitude >= 74 && longitude <= 78.5) {
            stateLang = 'kn';
          }
          // Kerala region
          else if (latitude >= 8 && latitude <= 12.5 && longitude >= 74.5 && longitude <= 77.5) {
            stateLang = 'ml';
          }
          // Punjab region
          else if (latitude >= 29.5 && latitude <= 32.5 && longitude >= 74 && longitude <= 76.5) {
            stateLang = 'pa';
          }
          // Odisha region
          else if (latitude >= 17.5 && latitude <= 22.5 && longitude >= 81.5 && longitude <= 87.5) {
            stateLang = 'or';
          }
          // Assam region
          else if (latitude >= 24 && latitude <= 28 && longitude >= 89.5 && longitude <= 96) {
            stateLang = 'as';
          }
          
          setLanguage(stateLang);
        },
        (error) => {
          console.log('Location access denied, using browser language');
        }
      );
    }
  }, [setLanguage]);

  return null;
};

export default LanguageDetector;