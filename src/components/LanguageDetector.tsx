// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState } from "react";

type Language = 
  | "en" 
  | "hi" 
  | "bn" 
  | "ta" 
  | "te" 
  | "mr" 
  | "gu" 
  | "kn" 
  | "ml" 
  | "pa" 
  | "or" 
  | "as";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // ✅ Add all translation keys you use in Dashboard.tsx
  const translations: Record<Language, Record<string, string>> = {
    en: {
      totalCarbonCredits: "Total Carbon Credits",
      totalCredits: "Total Credits",
      estimatedIncome: "Estimated Income",
      avgPerProject: "Avg per Project",
      nextPayment: "Next Payment",
      days: "days",
      totalArea: "Total Area",
      totalLand: "Total Land",
      acres: "acres",
      avgPerAcre: "Avg per Acre",
      largestFarm: "Largest Farm",
      totalVillages: "Total Villages",
      activeProjects: "Active Projects",
      activeNow: "Active Now",
      completed: "Completed",
      successRate: "Success Rate",
      thisMonth: "This Month",
      yourProjects: "Your Projects",
      addProject: "Add Project",
      noProjectsYet: "No projects yet",
      startByAddingProject: "Start by adding your first project",
      close: "Close",
    },
    hi: {
      totalCarbonCredits: "कुल कार्बन क्रेडिट",
      totalCredits: "कुल क्रेडिट",
      estimatedIncome: "अनुमानित आय",
      avgPerProject: "प्रोजेक्ट प्रति औसत",
      nextPayment: "अगला भुगतान",
      days: "दिन",
      totalArea: "कुल क्षेत्रफल",
      totalLand: "कुल भूमि",
      acres: "एकड़",
      avgPerAcre: "प्रति प्रोजेक्ट औसत",
      largestFarm: "सबसे बड़ा खेत",
      totalVillages: "कुल गांव",
      activeProjects: "सक्रिय प्रोजेक्ट",
      activeNow: "अभी सक्रिय",
      completed: "पूर्ण",
      successRate: "सफलता दर",
      thisMonth: "इस महीने",
      yourProjects: "आपके प्रोजेक्ट",
      addProject: "प्रोजेक्ट जोड़ें",
      noProjectsYet: "अभी तक कोई प्रोजेक्ट नहीं",
      startByAddingProject: "पहला प्रोजेक्ट जोड़कर शुरू करें",
      close: "बंद करें",
    },
    // Other languages → fallback to English for now
    bn: {}, ta: {}, te: {}, mr: {}, gu: {}, kn: {}, ml: {}, pa: {}, or: {}, as: {}
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};