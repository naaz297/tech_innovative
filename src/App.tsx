import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddProjectModal from './components/AddProjectModal';
import Navbar from './components/Navbar';
import CarbonCalculator from './components/CarbonCalculator';
import EducationPanel from './components/EducationPanel';
import Footer from './components/Footer';
import VoiceAssistant from './components/VoiceAssistant';
import LanguageDetector from './components/LanguageDetector';
import { Project } from './types/Project';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'रामेश्वर का धान का खेत - सिकंदरपुर गांव',
      type: 'rice',
      area: 2.5,
      location: 'सिकंदरपुर, मुजफ्फरनगर, उत्तर प्रदेश',
      status: 'active',
      carbonCredits: 15.2,
      lastUpdated: new Date('2024-12-15'),
      photos: [
        'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'पारंपरिक धान की खेती के साथ जैविक तरीकों का उपयोग। मिट्टी की गुणवत्ता में सुधार और कार्बन संग्रहण बढ़ाने के लिए कवर क्रॉप्स का उपयोग।'
    },
    {
      id: '2',
      name: 'श्यामा देवी का मिश्रित बगीचा - हरिहरपुर गांव',
      type: 'agroforestry',
      area: 1.8,
      location: 'हरिहरपुर, जालंधर, पंजाब',
      status: 'pending',
      carbonCredits: 8.7,
      lastUpdated: new Date('2024-12-10'),
      photos: [
        'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1459534/pexels-photo-1459534.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'आम, अमरूद और नीम के पेड़ों के साथ मिश्रित खेती। मधुमक्खी पालन और जैविक खाद का उत्पादन भी शामिल।'
    },
    {
      id: '3',
      name: 'गीता बेन का जैविक खेत - वडगाम गांव',
      type: 'rice',
      area: 3.2,
      location: 'वडगाम, बनासकांठा, गुजरात',
      status: 'active',
      carbonCredits: 18.5,
      lastUpdated: new Date('2024-12-12'),
      photos: [
        'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      description: 'पूर्णतः जैविक धान की खेती। वर्षा जल संचयन और ड्रिप सिंचाई का उपयोग। मिट्टी में कार्बन की मात्रा बढ़ाने के लिए हरी खाद का प्रयोग।'
    }
  ]);

  const handleAddProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
    setShowAddProject(false);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };
  return (
    <LanguageProvider>
      <LanguageDetector />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 text-9xl">🌾</div>
          <div className="absolute top-40 right-20 text-7xl">🌱</div>
          <div className="absolute bottom-40 left-1/4 text-8xl">🌳</div>
          <div className="absolute bottom-20 right-10 text-6xl">🍃</div>
          <div className="absolute top-60 left-1/2 text-5xl">🌿</div>
        </div>
        
        <Navbar />
        
        <main className="flex-1 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Dashboard */}
              <div className="lg:col-span-2">
                <Dashboard 
                  projects={projects} 
                  onAddProject={() => setShowAddProject(true)}
                  onUpdateProject={handleUpdateProject}
                  onDeleteProject={handleDeleteProject}
                />
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <CarbonCalculator />
                <EducationPanel />
              </div>
            </div>
          </div>
        </main>

        <Footer />

        <VoiceAssistant />

        {showAddProject && (
          <AddProjectModal
            onClose={() => setShowAddProject(false)}
            onSubmit={handleAddProject}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;