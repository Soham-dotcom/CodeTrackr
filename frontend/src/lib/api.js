const BASE = import.meta.env.VITE_API_BASE || 'https://<your-project>.vercel.app';
const TOKEN = import.meta.env.VITE_API_TOKEN; // optional

async function jfetch(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(TOKEN ? { "x-api-token": TOKEN } : {}),
      ...(options.headers || {})
    },
    ...options
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function saveActivity({ userId, codingTime, date = new Date(), source = "web" }) {
  return jfetch(`${BASE}/api/user-activity`, {
    method: "POST",
    body: JSON.stringify({ userId, codingTime, date, source })
  });
}

export function fetchUserHistory(userId) {
  return jfetch(`${BASE}/api/user-stats/${userId}`);
}

export function fetchUserSummary(userId) {
  return jfetch(`${BASE}/api/user-stats/${userId}/summary`);
}
