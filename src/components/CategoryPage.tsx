import {
  Image, Sparkles, Eraser, Wand2, MessageSquare, Brain, Zap,
  Search, Play, Download, Music, Languages, Link, Link2, Type,
  Code, Lock, Smartphone, MessageCircle, Wrench, ArrowRight,
  BookOpen, Atom, CheckCircle, Apple, Library, Feather, Lightbulb,
  Laugh, Quote, Smile, Eye, Flame, Heart, Shuffle, Hand, Trophy,
  Target, Swords, Radio, UserSearch, Users, DollarSign, Newspaper,
  Cpu, Dribbble, Globe, Moon, Star, Headphones, GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { tools, catMeta, getColorClasses } from '../lib/tools';

const iconMap: Record<string, typeof Image> = {
  Image, Sparkles, Eraser, Wand2, MessageSquare, Brain, Zap, Search, Play,
  Download, Music, Languages, Link, Link2, Type, Code, Lock, Smartphone,
  MessageCircle, Wrench, BookOpen, Atom, CheckCircle, Apple, Library,
  Feather, Lightbulb, Laugh, Quote, Smile, Eye, Flame, Heart, Shuffle,
  Hand, Trophy, Target, Swords, Radio, UserSearch, Users, DollarSign,
  Newspaper, Cpu, Dribbble, Globe, Moon, Star, Headphones, GraduationCap,
};

const catIcons: Record<string, typeof Image> = {
  'ai-image': Image, 'ai-chat': MessageSquare, search: Search, download: Download,
  education: GraduationCap, fun: Laugh, sports: Trophy, news: Newspaper,
  tools: Wrench,
};

const catNames: Record<string, string> = {
  'ai-image': 'AI Image', 'ai-chat': 'AI Chat', search: 'Search', download: 'Download',
  education: 'Education', fun: 'Fun', sports: 'Sports', news: 'News',
  tools: 'Tools',
};

export default function CategoryPage({ categoryId, setActiveTab }: { categoryId: string; setActiveTab: (tab: string) => void }) {
  const catTools = tools.filter(t => t.category === categoryId);
  const meta = catMeta[categoryId];
  const color = meta?.color || 'cyan';
  const colors = getColorClasses(color);
  const gradient = meta?.gradient || 'from-cyan-500 to-blue-500';
  const CatIcon = catIcons[categoryId] || Image;
  const name = catNames[categoryId] || categoryId;

  if (catTools.length === 0) {
    return <div className="text-center py-20"><p className="text-gray-500">No tools found in this category.</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}/20 border ${colors.border}`}>
            <CatIcon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-sm text-gray-500">{catTools.length} tools available</p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {catTools.map((tool, i) => {
          const toolColors = getColorClasses(tool.color);
          const Icon = iconMap[tool.icon] || Image;
          return (
            <motion.button key={tool.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              onClick={() => setActiveTab(tool.id)}
              className="group text-left p-5 rounded-xl bg-gray-900/50 border border-gray-800/80 hover:border-gray-600/60 backdrop-blur-sm transition-all duration-200 hover:shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${toolColors.bg} border ${toolColors.border}`}>
                  <Icon className={`w-5 h-5 ${toolColors.text}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
