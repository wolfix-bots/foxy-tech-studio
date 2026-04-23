import supabase from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { prompt, imageUrl } = req.body;
      if (!prompt || !imageUrl) return res.status(400).json({ error: 'Prompt and image URL are required' });

      const apiURL = `https://apiskeith.top/ai/imageedit?q=${encodeURIComponent(prompt)}&url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(apiURL);
      const contentType = response.headers.get('content-type') || '';

      let resultData;
      let resultUrl = null;

      if (contentType.includes('image/')) {
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const dataUrl = `data:${contentType};base64,${base64}`;
        resultData = { image: dataUrl, type: 'direct' };
        resultUrl = dataUrl;
      } else {
        const data = await response.json();
        resultUrl = data.image || data.url || data.result || null;
        if (typeof resultUrl !== 'string') resultUrl = JSON.stringify(resultUrl);
        resultData = data;
      }

      try {
        await supabase.from('image_history').insert({
          type: 'edit',
          prompt,
          input_url: imageUrl,
          result_url: resultUrl ? resultUrl.substring(0, 5000) : null
        });
      } catch (dbErr) {
        console.error('DB save error:', dbErr);
      }

      return res.status(200).json(resultData);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Image edit error:', err);
    res.status(500).json({ error: err.message });
  }
}
