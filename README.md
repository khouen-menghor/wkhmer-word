# Khmer Word – Khmer & English student document editor
Mobile-first, Khmer-default, offline PWA. No database, no accounts; documents live in the browser's IndexedDB.

## Run
Windows PowerShell:
    py -m pip install -r requirements.txt
    $env:AI_API_KEY="your_key"
    $env:AI_PROVIDER="gemini"
    py app.py
Open http://localhost:8000 . Deploy over HTTPS (any static host, or app.py behind HTTPS) for PWA install on phones.

## Files
index.html, style.css, app.js (editor, IndexedDB, autosave, backup, docx export), sw.js + manifest.json (PWA),
vendor/docx.js (docx 8.5.0, local), fonts/ (Noto Sans/Serif Khmer, OFL), app.py (optional static Flask server).

## Notes
- Word export is generated in the browser (works offline).
- Select an inserted image to resize it with the size buttons or corner handle, crop its edges, move it by selecting **Move** and tapping a new position, or delete it.
- On iPhone/iPad, after PDF generation tap **Share / Save to Files** and select **Save to Files** in the iOS Share sheet. This share action runs directly from the tap, as required by Safari. The alternate **Open / Download PDF** button uses Safari's file handling.
- Bundled Khmer fonts: Noto Sans/Serif Khmer. Khmer OS fonts, Calibri, Aptos are proprietary and not bundled; to add a font, put a .woff2 in fonts/, add @font-face in style.css, an entry in FONTS (app.js) and the file in sw.js.
- Fonts are not embedded in the .docx; other devices need the font installed.
- Test checklist: type the Khmer/English sample, refresh, go offline, export docx/PDF, backup/restore on another browser.

## Deploy to Vercel (students open one link)
1. Upload this folder to a GitHub repo, then vercel.com → Add New → Project → import it. Framework Preset: **Other**; leave Build Command and Output Directory empty. Deploy.
2. Or with the CLI: `npm i -g vercel` then `vercel --prod` inside this folder.
vercel.json sets service-worker headers; .vercelignore keeps the optional Flask files out. Vercel gives HTTPS, so students can "Add to Home Screen" and use it offline.

## AI writing assistant (✨ AI button)
Students need no login. The call goes to `api/ai.js` (Vercel serverless function), so your API key is never exposed.
In Vercel → Project → Settings → Environment Variables add:
- `AI_API_KEY` – your key (free option: Google AI Studio / Gemini key at aistudio.google.com)
- `AI_PROVIDER` – `gemini` (default), `groq`, `openrouter`, `anthropic` or `openai`
- `AI_MODEL` – optional provider model name
- `AI_RATE_PER_HOUR` – optional per-student limit (default 60)
Then redeploy. Free tiers have their own quotas, so "unlimited" depends on your provider; paid keys are billed to you.
Locally (python http.server) the AI button shows "not connected" – that is expected.
