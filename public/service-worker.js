importScripts("/static/js/dexie.js");
importScripts("/static/js/db.js");

let CACHE_V = 1.3;
let CACHE_CURRENT = {
    static : `static-cache-v${CACHE_V}`,
    dynamic : `dynamic-cache-v${CACHE_V}`
}

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(CACHE_CURRENT['static']).then(cache=>{
            return cache.addAll([
                "/",
                "/offline.html",
                "/static/css/materialize.min.css",
                "/static/css/vazir.css",
                "/static/css/style.css",
                "/static/js/app.js",
                "/static/js/materialize.min.js",
                "/static/js/dexie.js",
                "/static/js/db.js"
            ])
        })
    )
});

self.addEventListener('activate' , e=>{
    let exactedCacheVersion = Object.values(CACHE_CURRENT);

    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return cacheNames.forEach(cacheName =>{
                if( ! exactedCacheVersion.includes(cacheName)){
                    caches.delete(cacheName);
                }
            })
        })
    )
});

// self.addEventListener('fetch' , e=>{
//     e.respondWith(
//         caches.open(CACHE_CURRENT['static']).then(cache=>{
//             return cache.match(e.request).then(response=>{
//                 return response || fetch(e.request);
//             })
//         })
//     )
// });

// // first caches then network
// self.addEventListener("fetch" , e=>{
//     e.respondWith(
//         caches.match(e.request).then(respose=>{
//             if(respose) return respose;

//             return fetch(e.request)
//                 .then(networkResonse=>{
//                 caches.open(CACHE_CURRENT['dynamic']).then(cache =>{
//                     cache.put(e.request , networkResonse.clone());
//                     return networkResonse;
//                 })
//             })
//         })
//     )
// });


// // Network only
// self.addEventListener('fetch' , e=>{
//     e.respondWith(
//         fetch(e.request)
//     )
// })

// // caches only
// self.addEventListener('fetch' , e=>{
//     e.respondWith(
//         caches.match(e.request)
//     )
// });

// // first network then caches **** for using with feature first delete all caches from chrome and try again ****
// self.addEventListener('fetch' , e=>{
//     return e.respondWith(
//         fetch(e.request)
//         .then(response=>{
//             return caches.open(CACHE_CURRENT['dynamic']).then(cache=>{
//                 cache.put(e.request , response.clone());
//                 return response;
//             })
//         })
//         .catch(err=>{
//             return caches.match(e.request);
//         })
//     )
// })


// create offline page and save data to indexedDB

self.addEventListener("fetch" , e=>{
    let urls = [
        'https://jsonplaceholder.typicode.com/posts'
    ];
    if(urls.indexOf(e.request.url) > -1){
        e.respondWith(
             fetch(e.request).then(response=>{
                let clone = response.clone();
                clone.json().then(products=>{
                    products.forEach(product => {
                        db.products.put(product);
                    });
                })
                return response;
            })
        )
    }else{
        e.respondWith(
            caches.match(e.request).then(respose=>{
                if(respose) return respose;
    
                return fetch(e.request)
                    .then(networkResonse=>{
                        return caches.open(CACHE_CURRENT['dynamic'])
                            .then(cache =>{
                                cache.put(e.request , networkResonse.clone());
                                return networkResonse;
                            })
                    }).catch(err=>{
                         return caches.match('/offline.html');
                    })
              
            })
        )
    }
});


self.addEventListener("sync" , function(e){
    console.log('sync is running ...' , e);
    if(e.tag == 'sync-new-product'){
        e.waitUntil(
            db.syncProducts.toArray().then((syncProducts)=>{
                console.log("syncProducts... : " , syncProducts);
                syncProducts.forEach( product=>{
                    let fd = new FormData();
                    fd.append('title' , product.title);
                    fd.append('body', product.body);
                    fd.append('image', product.image);
                    fd.append('price', product.price);

                    // fetch('http://localhost:8080/static/js/log.js' , {
                    //     method : 'POST', 
                    //     body: JSON.stringify(fd), 
                        
                    // })

                    console.log( 'title',fd.get('title'))
                })
            })


        )
    }
});


