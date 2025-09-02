import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as';
  setLanguage: (lang: 'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as') => void;
  t: (key: string) => string;
  getLanguageName: (code: string) => string;
}

const translations = {
  hi: {
    // Navigation
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'कृषि कार्बन ट्रैकिंग',
    'nav.account': 'Innovative Mind',
    
    // Dashboard
    'dashboard.title': 'आपका कार्बन डैशबोर्ड',
    'dashboard.subtitle': 'अपने खेत की कार्बन क्रेडिट्स देखें और प्रबंधित करें',
    'dashboard.addProject': 'नया प्रोजेक्ट जोड़ें',
    'dashboard.projects': 'आपके प्रोजेक्ट्स',
    'dashboard.noProjects': 'कोई प्रोजेक्ट नहीं',
    'dashboard.noProjectsDesc': 'अपना पहला कार्बन प्रोजेक्ट शुरू करें',
    
    // Stats
    'stats.totalCredits': 'कुल कार्बन क्रेडिट्स',
    'stats.totalArea': 'कुल क्षेत्रफल',
    'stats.activeProjects': 'सक्रिय प्रोजेक्ट्स',
    
    // Project Status
    'status.active': 'सक्रिय',
    'status.pending': 'प्रतीक्षित',
    'status.completed': 'पूर्ण',
    
    // Add Project Modal
    'modal.title': 'नया प्रोजेक्ट जोड़ें',
    'modal.subtitle': 'अपने खेत को कार्बन क्रेडिट प्रोग्राम में शामिल करें',
    'modal.basicInfo': 'बुनियादी जानकारी',
    'modal.projectName': 'प्रोजेक्ट का नाम',
    'modal.cropType': 'फसल का प्रकार चुनें',
    'modal.rice': 'धान/चावल',
    'modal.agroforestry': 'कृषि वानिकी',
    'modal.location': 'स्थान/गांव',
    'modal.area': 'खेत का क्षेत्रफल (एकड़ में)',
    'modal.photos': 'खेत की तस्वीरें जोड़ें',
    'modal.camera': 'कैमरा खोलें',
    'modal.gallery': 'गैलरी से चुनें',
    'modal.cancel': 'रद्द करें',
    'modal.next': 'अगला',
    'modal.previous': 'पिछला',
    'modal.submit': 'प्रोजेक्ट जोड़ें',
    
    // Footer
    'footer.company': 'Innovative Mind',
    'footer.tagline': 'भारतीय किसानों के लिए कार्बन क्रेडिट समाधान',
    'footer.about': 'हमारे बारे में',
    'footer.contact': 'संपर्क',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'नियम और शर्तें',
    'footer.support': 'सहायता',
    'footer.faq': 'सामान्य प्रश्न',
    'footer.rights': '© 2025 Innovative Mind. सभी अधिकार सुरक्षित।'
  },
  en: {
    // Navigation
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'Agricultural Carbon Tracking',
    'nav.account': 'Innovative Mind',
    
    // Dashboard
    'dashboard.title': 'Your Carbon Dashboard',
    'dashboard.subtitle': 'View and manage your farm carbon credits',
    'dashboard.addProject': 'Add New Project',
    'dashboard.projects': 'Your Projects',
    'dashboard.noProjects': 'No Projects',
    'dashboard.noProjectsDesc': 'Start your first carbon project',
    
    // Stats
    'stats.totalCredits': 'Total Carbon Credits',
    'stats.totalArea': 'Total Area',
    'stats.activeProjects': 'Active Projects',
    
    // Project Status
    'status.active': 'Active',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    
    // Add Project Modal
    'modal.title': 'Add New Project',
    'modal.subtitle': 'Register your farm for carbon credit program',
    'modal.basicInfo': 'Basic Information',
    'modal.projectName': 'Project Name',
    'modal.cropType': 'Select Crop Type',
    'modal.rice': 'Rice',
    'modal.agroforestry': 'Agroforestry',
    'modal.location': 'Location/Village',
    'modal.area': 'Farm Area (in acres)',
    'modal.photos': 'Add Farm Photos',
    'modal.camera': 'Open Camera',
    'modal.gallery': 'Choose from Gallery',
    'modal.cancel': 'Cancel',
    'modal.next': 'Next',
    'modal.previous': 'Previous',
    'modal.submit': 'Add Project',
    
    // Footer
    'footer.company': 'Innovative Mind',
    'footer.tagline': 'Carbon Credit Solutions for Indian Farmers',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.support': 'Support',
    'footer.faq': 'FAQ',
    'footer.rights': '© 2025 Innovative Mind. All rights reserved.'
  },
  bn: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'কৃষি কার্বন ট্র্যাকিং',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'আপনার কার্বন ড্যাশবোর্ড',
    'dashboard.addProject': 'নতুন প্রকল্প যোগ করুন',
    'stats.totalCredits': 'মোট কার্বন ক্রেডিট',
    'footer.company': 'Innovative Mind',
    'footer.about': 'আমাদের সম্পর্কে'
  },
  ta: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'விவசாய கார்பன் கண்காணிப்பு',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'உங்கள் கார்பன் டாஷ்போர்டு',
    'dashboard.addProject': 'புதிய திட்டத்தைச் சேர்க்கவும்',
    'stats.totalCredits': 'மொத்த கார்பன் கிரெடிட்கள்',
    'footer.company': 'Innovative Mind',
    'footer.about': 'எங்களைப் பற்றி'
  },
  te: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'వ్యవసాయ కార్బన్ ట్రాకింగ్',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'మీ కార్బన్ డాష్‌బోర్డ్',
    'dashboard.addProject': 'కొత్త ప్రాజెక్ట్ జోడించండి',
    'stats.totalCredits': 'మొత్తం కార్బన్ క్రెడిట్లు',
    'footer.company': 'Innovative Mind',
    'footer.about': 'మా గురించి'
  },
  mr: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'कृषी कार्बन ट्रॅकिंग',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'तुमचा कार्बन डॅशबोर्ड',
    'dashboard.addProject': 'नवा प्रकल्प जोडा',
    'stats.totalCredits': 'एकूण कार्बन क्रेडिट्स',
    'footer.company': 'Innovative Mind',
    'footer.about': 'आमच्याबद्दल'
  },
  gu: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'કૃષિ કાર્બન ટ્રેકિંગ',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'તમારું કાર્બન ડેશબોર્ડ',
    'dashboard.addProject': 'નવો પ્રોજેક્ટ ઉમેરો',
    'stats.totalCredits': 'કુલ કાર્બન ક્રેડિટ્સ',
    'footer.company': 'Innovative Mind',
    'footer.about': 'અમારા વિશે'
  },
  kn: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'ಕೃಷಿ ಕಾರ್ಬನ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'ನಿಮ್ಮ ಕಾರ್ಬನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'dashboard.addProject': 'ಹೊಸ ಯೋಜನೆ ಸೇರಿಸಿ',
    'stats.totalCredits': 'ಒಟ್ಟು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳು',
    'footer.company': 'Innovative Mind',
    'footer.about': 'ನಮ್ಮ ಬಗ್ಗೆ'
  },
  ml: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'കാർഷിക കാർബൺ ട്രാക്കിംഗ്',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'നിങ്ങളുടെ കാർബൺ ഡാഷ്ബോർഡ്',
    'dashboard.addProject': 'പുതിയ പ്രോജക്റ്റ് ചേർക്കുക',
    'stats.totalCredits': 'മൊത്തം കാർബൺ ക്രെഡിറ്റുകൾ',
    'footer.company': 'Innovative Mind',
    'footer.about': 'ഞങ്ങളെക്കുറിച്ച്'
  },
  pa: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'ਖੇਤੀਬਾੜੀ ਕਾਰਬਨ ਟਰੈਕਿੰਗ',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'ਤੁਹਾਡਾ ਕਾਰਬਨ ਡੈਸ਼ਬੋਰਡ',
    'dashboard.addProject': 'ਨਵਾਂ ਪ੍ਰੋਜੈਕਟ ਜੋੜੋ',
    'stats.totalCredits': 'ਕੁੱਲ ਕਾਰਬਨ ਕ੍ਰੈਡਿਟਸ',
    'footer.company': 'Innovative Mind',
    'footer.about': 'ਸਾਡੇ ਬਾਰੇ'
  },
  or: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'କୃଷି କାର୍ବନ ଟ୍ରାକିଂ',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'ଆପଣଙ୍କ କାର୍ବନ ଡ୍ୟାସବୋର୍ଡ',
    'dashboard.addProject': 'ନୂତନ ପ୍ରକଳ୍ପ ଯୋଗ କରନ୍ତୁ',
    'stats.totalCredits': 'ମୋଟ କାର୍ବନ କ୍ରେଡିଟ',
    'footer.company': 'Innovative Mind',
    'footer.about': 'ଆମ ବିଷୟରେ'
  },
  as: {
    'nav.title': 'AgriCarbon MRV',
    'nav.subtitle': 'কৃষি কাৰ্বন ট্ৰেকিং',
    'nav.account': 'Innovative Mind',
    'dashboard.title': 'আপোনাৰ কাৰ্বন ডেছবৰ্ড',
    'dashboard.addProject': 'নতুন প্ৰকল্প যোগ কৰক',
    'stats.totalCredits': 'মুঠ কাৰ্বন ক্ৰেডিট',
    'footer.company': 'Innovative Mind',
    'footer.about': 'আমাৰ বিষয়ে'
  }
};

// Add English and other language fallbacks
Object.keys(translations).forEach(lang => {
  if (lang !== 'hi' && lang !== 'en') {
    translations[lang] = { ...translations.en, ...translations[lang] };
  }
});

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'hi' | 'en' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as'>('hi');

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['hi']] || 
           translations.en[key as keyof typeof translations['en']] || 
           key;
  };

  const getLanguageName = (code: string): string => {
    const names = {
      'hi': 'हिंदी',
      'en': 'English',
      'bn': 'বাংলা',
      'ta': 'தமிழ்',
      'te': 'తెలుగు',
      'mr': 'मराठी',
      'gu': 'ગુજરાતી',
      'kn': 'ಕನ್ನಡ',
      'ml': 'മലയാളം',
      'pa': 'ਪੰਜਾਬੀ',
      'or': 'ଓଡ଼ିଆ',
      'as': 'অসমীয়া'
    };
    return names[code as keyof typeof names] || code;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};