"use strict";

// Nama cache yang akan digunakan
const CACHE_NAME = "rl-precache-cache-v1";

// Daftar file yang akan di-cache
const urlsToCache = [["/"],["/obb/plugin/script.js"],["/index.html"],["/style.css"],["/app_icon_mdpi.svg"],["/obb/icon/U5c.png"],["/obb/prism.css"],["/manifest.json"]];

// Menginstal Service Worker dan menambahkan file ke cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      alert("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Mengambil file dari cache jika ada, jika tidak mengambil dari jaringan
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Jika file ada di cache, kembalikan file dari cache
      if (response) {
        alert(response);
        return response;
      }
      // Jika tidak, ambil dari jaringan
      return fetch(event.request);
    })
  );
});

// Menghapus cache lama ketika ada versi baru dari Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            alert(cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
