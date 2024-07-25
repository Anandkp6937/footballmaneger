self.addEventListener('install',(e)=>{
    console.log("service worker intialised");
  self.skipWaiting() // always activate updated SW immediately


    e.waitUntil(
caches.open("stationary").then(cache=>{
    return cache.addAll['./','./style.css','./script.js','./images/512.png','./images/64.png']
})
.catch(err=>console.log(err))
    )
})

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request)
        }).catch(error=>console.log("error"))
    )
})