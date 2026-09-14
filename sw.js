const PREFIX = 'elsewhere-' + btoa(self.registration.scope).replace(/[^a-zA-Z0-9]/g,'') + '-';
const CACHE = PREFIX + '1.0.0';
const FILES=['./','./index.html','./styles.css','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/portal.webp','./assets/creature.webp','./js/app.js','./js/store.js','./js/ui.js','./js/views.js','./js/labs.js','./js/explore-data.js','./js/debate-data.js','./js/story-data.js','./js/surprise-engine.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  if(req.mode==='navigate'){event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(async()=>await caches.match(req)||await caches.match(new URL('index.html',self.registration.scope))));return;}
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})));
});
