import { useState } from 'react';
import { Sparkles, Loader2, Download, ExternalLink, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const examplePrompts = [
  'A futuristic city at night with neon lights',
  'A cat astronaut floating in space',
  'Cyberpunk samurai in the rain',
  'A serene Japanese garden in autumn',
  'An ancient dragon made of crystal',
  'Underwater kingdom with bioluminescent creatures',
];

function isDataUrl(str: string) {
  return str.startsWith('data:');
}

function downloadImage(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openImage(url: string) {
  if (isDataUrl(url)) {
    const win = window.open('');
    if (win) {
      win.document.write(`<html><head><title>Image</title><style>body{margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh;}img{max-width:100%;max-height:100vh;}</style></head><body><img src="${url}" /></body></html>`);
      win.document.close();
    }
  } else {
    window.open(url, '_blank');
  }
}

export default function MagicStudio() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setExpanded(false);
    try {
      const res = await fetch('/api/magic-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getResultImage = () => {
    if (!result) return null;
    return result.image || result.url || result.result || null;
  };

  const resultImage = getResultImage();

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/30">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Magic Studio</h2>
        </div>
        <p className="text-gray-400 ml-12">Generate stunning images from text descriptions</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900/50 border border-fuchsia-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Describe Your Image</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/25 transition-all resize-none"
            required
          />
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">Try an example</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((ep) => (
              <button
                key={ep}
                type="button"
                onClick={() => setPrompt(ep)}
                className="px-3 py-1.5 text-xs bg-gray-800/80 border border-gray-700/50 rounded-lg text-gray-400 hover:text-fuchsia-300 hover:border-fuchsia-500/30 transition-all"
              >
                {ep}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-fuchsia-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>
      </motion.form>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 bg-gray-900/50 border border-fuchsia-500/20 rounded-2xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Generated Image</h3>
            {resultImage && typeof resultImage === 'string' && (
              <div className="space-y-4">
                <div className="relative group rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800">
                  <img
                    src={resultImage}
                    alt="Generated result"
                    className={`w-full object-contain transition-all duration-300 ${expanded ? 'max-h-[800px]' : 'max-h-[500px]'}`}
                  />
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openImage(resultImage)}
                    className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600/20 border border-fuchsia-500/30 rounded-lg text-fuchsia-300 text-sm hover:bg-fuchsia-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Full Size
                  </button>
                  <button
                    onClick={() => downloadImage(resultImage, `foxy-magic-${Date.now()}.png`)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm hover:bg-purple-600/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
            {!resultImage && (
              <pre className="bg-gray-800/80 rounded-xl p-4 text-sm text-gray-300 overflow-auto max-h-60">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
