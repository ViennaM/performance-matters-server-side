self.addEventListener('install', event => event.waitUntil(
  caches.open('v1-core')
  .then(cache => cache.addAll([
    '/views/offline/',
    '/styles/main.css',
    '/scripts/bundle.js',
    '/images/logo.svg'
  ])),
  caches.open('v1-pages')
  .then(cache => cache.addAll([
    '/'
  ]))
  .then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
      .then(response => cachePage(request, response))
      .catch(err => getCachedPage(request))
      .catch(err => fetchCoreFile('/views/offline/'))
    );
  } else {
    event.respondWith(
      fetch(request)
      .catch(err => fetchCoreFile(request.url))
      .catch(err => fetchCoreFile('/views/offline/'))
    );
  }
});

function fetchCoreFile(url) {
  return caches.open('v1-core')
    .then(cache => cache.match(url))
    .then(response => response ? response : Promise.reject())
}

function getCachedPage(request) {
  return caches.open('v1-pages')
    .then(cache => cache.match(request))
    .then(response => response ? response : Promise.reject())
}

function cachePage(request, response) {
  const clonedResponse = response.clone()
  caches.open('v1-pages')
    .then(cache => cache.put(request, clonedResponse))
  return response
}