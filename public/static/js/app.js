if ( 'serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
                      .then(registration =>{
                        registration.addEventListener('updatefound' , ()=>{
                          
                          let installingWorker = registration.installing;
                          console.log('A new service worker is being installed:',
                          installingWorker);
                        })
                      })
} 

let homeBtn= document.querySelector('.fixed-action-btn a');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
});

homeBtn.addEventListener('click' ,  async(e)=>{
    e.preventDefault();
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
});

(async function(){
  let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  let data = await res.json();

}())




