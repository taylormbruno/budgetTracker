"use strict";var precacheConfig=[["app.bundle.js","f24ff7725d206b7a8a9713c304bf4b99"],["assets/icons/icon_128x128.3d3683ece3cbf7afd56b9d4ebd823212.png","3d3683ece3cbf7afd56b9d4ebd823212"],["assets/icons/icon_144x144.2d256c504c95b385f63aff57b0ac3ec0.png","2d256c504c95b385f63aff57b0ac3ec0"],["assets/icons/icon_152x152.c4c839dedf627f4ea8f6a2714571c4e3.png","c4c839dedf627f4ea8f6a2714571c4e3"],["assets/icons/icon_192x192.317079d2f38bc5d2906f5408114bbcd3.png","317079d2f38bc5d2906f5408114bbcd3"],["assets/icons/icon_384x384.0b2a00b0b845312bc013ad85074b0753.png","0b2a00b0b845312bc013ad85074b0753"],["assets/icons/icon_512x512.273935f8ebdc8218f2ce26daa11d6844.png","273935f8ebdc8218f2ce26daa11d6844"],["assets/icons/icon_72x72.8bd78b686eaa2d8ba7fd0c1bb2aff553.png","8bd78b686eaa2d8ba7fd0c1bb2aff553"],["assets/icons/icon_96x96.74b892b005aaab865730ec47e43273dd.png","74b892b005aaab865730ec47e43273dd"],["db.bundle.js","3643e54fbd21f888ac459bdbaa80bdcd"],["manifest.f276d22d42d5c244b503e0b53d1802f7.json","f276d22d42d5c244b503e0b53d1802f7"]],cacheName="sw-precache-v3-my-domain-cache-id-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),r=createCacheKey(a,hashParamName,t,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));0,n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});