## Archival

This was built using Parcel v1. Parcel v2 has been released, is a great development tool, and probably works nothing like it does with this repo. Additionally, the out of the box tree shaking likely doesn't work without major efforts on AngularJS (1.x) and source code, so I no longer advise attempting this with such an out-dated application, AngularJS (1.x), or Parcel. Upgrade your applications! This was only ever an intermediate effort to "make things suck less".

---

TL;DR: You can make an AngularJS 1.x app suck _a lot less_, with ES6+, SCSS, and a local development server, courtesy of Parcel.

# Modernize AngularJS 1.x With [Parcel][parcel]
[![Deployment Status](https://img.shields.io/github/deployments/edm00se/modernize-ng1/Production?label=Deployment)](https://github.com/edm00se/modernize-ng1/deployments/activity_log?environment=Production) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/dd365d9f78744eff8a1b1d66a7478416)](https://www.codacy.com/gh/edm00se/modernize-ng1/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=edm00se/modernize-ng1&amp;utm_campaign=Badge_Grade) [![PSI action results](https://github.com/edm00se/modernize-ng1/workflows/Node%20Test/badge.svg)](https://github.com/edm00se/modernize-ng1/actions?query=workflow%3A%22Node+Test%22)

This is an attempt to parse down the work needed to get an AngularJS 1.x application to work with a modern bundler. The intention is to migrate a production app, but first, baby steps are needed. This is a take on a non-trivial (demo) app I had used previously.

I got this to work with Parcel! Some fiddling was required, but it's not terrible Parcel (and contributors) look to be addressing things such as dealing with older vendor libs (old versions of jQuery for instance), web fonts (like Font Awesome), and more. I fully expect this will work perfectly out of the box one day, it's just not today. Until then, I'll try and outline what's required to make things work.

For those curious, here's the project on codesandbox:
https://codesandbox.io/s/8yqrnoz5pl

## The Benefits

Sadly, we can't all dictate when management will/may/someday sign off on modernizing an application. Since even the "closest" jump from AngularJS 1.x to Angular (>=2) is still effectively a complete rewrite of the application, it may not be as easy to get buy-in. So short of jumping entirely into a rewrite, we could take a few steps and modernize an AngularJS 1.x application, and get a lot of modern development benefits, with little configuration, such as:

- ES2015+ (ES6+) support (babel)
- automatic browser back-support (babel)
- bundled assets for more performant production applications (parcel)
- easy inclusion of SCSS (or other pre-processing to CSS) (parcel + node-sass)
- development server (built into parcel)

The bottom line is: **if you're stuck on an AngularJS 1.x application, you can at least have some of the modern toys and make it suck a lot less**.

## How Hard Is It?

Surprisingly easy, since most of the tooling comes "out of the box" with parcel; development server, babel, and more. Some additional configuration is required, due to the comparatively antequated nature of AngularJS 1.x in this day and age. My assessment, not very hard, and I've found most of the edge configuration needs, so that others needn't go through the same.

## [Migration Guide][migrate-guide]

Read this guide for the steps I took to get things up and running.

## Installation

- `git clone`
- `npm install`

## Usage

- `npm run dev` executes `parcel` (with the default `serve` command, for a development server with [HMR][parcel-hmr])
- `npm run build` executes `parcel build`, built into the project's `dist` path

## History

AngularJS 1.x had its run. Some pretty good applications were built with it, also some less than ideal ones. Since AngularJS helped create a world in which other, better frameworks exist, along with them came better packagers and loaders. Webpack and Parcel are my two favorites, Parcel requires the least amount of configuration, so it's currently being targeted.

## Credits

- [Parcel][parcel]
- [AngularJS][angularjs]

## License

MIT

[migrate-guide]: docs/Migrate.md
[parcel]: https://parceljs.org/
[parcel-hmr]: https://parceljs.org/hmr.html
[angularjs]: https://angularjs.org/
