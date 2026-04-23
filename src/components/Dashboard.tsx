import {
  Image, MessageSquare, Search, Download, Wrench, ArrowRight, Zap,
  GraduationCap, Laugh, Trophy, Newspaper, Sparkles, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { tools, categories, catMeta, getColorClasses } from '../lib/tools';

const catIcons: Record<string, typeof Image> = {
  'ai-image': Image, 'ai-chat': MessageSquare, search: Search, download: Download,
  education: GraduationCap, fun: Laugh, sports: Trophy, news: Newspaper,
  tools: Wrench,
};

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 pt-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium mb-6">
          <Zap className="w-3 h-3" />{tools.length} Tools Ready
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          The Ultimate<span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent"> Studio</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          AI, education, fun, sports, news, tools — all in one place.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const CatIcon = catIcons[cat.id] || Image;
          const meta = catMeta[cat.id];
          const colors = getColorClasses(meta?.color || 'cyan');
          const count = tools.filter(t => t.category === cat.id).length;
          const gradient = meta?.gradient || 'from-cyan-500 to-blue-500';

          return (
            <motion.button key={cat.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }}
              onClick={() => setActiveTab(cat.id)}
              className="group text-left p-6 rounded-2xl bg-gray-900/50 border border-gray-800/80 hover:border-gray-600/60 backdrop-blur-sm transition-all duration-200 hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}/20 border ${colors.border}`}>
                  <CatIcon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{meta?.description || ''}</p>
              <span className={`text-xs ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full border ${colors.border}`}>{count} tools</span>
            </motion.button>
          );
        })}


      </div>
    </div>
  );
}
