import React, { useState, useRef } from 'react';
import { X, Camera, Image, MapPin, Wheat, Trees, FileText, Upload, CheckCircle } from 'lucide-react';
import { Project } from '../types/Project';
import { useLanguage } from '../contexts/LanguageContext';
import CameraCapture from './CameraCapture';

interface AddProjectModalProps {
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id'>) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onSubmit }) => {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    area: '',
    location: '',
    description: '',
    photos: [] as string[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, result]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCameraCapture = (photo: string) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, photo]
    }));
    setShowCamera(false);
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    const project: Omit<Project, 'id'> = {
      name: formData.name,
      type: formData.type as 'rice' | 'agroforestry',
      area: parseFloat(formData.area),
      location: formData.location,
      status: 'pending',
      carbonCredits: parseFloat(formData.area) * (formData.type === 'rice' ? 3.5 : 7.2),
      lastUpdated: new Date(),
      photos: formData.photos,
      description: formData.description
    };
    onSubmit(project);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return formData.name && formData.type;
      case 2: return formData.area && formData.location;
      case 3: return true; // Photos are optional
      default: return false;
    }
  };

  const stepTitles = [
    language === 'hi' ? 'बुनियादी जानकारी' : 'Basic Information',
    language === 'hi' ? 'स्थान और क्षेत्रफल' : 'Location & Area',
    language === 'hi' ? 'तस्वीरें जोड़ें' : 'Add Photos'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-6xl">🌱</div>
              <div className="absolute bottom-4 right-4 text-4xl">🌾</div>
              <div className="absolute top-8 right-8 text-3xl">🌳</div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{t('modal.title')}</h2>
                  <p className="text-green-100">{t('modal.subtitle')}</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center mt-6 space-x-2">
                {[1, 2, 3].map(step => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        currentStep >= step 
                          ? 'bg-white text-green-600 shadow-lg' 
                          : 'bg-green-400 text-white'
                      }`}>
                        {isStepComplete(step) && currentStep > step ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          step
                        )}
                      </div>
                      <span className="text-xs text-green-100 mt-1 text-center max-w-[80px]">
                        {stepTitles[step - 1]}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                        currentStep > step ? 'bg-white' : 'bg-green-400'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.projectName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none text-lg transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'hi' ? 'जैसे: राम का धान का खेत' : 'e.g., Ram\'s Rice Farm'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    {t('modal.cropType')} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleInputChange('type', 'rice')}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        formData.type === 'rice'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900 shadow-lg'
                          : 'border-gray-200 dark:border-gray-600 hover:border-green-300 hover:shadow-md bg-white dark:bg-gray-700'
                      }`}
                    >
                      <Wheat className="h-12 w-12 mx-auto mb-3 text-amber-600" />
                      <h4 className="font-bold text-gray-800 dark:text-white">{t('modal.rice')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'hi' ? '3.5 टन CO₂/एकड़/वर्ष' : '3.5 tons CO₂/acre/year'}
                      </p>
                    </button>
                    
                    <button
                      onClick={() => handleInputChange('type', 'agroforestry')}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        formData.type === 'agroforestry'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900 shadow-lg'
                          : 'border-gray-200 dark:border-gray-600 hover:border-green-300 hover:shadow-md bg-white dark:bg-gray-700'
                      }`}
                    >
                      <Trees className="h-12 w-12 mx-auto mb-3 text-green-600" />
                      <h4 className="font-bold text-gray-800 dark:text-white">{t('modal.agroforestry')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'hi' ? '7.2 टन CO₂/एकड़/वर्ष' : '7.2 tons CO₂/acre/year'}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Area */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1 text-green-600" />
                    {t('modal.location')} *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none text-lg transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'hi' ? 'जैसे: मुजफ्फरनगर, उत्तर प्रदेश' : 'e.g., Muzaffarnagar, Uttar Pradesh'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.area')} *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none text-lg transition-colors pr-16 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="2.5"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                      {language === 'hi' ? 'एकड़' : 'acres'}
                    </span>
                  </div>
                  {formData.area && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      {language === 'hi' ? 'अनुमानित वार्षिक क्रेडिट्स:' : 'Estimated annual credits:'} {' '}
                      {(parseFloat(formData.area) * (formData.type === 'rice' ? 3.5 : 7.2)).toFixed(1)} टन CO₂
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="inline h-4 w-4 mr-1 text-blue-600" />
                    {language === 'hi' ? 'अतिरिक्त विवरण (वैकल्पिक)' : 'Additional Details (Optional)'}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-green-500 focus:outline-none text-lg h-24 resize-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={language === 'hi' ? 'अपने खेत के बारे में कुछ और बताएं...' : 'Tell us more about your farm...'}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t('modal.photos')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'hi' 
                      ? 'अपने खेत की तस्वीरें लें या गैलरी से चुनें (वैकल्पिक)' 
                      : 'Take photos of your farm or choose from gallery (optional)'
                    }
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowCamera(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center space-y-3 shadow-lg"
                  >
                    <Camera className="h-12 w-12" />
                    <span className="font-medium">{t('modal.camera')}</span>
                    <span className="text-xs text-blue-100">
                      {language === 'hi' ? 'तुरंत फोटो लें' : 'Take photo instantly'}
                    </span>
                  </button>
                  
                  <button
                    onClick={openGallery}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center space-y-3 shadow-lg"
                  >
                    <Image className="h-12 w-12" />
                    <span className="font-medium">{t('modal.gallery')}</span>
                    <span className="text-xs text-purple-100">
                      {language === 'hi' ? 'गैलरी से चुनें' : 'Choose from gallery'}
                    </span>
                  </button>
                </div>

                {/* Photo Preview */}
                {formData.photos.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      {language === 'hi' ? 'चुनी गई तस्वीरें:' : 'Selected Photos:'}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Farm photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600 group-hover:border-green-300 transition-colors"
                          />
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Tips */}
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                    {language === 'hi' ? '📸 फोटो टिप्स:' : '📸 Photo Tips:'}
                  </h5>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• {language === 'hi' ? 'खेत का पूरा दृश्य लें' : 'Take full view of the farm'}</li>
                    <li>• {language === 'hi' ? 'फसल की स्पष्ट तस्वीर लें' : 'Clear photos of crops'}</li>
                    <li>• {language === 'hi' ? 'दिन के उजाले में फोटो लें' : 'Take photos in daylight'}</li>
                  </ul>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t dark:border-gray-600">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                {currentStep === 1 ? t('modal.cancel') : t('modal.previous')}
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete(currentStep)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all transform ${
                    isStepComplete(currentStep)
                      ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('modal.next')}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  {t('modal.submit')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
};

export default AddProjectModal;