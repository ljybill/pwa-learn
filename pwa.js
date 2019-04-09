;(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('./sw.js')
        .then(registration => {
          console.log(registration)
          console.log(
            `ServiceWorker registration successful whit scope : ${
              registration.scope
            }`
          )
        })
        .catch(e => {
          console.log('fail', e)
        })
    })
  }
})()
