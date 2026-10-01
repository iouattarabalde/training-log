// Offline shell. Everything the app needs is cached on first visit, so it opens
// in a gym basement with no signal. Bump VERSION when a cached file changes.
const VERSION = 'training-log-v2';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'vendor/chart.umd.min.js',
  'favicon.svg',
  'favicon-32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// The page itself: network first so a deploy shows up on the next launch, but
// give up after 2 s and serve the cached copy, so a weak gym signal never
// leaves a blank screen. Everything else: cache first, refreshed in the background.
const NAV_TIMEOUT_MS = 2000;

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(cache => {
    const net = fetch(e.request).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; });
    const cached = cache.match(e.request, { ignoreSearch: true });
    if (e.request.mode === 'navigate') {
      const timeout = new Promise(resolve => setTimeout(resolve, NAV_TIMEOUT_MS));
      return Promise.race([net, timeout.then(() => cached)])
        .then(res => res || net)
        .catch(() => cached.then(hit => hit || cache.match('index.html')));
    }
    return cached.then(hit => hit || net).then(res => { net.catch(() => {}); return res; });
  }));
});
