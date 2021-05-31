if ( 'serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
                      .then(registration =>{
                        registration.addEventListener('updatefound' , ()=>{
                          
                          let installingWorker = registration.installing;
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

// (async function(){
//   let res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   let data = await res.json();
//   let products  = Object.values(data);

//   products.forEach(product => {
//     getUIproducts(product);
//   });
// }());
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res=> res.json())
  .then(data=>{
    let products  = Object.values(data);
        products.forEach(product => {
              getUIproducts(product);
        });
  }).catch(err=>{
    if( 'indexedDB' in window ){
      db.products.toArray().then(products=>{
        products.forEach(product => {
          getUIproducts(product);
        });
      })
    }
  })

const getUIproducts= (product)=>{
    let card = `
    <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
          <span class="card-title">${product.title}</span>
        </div>
        <div class="card-content">
          <p>${product.body}</p>
        </div>
      </div>
    </div>
    `;

    const products = document.getElementById('products');

    if(products != undefined)
      products.innerHTML += card;
}

