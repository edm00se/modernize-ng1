/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "about.c916a4f9.html",
    "revision": "729ca6756ac6cd1629c544cd61e7a516"
  },
  {
    "url": "character.f17a6ac2.html",
    "revision": "84777e2786c6fd307ee059fbbbb1bdf4"
  },
  {
    "url": "characterList.7b23f06a.html",
    "revision": "8da5296784c88f6209c38493d90cff93"
  },
  {
    "url": "fontawesome-webfont.152c194f.ttf",
    "revision": "b06871f281fee6b241d60582ae9369b9"
  },
  {
    "url": "fontawesome-webfont.4a2277d0.eot",
    "revision": "674f50d287a8c48dc19ba404d20fe713"
  },
  {
    "url": "fontawesome-webfont.4e039e70.woff",
    "revision": "fee66e712a8a08eef5805a46892932ad"
  },
  {
    "url": "fontawesome-webfont.9fb3877d.woff2",
    "revision": "af7ae505a9eed503f8b8e6982036873e"
  },
  {
    "url": "fontawesome-webfont.a9acc805.svg",
    "revision": "912ec66d7572ff821749319396470bde"
  },
  {
    "url": "glyphicons-halflings-regular.0b190d8e.woff",
    "revision": "fa2772327f55d8198301fdb8bcfc8158"
  },
  {
    "url": "glyphicons-halflings-regular.5db79c4f.ttf",
    "revision": "e18bbf611f2a2e43afc071aa2f4e1512"
  },
  {
    "url": "glyphicons-halflings-regular.b2fb4677.woff2",
    "revision": "448c34a56d699c29117adc64c43affeb"
  },
  {
    "url": "glyphicons-halflings-regular.e3673d14.eot",
    "revision": "f4769f9bdb7466be65088239c12046d1"
  },
  {
    "url": "glyphicons-halflings-regular.f9ab423a.svg",
    "revision": "89889688147bd7575d6327160d64e760"
  },
  {
    "url": "goodie-bag.min.js",
    "revision": "4b41b7918772ee33def742cbaf34bd32"
  },
  {
    "url": "house.6e5da995.html",
    "revision": "5fd32d24a3818ca647ce6646b1ebd5b5"
  },
  {
    "url": "houseList.2412fe79.html",
    "revision": "e2e17ffc42843e3cfe2e62150ef06877"
  },
  {
    "url": "index.html",
    "revision": "5a984f5b0fe3b62db6e8009eb3625650"
  },
  {
    "url": "main.26914969.js",
    "revision": "2bc35e576dc60a5645035f091643b9e2"
  },
  {
    "url": "main.4439a96a.css",
    "revision": "9fe576a58334ecf834acd15f597af4e6"
  },
  {
    "url": "nav.48cbb813.html",
    "revision": "73b354c34a7587b09cb234fe4fcf146d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
