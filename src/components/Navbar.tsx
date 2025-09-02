import React, { useState } from 'react';
import { Leaf, User, Bell, Globe, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { language, setLanguage, t, getLanguageName } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const supportedLanguages = ['hi', 'en', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as'];

  return (
    <>
      <nav className="bg-white shadow-lg border-b-4 border-green-500 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t('nav.title')}</h1>
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
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>
              </div>

              {/* User Profile */}
              <button className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors">
                <User className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">{t('nav.account')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}

      {/* Click outside to close menus */}
      {(showNotifications || showLanguageMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowLanguageMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;