import React from 'react';
import { BookOpen, Award, Coins, Users, Leaf, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EducationPanel = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: <Coins className="h-8 w-8 text-yellow-600" />,
      title: language === 'hi' ? 'अतिरिक्त आय' : 'Additional Income',
      description: language === 'hi' 
        ? 'कार्बन क्रेडिट्स बेचकर हर महीने ₹5,000-15,000 कमाएं'
        : 'Earn ₹5,000-15,000 monthly by selling carbon credits'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: language === 'hi' ? 'पर्यावरण सुरक्षा' : 'Environmental Protection',
      description: language === 'hi'
        ? 'पेड़ लगाकर और टिकाऊ खेती करके प्रकृति की रक्षा करें'
        : 'Protect nature by planting trees and sustainable farming'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: language === 'hi' ? 'सामुदायिक लाभ' : 'Community Benefits',
      description: language === 'hi'
        ? 'अपने गांव में स्वच्छ हवा और बेहतर मिट्टी बनाएं'
        : 'Create clean air and better soil in your village'
    }
  ];

  const steps = [
    {
      number: 1,
      title: language === 'hi' ? 'प्रोजेक्ट जोड़ें' : 'Add Project',
      description: language === 'hi' ? 'अपने खेत की जानकारी दें' : 'Provide your farm details'
    },
    {
      number: 2,
      title: language === 'hi' ? 'डेटा ट्रैक करें' : 'Track Data',
      description: language === 'hi' ? 'नियमित फोटो और अपडेट दें' : 'Regular photos and updates'
    },
    {
      number: 3,
      title: language === 'hi' ? 'क्रेडिट्स कमाएं' : 'Earn Credits',
      description: language === 'hi' ? 'कार्बन क्रेडिट्स बेचकर पैसे कमाएं' : 'Sell carbon credits and earn money'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Benefits Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg mr-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {language === 'hi' ? 'कार्बन क्रेडिट्स के फायदे' : 'Carbon Credits Benefits'}
            </h3>
            <p className="text-gray-600">
              {language === 'hi' ? 'जानें कि यह आपकी कैसे मदद करता है' : 'Learn how this helps you'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-green-50 hover:to-emerald-50 transition-all duration-300 border border-gray-200 hover:border-green-200">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{benefit.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {language === 'hi' ? 'कैसे काम करता है?' : 'How It Works?'}
            </h3>
            <p className="text-gray-600">
              {language === 'hi' ? 'सिर्फ 3 आसान स्टेप्स' : 'Just 3 easy steps'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {step.number}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
        <div className="text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-green-100" />
          <h4 className="font-bold text-xl mb-2">
            {language === 'hi' ? '🌱 आज ही शुरू करें!' : '🌱 Start Today!'}
          </h4>
          <p className="text-green-100 text-sm mb-4">
            {language === 'hi'
              ? 'अपना पहला प्रोजेक्ट जोड़ें और कार्बन क्रेडिट्स कमाना शुरू करें। यह बिल्कुल मुफ्त है और सिर्फ 5 मिनट में पूरा हो जाता है।'
              : 'Add your first project and start earning carbon credits. It\'s completely free and takes just 5 minutes.'
            }
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-sm font-medium">
              {language === 'hi' ? '✨ 10,000+ किसान पहले से जुड़े हैं' : '✨ 10,000+ farmers already joined'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPanel;