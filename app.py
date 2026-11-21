"""Flask server for the static site and the local AI endpoint.
Run: pip install flask && set AI_API_KEY=... && python app.py
PWA install needs HTTPS in production; localhost is OK for development."""
import os
import time
import json
from urllib import request as urlrequest
from urllib.error import HTTPError, URLError
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")

SYSTEM_PROMPT = (
    "You are a friendly writing assistant inside a document editor used by Cambodian students. "
    "Reply in the same language as the request (Khmer or English; if mixed, follow the main language). "
    "Write ONLY the content that should go into the document: no greetings, no markdown except lines "
    "starting with '# ' for headings and '- ' for bullet items. Use clear, formal, school-appropriate "
    "Khmer Unicode. If the request is a question, answer it directly and clearly."
)
rate_limits = {}


def post_json(url, headers, payload):
    body = json.dumps(payload).encode("utf-8")
    req = urlrequest.Request(url, data=body, headers=headers, method="POST")
    try:
        with urlrequest.urlopen(req, timeout=30) as response:
            return response.status, json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        try:
            data = json.loads(exc.read().decode("utf-8"))
        except Exception:
            data = {"error": str(exc)}
        return exc.code, data
    except URLError as exc:
        return 502, {"error": str(exc.reason)}


@app.route("/")
def index(): return send_from_directory(".", "index.html")
@app.route("/sw.js")
def sw():
    r = send_from_directory(".", "sw.js"); r.headers["Service-Worker-Allowed"] = "/"; return r


@app.route("/api/ai", methods=["POST"])
def ai():
    api_key = os.getenv("AI_API_KEY", "").strip()
    if not api_key:
        return jsonify(error="not_configured"), 503

    ip = request.headers.get("X-Forwarded-For", request.remote_addr or "x").split(",")[0].strip()
    now = time.time()
    limit = int(os.getenv("AI_RATE_PER_HOUR", "60"))
    recent = [t for t in rate_limits.get(ip, []) if now - t < 3600]
    if len(recent) >= limit:
        return jsonify(error="ប្រើច្រើនពេក សូមរង់ចាំបន្តិច"), 429
    recent.append(now)
    rate_limits[ip] = recent

    data = request.get_json(silent=True) or {}
    prompt = str(data.get("prompt", "")).strip()
    context = str(data.get("context", ""))[-1500:]
    title = str(data.get("title", ""))[:100]
    if not prompt or len(prompt) > 4000:
        return jsonify(error="សំណើមិនត្រឹមត្រូវ"), 400

    user = (
        ('Document "' + title + '" so far (for context only, do not repeat it):\n' + context + "\n\n")
        if context else ""
    ) + "Request:\n" + prompt
    provider = os.getenv("AI_PROVIDER", "gemini").strip().lower()
    model = os.getenv("AI_MODEL", "").strip()

    if provider == "anthropic":
        url = "https://api.anthropic.com/v1/messages"
        headers = {"x-api-key": api_key, "anthropic-version": "2023-06-01", "content-type": "application/json"}
        payload = {"model": model or "claude-3-5-haiku-latest", "max_tokens": 2000,
                   "system": SYSTEM_PROMPT, "messages": [{"role": "user", "content": user}]}
        status, response = post_json(url, headers, payload)
        text = "".join(part.get("text", "") for part in response.get("content", []))
    elif provider in ("openai", "groq", "openrouter"):
        base = os.getenv("AI_BASE_URL", "").strip()
        if not base:
            base = {
                "groq": "https://api.groq.com/openai/v1",
                "openrouter": "https://openrouter.ai/api/v1",
            }.get(provider, "https://api.openai.com/v1")
        if not model:
            model = {"groq": "llama-3.3-70b-versatile",
                     "openrouter": "google/gemma-3-27b-it:free",
                     "openai": "gpt-4o-mini"}[provider]
        headers = {"Authorization": "Bearer " + api_key, "Content-Type": "application/json"}
        if provider == "openrouter":
            headers["HTTP-Referer"] = "http://localhost:5000"
            headers["X-Title"] = "Khmer Word"
        payload = {"model": model, "max_tokens": 2000,
                   "messages": [{"role": "system", "content": SYSTEM_PROMPT},
                                {"role": "user", "content": user}]}
        status, response = post_json(base.rstrip("/") + "/chat/completions", headers, payload)
        choices = response.get("choices") or []
        text = choices[0].get("message", {}).get("content", "") if choices else ""
    else:
        model = model or "gemini-flash-latest"
        url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent"
        headers = {"x-goog-api-key": api_key, "Content-Type": "application/json"}
        payload = {"systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
                   "contents": [{"role": "user", "parts": [{"text": user}]}],
                   "generationConfig": {"maxOutputTokens": 4000}}
        status, response = post_json(url, headers, payload)
        candidates = response.get("candidates") or []
        parts = candidates[0].get("content", {}).get("parts", []) if candidates else []
        text = "".join(part.get("text", "") for part in parts)

    if status >= 400 or not text:
        error = response.get("error")
        if isinstance(error, dict):
            error = error.get("message") or error
        return jsonify(error=str(error or "AI error")), 502
    return jsonify(text=text.strip())


if __name__ == "__main__": app.run(host="0.0.0.0", port=8000)
