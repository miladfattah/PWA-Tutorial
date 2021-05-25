let CACHE_VERSION = 1.1; // changes version chches
let CACHE_CURRENT = {
    static : `front-cache-v${CACHE_VERSION}`
}

self.addEventListener('install' , (e)=>{
    e.waitUntil(
        caches.open(CACHE_CURRENT['static']).then(cache=>{
            return cache.addAll(
                [
                '/',
                '/static/css/materialize.min.css',
                '/static/css/vazir.css',
                '/static/css/style.css',
                '/static/js/app.js',
                '/static/js/materialize.min.js'
                 ]
            )
        })
    )
});

self.addEventListener('activate' , (e)=>{
    let expressionVersion = Object.values(CACHE_CURRENT);

    console.log('expre ' , expressionVersion);
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            cacheNames.forEach(cacheName=>{
                if( ! expressionVersion.includes(cacheName)){
                    caches.delete(cacheName);
                }
            })
        })
    )
});

self.addEventListener('fetch' , (e)=>{
    e.respondWith(
        caches.open('front-cashe').then((cache)=>{
            return cache.match(e.request).then(response=>{
                return (
                    response ||
                    fetch(e.request).then( (response)=> {
                      cache.put(e.request, response.clone());
                      return response;
                    })
                  );
            })
        })
    )
})