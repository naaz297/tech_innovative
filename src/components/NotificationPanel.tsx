import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { language } = useLanguage();

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: language === 'hi' ? 'कार्बन क्रेडिट्स मिले!' : 'Carbon Credits Earned!',
      message: language === 'hi' ? 'आपको 5.2 टन कार्बन क्रेडिट्स मिले हैं' : 'You earned 5.2 tons of carbon credits',
      time: '2 घंटे पहले',
      icon: <Coins className="h-5 w-5 text-green-600" />
    },
    {
      id: 2,
      type: 'warning',
      title: language === 'hi' ? 'डेटा अपडेट करें' : 'Update Required',
      message: language === 'hi' ? 'कृपया अपने खेत की नई तस्वीरें अपलोड करें' : 'Please upload new farm photos',
      time: '1 दिन पहले',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />
    },
    {
      id: 3,
      type: 'info',
      title: language === 'hi' ? 'प्रोजेक्ट स्वीकृत' : 'Project Approved',
      message: language === 'hi' ? 'राम का धान का खेत प्रोजेक्ट स्वीकृत हो गया' : 'Ram\'s rice farm project has been approved',
      time: '3 दिन पहले',
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />
    }
  ];

  return (
    <div className="absolute right-4 top-16 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 w-80">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-t-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">
            {language === 'hi' ? 'सूचनाएं' : 'Notifications'}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                {notification.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {notification.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <button className="w-full text-green-600 hover:text-green-700 text-sm font-medium">
          {language === 'hi' ? 'सभी सूचनाएं देखें' : 'View All Notifications'}
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;