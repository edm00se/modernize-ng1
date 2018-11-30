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
    "url": "about.3bb6f0bb.html",
    "revision": "826bc5843d8458fd61dcfe34854a92a2"
  },
  {
    "url": "character.f17a6ac2.html",
    "revision": "84777e2786c6fd307ee059fbbbb1bdf4"
  },
  {
    "url": "characterList.7b987e50.html",
    "revision": "fa4776cd3881f23b2f8b2f7e2fabe73e"
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
    "url": "house.4753fcb5.html",
    "revision": "e5921b9d4460410fe1436f40382b215a"
  },
  {
    "url": "houseList.d1750686.html",
    "revision": "24fae8b516e813889cc1623ffc2229f0"
  },
  {
    "url": "index.html",
    "revision": "6a199bb9c94a129a82fd9af90ec63872"
  },
  {
    "url": "main.36025d4f.js",
    "revision": "e3713a1899d54bd7443f160873b3f4e3"
  },
  {
    "url": "main.b8fe73bf.css",
    "revision": "783499230b6569f33d6c176ee47e1df7"
  },
  {
    "url": "nav.e19ae89a.html",
    "revision": "508f5ba7630294267545e8caafc5feb8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
