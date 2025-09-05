import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageDetector: React.FC = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('app_language');
    if (saved) {
      setLanguage(saved as any);
      return;
    }
    const browserLang = navigator.language?.toLowerCase() || 'en';
    const map: Record<string, string> = {
      'hi': 'hi', 'hi-in': 'hi',
      'en': 'en', 'en-in': 'en', 'en-us': 'en', 'en-gb': 'en',
      'bn': 'bn', 'bn-in': 'bn',
      'ta': 'ta', 'te': 'te', 'mr': 'mr', 'gu': 'gu', 'kn': 'kn', 'ml': 'ml', 'pa': 'pa', 'or': 'or', 'as': 'as'
    };
    const selected = map[browserLang] || map[browserLang.split('-')[0]] || 'en';
    setLanguage(selected as any);
    localStorage.setItem('app_language', selected);
  }, [setLanguage]);

  return null;
};

export default LanguageDetector;
