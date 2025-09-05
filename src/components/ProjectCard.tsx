import React, { useState } from 'react';
import { Calendar, MapPin, Coins, MoreVertical, TrendingUp, BarChart3 } from 'lucide-react';
import { Project } from '../types/Project';
import { useLanguage } from '../contexts/LanguageContext';
import ProjectDetailModal from './ProjectDetailModal';
import MapModal from './MapModal';
import DateTimePicker from './DateTimePicker';

interface ProjectCardProps {
  project: Project;
  onUpdate?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onUpdate, onDelete }) => {
  const { language, t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return t(`status.${status}`);
  };

  const getCropIcon = (type: string) => {
    if (type === 'rice') return '🌾';
    if (type === 'agroforestry') return '🌳';
    return '🌱';
  };

  const handleDateUpdate = (date: Date) => {
    if (onUpdate) {
      onUpdate({ ...project, lastUpdated: date });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(project.id);
      alert(language === 'hi' ? 'प्रोजेक्ट सफलतापूर्वक हटा दिया गया!' : 'Project deleted successfully!');
    }
    setShowDeleteConfirm(false);
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
        {/* Header with gradient and crop icon */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-3xl">{getCropIcon(project.type)}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{project.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-colors relative"
              >
                <MoreVertical className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl z-10 min-w-[180px] border">
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors text-sm flex items-center space-x-2"
              >
                <span>🗑️</span>
                {language === 'hi' ? 'प्रोजेक्ट हटाएं' : 'Delete Project'}
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Location with clickable map */}
          <button
            onClick={() => setShowMap(true)}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4 group"
          >
            <MapPin className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm underline decoration-dotted">{project.location}</span>
          </button>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border">
              <p className="text-xs text-gray-500 mb-1">
                {language === 'hi' ? 'क्षेत्रफल' : 'Area'}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {project.area} {language === 'hi' ? 'एकड़' : 'acres'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
              <p className="text-xs text-green-600 mb-1">
                {language === 'hi' ? 'कार्बन क्रेडिट्स' : 'Carbon Credits'}
              </p>
              <p className="text-lg font-bold text-green-700 flex items-center">
                <Coins className="h-4 w-4 mr-1" />
                {project.carbonCredits.toFixed(1)}
              </p>
            </div>
          </div>

          {/* Income Estimate */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-200 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-700 font-medium">
                  {language === 'hi' ? 'अनुमानित म��सिक आय' : 'Estimated Monthly Income'}
                </p>
                <p className="text-lg font-bold text-yellow-800">
                  ₹{Math.round(project.carbonCredits * 1500 / 12).toLocaleString('hi-IN')}
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          
          {/* Last Updated with clickable date */}
          <button
            onClick={() => setShowDatePicker(true)}
            className="flex items-center text-gray-500 text-xs mb-4 hover:text-green-600 transition-colors group"
          >
            <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            <span className="underline decoration-dotted">
              {language === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'} {project.lastUpdated.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </span>
          </button>
          
          {/* Action Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <BarChart3 className="h-5 w-5" />
            <span>{language === 'hi' ? 'विवरण और ग्राफ देखें' : 'View Details & Graphs'}</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDetails && (
        <ProjectDetailModal
          project={project}
          onClose={() => setShowDetails(false)}
          onUpdate={onUpdate}
        />
      )}

      {showMap && (
        <MapModal
          location={project.location}
          onClose={() => setShowMap(false)}
        />
      )}

      {showDatePicker && (
        <DateTimePicker
          initialDate={project.lastUpdated}
          onSelect={handleDateUpdate}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
              <h3 className="text-xl font-bold">{language === 'hi' ? 'प्रोजेक्ट हटाएं?' : 'Delete Project?'}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                {language === 'hi' 
                  ? 'क्या आ�� वाकई इस प्रोजेक्ट को हटाना चाहते हैं? यह क्रिया वापस नहीं की जा सकती।'
                  : 'Are you sure you want to delete this project? This action cannot be undone.'
                }
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  {language === 'hi' ? 'हटाएं' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
