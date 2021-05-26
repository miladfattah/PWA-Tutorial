//COMEENT

let V_CACHES = 1.03;
let N_CACHES = {
    static : `cache-static-v${V_CACHES}`,
    dynamic : `cache-dynamic-v${V_CACHES}`
}

self.addEventListener('install' , (e)=>{
    e.waitUntil(
        caches.open(N_CACHES['static']).then(cache=>{
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

   let exactedCacheVertion = Object.values(N_CACHES);

   e.waitUntil(
       caches.keys().then(cacheNames=>{
 
               return cacheNames.forEach(cacheName=>{
                   if(! cacheName.includes(exactedCacheVertion)){
                        caches.delete(cacheName);
                   }
               })
          
       })
   )

});

self.addEventListener('fetch' , (e)=>{
    e.respondWith(
        caches.open(N_CACHES['static']).then((cache)=>{
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


// self.addEventListener('fetch' , e=>{
//     e.respondWith(
//         caches.match(e.request).then(response=>{
//             if(response) return response;

//             return fetch(e.request).then(netWorkResponse=>{
//                 caches.open(N_CACHES['dynamic']).then(cache=>{
//                     cache.put(e.request , netWorkResponse.clone());
//                     return netWorkResponse;
//                 })
//             })
//         })
//     )
// });