import { useState } from 'react';
import {
  Image, MessageSquare, Search, Download, Wrench, Menu, X, Home,
  ChevronRight, ChevronLeft, GraduationCap, Laugh, Trophy, Newspaper, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools, categories, catMeta, getColorClasses } from '../lib/tools';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const catIcons: Record<string, typeof Image> = {
  'ai-image': Image, 'ai-chat': MessageSquare, search: Search, download: Download,
  education: GraduationCap, fun: Laugh, sports: Trophy, news: Newspaper,
  spiritual: Sparkles, tools: Wrench,
};

const catNames: Record<string, string> = Object.fromEntries(categories.map(c => [c.id, c.name]));

function getActiveCategory(tab: string): string | null {
  if (categories.find(c => c.id === tab)) return tab;
  const tool = tools.find(t => t.id === tab);
  return tool ? tool.category : null;
}

function getBackTarget(tab: string): string | null {
  if (tab === 'home') return null;
  if (categories.find(c => c.id === tab)) return 'home';
  const tool = tools.find(t => t.id === tab);
  return tool ? tool.category : 'home';
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeCat = getActiveCategory(activeTab);
  const backTarget = getBackTarget(activeTab);

  const nav = (tab: string) => { setActiveTab(tab); setMobileMenuOpen(false); };
  const goBack = () => { if (backTarget) nav(backTarget); };

  return (
    <header className="relative z-50">
      <div className="border-b border-cyan-500/20 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              {/* Back arrow */}
              {backTarget && (
                <button onClick={goBack}
                  className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  title="Go back">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Logo / Home */}
              <button onClick={() => nav('home')} className="flex items-center gap-2.5 group shrink-0">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow">
                    <Image className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">Foxy Tech</h1>
                  <p className="text-[9px] text-cyan-400 -mt-0.5 tracking-widest uppercase">Studio</p>
                </div>
              </button>
            </div>

            {/* Desktop breadcrumb */}
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <button onClick={() => nav('home')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === 'home' ? 'text-cyan-300 bg-cyan-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
                <Home className="w-4 h-4 inline -mt-0.5" /> Home
              </button>
              {activeCat && activeTab !== 'home' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                  <button onClick={() => nav(activeCat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeTab === activeCat ? 'text-cyan-300 bg-cyan-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
                    {catNames[activeCat]}
                  </button>
                </>
              )}
              {activeCat && tools.find(t => t.id === activeTab) && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                  <span className="px-3 py-1.5 text-gray-300 font-medium">{tools.find(t => t.id === activeTab)?.name}</span>
                </>
              )}
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-cyan-500/20 bg-gray-950/95 backdrop-blur-xl overflow-hidden">
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              <button onClick={() => nav('home')} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-cyan-300 bg-cyan-500/10">
                <Home className="w-4 h-4" /> Home
              </button>
              {categories.map(cat => {
                const CatIcon = catIcons[cat.id] || Image;
                const meta = catMeta[cat.id];
                const colors = getColorClasses(meta?.color || 'cyan');
                const isActive = activeTab === cat.id;
                return (
                  <button key={cat.id} onClick={() => nav(cat.id)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? `${colors.text} ${colors.bg}` : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
                    <CatIcon className="w-4 h-4" /> {catNames[cat.id]}
                    <span className="ml-auto text-[10px] text-gray-600">{tools.filter(t => t.category === cat.id).length}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
