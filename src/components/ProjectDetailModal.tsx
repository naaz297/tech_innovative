import React, { useState } from 'react';
import { X, MapPin, Calendar, Camera, TrendingUp, Leaf, Coins, BarChart3, Upload, Plus, Image } from 'lucide-react';
import { Project } from '../types/Project';
import { useLanguage } from '../contexts/LanguageContext';
import CameraCapture from './CameraCapture';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  onUpdate?: (project: Project) => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onUpdate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCamera, setShowCamera] = useState(false);
  const [projectPhotos, setProjectPhotos] = useState(project.photos);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (photo: string) => {
    const updatedPhotos = [...projectPhotos, photo];
    setProjectPhotos(updatedPhotos);
    if (onUpdate) {
      onUpdate({ ...project, photos: updatedPhotos });
    }
  };

  const handlePhotoDelete = (index: number) => {
    const updatedPhotos = projectPhotos.filter((_, i) => i !== index);
    setProjectPhotos(updatedPhotos);
    if (onUpdate) {
      onUpdate({ ...project, photos: updatedPhotos });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const updatedPhotos = [...projectPhotos, result];
          setProjectPhotos(updatedPhotos);
          if (onUpdate) {
            onUpdate({ ...project, photos: updatedPhotos });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Sample data for charts
  const carbonData = {
    labels: language === 'hi' ? ['जन', 'फर', 'मार', 'अप्र', 'मई', 'जून'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: language === 'hi' ? 'कार्बन क्रेडिट्स (टन)' : 'Carbon Credits (tons)',
        data: [2.1, 3.5, 4.8, 6.2, 8.1, 10.5],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const incomeData = {
    labels: language === 'hi' ? ['जन', 'फर', 'मार', 'अप्र', 'मई', 'जून'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: language === 'hi' ? 'आय (₹)' : 'Income (₹)',
        data: [3150, 5250, 7200, 9300, 12150, 15750],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const openMap = () => {
    setShowMap(true);
  };

  const getCropIcon = (type: string) => {
    if (type === 'rice') return '🌾';
    if (type === 'agroforestry') return '🌳';
    return '🌱';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'hi' ? 'सक्रिय' : 'Active';
      case 'pending': return language === 'hi' ? 'प्रतीक्षित' : 'Pending';
      case 'completed': return language === 'hi' ? 'पूर्ण' : 'Completed';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{getCropIcon(project.type)}</span>
              <div>
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                  <button
                    onClick={openMap}
                    className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{project.location}</span>
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: language === 'hi' ? 'अवलोकन' : 'Overview', icon: <Leaf className="h-4 w-4" /> },
              { id: 'analytics', label: language === 'hi' ? 'विश्लेषण' : 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'photos', label: language === 'hi' ? 'तस्वीरें' : 'Photos', icon: <Camera className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-green-500 text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        {language === 'hi' ? 'कुल क्रेडिट्स' : 'Total Credits'}
                      </p>
                      <p className="text-2xl font-bold text-green-800">{project.carbonCredits.toFixed(1)}</p>
                    </div>
                    <Coins className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        {language === 'hi' ? 'क्षेत्रफल' : 'Area'}
                      </p>
                      <p className="text-2xl font-bold text-blue-800">{project.area} {language === 'hi' ? 'एकड़' : 'acres'}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">
                        {language === 'hi' ? 'अनुमानित आय' : 'Estimated Income'}
                      </p>
                      <p className="text-2xl font-bold text-yellow-800">₹{(project.carbonCredits * 1500).toLocaleString('hi-IN')}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">
                  {language === 'hi' ? 'प्रोजेक्ट विवरण' : 'Project Details'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">{language === 'hi' ? 'फसल प्रकार:' : 'Crop Type:'}</span>
                    <span className="ml-2 font-medium">{project.type === 'rice' ? (language === 'hi' ? 'धान' : 'Rice') : (language === 'hi' ? 'कृषि वानिकी' : 'Agroforestry')}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{language === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'}</span>
                    <span className="ml-2 font-medium">{project.lastUpdated.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  {language === 'hi' ? 'कार्बन क्रेडिट्स की प्रगति' : 'Carbon Credits Progress'}
                </h4>
                <div className="bg-white p-4 rounded-lg border">
                  <Line data={carbonData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-yellow-600" />
                  {language === 'hi' ? 'मासिक आय' : 'Monthly Income'}
                </h4>
                <div className="bg-white p-4 rounded-lg border">
                  <Bar data={incomeData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800 dark:text-white">
                  {language === 'hi' ? 'खेत की तस्वीरें' : 'Farm Photos'}
                </h4>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowCamera(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Camera className="h-4 w-4" />
                    <span>{language === 'hi' ? 'कैमरा' : 'Camera'}</span>
                  </button>
                  <button 
                    onClick={openGallery}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Image className="h-4 w-4" />
                    <span>{language === 'hi' ? 'गैलरी' : 'Gallery'}</span>
                  </button>
                </div>
              </div>
              
              {projectPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {projectPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <img
                        src={photo}
                        alt={`Farm photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-green-300 transition-colors cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105"
                        onClick={() => {
                          // Open photo in full screen
                          const modal = document.createElement('div');
                          modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
                          modal.innerHTML = `
                            <div class="relative max-w-4xl max-h-full">
                              <img src="${photo}" alt="Farm photo ${index + 1}" class="max-w-full max-h-full object-contain rounded-lg">
                              <button class="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors" onclick="this.parentElement.parentElement.remove()">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </div>
                          `;
                          document.body.appendChild(modal);
                        }}
                      />
                      <button
                        onClick={() => handlePhotoDelete(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {language === 'hi' ? `फोटो ${index + 1}` : `Photo ${index + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg border-2 border-dashed border-green-300 dark:border-green-600">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'hi' ? 'कोई तस्वीरें नहीं मिलीं' : 'No photos found'}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    {language === 'hi' ? 'अपने खेत की तस्वीरें जोड़ें' : 'Add photos of your farm'}
                  </p>
                  <button 
                    onClick={() => setShowCamera(true)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{language === 'hi' ? 'पहली तस्वीर जोड़ें' : 'Add First Photo'}</span>
                  </button>
                </div>
              )}
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
              
              {/* Photo Upload Progress */}
              {projectPhotos.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-800 dark:text-blue-200 font-medium">
                      {language === 'hi' ? 'अपलोड की गई तस्वीरें' : 'Uploaded Photos'}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 text-sm">
                      {projectPhotos.length} {language === 'hi' ? 'तस्वीरें' : 'photos'}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((projectPhotos.length / 5) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {language === 'hi' 
                      ? `${5 - projectPhotos.length} और तस्वीरें जोड़ सकते हैं` 
                      : `Can add ${5 - projectPhotos.length} more photos`
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Camera Modal */}
        {showCamera && (
          <CameraCapture
            onCapture={handlePhotoCapture}
            onClose={() => setShowCamera(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailModal;