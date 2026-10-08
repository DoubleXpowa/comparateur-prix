// Service worker — Comparateur de prix
// La page HTML est toujours demandée au réseau d'abord (copie en cache si hors ligne),
// donc une nouvelle version publiée est visible au prochain lancement, sans bricolage.
// Changer VERSION quand les polices ou icônes changent.
const VERSION = '2.0.0';
const CACHE = `comparateur-prix-${VERSION}`;
const PRECACHE = [
  './comparateur_prix.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fonts/bsc-500.woff2',
  './fonts/bsc-600.woff2',
  './fonts/bsc-700.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isPage(req, url) {
  return req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('manifest.json');
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000); // réseau du magasin pourri → on bascule sur le cache
    const res = await fetch(req, { signal: ctrl.signal, cache: 'no-cache' });
    clearTimeout(timer);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req, { ignoreSearch: true }))
      || (await cache.match('./comparateur_prix.html'))
      || Response.error();
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('service-worker.js')) return;
  event.respondWith(isPage(req, url) ? networkFirst(req) : cacheFirst(req));
});
