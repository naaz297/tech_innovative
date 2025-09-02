import React, { useState } from 'react';
import { BookOpen, Award, Coins, Users, Leaf, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EducationPanel = () => {
  const { language } = useLanguage();
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);

  const benefits = [
    {
      icon: <Coins className="h-8 w-8 text-yellow-600" />,
      title: language === 'hi' ? 'अतिरिक्त आय' : 'Additional Income',
      description: language === 'hi' 
        ? 'कार्बन क्रेडिट्स बेचकर हर महीने ₹5,000-15,000 कमाएं'
        : 'Earn ₹5,000-15,000 monthly by selling carbon credits',
      details: language === 'hi'
        ? 'धान की खेती से 3.5 टन/एकड़/वर्ष और कृषि वानिकी से 7.2 टन/एकड़/वर्ष कार्बन क्रेडिट्स मिलते हैं। वर्तमान बाजार दर ₹1500 प्रति टन है।'
        : 'Rice farming gives 3.5 tons/acre/year and agroforestry gives 7.2 tons/acre/year carbon credits. Current market rate is ₹1500 per ton.',
      examples: [
        language === 'hi' ? '2 एकड़ धान = ₹10,500/वर्ष' : '2 acres rice = ₹10,500/year',
        language === 'hi' ? '1 एकड़ वानिकी = ₹10,800/वर्ष' : '1 acre agroforestry = ₹10,800/year'
      ]
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: language === 'hi' ? 'पर्यावरण सुरक्षा' : 'Environmental Protection',
      description: language === 'hi'
        ? 'पेड़ लगाकर और टिकाऊ खेती करके प्रकृति की रक्षा करें'
        : 'Protect nature by planting trees and sustainable farming',
      details: language === 'hi'
        ? 'आपकी खेती से हवा साफ होती है, मिट्टी बेहतर बनती है, और जलवायु परिवर्तन कम होता है। यह भविष्य की पीढ़ियों के लिए बेहतर दुनिया बनाता है।'
        : 'Your farming cleans air, improves soil, and reduces climate change. This creates a better world for future generations.',
      examples: [
        language === 'hi' ? '1 टन CO₂ = 400 पेड़ों के बराबर' : '1 ton CO₂ = equivalent to 400 trees',
        language === 'hi' ? 'बेहतर मिट्टी = अधिक फसल' : 'Better soil = more crops'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: language === 'hi' ? 'सामुदायिक लाभ' : 'Community Benefits',
      description: language === 'hi'
        ? 'अपने गांव में स्वच्छ हवा और बेहतर मिट्टी बनाएं'
        : 'Create clean air and better soil in your village',
      details: language === 'hi'
        ? 'जब आप कार्बन क्रेडिट्स कमाते हैं, तो पूरे गांव को फायदा होता है। स्वच्छ हवा, बेहतर पानी, और अधिक रोजगार के अवसर मिलते हैं।'
        : 'When you earn carbon credits, the whole village benefits. Clean air, better water, and more employment opportunities.',
      examples: [
        language === 'hi' ? 'गांव में 20% कम प्रदूषण' : '20% less pollution in village',
        language === 'hi' ? 'अधिक रोजगार के अवसर' : 'More employment opportunities'
      ]
    }
  ];

  const steps = [
    {
      number: 1,
      title: language === 'hi' ? 'प्रोजेक्ट जोड़ें' : 'Add Project',
      description: language === 'hi' ? 'अपने खेत की जानकारी दें' : 'Provide your farm details',
      action: language === 'hi' ? 'ऊपर "नया प्रोजेक्ट जोड़ें" बटन दबाएं' : 'Click "Add New Project" button above'
    },
    {
      number: 2,
      title: language === 'hi' ? 'डेटा ट्रैक करें' : 'Track Data',
      description: language === 'hi' ? 'नियमित फोटो और अपडेट दें' : 'Regular photos and updates',
      action: language === 'hi' ? 'महीने में 2-3 बार तस्वीरें लें' : 'Take photos 2-3 times per month'
    },
    {
      number: 3,
      title: language === 'hi' ? 'क्रेडिट्स कमाएं' : 'Earn Credits',
      description: language === 'hi' ? 'कार्बन क्रेडिट्स बेचकर पैसे कमाएं' : 'Sell carbon credits and earn money',
      action: language === 'hi' ? 'हर 3 महीने में पेमेंट मिलेगी' : 'Payment every 3 months'
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
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedBenefit(expandedBenefit === index ? null : index)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    {benefit.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-800">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedBenefit === index ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedBenefit === index && (
                <div className="p-4 bg-white border-t">
                  <p className="text-gray-700 mb-3 leading-relaxed">{benefit.details}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800">
                      {language === 'hi' ? '📊 उदाहरण:' : '📊 Examples:'}
                    </p>
                    {benefit.examples.map((example, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
            <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-all">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                <p className="text-green-600 text-xs font-medium">{step.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 text-4xl">🌱</div>
          <div className="absolute bottom-2 right-2 text-3xl">🌾</div>
          <div className="absolute top-4 right-4 text-2xl">🌳</div>
        </div>
        
        <div className="relative z-10 text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-green-100" />
          <h4 className="font-bold text-xl mb-2">
            {language === 'hi' ? '🌱 आज ही शुरू करें!' : '🌱 Start Today!'}
          </h4>
          <p className="text-green-100 text-sm mb-4 leading-relaxed">
            {language === 'hi'
              ? 'अपना पहला प्रोजेक्ट जोड़ें और कार्बन क्रेडिट्स कमाना शुरू करें। यह बिल्कुल मुफ्त है और सिर्फ 5 मिनट में पूरा हो जाता है।'
              : 'Add your first project and start earning carbon credits. It\'s completely free and takes just 5 minutes.'
            }
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium">
              {language === 'hi' ? '✨ 10,000+ किसान पहले से जुड़े हैं' : '✨ 10,000+ farmers already joined'}
            </p>
            <p className="text-xs text-green-100 mt-1">
              {language === 'hi' ? 'औसत मासिक आय: ₹8,500' : 'Average monthly income: ₹8,500'}
            </p>
          </div>
          
          {/* Success Stories */}
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <p className="text-xs font-medium mb-2">
              {language === 'hi' ? '🏆 सफलता की कहानियां:' : '🏆 Success Stories:'}
            </p>
            <div className="text-xs text-green-100 space-y-1">
              <p>• {language === 'hi' ? 'राम जी (UP): ₹12,000/महीना' : 'Ram ji (UP): ₹12,000/month'}</p>
              <p>• {language === 'hi' ? 'सुनीता देवी (Bihar): ₹8,500/महीना' : 'Sunita Devi (Bihar): ₹8,500/month'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPanel;