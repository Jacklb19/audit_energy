self.addEventListener('install', (e) => {                                                                                                                                       
  e.waitUntil(                                                                                                                                                                  
    caches.open('app-shell').then((cache) =>                                                                                                                                    
      cache.addAll([                                                                                                                                                            
        '/',                // index                                                                                                                                            
        '/_next/static/*', // all compiled assets (wildcard works in dev)                                                                                                       
        // add any extra assets you want offline                                                                                                                                
      ])                                                                                                                                                                        
    )                                                                                                                                                                           
  );                                                                                                                                                                            
});                                                                                                                                                                             
                                                                                                                                                                                
self.addEventListener('fetch', (e) => {                                                                                                                                         
  e.respondWith(                                                                                                                                                                
    caches.match(e.request).then((r) => r || fetch(e.request))                                                                                                                  
  );                                                                                                                                                                            
}); 