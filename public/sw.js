
const CACHE='tt-cache-v1'; const ASSETS=['/','/manifest.json','/icon.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))) });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))) });
self.addEventListener('fetch',e=>{ const {request}=e; if(request.method!=='GET') return;
  e.respondWith(caches.match(request).then(cached=> cached || fetch(request).then(resp=>{ const copy=resp.clone(); caches.open(CACHE).then(c=>c.put(request,copy)); return resp }).catch(()=>cached)))
});
