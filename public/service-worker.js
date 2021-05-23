self.addEventListener('install' , (e)=>{
    console.log('listen to install event');
});

self.addEventListener('activate' , (e)=>{
    console.log('listen to activate event');
});

self.addEventListener('fetch' , (e)=>{
    console.log('listen to fetch event');
})