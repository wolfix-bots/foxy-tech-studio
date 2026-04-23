export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  category: string;
  endpoint: string;
  params: { key: string; label: string; type: 'url' | 'text' | 'textarea'; placeholder: string; required: boolean }[];
  responseType: 'image' | 'text' | 'search' | 'download' | 'json' | 'styled-text' | 'random' | 'meme' | 'chat';
  examplePrompts?: string[];
  noInput?: boolean;
}

export const tools: ToolConfig[] = [
  // ─── AI Image ───
  {
    id: 'magic-studio',
    name: 'Magic Studio',
    description: 'Generate images from text descriptions',
    icon: 'Sparkles',
    color: 'fuchsia',
    gradient: 'from-fuchsia-500 to-purple-500',
    category: 'ai-image',
    endpoint: 'https://apiskeith.top/ai/magicstudio',
    params: [
      { key: 'prompt', label: 'Describe Your Image', type: 'textarea', placeholder: 'A futuristic city at night with neon lights...', required: true },
    ],
    responseType: 'image',
    examplePrompts: ['A futuristic city at night with neon lights', 'A cat astronaut floating in space', 'Cyberpunk samurai in the rain', 'A serene Japanese garden in autumn'],
  },
  {
    id: 'flux-img',
    name: 'Flux Image Gen',
    description: 'High quality AI image generation with aspect ratios',
    icon: 'ImagePlus',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    category: 'ai-image',
    endpoint: 'https://api.giftedtech.co.ke/api/ai/fluximg',
    params: [
      { key: 'prompt', label: 'Describe Your Image', type: 'textarea', placeholder: 'A beautiful sunset over mountains...', required: true },
      { key: 'ratio', label: 'Aspect Ratio', type: 'text', placeholder: '1:1, 16:9, 9:16, 4:3', required: false },
    ],
    responseType: 'json',
    examplePrompts: ['1:1', '16:9', '9:16', '4:3'],
  },
  {
    id: 'photo-editor',
    name: 'Photo Editor',
    description: 'AI-powered photo editing with prompts',
    icon: 'Wand2',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    category: 'ai-image',
    endpoint: 'https://api.giftedtech.co.ke/api/tools/photoeditor',
    params: [
      { key: 'url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/photo.jpg', required: true },
      { key: 'prompt', label: 'Edit Command', type: 'text', placeholder: 'e.g. make him brown, add sunglasses', required: true },
    ],
    responseType: 'json',
  },
  {
    id: 'remove-bg',
    name: 'Remove Background',
    description: 'Instantly remove backgrounds from any image',
    icon: 'Eraser',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    category: 'ai-image',
    endpoint: 'https://api.giftedtech.co.ke/api/tools/removebg',
    params: [
      { key: 'url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/photo.jpg', required: true },
    ],
    responseType: 'json',
  },
  {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    description: 'Enhance and upscale images with AI models',
    icon: 'Maximize2',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    category: 'ai-image',
    endpoint: 'https://api.giftedtech.co.ke/api/tools/imageupscaler',
    params: [
      { key: 'url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/photo.jpg', required: true },
      { key: 'model', label: 'Model', type: 'text', placeholder: 'upscale, unblur, enhance, portrait, old_photo', required: false },
    ],
    responseType: 'json',
    examplePrompts: ['upscale', 'unblur', 'enhance', 'portrait', 'old_photo', 'text_enhance'],
  },
  {
    id: 'watermark-remover',
    name: 'Watermark Remover',
    description: 'Remove watermarks from images',
    icon: 'DropletOff',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    category: 'ai-image',
    endpoint: 'https://api.giftedtech.co.ke/api/tools/watermarkremover',
    params: [
      { key: 'url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/photo.jpg', required: true },
    ],
    responseType: 'json',
  },

  // ─── AI Chat ───
  {
    id: 'gpt',
    name: 'GPT Chat',
    description: 'Chat with GPT AI assistant',
    icon: 'MessageSquare',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    category: 'ai-chat',
    endpoint: 'https://apiskeith.top/ai/gpt',
    params: [{ key: 'q', label: 'Your Message', type: 'text', placeholder: 'Ask me anything...', required: true }],
    responseType: 'chat',
  },
  {
    id: 'gpt4',
    name: 'GPT-4 Chat',
    description: 'Chat with the powerful GPT-4 model',
    icon: 'Brain',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    category: 'ai-chat',
    endpoint: 'https://apiskeith.top/ai/gpt4',
    params: [{ key: 'q', label: 'Your Message', type: 'text', placeholder: 'Ask me anything advanced...', required: true }],
    responseType: 'chat',
  },
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    description: 'Chat with GPT-4o via GiftedTech',
    icon: 'Zap',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    category: 'ai-chat',
    endpoint: 'https://api.giftedtech.co.ke/api/ai/gpt4o',
    params: [{ key: 'q', label: 'Your Message', type: 'text', placeholder: 'Ask me anything...', required: true }],
    responseType: 'chat',
  },
  {
    id: 'gemini',
    name: 'Gemini Chat',
    description: 'Chat with Google Gemini AI',
    icon: 'Sparkles',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    category: 'ai-chat',
    endpoint: 'https://api.giftedtech.co.ke/api/ai/gemini',
    params: [{ key: 'q', label: 'Your Message', type: 'text', placeholder: 'Ask Gemini anything...', required: true }],
    responseType: 'chat',
  },

  // ─── Search ───
  {
    id: 'google-search', name: 'Google Search', description: 'Search the web with Google',
    icon: 'Search', color: 'cyan', gradient: 'from-cyan-500 to-sky-500', category: 'search',
    endpoint: 'https://apiskeith.top/search/google',
    params: [{ key: 'q', label: 'Search Query', type: 'text', placeholder: 'Search anything...', required: true }],
    responseType: 'search',
  },
  {
    id: 'youtube-search', name: 'YouTube Search', description: 'Search for videos on YouTube',
    icon: 'Play', color: 'red', gradient: 'from-red-500 to-rose-500', category: 'search',
    endpoint: 'https://apiskeith.top/search/yts',
    params: [{ key: 'q', label: 'Search Query', type: 'text', placeholder: 'Search YouTube videos...', required: true }],
    responseType: 'search',
  },

  // ─── Download ───
  {
    id: 'yt-video', name: 'YouTube Video', description: 'Download YouTube videos as MP4',
    icon: 'Download', color: 'fuchsia', gradient: 'from-fuchsia-500 to-pink-500', category: 'download',
    endpoint: 'https://api.giftedtech.co.ke/api/download/ytmp4',
    params: [{ key: 'url', label: 'YouTube URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...', required: true }],
    responseType: 'download',
  },
  {
    id: 'yt-audio', name: 'YouTube Audio', description: 'Download YouTube audio as MP3',
    icon: 'Music', color: 'purple', gradient: 'from-purple-500 to-fuchsia-500', category: 'download',
    endpoint: 'https://api.giftedtech.co.ke/api/download/ytmp3',
    params: [{ key: 'url', label: 'YouTube URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=...', required: true }],
    responseType: 'download',
  },

  // ─── Education ───
  { id: 'dictionary', name: 'Dictionary', description: 'Get full word definitions and audio pronunciation', icon: 'BookOpen', color: 'cyan', gradient: 'from-cyan-500 to-blue-500', category: 'education', endpoint: 'https://apiskeith.top/education/dictionary', params: [{ key: 'q', label: 'Word', type: 'text', placeholder: 'e.g. serendipity', required: true }], responseType: 'json' },
  { id: 'physics-ai', name: 'Physics AI', description: 'Ask AI any physics question', icon: 'Atom', color: 'blue', gradient: 'from-blue-500 to-indigo-500', category: 'education', endpoint: 'https://apiskeith.top/education/physics', params: [{ key: 'q', label: 'Your Question', type: 'text', placeholder: "e.g. What is Newton's law?", required: true }], responseType: 'chat' },
  { id: 'grammar-check', name: 'Grammar Check', description: 'Check and fix grammar in your text', icon: 'CheckCircle', color: 'emerald', gradient: 'from-emerald-500 to-teal-500', category: 'education', endpoint: 'https://apiskeith.top/grammarcheck', params: [{ key: 'q', label: 'Text to Check', type: 'textarea', placeholder: 'Enter text to check...', required: true }], responseType: 'json' },
  { id: 'fruit-info', name: 'Fruit Science', description: 'Get scientific analysis of fruits', icon: 'Apple', color: 'green', gradient: 'from-green-500 to-emerald-500', category: 'education', endpoint: 'https://apiskeith.top/education/fruit', params: [{ key: 'q', label: 'Fruit Name', type: 'text', placeholder: 'e.g. lemon, mango', required: true }], responseType: 'json', examplePrompts: ['lemon', 'mango', 'banana', 'strawberry'] },
  { id: 'book-search', name: 'Book Search', description: 'Search books for educational content', icon: 'Library', color: 'amber', gradient: 'from-amber-500 to-orange-500', category: 'education', endpoint: 'https://apiskeith.top/education/booksearch', params: [{ key: 'q', label: 'Book Title', type: 'text', placeholder: 'e.g. 1984', required: true }], responseType: 'json' },
  { id: 'random-poem', name: 'Random Poem', description: 'Get a random poem', icon: 'Feather', color: 'pink', gradient: 'from-pink-500 to-rose-500', category: 'education', endpoint: 'https://apiskeith.top/education/randompoem', params: [], responseType: 'random', noInput: true },

  // ─── Fun ───
  { id: 'fun-fact', name: 'Random Fact', description: 'Get a random fun fact', icon: 'Lightbulb', color: 'amber', gradient: 'from-amber-500 to-yellow-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/fact', params: [], responseType: 'random', noInput: true },
  { id: 'fun-joke', name: 'Random Joke', description: 'Get a random joke', icon: 'Laugh', color: 'fuchsia', gradient: 'from-fuchsia-500 to-pink-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/jokes', params: [], responseType: 'random', noInput: true },
  { id: 'fun-quote', name: 'Random Quote', description: 'Get an inspiring random quote', icon: 'Quote', color: 'purple', gradient: 'from-purple-500 to-violet-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/quote', params: [], responseType: 'random', noInput: true },
  { id: 'fun-meme', name: 'Random Meme', description: 'Get a random meme image', icon: 'Smile', color: 'cyan', gradient: 'from-cyan-500 to-teal-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/meme', params: [], responseType: 'meme', noInput: true },
  { id: 'fun-truth', name: 'Truth', description: 'Get a random truth question', icon: 'Eye', color: 'red', gradient: 'from-red-500 to-orange-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/truth', params: [], responseType: 'random', noInput: true },
  { id: 'fun-dare', name: 'Dare', description: 'Get a random dare', icon: 'Flame', color: 'orange', gradient: 'from-orange-500 to-red-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/dare', params: [], responseType: 'random', noInput: true },
  { id: 'fun-pickup', name: 'Pickup Line', description: 'Get a random pickup line', icon: 'Heart', color: 'pink', gradient: 'from-pink-500 to-red-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/pickuplines', params: [], responseType: 'random', noInput: true },
  { id: 'fun-wyr', name: 'Would You Rather', description: 'Get a random would you rather', icon: 'Shuffle', color: 'emerald', gradient: 'from-emerald-500 to-cyan-500', category: 'fun', endpoint: 'https://apiskeith.top/fun/would-you-rather', params: [], responseType: 'random', noInput: true },

  // ─── Sports ───
  { id: 'epl-standings', name: 'EPL Standings', description: 'Current Premier League standings', icon: 'Trophy', color: 'purple', gradient: 'from-purple-500 to-indigo-500', category: 'sports', endpoint: 'https://apiskeith.top/epl/standings', params: [], responseType: 'json', noInput: true },
  { id: 'epl-scorers', name: 'EPL Top Scorers', description: 'Premier League top scorers', icon: 'Target', color: 'red', gradient: 'from-red-500 to-rose-500', category: 'sports', endpoint: 'https://apiskeith.top/epl/scorers', params: [], responseType: 'json', noInput: true },
  { id: 'epl-matches', name: 'EPL Matches', description: 'Premier League match details', icon: 'Swords', color: 'cyan', gradient: 'from-cyan-500 to-blue-500', category: 'sports', endpoint: 'https://apiskeith.top/epl/matches', params: [], responseType: 'json', noInput: true },
  { id: 'livescore', name: 'Live Scores', description: 'Current football live scores', icon: 'Radio', color: 'green', gradient: 'from-green-500 to-emerald-500', category: 'sports', endpoint: 'https://apiskeith.top/livescore', params: [], responseType: 'json', noInput: true },
  { id: 'player-search', name: 'Player Search', description: 'Search for any sport player', icon: 'UserSearch', color: 'blue', gradient: 'from-blue-500 to-cyan-500', category: 'sports', endpoint: 'https://apiskeith.top/sport/playersearch', params: [{ key: 'q', label: 'Player Name', type: 'text', placeholder: 'e.g. Messi, Saka', required: true }], responseType: 'json' },
  { id: 'team-search', name: 'Team Search', description: 'Search for any sport team', icon: 'Users', color: 'fuchsia', gradient: 'from-fuchsia-500 to-purple-500', category: 'sports', endpoint: 'https://apiskeith.top/sport/teamsearch', params: [{ key: 'q', label: 'Team Name', type: 'text', placeholder: 'e.g. Arsenal', required: true }], responseType: 'json' },

  // ─── News ───
  { id: 'bbc-news', name: 'BBC News', description: 'Get latest BBC news', icon: 'Newspaper', color: 'red', gradient: 'from-red-500 to-rose-500', category: 'news', endpoint: 'https://apiskeith.top/news/bbc', params: [], responseType: 'json', noInput: true },
  { id: 'tech-news', name: 'Tech News', description: 'Get latest technology news', icon: 'Cpu', color: 'cyan', gradient: 'from-cyan-500 to-blue-500', category: 'news', endpoint: 'https://apiskeith.top/news/tech', params: [], responseType: 'json', noInput: true },
  { id: 'football-news', name: 'Football News', description: 'Get latest football news', icon: 'Dribbble', color: 'green', gradient: 'from-green-500 to-emerald-500', category: 'news', endpoint: 'https://apiskeith.top/football/news', params: [], responseType: 'json', noInput: true },

  // ─── Spiritual ───
  { id: 'bible-search', name: 'Bible Search', description: 'Search the Bible for verses', icon: 'BookOpen', color: 'purple', gradient: 'from-purple-500 to-indigo-500', category: 'spiritual', endpoint: 'https://apiskeith.top/bible/search', params: [{ key: 'q', label: 'Search Topic', type: 'text', placeholder: 'e.g. love, faith', required: true }], responseType: 'json' },
  { id: 'ai-bible', name: 'AI Bible', description: 'Ask AI questions about the Bible', icon: 'Sparkles', color: 'blue', gradient: 'from-blue-500 to-purple-500', category: 'spiritual', endpoint: 'https://apiskeith.top/ai/bible', params: [{ key: 'q', label: 'Your Question', type: 'text', placeholder: 'e.g. Who is God?', required: true }], responseType: 'chat' },
  { id: 'quran-surah', name: 'Quran Surah', description: 'Get Quran surah by number', icon: 'Moon', color: 'emerald', gradient: 'from-emerald-500 to-teal-500', category: 'spiritual', endpoint: 'https://apiskeith.top/surah', params: [{ key: 'q', label: 'Surah Number (1-114)', type: 'text', placeholder: 'e.g. 1, 36, 55', required: true }], responseType: 'json', examplePrompts: ['1', '2', '36', '55', '67', '112'] },
  { id: 'ai-muslim', name: 'AI Muslim', description: 'Ask AI questions about Islam', icon: 'Star', color: 'amber', gradient: 'from-amber-500 to-green-500', category: 'spiritual', endpoint: 'https://apiskeith.top/ai/muslim', params: [{ key: 'q', label: 'Your Question', type: 'text', placeholder: 'e.g. Who is Allah?', required: true }], responseType: 'chat' },

  // ─── Tools ───
  { id: 'translate', name: 'Translate', description: 'Translate text into different languages', icon: 'Languages', color: 'emerald', gradient: 'from-emerald-500 to-cyan-500', category: 'tools', endpoint: 'https://apiskeith.top/translate', params: [{ key: 'text', label: 'Text to Translate', type: 'textarea', placeholder: 'Enter text...', required: true }, { key: 'to', label: 'Target Language', type: 'text', placeholder: 'es, fr, de, zh, ja', required: true }], responseType: 'json', examplePrompts: ['es', 'fr', 'de', 'zh', 'ja', 'ar', 'ko'] },
  { id: 'url-shortener', name: 'URL Shortener', description: 'Shorten long URLs with TinyURL', icon: 'Link', color: 'cyan', gradient: 'from-cyan-500 to-teal-500', category: 'tools', endpoint: 'https://apiskeith.top/shortener/tinyurl', params: [{ key: 'url', label: 'URL to Shorten', type: 'url', placeholder: 'https://example.com/long-url', required: true }], responseType: 'json' },
  { id: 'fancy-text', name: 'Fancy Text', description: 'Convert text into fancy styled fonts', icon: 'Type', color: 'pink', gradient: 'from-pink-500 to-fuchsia-500', category: 'tools', endpoint: 'https://apiskeith.top/fancytext/styles', params: [{ key: 'q', label: 'Your Text', type: 'text', placeholder: 'Type something cool...', required: true }], responseType: 'styled-text' },
  { id: 'ascii-art', name: 'ASCII Art', description: 'Generate ASCII art from keywords', icon: 'Code', color: 'amber', gradient: 'from-amber-500 to-orange-500', category: 'tools', endpoint: 'https://apiskeith.top/tools/ascii', params: [{ key: 'q', label: 'Keyword', type: 'text', placeholder: 'e.g. dragon, cat', required: true }], responseType: 'text', examplePrompts: ['dragon', 'cat', 'skull', 'rose'] },
  { id: 'js-encrypt', name: 'JS Encrypt', description: 'Encrypt JavaScript code', icon: 'Lock', color: 'red', gradient: 'from-red-500 to-orange-500', category: 'tools', endpoint: 'https://apiskeith.top/tools/encrypt', params: [{ key: 'q', label: 'JavaScript Code', type: 'textarea', placeholder: 'console.log("Hello")', required: true }], responseType: 'text' },
  { id: 'whatsapp-check', name: 'WhatsApp Check', description: 'Check if a phone number is on WhatsApp', icon: 'Smartphone', color: 'emerald', gradient: 'from-emerald-500 to-green-500', category: 'tools', endpoint: 'https://apiskeith.top/onwhatsapp', params: [{ key: 'q', label: 'Phone Number', type: 'text', placeholder: 'e.g. 254796299159', required: true }], responseType: 'json' },
  { id: 'wa-link', name: 'WhatsApp Link', description: 'Create a WhatsApp direct message link', icon: 'MessageCircle', color: 'green', gradient: 'from-green-500 to-teal-500', category: 'tools', endpoint: 'https://apiskeith.top/tools/walink', params: [{ key: 'number', label: 'Phone Number', type: 'text', placeholder: 'e.g. 254748387615', required: true }, { key: 'q', label: 'Pre-filled Message', type: 'text', placeholder: 'e.g. Hi there!', required: false }], responseType: 'json' },
  { id: 'vocal-remover', name: 'Vocal Remover', description: 'Separate vocals and instruments from audio', icon: 'MicOff', color: 'fuchsia', gradient: 'from-fuchsia-500 to-purple-500', category: 'tools', endpoint: 'https://api.giftedtech.co.ke/api/tools/vocalremover', params: [{ key: 'url', label: 'Audio URL (MP3)', type: 'url', placeholder: 'https://example.com/audio.mp3', required: true }], responseType: 'json' },
];

