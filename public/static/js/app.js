if ( 'serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js');
} 

let homeBtn= document.querySelector('.fixed-action-btn a');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
// Prevent the mini-infobar from appearing on mobile
e.preventDefault();
// Stash the event so it can be triggered later.
deferredPrompt = e;
// Update UI notify the user they can install the PWA

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
})