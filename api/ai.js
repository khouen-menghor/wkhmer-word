// Vercel serverless function: free-to-use AI for students (no login). The API key stays on the server.
// Env vars: AI_API_KEY (required), AI_PROVIDER = gemini (default) | anthropic | openai | groq | openrouter, AI_MODEL (optional), AI_BASE_URL (openai-compatible), AI_RATE_PER_HOUR (default 60 per IP)
const SYS = "You are a friendly writing assistant inside a document editor used by Cambodian students. Reply in the same language as the request (Khmer or English; if mixed, follow the main language). Write ONLY the content that should go into the document: no greetings, no talk about what you are doing, no markdown except lines starting with '# ' for headings and '- ' for bullet items. Use clear, formal, school-appropriate writing with correct Khmer Unicode. If the request is a question, answer it directly and clearly. Keep it under about 600 words unless asked for more.";
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const K = process.env.AI_API_KEY;
  if (!K) return res.status(503).json({ error: 'not_configured' });
  const ip = (req.headers['x-forwarded-for'] || 'x').split(',')[0].trim(), now = Date.now(), lim = +process.env.AI_RATE_PER_HOUR || 60;
  const rl = (globalThis.__rl = globalThis.__rl || {}); rl[ip] = (rl[ip] || []).filter(t => now - t < 36e5);
  if (rl[ip].length >= lim) return res.status(429).json({ error: 'ប្រើច្រើនពេក សូមរង់ចាំបន្តិច' });
  rl[ip].push(now);
  const { prompt = '', context = '', title = '' } = req.body || {};
  if (!String(prompt).trim() || String(prompt).length > 4000) return res.status(400).json({ error: 'សំណើមិនត្រឹមត្រូវ' });
  const user = (context ? 'Document "' + String(title).slice(0, 100) + '" so far (for context only, do not repeat it):\n' + String(context).slice(-1500) + '\n\n' : '') + 'Request:\n' + prompt;
  const P = (process.env.AI_PROVIDER || 'gemini').toLowerCase(), M = process.env.AI_MODEL;
  try {
    let r, j, text;
    if (P === 'anthropic') {
      r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': K, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify({ model: M || 'claude-haiku-5-5', max_tokens: 2000, system: SYS, messages: [{ role: 'user', content: user }] }) });
      j = await r.json(); text = (j.content || []).map(c => c.text || '').join('');
    } else if (P === 'openai' || P === 'groq' || P === 'openrouter') {
      const base = process.env.AI_BASE_URL || (P === 'groq' ? 'https://api.groq.com/openai/v1' : P === 'openrouter' ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1');
      const model = M || (P === 'groq' ? 'llama-3.3-70b-versatile' : P === 'openrouter' ? 'google/gemma-3-27b-it:free' : 'gpt-4o-mini');
      const headers = { Authorization: 'Bearer ' + K, 'content-type': 'application/json' };
      if (P === 'openrouter') { headers['HTTP-Referer'] = 'https://khmer-word.vercel.app'; headers['X-Title'] = 'Khmer Word'; }
      r = await fetch(base + '/chat/completions', { method: 'POST', headers, body: JSON.stringify({ model, max_tokens: 2000, messages: [{ role: 'system', content: SYS }, { role: 'user', content: user }] }) });
      j = await r.json(); text = j.choices && j.choices[0] && j.choices[0].message.content;
    } else {
      r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + (M || 'gemini-flash-latest') + ':generateContent', { method: 'POST', headers: { 'x-goog-api-key': K, 'content-type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: SYS }] }, contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { maxOutputTokens: 4000 } }) });
      j = await r.json(); text = (((j.candidates || [])[0] || {}).content || { parts: [] }).parts.map(p => p.text || '').join('');
    }
    if (!r.ok || !text) return res.status(502).json({ error: (j.error && (j.error.message || j.error)) || 'AI error' });
    res.status(200).json({ text: text.trim() });
  } catch (e) { res.status(502).json({ error: 'AI service error' }); }
};
