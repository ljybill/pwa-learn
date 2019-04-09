const cacheName = 'my-test-cache-v3'
const self = this
this.addEventListener('install', function(evt) {
  console.log('install success')
  evt.waitUntil(self.skipWaiting())
})

this.addEventListener('activate', function(evt) {
  evt.waitUntil(
    Promise.all([
      self.clients.claim(),

      caches.keys().then(function(cacheList) {
        console.log(cacheList)
        return Promise.all(
          cacheList.map(cn => {
            if (cn !== cacheName) {
              return caches.delete(cn)
            }
          })
        )
      })
    ])
  )
})

this.addEventListener('fetch', function(evt) {
  evt.respondWith(
    caches.match(evt.request).then(res => {
      if (res) {
        return res
      }

      let request = evt.request.clone()
      return fetch(request).then(httpRes => {
        if (!httpRes || httpRes.status !== 200) {
          return httpRes
        }

        let responseClone = httpRes.clone()
        caches.open(cacheName).then(cache => {
          cache.put(evt.request, responseClone)
        })

        return httpRes
      })
    })
  )
})
