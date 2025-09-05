import React, { useState } from 'react';
import { Plus, TrendingUp, Coins, MapPin } from 'lucide-react';
import ProjectCard from './ProjectCard';
import StatsCard from './StatsCard';
import { Project } from '../types/Project';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  projects: Project[];
  onAddProject: () => void;
  onUpdateProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onAddProject, onUpdateProject, onDeleteProject }) => {
  const { language, t } = useLanguage();
  
  const totalCredits = projects.reduce((sum, project) => sum + project.carbonCredits, 0);
  const totalArea = projects.reduce((sum, project) => sum + project.area, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const handleStatsClick = (type: string) => {
    if (type === 'credits') {
      const message = language === 'hi' 
        ? `🌱 कुल कार्बन क्रेडिट्स: ${totalCredits.toFixed(1)} टन\n💰 अनुमानित आय: ₹${(totalCredits * 1500).toLocaleString('hi-IN')}\n📊 औसत प्रति प्रोजेक्ट: ${(totalCredits / projects.length).toFixed(1)} टन\n⏰ अगला पेमेंट: 15 दिन में`
        : `🌱 Total Carbon Credits: ${totalCredits.toFixed(1)} tons\n💰 Estimated Income: ₹${(totalCredits * 1500).toLocaleString('hi-IN')}\n📊 Average per project: ${(totalCredits / projects.length).toFixed(1)} tons\n⏰ Next payment: In 15 days`;
      alert(message);
      );
    } else if (type === 'area') {
      const message = language === 'hi'
        ? `🌾 कुल पंजीकृत भूमि: ${totalArea} एकड़\n📈 औसत प्रति एकड़: ${(totalCredits / totalArea).toFixed(1)} टन CO₂\n🏆 सबसे बड़ा खेत: ${Math.max(...projects.map(p => p.area))} एकड़\n📍 कुल स्थान: ${projects.length} गांव`
        : `🌾 Total Registered Land: ${totalArea} acres\n📈 Average per acre: ${(totalCredits / totalArea).toFixed(1)} tons CO₂\n🏆 Largest farm: ${Math.max(...projects.map(p => p.area))} acres\n📍 Total locations: ${projects.length} villages`;
      alert(message);
      );
    } else if (type === 'projects') {
      const completionRate = projects.length > 0 ? Math.round((activeProjects / projects.length) * 100) : 0;
      const message = language === 'hi'
        ? `✅ सक्रिय प्रोजेक्ट्स: ${activeProjects}\n📋 कुल प्रोजेक्ट्स: ${projects.length}\n📊 सफलता दर: ${completionRate}%\n🎯 इस महीने जोड़े गए: ${projects.filter(p => new Date(p.lastUpdated).getMonth() === new Date().getMonth()).length}`
        : `✅ Active Projects: ${activeProjects}\n📋 Total Projects: ${projects.length}\n📊 Success Rate: ${completionRate}%\n🎯 Added this month: ${projects.filter(p => new Date(p.lastUpdated).getMonth() === new Date().getMonth()).length}`;
      alert(message);
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.title')}</h2>
        <p className="text-gray-600">{t('dashboard.subtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <button onClick={() => handleStatsClick('credits')} className="text-left">
          <StatsCard
            title={t('stats.totalCredits')}
            value={`${totalCredits.toFixed(1)} ${language === 'hi' ? 'टन' : 'tons'}`}
            icon={<Coins className="h-8 w-8 text-yellow-600" />}
            color="yellow"
            subtitle={`₹${(totalCredits * 1500).toLocaleString('hi-IN')} ${language === 'hi' ? 'की आय' : 'income'}`}
          />
        </button>
        <button onClick={() => handleStatsClick('area')} className="text-left">
          <StatsCard
            title={t('stats.totalArea')}
            value={`${totalArea} ${language === 'hi' ? 'एकड़' : 'acres'}`}
            icon={<MapPin className="h-8 w-8 text-blue-600" />}
            color="blue"
            subtitle={language === 'hi' ? 'पंजीकृत भूमि' : 'Registered land'}
          />
        </button>
        <button onClick={() => handleStatsClick('projects')} className="text-left">
          <StatsCard
            title={t('stats.activeProjects')}
            value={activeProjects.toString()}
            icon={<TrendingUp className="h-8 w-8 text-green-600" />}
            color="green"
            subtitle={language === 'hi' ? 'चालू प्रोजेक्ट्स' : 'Running projects'}
          />
        </button>
      </div>

      {/* Add Project Button */}
      <div className="mb-6">
        <button
          onClick={onAddProject}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
        >
          <Plus className="h-6 w-6" />
          <span>{t('dashboard.addProject')}</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('dashboard.projects')}</h3>
        {projects.length === 0 ? (
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl p-12 text-center shadow-lg border-2 border-green-200">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="h-12 w-12 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">{t('dashboard.noProjects')}</h4>
            <p className="text-gray-500 mb-6">{t('dashboard.noProjectsDesc')}</p>
            <button
              onClick={onAddProject}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              {t('dashboard.addProject')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onUpdate={onUpdateProject}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;