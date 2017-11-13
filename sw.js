importScripts('js/serviceworker-cache-polyfill.js');

var CACHE_VERSION = 'app-v1';
var CACHE_FILE = [
	'/',
	'index.html',
	'js/app.js',
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'css/bootstrap.min.css',
	'css/style.css',
	'favicon.ico',
	'manifest.json',
	'img/icon-48.png',
    'img/icon-96.png',
    'img/icon-144.png',
    'img/icon-196.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
        .then(function(cache) {
            console.log('opened cache');
            return cache.addAll(CACHE_FILES);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                return res;
            }
            requestBackend(event);
        })
    )
});

function requesetBackend(event) {

    var url = event.request.clone();
    return fetch(url).then(function(res) {
        //if not valid request send error
        if (!res | res.status !== 200 || res.type !== 'basic') {
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(event.request, response);
        });

        return res;
    });

}

self.addEventListener('activate', function(event){
	event.wainUntil(
		caches.keys().then(function(keys){
			return promise.all(keys.map(function(key, i){
				if(key !== CACHE_VERSION){
					retrun caches.delete(keys[i]);
				}
			}))
		})
	)
});