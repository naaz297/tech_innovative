import React, { useState } from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Users, HelpCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  const teamMembers = [
    {
      name: 'Naaz',
      department: 'B.Tech CSE',
      role: language === 'hi' ? 'मुख्य डेवलपर' : 'Lead Developer',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Noor', 
      department: 'B.Tech EEN',
      role: language === 'hi' ? 'इलेक्ट्रॉनिक्स इंजीनियर' : 'Electronics Engineer',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Adiba',
      department: 'B.Tech CSE', 
      role: language === 'hi' ? 'सॉफ्टवेयर इंजीनियर' : 'Software Engineer',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const helpTips = [
    {
      title: language === 'hi' ? '🌾 प्रोजेक्ट कैसे जोड़ें?' : '🌾 How to Add Project?',
      content: language === 'hi' 
        ? 'ऊपर "नया प्रोजेक्ट जोड़ें" बटन दबाएं, अपने खेत की जानकारी भरें, तस्वीरें लें और सबमिट करें।'
        : 'Click "Add New Project" button, fill your farm details, take photos and submit.'
    },
    {
      title: language === 'hi' ? '📸 तस्वीरें कैसे लें?' : '📸 How to Take Photos?',
      content: language === 'hi'
        ? 'कैमरा बटन दबाएं, खेत को फ्रेम के बीच में रखें, और कैप्चर बटन दबाएं। अच्छी रोशनी में फोटो लें।'
        : 'Press camera button, keep farm in center of frame, and press capture. Take photos in good lighting.'
    },
    {
      title: language === 'hi' ? '💰 पैसे कैसे कमाएं?' : '💰 How to Earn Money?',
      content: language === 'hi'
        ? 'अपना प्रोजेक्ट रजिस्टर करें, नियमित अपडेट दें, कार्बन क्रेडिट्स कमाएं और उन्हें बेचकर पैसे कमाएं।'
        : 'Register your project, give regular updates, earn carbon credits and sell them to earn money.'
    },
    {
      title: language === 'hi' ? '🗺️ मैप कैसे देखें?' : '🗺️ How to View Map?',
      content: language === 'hi'
        ? 'किसी भी प्रोजेक्ट कार्ड पर लोकेशन पर क्लिक करें या "मैप देखें" बटन दबाएं।'
        : 'Click on location in any project card or press "View Map" button.'
    },
    {
      title: language === 'hi' ? '🔊 आवाज़ की सुविधा' : '🔊 Voice Feature',
      content: language === 'hi'
        ? 'माइक बटन दबाकर बोलें, आपकी आवाज़ टेक्स्ट में बदल जाएगी। स्पीकर बटन दबाकर सुनें।'
        : 'Press mic button to speak, your voice will convert to text. Press speaker button to listen.'
    }
  ];

  const quickLinks = [
    { key: 'footer.about', href: '#about', onClick: () => setShowAboutUs(true) },
    { key: 'footer.contact', href: '#contact' },
    { key: 'footer.privacy', href: '#privacy' },
    { key: 'footer.terms', href: '#terms' }
  ];

  const supportLinks = [
    { key: 'footer.support', href: '#support' },
    { key: 'footer.faq', href: '#faq' },
    { key: 'Help Center', href: '#help', onClick: () => setShowHelpCenter(true) },
    { key: language === 'hi' ? 'ट्यूटोरियल' : 'Tutorials', href: '#tutorials' }
  ];

  const socialLinks = [
    { 
      icon: <Facebook className="h-5 w-5" />, 
      url: 'https://facebook.com/innovativemind',
      name: 'Facebook'
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      url: 'https://twitter.com/innovativemind',
      name: 'Twitter'
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      url: 'https://instagram.com/innovativemind',
      name: 'Instagram'
    },
    { 
      icon: <Youtube className="h-5 w-5" />, 
      url: 'https://youtube.com/@innovativemind',
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
                  className="flex items-center space-x-3 text-green-200 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 6246-789-012</span>
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
                      ? 'नई दिल्ली, भारत' 
                      : 'New Delhi, India'
                    }
                  </span>
                </div>
              </div>

              {/* App Download */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">
                  {language === 'hi' ? 'मोबाइल ऐप डाउनलोड करें:' : 'Download Mobile App:'}
                </p>
                <div className="space-y-2">
                  <a
                    href="https://apps.apple.com/app/agricarbon-mrv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black bg-opacity-30 hover:bg-opacity-40 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-xs">
                        <p className="text-green-200">Download on the</p>
                        <p className="font-bold">App Store</p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.innovativemind.agricarbon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black bg-opacity-30 hover:bg-opacity-40 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-xs">
                        <p className="text-green-200">Get it on</p>
                        <p className="font-bold">Google Play</p>
                      </div>
                    </div>
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
                <a href="#privacy" className="hover:text-white transition-colors">
                  {language === 'hi' ? 'गोपनीयता' : 'Privacy'}
                </a>
                <a href="#terms" className="hover:text-white transition-colors">
                  {language === 'hi' ? 'नियम' : 'Terms'}
                </a>
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
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                    />
                    <h5 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h5>
                    <p className="text-green-600 font-medium text-sm mb-2">{member.department}</p>
                    <p className="text-gray-600 text-sm">{member.role}</p>
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

      {/* Help Center Modal */}
      {showHelpCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
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
                    <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
                <h5 className="text-lg font-bold text-green-800 mb-3">
                  {language === 'hi' ? '📞 और सहायता चाहिए?' : '📞 Need More Help?'}
                </h5>
                <p className="text-gray-700 mb-4">
                  {language === 'hi'
                    ? 'हमारी सहायता टीम से संपर्क करें। हम हिंदी और अंग्रेजी दोनों में सहायता प्रदान करते हैं।'
                    : 'Contact our support team. We provide assistance in both Hindi and English.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+916246789012"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{language === 'hi' ? 'कॉल करें' : 'Call Us'}</span>
                  </a>
                  <a
                    href="mailto:support@innovativemind.in"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{language === 'hi' ? 'ईमेल करें' : 'Email Us'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;