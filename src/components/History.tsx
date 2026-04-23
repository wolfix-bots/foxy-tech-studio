import { useState, useEffect } from 'react';
import { Clock, Trash2, ExternalLink, Image, Sparkles, Eraser, Zap, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  id: number;
  type: string;
  prompt: string;
  input_url: string | null;
  result_url: string;
  created_at: string;
}

const typeConfig: Record<string, { icon: typeof Image; color: string; bg: string; border: string; label: string }> = {
  edit: { icon: Image, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', label: 'Image Edit' },
  magic: { icon: Sparkles, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', label: 'Magic Studio' },
  removebg: { icon: Eraser, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', label: 'Remove BG' },
  custom: { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Custom Tool' },
};

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const deleteItem = async (id: number) => {
    try {
      await fetch('/api/history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchHistory();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">History</h2>
        </div>
        <p className="text-gray-400 ml-12">Your recent image generations and edits</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No history yet</p>
          <p className="text-gray-600 text-sm mt-1">Your creations will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((item) => {
              const config = typeConfig[item.type] || typeConfig.custom;
              const Icon = config.icon;
              const hasDataUrl = item.result_url?.startsWith('data:');
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center gap-4 p-4 bg-gray-900/50 border ${config.border} rounded-xl backdrop-blur-sm`}
                >
                  <div className={`p-2 rounded-lg ${config.bg} ${config.border} border shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                      <span className="text-xs text-gray-600">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{item.prompt}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.result_url && !hasDataUrl && (
                      <a
                        href={item.result_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
