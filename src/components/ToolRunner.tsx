import { useState, useEffect, useRef } from 'react';
import {
  Image, Sparkles, Wand2, MessageSquare, Brain, Zap,
  Search, Play, Download, Music, Loader2, ExternalLink,
  Maximize2, Copy, Check, X, Video, Headphones, Languages,
  Link, Link2, Type, Code, Lock, Smartphone, MessageCircle, Wrench,
  BookOpen, Atom, CheckCircle, Apple, Library, Feather, Lightbulb,
  Laugh, Quote, Smile, Eye, Flame, Heart, Shuffle, Hand, Trophy,
  Target, Swords, Radio, Users, DollarSign, Newspaper,
  Cpu, Dribbble, Globe, Moon, Star, GraduationCap, RefreshCw,
  Volume2, ChevronDown, ChevronUp, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolConfig, getColorClasses } from '../lib/tools';

const iconMap: Record<string, typeof Image> = {
  Image, Sparkles, Wand2, MessageSquare, Brain, Zap, Search, Play,
  Download, Music, Languages, Link, Link2, Type, Code, Lock, Smartphone,
  MessageCircle, Wrench, BookOpen, Atom, CheckCircle, Apple, Library,
  Feather, Lightbulb, Laugh, Quote, Smile, Eye, Flame, Heart, Shuffle,
  Hand, Trophy, Target, Swords, Radio, Users, DollarSign,
  Newspaper, Cpu, Dribbble, Globe, Moon, Star, Headphones, GraduationCap,
};

function isDataUrl(s: string) { return s.startsWith('data:'); }

function downloadFile(url: string, filename: string) {
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
    if (win) { win.document.write(`<html><head><title>Image</title><style>body{margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh;}img{max-width:100%;max-height:100vh;}</style></head><body><img src="${url}" /></body></html>`); win.document.close(); }
  } else { window.open(url, '_blank'); }
}

