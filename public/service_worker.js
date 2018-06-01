
// Set this to true for production
var doCache = true;

// Name our cache
var STATIC_CACHE_NAME = 'static-cache';
var DYNAMIC_CACHE_NAME = 'dynamic-cache'
//install even of service worked

self.addEventListener('install', event => {
  console.log('service worker: installing ...', event)
  event.waitUntil(
    caches.open(DYNAMIC_CACHE_NAME)
      .then((cache) => {
        console.log('service worker: Precaching app')
        cache.addAll([
          '/',
          'src/App.js',
          '/index.html'
        ])
      })
  )
})
// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  console.log('service worker:activated...', event)
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) =>{
        if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
          console.log('removing old cache')
          return caches.delete(key)
        }
      }));
    })
  )
  return self.clients.claim()
})

// self.addEventListener("fetch",event => {
//   event.respondWith(
//     caches.match(event.request)
//     .then((response) => {
//       if(response){
//         return response
//       } 
//       else{
//         return fetch(event.request)
//         .then(res => {
//          return caches.open(DYNAMIC_CACHE_NAME)
//           .then( cache => {
//             cache.put(event.request.url, res.clone())
//             return res
//           })
//         })
//         .catch( err => {
          
//         })
//       }
//     })
//   )

// })

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then((response) => {
        if(response){

          return response
        } 
        else{
          return fetch(event.request)
          .then(res => {
           return caches.open(DYNAMIC_CACHE_NAME)
            .then( cache => {
              cache.put(event.request.url, res.clone())
              return res
            })
          })
          .catch( err => {
            
          })
        }
      })
    )
  
  })

  self.addEventListener('push', event =>{
    console.log('serviceworker: listening to push event')
    let data
    if(!!event.data) {
        data = JSON.parse(event.data.text())
    }
    options = {
        body: data.content,
        icon: 'android-chrome-192x192.png',
        badge: 'android-chrome-192x192.png'
    }
    event.waitUntil(
        self.registration.showNotification(data.title,options)
    )
})