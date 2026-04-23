export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { endpoint, params, extraParams } = req.body;
      if (!endpoint) return res.status(400).json({ error: 'Endpoint is required' });

      const url = new URL(endpoint);

      // Add extraParams first (e.g. apikey=keith)
      if (extraParams) {
        Object.entries(extraParams).forEach(([k, v]) => {
          url.searchParams.set(k, String(v));
        });
      }

      // Then add user params
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== '') {
            url.searchParams.set(k, String(v));
          }
        });
      }

      const response = await fetch(url.toString(), { signal: AbortSignal.timeout(55000) });
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('image/')) {
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return res.status(200).json({ image: `data:${contentType};base64,${base64}`, type: 'direct' });
      }

      const data = await response.json();

      // If result contains an image URL, fetch and return as base64
      if (data.result) {
        const imgUrl = typeof data.result === 'string' ? data.result : data.result.image || data.result.url || null;
        if (imgUrl && (imgUrl.startsWith('http') || imgUrl.startsWith('data:'))) {
          try {
            const imgRes = await fetch(imgUrl, { signal: AbortSignal.timeout(30000) });
            const imgContentType = imgRes.headers.get('content-type') || 'image/png';
            if (imgContentType.includes('image/')) {
              const arrayBuffer = await imgRes.arrayBuffer();
              const base64 = Buffer.from(arrayBuffer).toString('base64');
              return res.status(200).json({ image: `data:${imgContentType};base64,${base64}`, type: 'direct' });
            }
          } catch (e) {
            // If image fetch fails, just return the URL as-is
          }
        }
      }

      return res.status(200).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
}