// ─── Audio Player Component ───
function AudioPlayer({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => { if (a.duration) setProgress((a.currentTime / a.duration) * 100); };
    const onEnd = () => setPlaying(false);
    const onMeta = () => setDuration(a.duration);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('loadedmetadata', onMeta);
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('ended', onEnd); a.removeEventListener('loadedmetadata', onMeta); };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); } else { a.play(); }
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
  };

  const fmt = (s: number) => { if (!s || isNaN(s)) return '0:00'; const m = Math.floor(s/60); const sec = Math.floor(s%60); return `${m}:${sec.toString().padStart(2,'0')}`; };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
      {title && <p className="text-sm text-gray-300 mb-3">{title}</p>}
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 hover:opacity-90 transition-all">
          {playing ? <div className="w-3 h-3 flex gap-0.5"><div className="w-1 bg-white rounded-full" /><div className="w-1 bg-white rounded-full" /></div> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1">
          <div onClick={seek} className="h-1.5 bg-gray-700 rounded-full cursor-pointer group relative">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${progress}%`, marginLeft: '-6px' }} />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-gray-500">
            <span>{fmt(audioRef.current?.currentTime || 0)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chat Bubble Component ───
function ChatBubble({ role, children, color }: { role: 'user' | 'ai'; children: React.ReactNode; color: string }) {
  const colors = getColorClasses(color);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${role === 'user' ? 'bg-fuchsia-500/20 border border-fuchsia-500/30' : `${colors.bg} border ${colors.border}`}`}>
        {role === 'user' ? <User className="w-4 h-4 text-fuchsia-400" /> : <Sparkles className={`w-4 h-4 ${colors.text}`} />}
      </div>
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${role === 'user' ? 'bg-fuchsia-500/10 border border-fuchsia-500/20 text-gray-200 rounded-tr-sm' : `bg-gray-800/50 border border-gray-700/50 text-gray-200 rounded-tl-sm`}`}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── YouTube Download Modal ───
function YTDownloadModal({ video, onClose }: { video: { title: string; thumbnail: string; url: string } | null; onClose: () => void }) {
  const [downloading, setDownloading] = useState<'video' | 'audio' | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadType, setDownloadType] = useState<'video' | 'audio' | null>(null);
  const [error, setError] = useState('');
  if (!video) return null;

  const handleDownload = async (type: 'video' | 'audio') => {
    setDownloading(type); setError(''); setDownloadUrl(null);
    try {
      const endpoint = type === 'video' ? 'https://apiskeith.top/download/ytmp4' : 'https://apiskeith.top/download/ytmp3';
      const res = await fetch('/api/proxy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint, params: { url: video.url } }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.err || 'Download failed');
      const url = typeof data.result === 'string' ? data.result : data.result?.audio || data.result?.video || '';
      if (!url) throw new Error('No download URL received');
      setDownloadUrl(url); setDownloadType(type);
    } catch (err: any) { setError(err.message); }
    finally { setDownloading(null); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gray-900 border border-fuchsia-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-fuchsia-500/10">
        <div className="relative"><img src={video.thumbnail} alt="" className="w-full h-48 object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-500 mb-5">How do you want to download?</p>
          {downloadUrl ? (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <p className="text-emerald-400 text-sm font-medium mb-3">Ready!</p>
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg"><Download className="w-4 h-4" /> Download {downloadType === 'video' ? 'MP4' : 'MP3'}</a>
              </div>
              <button onClick={() => { setDownloadUrl(null); setDownloadType(null); }} className="w-full text-xs text-gray-500 hover:text-gray-300">Other format</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleDownload('video')} disabled={downloading !== null} className="flex flex-col items-center gap-2 p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl hover:bg-fuchsia-500/20 transition-all disabled:opacity-50">
                {downloading === 'video' ? <Loader2 className="w-6 h-6 text-fuchsia-400 animate-spin" /> : <Video className="w-6 h-6 text-fuchsia-400" />}
                <span className="text-sm font-medium text-fuchsia-300">{downloading === 'video' ? 'Loading...' : 'Video'}</span><span className="text-[10px] text-gray-500">MP4</span>
              </button>
              <button onClick={() => handleDownload('audio')} disabled={downloading !== null} className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500/20 transition-all disabled:opacity-50">
                {downloading === 'audio' ? <Loader2 className="w-6 h-6 text-purple-400 animate-spin" /> : <Headphones className="w-6 h-6 text-purple-400" />}
                <span className="text-sm font-medium text-purple-300">{downloading === 'audio' ? 'Loading...' : 'Audio'}</span><span className="text-[10px] text-gray-500">MP3</span>
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-xs text-red-400 text-center">{error}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Tool Runner ───
export default function ToolRunner({ tool }: { tool: ToolConfig }) {
  const [formState, setFormState] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    tool.params.forEach(p => init[p.key] = '');
    return init;
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ytModal, setYtModal] = useState<{ title: string; thumbnail: string; url: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai'; text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');

  const colors = getColorClasses(tool.color);
  const Icon = iconMap[tool.icon] || Image;
  const isChat = ['gpt','gpt4','gemini','ai-bible','ai-muslim','physics-ai'].includes(tool.id);

  useEffect(() => { if (tool.noInput) handleSubmit(); }, [tool.id]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const hasEmpty = tool.params.some(p => p.required && !formState[p.key]?.trim());
    if (hasEmpty && !tool.noInput) return;
    setLoading(true); setError(''); setResult(null); setExpanded(false);

    // For chat tools, save user message and prepend system prompt
    const firstParamKey = tool.params[0]?.key || 'q';
    const userText = isChat ? chatInput : (formState[firstParamKey] || '');
    if (isChat && userText) setChatMessages(prev => [...prev, { role: 'user', text: userText }]);

    // Build params with system prompt prepended for AI tools
    const submitParams = { ...formState };
    if (isChat && userText) {
      submitParams[firstParamKey] = userText;
    }
    if (isChat) setChatInput('');

    try {
      const res = await fetch('/api/proxy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: tool.endpoint, params: submitParams }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.err || 'Something went wrong');
      setResult(data);
      // For chat, save AI response
      if (isChat && data.result !== undefined) {
        const aiText = typeof data.result === 'string' ? data.result : (data.result.answer || data.result.results?.data?.answer || JSON.stringify(data.result, null, 2));
        setChatMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      }
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const copyToClipboard = (text: string) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const renderResult = () => {
    if (!result) return null;
    const r = result.result;

    // ─── Chat bubble view for AI tools ───
    if (isChat && chatMessages.length > 0) {
      return (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {chatMessages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} color={tool.color}>{msg.text}</ChatBubble>
          ))}
          {loading && <ChatBubble role="ai" color={tool.color}><Loader2 className="w-4 h-4 animate-spin" /></ChatBubble>}
          {chatMessages.length > 0 && (
            <button onClick={() => copyToClipboard(chatMessages.filter(m=>m.role==='ai').map(m=>m.text).join('\n\n'))}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-400 hover:bg-gray-700/50 transition-all ml-11">
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />} Copy All
            </button>
          )}
        </div>
      );
    }

    // ─── Direct image from proxy ───
    if (result.type === 'direct' && result.image) {
      return (<div className="space-y-4">
        <div className="relative group rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800">
          <img src={result.image} alt="Result" className={`w-full object-contain transition-all duration-300 ${expanded ? 'max-h-[800px]' : 'max-h-[500px]'}`} />
          <button onClick={() => setExpanded(!expanded)} className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="w-4 h-4" /></button>
        </div>
        <div className="flex gap-3">
          <button onClick={() => openImage(result.image)} className={`flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg ${colors.text} text-sm hover:opacity-80 transition-all`}><ExternalLink className="w-4 h-4" /> Open</button>
          <button onClick={() => downloadFile(result.image, `foxy-${tool.id}-${Date.now()}.png`)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all"><Download className="w-4 h-4" /> Download</button>
        </div>
      </div>);
    }

    // ─── Random / Meme ───
    if (tool.responseType === 'random' || tool.responseType === 'meme') {
      // Meme
      if (tool.responseType === 'meme' && (result.url || r?.url)) {
        const memeUrl = result.url || r?.url; const title = result.title || r?.title || '';
        return (<div className="space-y-4">
          {title && <p className="text-sm text-gray-400 text-center">{title}</p>}
          <div className="rounded-xl overflow-hidden border border-gray-700/50 bg-gray-800"><img src={memeUrl} alt="Meme" className="w-full max-h-[500px] object-contain" /></div>
          <div className="flex justify-center gap-3">
            <button onClick={() => openImage(memeUrl)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all"><ExternalLink className="w-4 h-4" /> Open</button>
            <button onClick={() => downloadFile(memeUrl, `foxy-meme-${Date.now()}.jpg`)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all"><Download className="w-4 h-4" /> Download</button>
          </div>
        </div>);
      }
      // Joke
      if (r?.setup && r?.punchline) return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><p className="text-white text-lg mb-3">{r.setup}</p><p className="text-fuchsia-400 text-lg font-medium">{r.punchline}</p></div>);
      // Quote
      if (r?.quote) return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><p className="text-white text-lg italic mb-3">"{r.quote}"</p>{r.author && <p className="text-cyan-400 text-sm">— {r.author}</p>}</div>);
      // WYR
      if (r?.option1 && r?.option2) return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">Would you rather...</p><div className="grid grid-cols-2 gap-4"><div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"><p className="text-cyan-300 text-sm">{r.option1}</p></div><div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl"><p className="text-fuchsia-300 text-sm">{r.option2}</p></div></div></div>);
      // Trivia question
      if (r?.question && r?.allAnswers) return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"><p className="text-xs text-gray-500 mb-2 uppercase">{r.category} · {r.difficulty}</p><p className="text-white text-lg mb-4">{r.question}</p><div className="grid grid-cols-2 gap-2">{r.allAnswers.map((a: string, i: number) => (<div key={i} className={`p-3 rounded-lg text-sm text-center ${a === r.correctAnswer ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-gray-700/30 border border-gray-700/50 text-gray-400'}`}>{a}</div>))}</div></div>);
      // Poem
      if (r?.lines && Array.isArray(r.lines)) return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50"><p className="text-white font-semibold mb-1">{r.title}</p>{r.author && <p className="text-xs text-cyan-400 mb-4">by {r.author}</p>}<div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{r.lines.join('\n')}</div></div>);
      // Plain text
      const text = typeof r === 'string' ? r : JSON.stringify(r, null, 2);
      return (<div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><p className="text-white text-lg">{text}</p></div>);
    }

    // ─── Text (ASCII, JS encrypt) ───
    if (tool.responseType === 'text' && r) {
      const text = typeof r === 'string' ? r : (r.arts ? r.arts.join('\n\n') : r.answer || JSON.stringify(r, null, 2));
      return (<div className="space-y-3">
        <div className={`p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 ${tool.id === 'js-encrypt' ? 'max-h-96' : ''} overflow-auto`}>
          {tool.id === 'ascii-art' ? <pre className="text-green-400 text-xs leading-tight whitespace-pre overflow-x-auto">{text}</pre> : tool.id === 'js-encrypt' ? <pre className="text-amber-300 text-xs whitespace-pre-wrap break-all">{text}</pre> : <div className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{text}</div>}
        </div>
        <button onClick={() => copyToClipboard(text)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button>
      </div>);
    }

    // ─── JSON ───
    if (tool.responseType === 'json' && r !== undefined && r !== null) {
      // Translate
      if (r.translatedText) return (<div className="space-y-3"><div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50"><p className="text-xs text-gray-500 mb-2">Original: {r.originalText}</p><p className="text-xl text-white font-medium">{r.translatedText}</p><p className="text-xs text-gray-600 mt-2">→ {r.targetLanguage}</p></div><button onClick={() => copyToClipboard(r.translatedText)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button></div>);
      // URL Shortener
      if (r.shortened || r.shortUrl) { const u = r.shortened || r.shortUrl; return (<div className="space-y-3"><div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50">{r.original && <p className="text-xs text-gray-500 mb-2">Original: {r.original}</p>}<p className="text-lg text-cyan-400 font-medium break-all">{u}</p></div><div className="flex gap-3"><button onClick={() => copyToClipboard(u)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button><a href={u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"><ExternalLink className="w-4 h-4" /> Open</a></div></div>); }
      // WhatsApp check
      if (r.onWhatsApp !== undefined) return (<div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${r.onWhatsApp ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}><Smartphone className={`w-7 h-7 ${r.onWhatsApp ? 'text-emerald-400' : 'text-red-400'}`} /></div><p className={`text-lg font-medium ${r.onWhatsApp ? 'text-emerald-400' : 'text-red-400'}`}>{r.onWhatsApp ? 'On WhatsApp' : 'Not on WhatsApp'}</p><p className="text-sm text-gray-400 mt-1">{r.number || r.message}</p></div>);
      // WA Link
      if (r.shortUrl && String(r.shortUrl).includes('wa.')) return (<div className="space-y-3"><div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30"><MessageCircle className="w-7 h-7 text-emerald-400" /></div><p className="text-white font-medium mb-1">WhatsApp Link</p><p className="text-cyan-400 break-all">{r.shortUrl}</p></div><div className="flex gap-3"><button onClick={() => copyToClipboard(r.shortUrl)} className="flex items-center gap-2 px-4 py-2 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-300 text-sm hover:bg-gray-700/50 transition-all">{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button><a href={r.shortUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm hover:bg-emerald-500/20 transition-all"><ExternalLink className="w-4 h-4" /> Open</a></div></div>);
      // Dictionary
      if (r.word && r.meanings) return (<div className="space-y-3"><div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50"><div className="flex items-center gap-3 mb-3"><h3 className="text-xl font-bold text-white">{r.word}</h3>{r.phonetics?.[0]?.text && <span className="text-cyan-400 text-sm">{r.phonetics[0].text}</span>}{r.phonetics?.[0]?.audio && <a href={r.phonetics[0].audio} target="_blank" className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/20"><Volume2 className="w-3.5 h-3.5" /></a>}</div>{r.meanings?.map((m: any, i: number) => (<div key={i} className="mb-3"><span className="text-xs px-2 py-0.5 bg-fuchsia-500/10 text-fuchsia-400 rounded-full border border-fuchsia-500/20">{m.partOfSpeech}</span>{m.definitions?.slice(0, 3).map((d: any, j: number) => (<p key={j} className="text-sm text-gray-300 mt-1 ml-3">{j+1}. {d.definition}</p>))}</div>))}</div></div>);
      // Fruit
      if (r.name && r.nutritions) return (<div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50"><h3 className="text-xl font-bold text-white mb-1">{r.name}</h3><p className="text-xs text-gray-500 mb-3">{r.family} · {r.genus} · {r.order}</p><div className="grid grid-cols-5 gap-2">{Object.entries(r.nutritions).map(([k, v]) => (<div key={k} className="text-center p-2 bg-gray-700/30 rounded-lg"><p className="text-lg font-bold text-cyan-400">{String(v)}</p><p className="text-[10px] text-gray-500 capitalize">{k}</p></div>))}</div></div>);
      // Grammar
      if (r.recommendations) return (<div className="space-y-2 max-h-80 overflow-y-auto">{r.recommendations.map((rec: any, i: number) => (<div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><p className="text-xs text-fuchsia-400 mb-1">{rec.type?.replace(/-/g,' ')}</p><p className="text-sm text-gray-300">{rec.adviceText}</p>{rec.textToFix && <p className="text-sm text-red-400/70 mt-1 line-through">{rec.textToFix}</p>}{rec.fixedText && <p className="text-sm text-emerald-400 mt-0.5">→ {rec.fixedText}</p>}</div>))}</div>);
      // EPL standings
      if (r.standings) return (<div className="overflow-x-auto"><p className="text-sm text-gray-400 mb-2">{r.competition}</p><table className="w-full text-sm"><thead><tr className="text-gray-500 text-xs border-b border-gray-700/50"><th className="py-2 text-left w-8">#</th><th className="text-left">Team</th><th className="w-8 text-center">P</th><th className="w-8 text-center">W</th><th className="w-8 text-center">D</th><th className="w-8 text-center">L</th><th className="w-10 text-center">Pts</th></tr></thead><tbody>{r.standings.map((t: any, i: number) => (<tr key={i} className="border-b border-gray-800/50 text-gray-300"><td className="py-1.5 text-gray-500">{t.position}</td><td className="text-white">{t.team}</td><td className="text-center">{t.played}</td><td className="text-center">{t.won}</td><td className="text-center">{t.draw}</td><td className="text-center">{t.lost}</td><td className="text-center font-bold text-cyan-400">{t.points}</td></tr>))}</tbody></table></div>);
      // Top scorers
      if (r.topScorers) return (<div className="overflow-x-auto"><p className="text-sm text-gray-400 mb-2">{r.competition}</p><table className="w-full text-sm"><thead><tr className="text-gray-500 text-xs border-b border-gray-700/50"><th className="py-2 text-left w-8">#</th><th className="text-left">Player</th><th className="text-left">Team</th><th className="w-10 text-center">Goals</th><th className="w-10 text-center">Assists</th></tr></thead><tbody>{r.topScorers.map((t: any, i: number) => (<tr key={i} className="border-b border-gray-800/50 text-gray-300"><td className="py-1.5 text-gray-500">{t.rank}</td><td className="text-white">{t.player}</td><td className="text-gray-400">{t.team}</td><td className="text-center font-bold text-fuchsia-400">{t.goals}</td><td className="text-center">{t.assists}</td></tr>))}</tbody></table></div>);
      // EPL matches
      if (r.matches) return (<div className="space-y-2 max-h-96 overflow-y-auto"><p className="text-sm text-gray-400 mb-2">{r.competition}</p>{r.matches.slice(0,20).map((m: any, i: number) => (<div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><div className="text-sm"><span className="text-white">{m.homeTeam}</span> <span className="text-fuchsia-400 font-bold mx-2">{m.score}</span> <span className="text-white">{m.awayTeam}</span></div><span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status==='FINISHED'?'bg-gray-700/50 text-gray-500':'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>{m.status}</span></div>))}</div>);
      // Live scores
      if (r.games) { const games = Object.values(r.games); return (<div className="space-y-2 max-h-96 overflow-y-auto">{(games as any[]).slice(0,15).map((g: any, i: number) => (<div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><div className="flex-1"><div className="flex items-center justify-between text-sm"><span className="text-white">{g.p1}</span><span className="text-fuchsia-400 font-bold">{g.R?.r1 ?? '-'} - {g.R?.r2 ?? '-'}</span><span className="text-white">{g.p2}</span></div><p className="text-[10px] text-gray-600 mt-1">{g.dt} · {g.tm} · {g.R?.st || 'Scheduled'}</p></div></div>))}</div>); }
      // Bet tips
      if (Array.isArray(r) && r[0]?.predictions) return (<div className="space-y-3 max-h-96 overflow-y-auto">{r.slice(0,10).map((b: any, i: number) => (<div key={i} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"><div className="flex items-center justify-between mb-2"><p className="text-white font-medium text-sm">{b.match}</p><span className="text-[10px] text-gray-500">{b.league}</span></div><div className="grid grid-cols-3 gap-2 text-center">{Object.entries(b.predictions.fulltime).map(([k, v]: any) => (<div key={k} className="p-2 bg-gray-700/30 rounded-lg"><p className="text-lg font-bold text-cyan-400">{Number(v).toFixed(0)}%</p><p className="text-[10px] text-gray-500 capitalize">{k}</p></div>))}</div></div>))}</div>);
      // News (BBC style with images)
      if (r.topStories) return (<div className="space-y-3 max-h-96 overflow-y-auto">{r.topStories.slice(0,15).map((s: any, i: number) => (<a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all group">{s.imageUrl && s.imageUrl.includes('http') && <img src={s.imageUrl} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />}<p className="text-sm text-white group-hover:text-cyan-300 transition-colors">{s.title}</p>{s.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.description}</p>}<div className="flex items-center gap-2 mt-2">{s.metadata?.category && <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">{s.metadata.category}</span>}{s.metadata?.time && <span className="text-[10px] text-gray-600">{s.metadata.time}</span>}{s.isLive && <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full border border-red-500/20 animate-pulse">LIVE</span>}</div></a>))}</div>);
      // News (tech/football with featuredArticles or articles)
      if (r.featuredArticles || r.articles) { const arts = r.featuredArticles || r.articles || []; return (<div className="space-y-3 max-h-96 overflow-y-auto">{arts.slice(0,10).map((a: any, i: number) => (<a key={i} href={a.link || a.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all group">{a.image && <img src={a.image} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />}<p className="text-sm text-white group-hover:text-cyan-300 transition-colors">{a.title}</p>{a.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>}</a>))}</div>); }
      // Kenyans news
      if (Array.isArray(r) && r[0]?.title) return (<div className="space-y-3 max-h-96 overflow-y-auto">{r.slice(0,15).map((n: any, i: number) => (<a key={i} href={n.url || n.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all group"><p className="text-sm text-white group-hover:text-cyan-300">{n.title}</p>{n.snippet && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.snippet}</p>}</a>))}</div>);
      // Bible search
      if (r.verses) return (<div className="space-y-2 max-h-80 overflow-y-auto">{r.verses.slice(0,10).map((v: any, i: number) => (<div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><p className="text-xs text-purple-400 mb-1">{v.reference}</p><p className="text-sm text-gray-300">{v.text || v.preview}</p></div>))}</div>);
      // Quran surah list
      if (r.data && Array.isArray(r.data) && r.data[0]?.name?.arabic) return (<div className="space-y-2 max-h-80 overflow-y-auto">{r.data.slice(0,20).map((s: any, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><span className="text-lg font-bold text-emerald-400 w-8 text-center">{s.number}</span><div className="flex-1"><p className="text-white text-sm">{s.name?.english || s.name}</p><p className="text-xs text-gray-500">{s.name?.arabic} · {s.verses} verses · {s.revelation}</p></div></div>))}</div>);
      // Player search
      if (Array.isArray(r) && r[0]?.name && r[0]?.team) return (<div className="space-y-2">{r.slice(0,10).map((p: any, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">{p.thumbnail && <img src={p.thumbnail} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-700" />}<div><p className="text-white text-sm">{p.name}</p><p className="text-xs text-gray-500">{p.team} · {p.sport}{p.nationality ? ` · ${p.nationality}` : ''}</p>{p.position && <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">{p.position}</span>}</div></div>))}</div>);
      // Team search
      if (Array.isArray(r) && r[0]?.name && r[0]?.stadium) return (<div className="space-y-2">{r.slice(0,10).map((t: any, i: number) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">{t.badge && <img src={t.badge} alt="" className="w-10 h-10 rounded-lg object-contain" />}<div><p className="text-white text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.stadium}{t.league ? ` · ${t.league}` : ''}</p></div></div>))}</div>);
      // Quran Audio
      if (typeof r === 'object' && !Array.isArray(r) && (Object.values(r) as any[])[0]?.source) { const tracks = (Object.values(r) as any[]).filter((t: any) => t.source).slice(0, 20); return (<div className="space-y-2 max-h-80 overflow-y-auto">{tracks.map((t: any, i: number) => (<div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><p className="text-white text-sm mb-2">{t.title || t.name}</p><AudioPlayer src={t.source} /></div>))}</div>); }
      // Book search
      if (Array.isArray(r) && r[0]?.title) return (<div className="space-y-2 max-h-80 overflow-y-auto">{r.slice(0,10).map((b: any, i: number) => (<div key={i} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"><p className="text-white text-sm">{b.title}</p><p className="text-xs text-gray-500">{b.authors?.map((a: any) => a.name).join(', ')}</p></div>))}</div>);
      // Generic
      return <pre className="bg-gray-800/80 rounded-xl p-4 text-sm text-gray-300 overflow-auto max-h-60">{JSON.stringify(r, null, 2)}</pre>;
    }

    // ─── Styled text ───
    if (tool.responseType === 'styled-text' && result.styles) return (<div className="space-y-2 max-h-96 overflow-y-auto pr-1">{result.styles.map((s: any, i: number) => (<div key={i} className="flex items-center justify-between gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 group"><div className="min-w-0 flex-1"><p className="text-[10px] text-gray-500 mb-0.5">{s.name}</p><p className="text-white text-sm break-all">{s.result}</p></div><button onClick={() => copyToClipboard(s.result)} className="p-1.5 text-gray-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"><Copy className="w-3.5 h-3.5" /></button></div>))}</div>);

    // ─── Download ───
    if (tool.responseType === 'download' && r) { const url = typeof r === 'string' ? r : r.audio || r.video || ''; if (!url) return <pre className="bg-gray-800/80 rounded-xl p-4 text-sm text-gray-300 overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>; return (<div className="p-5 bg-gray-800/50 rounded-xl border border-gray-700/50 text-center"><div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center`}><Download className={`w-7 h-7 ${colors.text}`} /></div><p className="text-white font-medium mb-1">File ready</p><a href={url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${tool.gradient} text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg ${colors.shadow}`}><Download className="w-5 h-5" /> Download</a></div>); }

    // ─── Search ───
    if (tool.responseType === 'search' && r) { const items = Array.isArray(r) ? r : r.items || []; if (!items.length) return <p className="text-gray-500 text-sm">No results found.</p>;
      if (tool.id === 'youtube-search') return (<div className="grid gap-3">{items.map((item: any, i: number) => (<button key={i} type="button" onClick={() => setYtModal({ title: item.title, thumbnail: item.thumbnail, url: item.url })} className="flex gap-4 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-fuchsia-500/30 transition-all group text-left w-full"><div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-700 relative"><img src={item.thumbnail} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all"><Download className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" /></div></div><div className="flex-1 min-w-0"><h4 className="text-sm font-medium text-white group-hover:text-fuchsia-300 transition-colors line-clamp-2 mb-1">{item.title}</h4><p className="text-xs text-gray-500">{item.views} views · {item.duration}</p></div></button>))}</div>);
      return (<div className="space-y-3">{items.map((item: any, i: number) => (<a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all group"><p className="text-xs text-cyan-500/70 mb-1 truncate">{item.displayLink}</p><h4 className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors mb-1" dangerouslySetInnerHTML={{ __html: item.htmlTitle || item.title }} /><p className="text-xs text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.htmlSnippet || item.snippet }} /></a>))}</div>);
    }

    return <pre className="bg-gray-800/80 rounded-xl p-4 text-sm text-gray-300 overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${tool.gradient}/20 border ${colors.border}`}><Icon className={`w-5 h-5 ${colors.text}`} /></div>
          <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
        </div>
        <p className="text-gray-500 text-sm ml-11">{tool.description}</p>
      </motion.div>

      {/* Chat-style form for AI tools */}
      {isChat ? (
        <div className="space-y-4">
          {chatMessages.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-gray-900/50 border ${colors.border} rounded-2xl p-5 backdrop-blur-sm`}>
              {renderResult()}
            </motion.div>
          )}

          <form onSubmit={(e) => { handleSubmit(e); }}
            className={`flex gap-2 bg-gray-900/50 border ${colors.border} rounded-2xl p-3 backdrop-blur-sm`}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={tool.params[0]?.placeholder || 'Type a message...'} disabled={loading}
              className="flex-1 px-4 py-2.5 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm" />
            <button type="submit" disabled={loading || !chatInput.trim()}
              className={`px-5 py-2.5 bg-gradient-to-r ${tool.gradient} text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
          </form>
        </div>
      ) : !tool.noInput ? (
        /* Standard form */
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className={`space-y-4 bg-gray-900/50 border ${colors.border} rounded-2xl p-5 backdrop-blur-sm`}>
          {tool.params.map((param) => (<div key={param.key}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{param.label}</label>
            {param.type === 'textarea' ? (
              <textarea value={formState[param.key]} onChange={(e) => setFormState(s => ({ ...s, [param.key]: e.target.value }))} placeholder={param.placeholder} rows={3} className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all resize-none" required={param.required} />
            ) : (
              <input type={param.type} value={formState[param.key]} onChange={(e) => setFormState(s => ({ ...s, [param.key]: e.target.value }))} placeholder={param.placeholder} className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all" required={param.required} />
            )}
            {param.type === 'url' && formState[param.key] && (<div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-gray-700/50"><img src={formState[param.key]} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /></div>)}
          </div>))}
          <button type="submit" disabled={loading} className={`w-full py-3 px-6 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${colors.shadow}`}>
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Icon className="w-5 h-5" /> {tool.name}</>}
          </button>
        </motion.form>
      ) : null}

      {/* Refresh for noInput tools */}
      {tool.noInput && result && (<div className="mb-4"><button onClick={() => handleSubmit()} disabled={loading} className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-lg ${colors.shadow}`}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Get Another</button></div>)}

      <AnimatePresence>
        {error && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</motion.div>}
        {loading && !result && !isChat && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-center justify-center py-16"><Loader2 className={`w-8 h-8 ${colors.text} animate-spin`} /></motion.div>}
        {result && !isChat && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`mt-6 bg-gray-900/50 border ${colors.border} rounded-2xl p-5 backdrop-blur-sm`}><h3 className="text-sm font-semibold text-white mb-4">Result</h3>{renderResult()}</motion.div>)}
      </AnimatePresence>
      <AnimatePresence>{ytModal && <YTDownloadModal video={ytModal} onClose={() => setYtModal(null)} />}</AnimatePresence>
    </div>
  );
}
