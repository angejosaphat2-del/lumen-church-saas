// ═══════════════════════════════════════════
// Lumen Church — Service Worker (PWA offline)
// ═══════════════════════════════════════════
const CACHE_NAME = "lumen-church-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/assets/index.css",
  "/assets/index.js",
];

// Installation — mise en cache des assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activation — nettoyage anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — stratégie : Network first, fallback cache
self.addEventListener("fetch", (event) => {
  // Ne pas intercepter les appels API Supabase / CinetPay / WhatsApp
  if (
    event.request.url.includes("supabase.co") ||
    event.request.url.includes("cinetpay") ||
    event.request.url.includes("wa.me") ||
    event.request.url.includes("api.resend")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mettre en cache la réponse fraîche
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Hors-ligne → servir depuis le cache
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Fallback sur index.html pour les routes SPA
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
  );
});

// Sync en arrière-plan quand la connexion revient
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  // Récupérer les données en attente de sync depuis IndexedDB
  // et les envoyer à Supabase
  console.log("[SW] Synchronisation des données hors-ligne...");
}
