import React, { useState } from 'react';
import { Leaf, User, Bell, Globe, X, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { language, setLanguage, t, getLanguageName } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const supportedLanguages = ['hi', 'en', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as'];

  const handleSignOut = () => {
    if (confirm(language === 'hi' ? 'क्या आप वाकई साइन आउट करना चाहते हैं?' : 'Are you sure you want to sign out?')) {
      localStorage.clear();
      sessionStorage.clear();
      alert(language === 'hi' ? 'सफलतापूर्वक साइन आउट हो गए!' : 'Successfully signed out!');
      window.location.reload();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {t('nav.title')}
                </h1>
                <p className="text-xs text-gray-600">{t('nav.subtitle')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50 flex items-center space-x-1"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">{getLanguageName(language)}</span>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 top-12 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 min-w-[160px] max-h-64 overflow-y-auto">
                    {supportedLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang as any);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                          language === lang ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {getLanguageName(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50 relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    4
                  </span>
                </button>
              </div>

              {/* User Account */}
              <div className="relative">
                <button 
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg hover:from-green-200 hover:to-emerald-200 transition-colors shadow-md"
                >
                  <User className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Innovative Mind</span>
                </button>

                {/* Account Dropdown */}
                {showAccountMenu && (
                  <div className="absolute right-0 top-12 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px]">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                      <p className="font-medium text-gray-800">Innovative Mind</p>
                      <p className="text-sm text-gray-600">support@innovativemind.in</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowProfile(true);
                        setShowAccountMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <User className="h-4 w-4 text-gray-600" />
                      <span>{language === 'hi' ? 'प्रोफाइल' : 'Profile'}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowPreferences(true);
                        setShowAccountMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>{language === 'hi' ? 'सेटिंग्स' : 'Preferences'}</span>
                    </button>
                    
                    <button
                      onClick={toggleDarkMode}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      {darkMode ? <Sun className="h-4 w-4 text-gray-600" /> : <Moon className="h-4 w-4 text-gray-600" />}
                      <span>{language === 'hi' ? 'डार्क मोड' : 'Dark Mode'}</span>
                    </button>
                    
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center space-x-2 text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{language === 'hi' ? 'साइन आउट' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{language === 'hi' ? 'प्रोफाइल' : 'Profile'}</h3>
                <button onClick={() => setShowProfile(false)} className="bg-white bg-opacity-20 p-1 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  IM
                </div>
                <h4 className="text-xl font-bold text-gray-800">Innovative Mind</h4>
                <p className="text-gray-600">Carbon Credit Platform</p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'ईमेल' : 'Email'}</p>
                  <p className="font-medium">support@innovativemind.in</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'स्थान' : 'Location'}</p>
                  <p className="font-medium">Kolkata, West Bengal</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'भाषा' : 'Language'}</p>
                  <p className="font-medium">{getLanguageName(language)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{language === 'hi' ? 'सेटिंग्स' : 'Preferences'}</h3>
                <button onClick={() => setShowPreferences(false)} className="bg-white bg-opacity-20 p-1 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{language === 'hi' ? 'डार्क मोड' : 'Dark Mode'}</p>
                  <p className="text-sm text-gray-600">{language === 'hi' ? 'रात के लिए बेहतर' : 'Better for night use'}</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2">{language === 'hi' ? 'भाषा चुनें' : 'Select Language'}</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {supportedLanguages.map(lang => (
                    <option key={lang} value={lang}>{getLanguageName(lang)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {/* Click outside to close menus */}
      {(showNotifications || showLanguageMenu || showAccountMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowLanguageMenu(false);
            setShowAccountMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;