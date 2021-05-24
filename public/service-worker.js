self.addEventListener('install' , (e)=>{
 
    e.waitUntil(
        caches.open('front-cashe')
                .then((cache)=>{
                    return cache.add("/static/css/materialize.min.css");
                })
    )


});

self.addEventListener('activate' , (e)=>{
    console.log('listen to activate event');
});

self.addEventListener('fetch' , (e)=>{
    e.waitUntil(
        caches.open('front-cashe')
                .then(cashe=>{
                    return cashe.match(e.request).then(response=>{
                        return response || fetch(e.request);
                    })
                })
    )
})