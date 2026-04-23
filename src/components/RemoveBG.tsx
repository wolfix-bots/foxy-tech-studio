import { useState } from 'react';
import { Eraser, Loader2, Download, ExternalLink, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function RemoveBG() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setExpanded(false);
    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
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
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
            <Eraser className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Remove Background</h2>
        </div>
        <p className="text-gray-400 ml-12">Instantly remove backgrounds from any image</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
            required
          />
        </div>

        {imageUrl && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Original Preview</p>
            <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-700/50 bg-[repeating-conic-gradient(#1a1a2e_0%_25%,#16162a_0%_50%)] bg-[length:20px_20px]">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Removing Background...
            </>
          ) : (
            <>
              <Eraser className="w-5 h-5" />
              Remove Background
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
            className="mt-6 bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Result</h3>
            {resultImage && typeof resultImage === 'string' && (
              <div className="space-y-4">
                <div className="relative group rounded-xl overflow-hidden border border-gray-700/50 bg-[repeating-conic-gradient(#1a1a2e_0%_25%,#16162a_0%_50%)] bg-[length:20px_20px]">
                  <img
                    src={resultImage}
                    alt="Background removed"
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
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm hover:bg-purple-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Full Size
                  </button>
                  <button
                    onClick={() => downloadImage(resultImage, `foxy-nobg-${Date.now()}.png`)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm hover:bg-cyan-600/30 transition-all"
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
