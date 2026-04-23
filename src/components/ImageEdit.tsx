import { useState } from 'react';
import { Image, Wand2, Loader2, Download, ExternalLink, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function isDataUrl(str: string) {
  return str.startsWith('data:');
}

function downloadImage(url: string, filename: string) {
  if (isDataUrl(url)) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
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

export default function ImageEdit() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() || !prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setExpanded(false);
    try {
      const res = await fetch('/api/image-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageUrl }),
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
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30">
            <Image className="w-5 h-5 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Image Edit</h2>
        </div>
        <p className="text-gray-400 ml-12">Transform your images with AI-powered editing commands</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Edit Command</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. make him brown, add sunglasses, make it black and white"
            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/25 transition-all"
            required
          />
        </div>

        {imageUrl && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-700/50">
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
          className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Edit Image
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
            <h3 className="text-lg font-semibold text-white mb-4">Result</h3>
            {resultImage && typeof resultImage === 'string' && (
              <div className="space-y-4">
                <div className="relative group rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800">
                  <img
                    src={resultImage}
                    alt="Edited result"
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
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm hover:bg-cyan-600/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Full Size
                  </button>
                  <button
                    onClick={() => downloadImage(resultImage, `foxy-edit-${Date.now()}.png`)}
                    className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600/20 border border-fuchsia-500/30 rounded-lg text-fuchsia-300 text-sm hover:bg-fuchsia-600/30 transition-all"
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
