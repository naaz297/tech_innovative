import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AddProjectModal from './components/AddProjectModal';
import Navbar from './components/Navbar';
import CarbonCalculator from './components/CarbonCalculator';
import EducationPanel from './components/EducationPanel';
import Footer from './components/Footer';
import { Project } from './types/Project';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'राम का धान का खेत',
      type: 'rice',
      area: 2.5,
      location: 'मुजफ्फरनगर, उत्तर प्रदेश',
      status: 'active',
      carbonCredits: 15.2,
      lastUpdated: new Date('2024-12-15'),
      photos: [
        'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '2',
      name: 'श्याम का फलों का बगीचा',
      type: 'agroforestry',
      area: 1.8,
      location: 'जालंधर, पंजाब',
      status: 'pending',
      carbonCredits: 8.7,
      lastUpdated: new Date('2024-12-10'),
      photos: [
        'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1459534/pexels-photo-1459534.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Dashboard */}
              <div className="lg:col-span-2">
                <Dashboard 
                  projects={projects} 
                  onAddProject={() => setShowAddProject(true)}
                  onUpdateProject={handleUpdateProject}
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