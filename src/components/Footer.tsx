import React, { useState } from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Users, HelpCircle, X, ExternalLink, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);

  const teamMembers = [
    {
      name: 'Naaz',
      department: 'B.Tech CSE',
      role: language === 'hi' ? 'मुख्य डेवलपर' : 'Lead Developer',
      description: language === 'hi' ? 'कंप्यूटर साइंस में विशेषज्ञ, AI और मशीन लर्निंग में अनुभवी' : 'Computer Science expert, experienced in AI and Machine Learning'
    },
    {
      name: 'Noor', 
      department: 'B.Tech Electrical Engineering',
      role: language === 'hi' ? 'इलेक्ट्रिकल इंजीनियर' : 'Electrical Engineer',
      description: language === 'hi' ? 'IoT सेंसर और हार्डवेयर डिज़ाइन में विशेषज्ञ' : 'Expert in IoT sensors and hardware design'
    },
    {
      name: 'Adiba',
      department: 'B.Tech CSE', 
      role: language === 'hi' ? 'सॉफ्टवेयर इंजीनियर' : 'Software Engineer',
      description: language === 'hi' ? 'वेब डेवलपमेंट और डेटाबेस मैनेजमेंट में कुशल' : 'Skilled in web development and database management'
    }
  ];

  const helpTips = [
    {
      title: language === 'hi' ? '🌾 प्रोजेक्ट कैसे जोड़ें?' : '🌾 How to Add Project?',
      content: language === 'hi' 
        ? 'ऊपर "नया प्रोजेक्ट जोड़ें" बटन दबाएं, अपने खेत की जानकारी भरें, तस्वीरें लें और सबमिट करें। यह प्रक्रिया सिर्फ 5 मिनट में पूरी हो जाती है।'
        : 'Click "Add New Project" button, fill your farm details, take photos and submit. This process completes in just 5 minutes.',
      steps: [
        language === 'hi' ? '1. हरा बटन दबाएं' : '1. Press green button',
        language === 'hi' ? '2. खेत की जानकारी भरें' : '2. Fill farm details',
        language === 'hi' ? '3. तस्वीरें लें' : '3. Take photos',
        language === 'hi' ? '4. सबमिट करें' : '4. Submit'
      ]
    },
    {
      title: language === 'hi' ? '📸 तस्वीरें कैसे लें?' : '📸 How to Take Photos?',
      content: language === 'hi'
        ? 'कैमरा बटन दबाएं, खेत को फ्रेम के बीच में रखें, और कैप्चर बटन दबाएं। अच्छी रोशनी में फोटो लें।'
        : 'Press camera button, keep farm in center of frame, and press capture. Take photos in good lighting.',
      steps: [
        language === 'hi' ? '1. कैमरा बटन दबाएं' : '1. Press camera button',
        language === 'hi' ? '2. खेत को बीच में रखें' : '2. Keep farm in center',
        language === 'hi' ? '3. अच्छी रोशनी में लें' : '3. Take in good light',
        language === 'hi' ? '4. कैप्चर दबाएं' : '4. Press capture'
      ]
    },
    {
      title: language === 'hi' ? '💰 पैसे कैसे कमाएं?' : '💰 How to Earn Money?',
      content: language === 'hi'
        ? 'अपना प्रोजेक्ट रजिस्टर करें, नियमित अपडेट दें, कार्बन क्रेडिट्स कमाएं और उन्हें बेचकर पैसे कमाएं।'
        : 'Register your project, give regular updates, earn carbon credits and sell them to earn money.',
      steps: [
        language === 'hi' ? '1. प्रोजेक्ट रजिस्टर करें' : '1. Register project',
        language === 'hi' ? '2. मासिक अपडेट दें' : '2. Give monthly updates',
        language === 'hi' ? '3. क्रेडिट्स कमाएं' : '3. Earn credits',
        language === 'hi' ? '4. पैसे पाएं' : '4. Get money'
      ]
    },
    {
      title: language === 'hi' ? '🗺️ मैप कैसे देखें?' : '🗺️ How to View Map?',
      content: language === 'hi'
        ? 'किसी भी प्रोजेक्ट कार्ड पर लोकेशन पर क्लिक करें या "मैप देखें" बटन दबाएं।'
        : 'Click on location in any project card or press "View Map" button.',
      steps: [
        language === 'hi' ? '1. प्रोजेक्ट कार्ड खोलें' : '1. Open project card',
        language === 'hi' ? '2. लोकेशन पर क्लिक करें' : '2. Click on location',
        language === 'hi' ? '3. मैप देखें' : '3. View map',
        language === 'hi' ? '4. दिशा-निर्देश लें' : '4. Get directions'
      ]
    },
    {
      title: language === 'hi' ? '🔊 आवाज़ की सुविधा' : '🔊 Voice Feature',
      content: language === 'hi'
        ? 'माइक बटन दबाकर बोलें, आपकी आवाज़ टेक्स्ट में बदल जाएगी। स्पीकर बटन दबाकर सुनें।'
        : 'Press mic button to speak, your voice will convert to text. Press speaker button to listen.',
      steps: [
        language === 'hi' ? '1. माइक बटन दबाएं' : '1. Press mic button',
        language === 'hi' ? '2. स्पष्ट आवाज़ में बोलें' : '2. Speak clearly',
        language === 'hi' ? '3. जवाब सुनें' : '3. Listen to answer',
        language === 'hi' ? '4. स्पीकर से सुनें' : '4. Listen via speaker'
      ]
    }
  ];

  const faqItems = [
    {
      question: language === 'hi' ? 'कार्बन क्रेडिट्स क्या हैं?' : 'What are carbon credits?',
      answer: language === 'hi' 
        ? 'कार्बन क्रेडिट्स पर्यावरण की रक्षा के लिए मिलने वाले पैसे हैं। जब आप पेड़ लगाते हैं या टिकाऊ खेती करते हैं, तो आपको कार्बन क्रेडिट्स मिलते हैं जिन्हें बेचकर पैसे कमा सकते हैं।'
        : 'Carbon credits are payments for protecting the environment. When you plant trees or do sustainable farming, you get carbon credits that can be sold for money.'
    },
    {
      question: language === 'hi' ? 'कितने पैसे मिल सकते हैं?' : 'How much money can I earn?',
      answer: language === 'hi'
        ? 'धान की खेती से 3.5 टन/एकड़/वर्ष और कृषि वानिकी से 7.2 टन/एकड़/वर्ष कार्बन क्रेडिट्स मिलते हैं। वर्तमान दर ₹1500 प्रति टन है। 2 एकड़ धान से सालाना ₹10,500 कमा सकते हैं।'
        : 'Rice farming gives 3.5 tons/acre/year and agroforestry gives 7.2 tons/acre/year. Current rate is ₹1500 per ton. You can earn ₹10,500 annually from 2 acres of rice.'
    },
    {
      question: language === 'hi' ? 'क्या यह सुरक्षित है?' : 'Is this safe?',
      answer: language === 'hi'
        ? 'हां, यह पूरी तरह सुरक्षित है। हमारा सिस्टम ब्लॉकचेन तकनीक का उपयोग करता है जो पारदर्शी और सुरक्षित है। आपका डेटा एन्क्रिप्टेड रहता है।'
        : 'Yes, it is completely safe. Our system uses blockchain technology which is transparent and secure. Your data remains encrypted.'
    },
    {
      question: language === 'hi' ? 'पेमेंट कब मिलेगी?' : 'When will I get payment?',
      answer: language === 'hi'
        ? 'हर 3 महीने में आपको पेमेंट मिलेगी। पेमेंट सीधे आपके बैंक अकाउंट में UPI या NEFT के जरिए आएगी।'
        : 'You will receive payment every 3 months. Payment comes directly to your bank account via UPI or NEFT.'
    }
  ];

  const tutorials = [
    {
      title: language === 'hi' ? '🎥 प्रोजेक्ट रजिस्ट्रेशन गाइड' : '🎥 Project Registration Guide',
      description: language === 'hi' ? 'अपना प्रोजेक्ट रजिस्टर करने की पूरी प्रक्रिया' : 'Complete process to register your project',
      steps: [
        language === 'hi' ? 'हरा "नया प्रोजेक्ट जोड़ें" बटन दबाएं' : 'Click green "Add New Project" button',
        language === 'hi' ? 'अपने खेत का नाम और फसल का प्रकार चुनें' : 'Enter farm name and select crop type',
        language === 'hi' ? 'स्थान और क्षेत्रफल की जानकारी भरें' : 'Fill location and area information',
        language === 'hi' ? 'खेत की तस्वीरें लें या गैलरी से चुनें' : 'Take farm photos or choose from gallery',
        language === 'hi' ? '"प्रोजेक्ट जोड़ें" बटन दबाकर पूरा करें' : 'Complete by clicking "Add Project" button'
      ]
    },
    {
      title: language === 'hi' ? '📱 मोबाइल ऐप का उपयोग' : '📱 Mobile App Usage',
      description: language === 'hi' ? 'वेबसाइट की सभी सुविधाओं का उपयोग करना सीखें' : 'Learn to use all website features',
      steps: [
        language === 'hi' ? 'वेबसाइट खोलें और अकाउंट बनाएं' : 'Open website and create account',
        language === 'hi' ? 'अपनी भाषा चुनें और प्रोफाइल सेट करें' : 'Choose language and set up profile',
        language === 'hi' ? 'कैमरा और लोकेशन की अनुमति दें' : 'Allow camera and location permissions',
        language === 'hi' ? 'वॉइस असिस्टेंट का उपयोग करना सीखें' : 'Learn to use voice assistant',
        language === 'hi' ? 'नियमित अपडेट और फोटो अपलोड करें' : 'Regular updates and photo uploads'
      ]
    },
    {
      title: language === 'hi' ? '💰 पेमेंट प्रक्रिया' : '💰 Payment Process',
      description: language === 'hi' ? 'कार्बन क्रेडिट्स कैसे बेचें और पैसे कैसे पाएं' : 'How to sell carbon credits and receive money',
      steps: [
        language === 'hi' ? 'प्रोजेक्ट को 3 महीने तक सक्रिय रखें' : 'Keep project active for 3 months',
        language === 'hi' ? 'मासिक डेटा और फोटो अपडेट करें' : 'Update monthly data and photos',
        language === 'hi' ? 'कार्बन क्रेडिट्स की गणना होगी' : 'Carbon credits will be calculated',
        language === 'hi' ? 'बैंक अकाउंट की जानकारी दें' : 'Provide bank account details',
        language === 'hi' ? 'UPI/NEFT से पेमेंट प्राप्त करें' : 'Receive payment via UPI/NEFT'
      ]
    },
    {
      title: language === 'hi' ? '🌱 सस्टेनेबल फार्मिंग टिप्स' : '🌱 Sustainable Farming Tips',
      description: language === 'hi' ? 'अधिक कार्बन क्रेडिट्स के लिए बेहतर खेती के तरीके' : 'Better farming methods for more carbon credits',
      steps: [
        language === 'hi' ? 'जैविक खाद का उपयोग करें' : 'Use organic fertilizers',
        language === 'hi' ? 'कवर क्रॉप्स लगाएं' : 'Plant cover crops',
        language === 'hi' ? 'पानी की बचत करें' : 'Conserve water',
        language === 'hi' ? 'मिट्टी की जांच नियमित करें' : 'Regular soil testing',
        language === 'hi' ? 'पेड़ लगाकर वानिकी करें' : 'Plant trees for agroforestry'
      ]
    }
  ];

  const quickLinks = [
    { key: 'footer.about', href: '#about', onClick: () => setShowAboutUs(true) },
    { key: 'footer.contact', href: '#contact', onClick: () => setShowContact(true) },
    { key: 'footer.privacy', href: '#privacy', onClick: () => setShowPrivacyPolicy(true) },
    { key: 'footer.terms', href: '#terms', onClick: () => setShowTerms(true) }
  ];

  const supportLinks = [
    { key: 'footer.support', href: '#support', onClick: () => setShowSupport(true) },
    { key: 'footer.faq', href: '#faq', onClick: () => setShowFAQ(true) },
    { key: language === 'hi' ? 'सहायता केंद्र' : 'Help Center', href: '#help', onClick: () => setShowHelpCenter(true) },
    { key: language === 'hi' ? 'ट्यूटोरियल' : 'Tutorials', href: '#tutorials', onClick: () => setShowTutorials(true) }
  ];

  const socialLinks = [
    { 
      icon: <Facebook className="h-5 w-5" />, 
      url: 'https://facebook.com/innovativemind.tech',
      name: 'Facebook'
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      url: 'https://twitter.com/innovativemind_tech',
      name: 'Twitter'
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      url: 'https://instagram.com/innovativemind.tech',
      name: 'Instagram'
    },
    { 
      icon: <Youtube className="h-5 w-5" />, 
      url: 'https://youtube.com/@innovativemind.tech',
      name: 'YouTube'
    }
  ];

  return (
    <>
      <footer className="bg-gradient-to-br from-green-800 via-emerald-800 to-teal-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-8xl">🌱</div>
          <div className="absolute top-20 right-20 text-6xl">🌾</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🌳</div>
          <div className="absolute bottom-20 right-10 text-5xl">🍃</div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('footer.company')}</h3>
                  <p className="text-green-200 text-sm">{t('footer.tagline')}</p>
                </div>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">
                {language === 'hi' 
                  ? 'भारतीय किसानों के लिए सबसे आसान और भरोसेमंद कार्बन क्रेडिट प्लेटफॉर्म। हमारा मिशन है छोटे किसानों को कार्बन मार्केट से जोड़ना।'
                  : 'The most trusted and easy-to-use carbon credit platform for Indian farmers. Our mission is to connect smallholder farmers with carbon markets.'
                }
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors transform hover:scale-110"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick}
                      className="text-green-200 hover:text-white transition-colors text-sm flex items-center space-x-2 hover:translate-x-1 transform transition-transform"
                    >
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      <span>{t(link.key)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {language === 'hi' ? 'सहायता' : 'Support'}
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick}
                      className="text-green-200 hover:text-white transition-colors text-sm flex items-center space-x-2 hover:translate-x-1 transform transition-transform"
                    >
                      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                      <span>{typeof link.key === 'string' && link.key.includes('.') ? t(link.key) : link.key}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4">
                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Info'}
              </h4>
              <div className="space-y-3">
                <a 
                  href="tel:+916246789012"
                  className="flex items-center space-x-3 text-green-200 hover:text-white transition-colors group"
                >
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-green-300">{language === 'hi' ? 'कृषि हेल्पलाइन' : 'Agriculture Helpline'}</p>
                    <p className="text-sm font-medium">+91 6246-×××-×××</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:support@innovativemind.in"
                  className="flex items-center space-x-3 text-green-200 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@innovativemind.in</span>
                </a>
                <div className="flex items-start space-x-3 text-green-200">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">
                    {language === 'hi' 
                      ? 'कोलकाता, पश्चिम बंगाल, भारत' 
                      : 'Kolkata, West Bengal, India'
                    }
                  </span>
                </div>
              </div>

              {/* App Download */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-3">
                  {language === 'hi' ? '📱 वेब एप्लिकेशन' : '📱 Web Application'}
                </h5>
                <p className="text-purple-700 text-sm mb-3">
                  {language === 'hi' 
                    ? 'यह एक वेब-आधारित एप्लिकेशन है जो सभी डिवाइसेस पर काम करती है'
                    : 'This is a web-based application that works on all devices'
                  }
                </p>
                <div className="flex space-x-2">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-xs transition-colors"
                  >
                    Google Play
                  </a>
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-colors"
                  >
                    App Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-green-200 text-sm text-center md:text-left">
                {t('footer.rights')}
              </p>
              <div className="flex items-center space-x-6 text-sm text-green-200">
                <button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'गोपनीयता' : 'Privacy'}
                </button>
                <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'नियम' : 'Terms'}
                </button>
                <a href="#cookies" className="hover:text-white transition-colors">
                  {language === 'hi' ? 'कुकीज़' : 'Cookies'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"></div>
      </footer>

      {/* About Us Modal */}
      {showAboutUs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8" />
                  <div>
                    <h3 className="text-2xl font-bold">
                      {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                    </h3>
                    <p className="text-green-100">
                      {language === 'hi' ? 'Innovative Mind टीम' : 'Innovative Mind Team'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAboutUs(false)}
                  className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  {language === 'hi' ? '🌱 हमारी टीम' : '🌱 Our Team'}
                </h4>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {language === 'hi'
                    ? 'हम तीन इंजीनियरिंग छात्र हैं जो भारतीय किसानों के लिए कार्बन क्रेडिट तकनीक बना रहे हैं।'
                    : 'We are three engineering students building carbon credit technology for Indian farmers.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 text-center hover:shadow-lg transition-all transform hover:scale-105">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {member.name.charAt(0)}
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h5>
                    <p className="text-green-600 font-medium text-sm mb-2">{member.department}</p>
                    <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{member.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
                <h5 className="text-lg font-bold text-green-800 mb-3">
                  {language === 'hi' ? '🎯 हमारा मिशन' : '🎯 Our Mission'}
                </h5>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'hi'
                    ? 'हमारा लक्ष्य है भारत के छोटे किसानों को कार्बन मार्केट से जोड़ना और उन्हें अतिरिक्त आय प्रदान करना। हम तकनीक का उपयोग करके पर्यावरण संरक्षण और किसान कल्याण दोनों को बढ़ावा देते हैं।'
                    : 'Our goal is to connect India\'s small farmers with carbon markets and provide them additional income. We use technology to promote both environmental conservation and farmer welfare.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'सहायता' : 'Support'}</h3>
                <button onClick={() => setShowSupport(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">{language === 'hi' ? 'तकनीकी सहायता' : 'Technical Support'}</h4>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">{language === 'hi' ? 'ईमेल सहायता' : 'Email Support'}</p>
                    <a href="mailto:support@innovativemind.in" className="text-blue-600">support@innovativemind.in</a>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">{language === 'hi' ? 'फोन सहायता' : 'Phone Support'}</p>
                    <a href="tel:+916246789012" className="text-green-600">+91 6246-×××-×××</a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">{language === 'hi' ? 'सामान्य सहायता' : 'General Help'}</h4>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">{language === 'hi' ? 'कार्यालय पता' : 'Office Address'}</p>
                    <p className="text-purple-600">{language === 'hi' ? 'कोलकाता, पश्चिम बंगाल' : 'Kolkata, West Bengal'}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800">{language === 'hi' ? 'कार्य समय' : 'Working Hours'}</p>
                    <p className="text-yellow-600">{language === 'hi' ? 'सोमवार - शुक्रवार: 9:00 - 18:00' : 'Monday - Friday: 9:00 - 18:00'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'सामान्य प्रश्न' : 'Frequently Asked Questions'}</h3>
                <button onClick={() => setShowFAQ(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h5 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h5>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorials Modal */}
      {showTutorials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'ट्यूटोरियल' : 'Tutorials'}</h3>
                <button onClick={() => setShowTutorials(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                    <h5 className="text-lg font-bold text-gray-800 mb-2">{tutorial.title}</h5>
                    <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {tutorial.steps && tutorial.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-2 mb-2">
                          <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Center Modal */}
      {showHelpCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-8 w-8" />
                  <div>
                    <h3 className="text-2xl font-bold">
                      {language === 'hi' ? 'सहायता केंद्र' : 'Help Center'}
                    </h3>
                    <p className="text-blue-100">
                      {language === 'hi' ? 'उपयोगी टिप्स और गाइड' : 'Useful tips and guides'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHelpCenter(false)}
                  className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {helpTips.map((tip, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                    <h5 className="text-lg font-bold text-gray-800 mb-3">{tip.title}</h5>
                    <p className="text-gray-700 leading-relaxed mb-4">{tip.content}</p>
                    <div className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
                <h5 className="text-lg font-bold text-green-800 mb-3">
                  {language === 'hi' ? '📞 और सहायता चाहिए?' : '📞 Need More Help?'}
                </h5>
                <p className="text-gray-700 mb-4">
                  {language === 'hi'
                    ? 'हमारी सहायता टीम से संपर्क करें। हम सभी भारतीय भाषाओं में सहायता प्रदान करते हैं।'
                    : 'Contact our support team. We provide assistance in all Indian languages.'
                  }
                </p>
                <a
                  href="tel:+916246789012"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 6246-789-012</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'संपर्क करें' : 'Contact Us'}</h3>
                <button onClick={() => setShowContact(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">{language === 'hi' ? 'संपर्क विवरण' : 'Contact Details'}</h4>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">{language === 'hi' ? 'कृषि हेल्पलाइन' : 'Agriculture Helpline'}</p>
                    <a href="tel:+916246789012" className="text-green-600 font-bold">+91 6246-789-012</a>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">{language === 'hi' ? 'ईमेल सहायता' : 'Email Support'}</p>
                    <a href="mailto:support@innovativemind.in" className="text-blue-600">support@innovativemind.in</a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800">{language === 'hi' ? 'कार्यालय पता' : 'Office Address'}</h4>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">{language === 'hi' ? 'मुख्य कार्यालय' : 'Head Office'}</p>
                    <p className="text-purple-600">{language === 'hi' ? 'कोलकाता, पश्चिम बंगाल, भारत' : 'Kolkata, West Bengal, India'}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800">{language === 'hi' ? 'कार्य समय' : 'Working Hours'}</p>
                    <p className="text-yellow-600">{language === 'hi' ? 'सोमवार - शुक्रवार: 9:00 - 18:00' : 'Monday - Friday: 9:00 - 18:00'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</h3>
                <button onClick={() => setShowPrivacyPolicy(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {language === 'hi'
                    ? 'हम आपकी व्यक्तिगत जानकारी की सुरक्षा को गंभीरता से लेते हैं। आपका डेटा केवल कार्बन क्रेडिट गणना और भुगतान के लिए उपयोग किया जाता है।'
                    : 'We take the security of your personal information seriously. Your data is only used for carbon credit calculation and payments.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">{language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}</h3>
                <button onClick={() => setShowTerms(false)} className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {language === 'hi'
                    ? 'इस प्लेटफॉर्म का उपयोग करके आप हमारी नियम और शर्तों से सहमत होते हैं। कार्बन क्रेडिट्स की गणना वैज्ञानिक तरीकों पर आधारित है।'
                    : 'By using this platform, you agree to our terms and conditions. Carbon credit calculations are based on scientific methods.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;