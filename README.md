# Foxy Tech Studio

The ultimate AI-powered multi-tool web app. AI chat, image generation, education, fun, sports, news, spiritual tools, and more — all in one place.

## Features

- 🎨 AI Image Generation (Magic Studio)
- 🤖 AI Chat (GPT, GPT-4, Gemini)
- 🔍 Search (Google, YouTube)
- ⬇️ Download (YouTube Video/Audio)
- 🎓 Education (Dictionary, Physics AI, Grammar, Fruit Science, Books, Poems)
- 🎮 Fun (Jokes, Memes, Facts, Truth/Dare, Quotes, Pickup Lines)
- ⚽ Sports (EPL Standings/Scorers/Matches, Live Scores, Player/Team Search, Bet Tips)
- 📰 News (BBC, Tech, Football, Kenyan)
- 🕊️ Spiritual (Bible Search, AI Bible, Quran, AI Muslim, Quran Audio)
- 🔧 Tools (Translate, URL Shortener, Fancy Text, ASCII Art, JS Encrypt, WhatsApp)

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- Supabase (database)

## Deployment

### Vercel
```bash
npm install
npm run build
# Deploy with: vercel
```

### Render
```bash
# Build Command: npm run build
# Start Command: npm run preview -- --host 0.0.0.0 --port $PORT
```

### VPS / Docker
```bash
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 3000
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key

## License

MIT
