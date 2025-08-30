import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  const quickLinks = [
    { key: 'footer.about', href: '#about' },
    { key: 'footer.contact', href: '#contact' },
    { key: 'footer.privacy', href: '#privacy' },
    { key: 'footer.terms', href: '#terms' }
  ];

  const supportLinks = [
    { key: 'footer.support', href: '#support' },
    { key: 'footer.faq', href: '#faq' },
    { key: 'Help Center', href: '#help' },
    { key: language === 'hi' ? 'ट्यूटोरियल' : 'Tutorials', href: '#tutorials' }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-800 via-emerald-800 to-teal-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
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
                  <a
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center space-x-2 hover:translate-x-1 transform transition-transform"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    <span>{t(link.key)}</span>
                  </a>
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
                  <a
                    href={link.href}
                    className="text-green-200 hover:text-white transition-colors text-sm flex items-center space-x-2 hover:translate-x-1 transform transition-transform"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    <span>{typeof link.key === 'string' && link.key.includes('.') ? t(link.key) : link.key}</span>
                  </a>
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
              <div className="flex items-center space-x-3 text-green-200">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-green-200">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@innovativemind.in</span>
              </div>
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
                  href="#"
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
                  href="#"
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
  );
};

export default Footer;