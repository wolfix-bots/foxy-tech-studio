import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Zap, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const colorOptions = ['cyan', 'fuchsia', 'purple', 'pink', 'emerald', 'amber', 'red', 'blue'];

export default function AddTool({ onToolAdded }: { onToolAdded: () => void }) {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', description: '', endpoint: '', icon: 'Zap', color: 'cyan',
    inputType: 'both', promptLabel: 'Prompt', promptParam: 'prompt', imageParam: 'url',
  });

  const fetchTools = async () => {
    try {
      const res = await fetch('/api/custom-tools');
      setTools(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTools(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.endpoint.trim()) return;
    setSubmitting(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/custom-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setSuccess(`"${form.name}" added!`);
      setForm({ name: '', description: '', endpoint: '', icon: 'Zap', color: 'cyan', inputType: 'both', promptLabel: 'Prompt', promptParam: 'prompt', imageParam: 'url' });
      fetchTools(); onToolAdded();
    } catch (err: any) { setError(err.message); }
    finally { setSubmitting(false); }
  };

  const deleteTool = async (id: number) => {
    try {
      await fetch('/api/custom-tools', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      fetchTools(); onToolAdded();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 border border-fuchsia-500/30">
            <Plus className="w-5 h-5 text-fuchsia-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Add Custom Tool</h2>
        </div>
        <p className="text-gray-500 text-sm ml-11">Connect any API endpoint to expand your studio</p>
      </motion.div>

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        onSubmit={handleSubmit} className="space-y-4 bg-gray-900/50 border border-fuchsia-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Tool Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Image Upscaler" className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/25 transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">API Endpoint *</label>
            <input type="url" value={form.endpoint} onChange={(e) => setForm(f => ({ ...f, endpoint: e.target.value }))}
              placeholder="https://api.example.com/ai/upscaler" className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/25 transition-all" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
          <input type="text" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="What does this tool do?" className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/25 transition-all" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Input Type</label>
            <select value={form.inputType} onChange={(e) => setForm(f => ({ ...f, inputType: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-fuchsia-500/50 transition-all">
              <option value="both">Image URL + Prompt</option>
              <option value="prompt">Prompt Only</option>
              <option value="image">Image URL Only</option>
              <option value="none">No Input</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Prompt Param</label>
            <input type="text" value={form.promptParam} onChange={(e) => setForm(f => ({ ...f, promptParam: e.target.value }))}
              placeholder="prompt" className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Image Param</label>
            <input type="text" value={form.imageParam} onChange={(e) => setForm(f => ({ ...f, imageParam: e.target.value }))}
              placeholder="url" className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Color Theme</label>
          <div className="flex gap-2">
            {colorOptions.map(c => (
              <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))}
                className={`w-8 h-8 rounded-lg bg-${c}-500/30 border-2 transition-all ${form.color === c ? `border-${c}-400 scale-110` : 'border-transparent hover:border-gray-600'}`} />
            ))}
          </div>
        </div>
        <AnimatePresence>
          {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-center gap-2"><Check className="w-4 h-4" /> {success}</motion.div>}
          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</motion.div>}
        </AnimatePresence>
        <button type="submit" disabled={submitting}
          className="w-full py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-fuchsia-500/20">
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Adding...</> : <><Plus className="w-5 h-5" /> Add Tool</>}
        </button>
      </motion.form>

      {tools.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Your Custom Tools</h3>
          <div className="space-y-3">
            {tools.map(tool => (
              <div key={tool.id} className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800/50 rounded-xl">
                <div className={`p-2 rounded-lg bg-${tool.color || 'cyan'}-500/10 border border-${tool.color || 'cyan'}-500/30`}><Zap className={`w-4 h-4 text-${tool.color || 'cyan'}-400`} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{tool.name}</p>
                  <p className="text-xs text-gray-500 truncate">{tool.endpoint}</p>
                </div>
                <button onClick={() => deleteTool(tool.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
