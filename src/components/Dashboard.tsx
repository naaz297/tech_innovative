import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../types/Project';
import ProjectCard from './ProjectCard';
import StatsCard from './StatsCard';
import AddProjectModal from './AddProjectModal';
import { Plus, TrendingUp, MapPin, Activity } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onDeleteProject: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onAddProject, onDeleteProject }) => {
  const { t, language } = useLanguage(); // ✅ FIXED: include language
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const totalCredits = projects.reduce((sum, project) => sum + project.carbonCredits, 0);
  const totalArea = projects.reduce((sum, project) => sum + project.area, 0);
  const activeProjects = projects.filter(project => project.status === 'active').length;

  const handleStatClick = (statType: string) => {
    setSelectedStat(statType);
  };

  const closeStatModal = () => {
    setSelectedStat(null);
  };

  const renderStatModal = () => {
    if (!selectedStat) return null;

    let content;
    switch (selectedStat) {
      case 'credits': {
        const avgCreditsPerProject = projects.length > 0 ? (totalCredits / projects.length).toFixed(1) : '0';
        const estimatedIncome = totalCredits * 50; // ₹50 per credit
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('totalCarbonCredits')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">{t('totalCredits')}</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalCredits.toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">{t('estimatedIncome')}</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹{estimatedIncome.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">{t('avgPerProject')}</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{avgCreditsPerProject}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-600 dark:text-orange-400">{t('nextPayment')}</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">15 {t('days')}</p>
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'area': {
        const avgAreaPerProject = projects.length > 0 ? (totalArea / projects.length).toFixed(1) : '0';
        const largestFarm = projects.length > 0 ? Math.max(...projects.map(p => p.area)) : 0;
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('totalArea')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">{t('totalLand')}</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalArea} {t('acres')}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">{t('avgPerAcre')}</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{avgAreaPerProject} {t('acres')}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">{t('largestFarm')}</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{largestFarm} {t('acres')}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-600 dark:text-orange-400">{t('totalVillages')}</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">12</p>
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'active': {
        const completedProjects = projects.filter(p => p.status === 'completed').length;
        const successRate = projects.length > 0 ? ((completedProjects / projects.length) * 100).toFixed(1) : '0';
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('activeProjects')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">{t('activeNow')}</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{activeProjects}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">{t('completed')}</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{completedProjects}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">{t('successRate')}</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{successRate}%</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-600 dark:text-orange-400">{t('thisMonth')}</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">+3</p>
              </div>
            </div>
          </div>
        );
        break;
      }
      default:
        content = null;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          {content}
          <button
            onClick={closeStatModal}
            className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'hi' ? 'आपका डैशबोर्ड' : 'Your Dashboard'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'hi' ? 'अपने कार्बन क्रेडिट्स और प्रोजेक्ट्स को देखें और प्रबंधित करें' : 'View and manage your carbon credits and projects'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title={t('totalCarbonCredits')}
          value={totalCredits.toLocaleString()}
          icon={<TrendingUp className="w-8 h-8" />}
          color="green"
          onClick={() => handleStatClick('credits')}
        />
        <StatsCard
          title={t('totalArea')}
          value={${totalArea} ${t('acres')}}
          icon={<MapPin className="w-8 h-8" />}
          color="blue"
          onClick={() => handleStatClick('area')}
        />
        <StatsCard
          title={t('activeProjects')}
          value={activeProjects.toString()}
          icon={<Activity className="w-8 h-8" />}
          color="purple"
          onClick={() => handleStatClick('active')}
        />
      </div>

      {/* Projects Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('yourProjects')}</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {t('addProject')}
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <MapPin className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {t('noProjectsYet')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {t('startByAddingProject')}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-lg font-medium text-lg"
          >
            <Plus className="w-5 h-5" />
            {language === 'hi' ? 'पहला प्रोजेक्ट जोड़ें' : 'Add First Project'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <AddProjectModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={onAddProject}
        />
      )}

      {/* Stats Detail Modal */}
      {renderStatModal()}
    </div>
  );
};

export default Dashboard;