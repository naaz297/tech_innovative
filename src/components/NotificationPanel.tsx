import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, Coins, Award, Bell } from 'lucide-react';
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
      title: language === 'hi' ? '🎉 कार्बन क्रेडिट्स मिले!' : '🎉 Carbon Credits Earned!',
      message: language === 'hi' 
        ? 'बधाई हो! आपको 5.2 टन कार्बन क्रेडिट्स मिले हैं। अनुमानित आय: ₹7,800' 
        : 'Congratulations! You earned 5.2 tons of carbon credits. Estimated income: ₹7,800',
      time: language === 'hi' ? '2 घंटे पहले' : '2 hours ago',
      icon: <Coins className="h-5 w-5 text-green-600" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 2,
      type: 'success',
      title: language === 'hi' ? '✅ प्रोजेक्ट स्वीकृत!' : '✅ Project Approved!',
      message: language === 'hi' 
        ? 'आपका "रामेश्वर का धान का खेत" प्रोजेक्ट स्वीकृत हो गया है। अब आप कार्बन क्रेडिट्स कमाना शुरू कर सकते हैं।'
        : 'Your "Rameshwar\'s Rice Farm" project has been approved. You can now start earning carbon credits.',
      time: language === 'hi' ? '1 दिन पहले' : '1 day ago',
      icon: <Award className="h-5 w-5 text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      type: 'warning',
      title: language === 'hi' ? '📸 अपडेट आवश्यक!' : '📸 Update Required!',
      message: language === 'hi' 
        ? 'कृपया अपने खेत की नई तस्वीरें अपलोड करें। नियमित अपडेट से आपको अधिक कार्बन क्रेडिट्स मिलेंगे।'
        : 'Please upload new farm photos. Regular updates help you earn more carbon credits.',
      time: language === 'hi' ? '3 दिन पहले' : '3 days ago',
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 4,
      type: 'info',
      title: language === 'hi' ? '💰 पेमेंट प्रोसेसिंग' : '💰 Payment Processing',
      message: language === 'hi' 
        ? 'आपका ₹15,750 का पेमेंट प्रोसेस हो रहा है। 2-3 दिन में आपके बैंक अकाउंट में आ जाएगा।'
        : 'Your payment of ₹15,750 is being processed. It will reach your bank account in 2-3 days.',
      time: language === 'hi' ? '5 दिन पहले' : '5 days ago',
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const markAllAsRead = () => {
    alert(language === 'hi' 
      ? 'सभी सूचनाएं पढ़ी गई के रूप में चिह्नित की गईं।'
      : 'All notifications marked as read.'
    );
  };

  return (
    <div className="absolute right-4 top-16 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 w-80 max-w-sm">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-white" />
            <h3 className="text-white font-bold text-lg">
              {language === 'hi' ? 'सूचनाएं' : 'Notifications'}
            </h3>
            <span className="bg-white bg-opacity-30 text-white text-xs px-2 py-1 rounded-full">
              {notifications.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${notification.bgColor} border-l-4 ${notification.borderColor}`}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                {notification.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm mb-1">{notification.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </div>
                  <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                    {language === 'hi' ? 'विवरण' : 'Details'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t bg-gray-50 rounded-b-xl">
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="flex-1 text-green-600 hover:text-green-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            {language === 'hi' ? 'सभी पढ़ें' : 'Mark All Read'}
          </button>
          <button className="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors">
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;