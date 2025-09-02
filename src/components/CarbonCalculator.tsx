import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Leaf, DollarSign, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CarbonCalculator = () => {
  const { language } = useLanguage();
  const [cropType, setCropType] = useState('rice');
  const [area, setArea] = useState('');
  const [duration, setDuration] = useState('12');
  const [result, setResult] = useState<number | null>(null);
  const [income, setIncome] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCarbon = async () => {
    const areaNum = parseFloat(area);
    const durationNum = parseFloat(duration);
    
    if (!areaNum || !durationNum) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced carbon calculation based on crop type and Indian conditions
    let baseRate = cropType === 'rice' ? 3.5 : 7.2; // tons CO2/acre/year
    
    // Apply regional factors for Indian agriculture
    const seasonalFactor = 1.1; // Monsoon benefit
    const soilFactor = 1.05; // Indian soil conditions
    
    const totalCredits = areaNum * baseRate * (durationNum / 12) * seasonalFactor * soilFactor;
    const estimatedIncome = totalCredits * 1500; // ₹1500 per ton current market rate
    
    setResult(totalCredits);
    setIncome(estimatedIncome);
    setIsCalculating(false);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (area && duration) {
      const timer = setTimeout(() => {
        calculateCarbon();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [area, duration, cropType]);

  const getAdditionalIncomeInfo = () => {
    if (!result) return null;
    
    const monthlyIncome = (income || 0) / parseFloat(duration);
    const yearlyIncome = (income || 0) * (12 / parseFloat(duration));
    
    return {
      monthly: monthlyIncome,
      yearly: yearlyIncome,
      perAcre: (income || 0) / parseFloat(area || '1')
    };
  };

  const additionalInfo = getAdditionalIncomeInfo();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg mr-4">
          <Calculator className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {language === 'hi' ? 'कार्बन क्रेडिट कैलकुलेटर' : 'Carbon Credit Calculator'}
          </h3>
          <p className="text-gray-600">
            {language === 'hi' ? 'अपनी संभावित आय का अनुमान लगाएं' : 'Estimate your potential income'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'फसल प्रकार' : 'Crop Type'}
          </label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="rice">{language === 'hi' ? '🌾 धान/चावल (3.5 टन/एकड़/वर्ष)' : '🌾 Rice (3.5 tons/acre/year)'}</option>
            <option value="agroforestry">{language === 'hi' ? '🌳 कृषि वानिकी (7.2 टन/एकड़/वर्ष)' : '🌳 Agroforestry (7.2 tons/acre/year)'}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'क्षेत्रफल (एकड़)' : 'Area (acres)'}
          </label>
          <input
            type="number"
            step="0.1"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
            placeholder="2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'अवधि (महीने)' : 'Duration (months)'}
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
          >
            <option value="6">{language === 'hi' ? '6 महीने' : '6 months'}</option>
            <option value="12">{language === 'hi' ? '1 साल' : '1 year'}</option>
            <option value="24">{language === 'hi' ? '2 साल' : '2 years'}</option>
            <option value="36">{language === 'hi' ? '3 साल' : '3 years'}</option>
          </select>
        </div>

        <button
          onClick={calculateCarbon}
          disabled={isCalculating || !area}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{language === 'hi' ? 'गणना हो रही है...' : 'Calculating...'}</span>
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              <span>{language === 'hi' ? '💰 गणना करें' : '💰 Calculate'}</span>
            </>
          )}
        </button>

        {result !== null && !isCalculating && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mt-4 space-y-4">
            {/* Main Result */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <span className="font-medium text-green-800">
                  {language === 'hi' ? 'कार्बन क्रेडिट्स' : 'Carbon Credits'}
                </span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-3">
                {result.toFixed(1)} {language === 'hi' ? 'टन CO₂' : 'tons CO₂'}
              </div>
              <div className="flex items-center justify-center text-green-700 bg-white rounded-lg p-3 shadow-sm">
                <DollarSign className="h-5 w-5 mr-1" />
                <span className="font-bold">
                  {language === 'hi' ? 'कुल आय:' : 'Total Income:'} ₹{(income || 0).toLocaleString('hi-IN')}
                </span>
              </div>
            </div>

            {/* Additional Income Breakdown */}
            {additionalInfo && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-xs text-gray-600">{language === 'hi' ? 'मासिक आय' : 'Monthly'}</p>
                  <p className="font-bold text-green-600">₹{Math.round(additionalInfo.monthly).toLocaleString('hi-IN')}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-xs text-gray-600">{language === 'hi' ? 'वार्षिक आय' : 'Yearly'}</p>
                  <p className="font-bold text-blue-600">₹{Math.round(additionalInfo.yearly).toLocaleString('hi-IN')}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <p className="text-xs text-gray-600">{language === 'hi' ? 'प्रति एकड़' : 'Per Acre'}</p>
                  <p className="font-bold text-purple-600">₹{Math.round(additionalInfo.perAcre).toLocaleString('hi-IN')}</p>
                </div>
              </div>
            )}

            <p className="text-xs text-green-600 text-center">
              {language === 'hi' ? '* वर्तमान बाजार दर ₹1500/टन के अनुसार' : '* Based on current market rate ₹1500/ton'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonCalculator;