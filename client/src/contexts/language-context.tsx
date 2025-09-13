import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
];

// Translation strings
const translations = {
  en: {
    // Common
    loading: 'Loading...',
    search: 'Search...',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    
    // Navigation
    dashboard: 'Dashboard',
    map_3d: '3D Map',
    bus_control: 'Bus Control',
    passenger_heatmap: 'Passenger Heatmap',
    alerts_safety: 'Alerts & Safety',
    ai_recommendations: 'AI Recommendations',
    analytics: 'Analytics',
    maintenance: 'Maintenance',
    
    // Header
    dashboard_overview: 'Dashboard Overview',
    transport_monitoring: 'Real-time transport monitoring for smart cities',
    search_placeholder: 'Search routes, buses...',
    notifications: 'Notifications',
    
    // User
    bus_controller: 'Bus Controller',
    transport_authority: 'Transport Authority',
    logout: 'Logout',
    dark_mode: 'Dark Mode',
    language: 'Language',
    
    // Dashboard
    active_buses: 'Active Buses',
    avg_delay: 'Avg Delay',
    punctuality: 'Punctuality',
    critical_alerts: 'Critical Alerts',
    co2_saved: 'CO₂ Saved',
    recent_alerts: 'Recent Alerts',
    ai_recommendations_title: 'AI Recommendations',
    live_map: 'Live Map',
    route_usage: 'Route Usage',
    punctuality_chart: 'Punctuality Trends',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    delayed: 'Delayed',
    breakdown: 'Breakdown',
    
    // Alerts
    critical: 'Critical',
    warning: 'Warning',
    info: 'Info',
    
    // Time
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    ago: 'ago',
    
    // Search
    search_results: 'Search Results',
    no_results: 'No results found',
    buses: 'Buses',
    routes: 'Routes',
    alerts: 'Alerts',
    recommendations: 'Recommendations',
  },
  hi: {
    // Common
    loading: 'लोड हो रहा है...',
    search: 'खोजें...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    map_3d: '3D नक्शा',
    bus_control: 'बस नियंत्रण',
    passenger_heatmap: 'यात्री हीटमैप',
    alerts_safety: 'अलर्ट और सुरक्षा',
    ai_recommendations: 'AI सुझाव',
    analytics: 'विश्लेषण',
    maintenance: 'रखरखाव',
    
    // Header
    dashboard_overview: 'डैशबोर्ड अवलोकन',
    transport_monitoring: 'स्मार्ट शहरों के लिए रियल-टाइम परिवहन निगरानी',
    search_placeholder: 'रूट, बस खोजें...',
    notifications: 'सूचनाएं',
    
    // User
    bus_controller: 'बस नियंत्रक',
    transport_authority: 'परिवहन प्राधिकरण',
    logout: 'लॉग आउट',
    dark_mode: 'डार्क मोड',
    language: 'भाषा',
    
    // Dashboard
    active_buses: 'सक्रिय बसें',
    avg_delay: 'औसत देरी',
    punctuality: 'समयबद्धता',
    critical_alerts: 'गंभीर अलर्ट',
    co2_saved: 'CO₂ बचाया गया',
    recent_alerts: 'हाल के अलर्ट',
    ai_recommendations_title: 'AI सुझाव',
    live_map: 'लाइव मैप',
    route_usage: 'रूट उपयोग',
    punctuality_chart: 'समयबद्धता रुझान',
    
    // Status
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    delayed: 'विलंबित',
    breakdown: 'खराब',
    
    // Alerts
    critical: 'गंभीर',
    warning: 'चेतावनी',
    info: 'जानकारी',
    
    // Time
    minutes: 'मिनट',
    hours: 'घंटे',
    days: 'दिन',
    ago: 'पहले',
    
    // Search
    search_results: 'खोज परिणाम',
    no_results: 'कोई परिणाम नहीं मिला',
    buses: 'बसें',
    routes: 'रूट',
    alerts: 'अलर्ट',
    recommendations: 'सुझाव',
  },
  mr: {
    // Common
    loading: 'लोड होत आहे...',
    search: 'शोधा...',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    close: 'बंद करा',
    delete: 'हटवा',
    edit: 'संपादित करा',
    view: 'पहा',
    
    // Navigation
    dashboard: 'डॅशबोर्ड',
    map_3d: '3D नकाशा',
    bus_control: 'बस नियंत्रण',
    passenger_heatmap: 'प्रवासी हीटमॅप',
    alerts_safety: 'अलर्ट आणि सुरक्षा',
    ai_recommendations: 'AI शिफारसी',
    analytics: 'विश्लेषण',
    maintenance: 'देखभाल',
    
    // Header
    dashboard_overview: 'डॅशबोर्ड अवलोकन',
    transport_monitoring: 'स्मार्ट शहरांसाठी रियल-टाइम वाहतूक निरीक्षण',
    search_placeholder: 'मार्ग, बस शोधा...',
    notifications: 'सूचना',
    
    // User
    bus_controller: 'बस नियंत्रक',
    transport_authority: 'वाहतूक प्राधिकरण',
    logout: 'लॉग आउट',
    dark_mode: 'डार्क मोड',
    language: 'भाषा',
    
    // Dashboard
    active_buses: 'सक्रिय बसेस',
    avg_delay: 'सरासरी उशीर',
    punctuality: 'वेळेवरपणा',
    critical_alerts: 'गंभीर अलर्ट',
    co2_saved: 'CO₂ वाचवले',
    recent_alerts: 'अलीकडील अलर्ट',
    ai_recommendations_title: 'AI शिफारसी',
    live_map: 'लाइव्ह मॅप',
    route_usage: 'मार्ग वापर',
    punctuality_chart: 'वेळेवरपणाचे ट्रेंड',
    
    // Status
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    delayed: 'उशीरा',
    breakdown: 'बिघडलेली',
    
    // Alerts
    critical: 'गंभीर',
    warning: 'चेतावणी',
    info: 'माहिती',
    
    // Time
    minutes: 'मिनिटे',
    hours: 'तास',
    days: 'दिवस',
    ago: 'आधी',
    
    // Search
    search_results: 'शोध परिणाम',
    no_results: 'कोणतेही परिणाम सापडले नाहीत',
    buses: 'बसेस',
    routes: 'मार्ग',
    alerts: 'अलर्ट',
    recommendations: 'शिफारसी',
  }
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  currentLanguageInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage on initialization
    try {
      const storedLanguage = localStorage.getItem('nirdeshak-language') as Language;
      if (storedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === storedLanguage)) {
        return storedLanguage;
      }
    } catch {
      // Handle localStorage errors gracefully
    }
    return defaultLanguage;
  });

  const setLanguage = (newLanguage: Language) => {
    try {
      localStorage.setItem('nirdeshak-language', newLanguage);
    } catch {
      console.warn('Failed to save language preference to localStorage');
    }
    setLanguageState(newLanguage);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === language) || SUPPORTED_LANGUAGES[0];

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t,
    currentLanguageInfo,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}