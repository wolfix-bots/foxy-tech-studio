import supabase from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('custom_tools')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { name, description, endpoint, icon, color, inputType, promptLabel, promptParam, imageParam } = req.body;
      if (!name || !endpoint) return res.status(400).json({ error: 'Name and endpoint are required' });
      const { data, error } = await supabase
        .from('custom_tools')
        .insert({ name, description, endpoint, icon, color, input_type: inputType, prompt_label: promptLabel, prompt_param: promptParam, image_param: imageParam })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      const { error } = await supabase.from('custom_tools').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Custom tools error:', err);
    res.status(500).json({ error: err.message });
  }
}
