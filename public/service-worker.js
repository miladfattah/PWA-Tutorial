self.addEventListener("install" , (e)=>{
 // Perform some task
});

self.addEventListener('activate' , (e)=>{
     // Perform some task
});

self.addEventListener('fetch',(e)=>{
    console.log('fetch', e)
})