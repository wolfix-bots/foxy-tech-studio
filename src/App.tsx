import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategoryPage from './components/CategoryPage';
import ToolRunner from './components/ToolRunner';
import { tools, categories } from './lib/tools';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const renderContent = () => {
    if (activeTab === 'home') return <Dashboard setActiveTab={setActiveTab} />;
    if (categories.find(c => c.id === activeTab)) return <CategoryPage categoryId={activeTab} setActiveTab={setActiveTab} />;
    const tool = tools.find(t => t.id === activeTab);
    if (tool) return <ToolRunner key={tool.id} tool={tool} />;
    return <Dashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
        <footer className="border-t border-gray-800/50 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">Foxy Tech Studio</p>
            <p className="text-xs text-gray-700">Powered by Keith APIs</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
