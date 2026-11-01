/* BAGLAM — Service Worker (hébergement Firebase)
 * - Démarrage hors ligne : la page, la configuration, les icônes, les images
 *   et les bibliothèques CDN (React, Recharts, Supabase JS, Tailwind…) sont gardées en cache.
 * - Les appels Supabase ne passent PAS par ce fichier : la page gère déjà
 *   son propre cache hors ligne et sa file d'attente de synchronisation.
 * - Mise à jour : la page affiche « Nouvelle version BAGLAM disponible » et
 *   envoie SKIP_WAITING quand l'utilisateur clique.
 * Pour publier une nouvelle version, augmentez VERSION (et le ?v= dans index.html).
 */
const VERSION = '1.1.5';
const STATIC_CACHE = 'baglam-static-' + VERSION;
const CDN_CACHE = 'baglam-cdn-v1';
const NETWORK_WAIT_MS = 4000;

const SHELL = [
  './',
  './baglam-config.js',
  './manifest.webmanifest',
  './favicon.ico',
  './baglam-icon.svg',
  './baglam-icon-180.png',
  './baglam-icon-192.png',
  './baglam-icon-512.png',
  './baglam-home-hero.webp',
  './baglam-dashboard-visual.webp'
];

const CDN_HOSTS = [
  'cdn.jsdelivr.net',
  'esm.sh',
  'cdn.tailwindcss.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      Promise.all(SHELL.map((url) => cache.add(new Request(url, { cache: 'reload' })).catch(() => null)))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith('baglam-static-') && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith('/__/')) return;          // URL réservées Firebase
    if (url.pathname.endsWith('/sw.js')) return;
    if (req.mode === 'navigate') {
      event.respondWith(networkFirst(event, req, './'));
      return;
    }
    if (url.pathname.endsWith('/baglam-config.js')) {
      event.respondWith(networkFirst(event, req, './baglam-config.js'));
      return;
    }
    event.respondWith(staleWhileRevalidate(event, req, STATIC_CACHE, { ignoreSearch: true }));
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(event, req, CDN_CACHE, {}));
  }
  // Tout le reste (Supabase, etc.) part directement sur le réseau.
});

// Réseau d'abord ; si le réseau tarde ou échoue et qu'une copie existe, on sert la copie.
async function networkFirst(event, req, cacheKey) {
  const cache = await caches.open(STATIC_CACHE);
  const network = fetch(req).then((res) => {
    if (res && res.ok) cache.put(cacheKey, res.clone()).catch(() => {});
    return res;
  });
  event.waitUntil(network.then(() => {}, () => {}));

  const cached = await cache.match(cacheKey, { ignoreSearch: true });
  if (!cached) return network;

  const slow = new Promise((resolve) => setTimeout(() => resolve(cached), NETWORK_WAIT_MS));
  return Promise.race([network.catch(() => cached), slow]);
}

// Copie en cache immédiatement, mise à jour en arrière-plan.
async function staleWhileRevalidate(event, req, cacheName, matchOptions) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, matchOptions);
  const network = fetch(req)
    .then((res) => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => cached || Response.error());
  event.waitUntil(network.then(() => {}, () => {}));
  return cached || network;
}