export const categories = [
  { id: 'ai-image', name: 'AI Image', icon: 'Image' },
  { id: 'ai-chat', name: 'AI Chat', icon: 'MessageSquare' },
  { id: 'search', name: 'Search', icon: 'Search' },
  { id: 'download', name: 'Download', icon: 'Download' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'fun', name: 'Fun', icon: 'Laugh' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'news', name: 'News', icon: 'Newspaper' },
  { id: 'spiritual', name: 'Spiritual', icon: 'Sparkles' },
  { id: 'tools', name: 'Tools', icon: 'Wrench' },
];

export const catMeta: Record<string, { color: string; gradient: string; description: string }> = {
  'ai-image': { color: 'fuchsia', gradient: 'from-fuchsia-500 to-purple-500', description: 'Generate, edit, upscale & transform images' },
  'ai-chat': { color: 'emerald', gradient: 'from-emerald-500 to-teal-500', description: 'Chat with powerful AI assistants' },
  search: { color: 'blue', gradient: 'from-blue-500 to-indigo-500', description: 'Search the web and find videos' },
  download: { color: 'fuchsia', gradient: 'from-fuchsia-500 to-pink-500', description: 'Download videos and audio from YouTube' },
  education: { color: 'cyan', gradient: 'from-cyan-500 to-blue-500', description: 'Dictionary, physics, grammar, books & more' },
  fun: { color: 'amber', gradient: 'from-amber-500 to-orange-500', description: 'Jokes, memes, facts, truths & dares' },
  sports: { color: 'green', gradient: 'from-green-500 to-emerald-500', description: 'EPL, live scores, player & team search' },
  news: { color: 'red', gradient: 'from-red-500 to-rose-500', description: 'BBC, tech & football news' },
  spiritual: { color: 'purple', gradient: 'from-purple-500 to-indigo-500', description: 'Bible, Quran & AI faith assistants' },
  tools: { color: 'amber', gradient: 'from-amber-500 to-orange-500', description: 'Translate, shorten URLs, fancy text & more' },
};

export function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string; bgLight: string; shadow: string }> = {
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', bgLight: 'bg-cyan-500/5', shadow: 'shadow-cyan-500/20' },
    fuchsia: { text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', bgLight: 'bg-fuchsia-500/5', shadow: 'shadow-fuchsia-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', bgLight: 'bg-purple-500/5', shadow: 'shadow-purple-500/20' },
    pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30', bgLight: 'bg-pink-500/5', shadow: 'shadow-pink-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', bgLight: 'bg-emerald-500/5', shadow: 'shadow-emerald-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', bgLight: 'bg-amber-500/5', shadow: 'shadow-amber-500/20' },
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', bgLight: 'bg-red-500/5', shadow: 'shadow-red-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', bgLight: 'bg-blue-500/5', shadow: 'shadow-blue-500/20' },
    green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', bgLight: 'bg-green-500/5', shadow: 'shadow-green-500/20' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', bgLight: 'bg-orange-500/5', shadow: 'shadow-orange-500/20' },
  };
  return map[color] || map.cyan;
}
