# Modernize AngularJS 1.x With a Bundler

This is an attempt to parse down the work needed to get an AngularJS 1.x application to work with a modern bundler. The intention is to migrate a production app, but first, baby steps are needed

## NOTE:

I currently don't expect this to work with Parcel (my leading favorite)... at least as things are _today_. Parcel (and contributors) look to be addressing things such as dealing with older vendor libs (old versions of jQuery for instance), web fonts (like Font Awesome), and more. I fully expect this will work one day, it's just not today.

I took an older Angular 1.x demo app, imported it into a fork of this repo on codesandbox.io, and attempted to get things working. Some things work better than expected, such as Bootstrap 3.x's CSS being applied, some things don't at all, like Font Awesome, ui-router with the separate html partials, and I'm guessing more.

For those curious, here's the project on codesandbox:
https://codesandbox.io/s/8yqrnoz5pl

## Next Up: Webpack

Webpack 4 strives is faster and requires no config for an initial use, so hopefully its ecosystem which has over time accumulated much to help with AngularJS 1.x applications can be of use. Hopefully I don't go down too large of a configuration rabbit hole, but if so, so be it.

## Installation

- `git clone`
- `npm install`

## Usage

- `npm run dev` executes `parcel` (the default `serve` command)
- `npm run build executes `parcel build` with the `--public-url` flag set to `./`, so as to preserve path relative, works by just serving the contents of the `dist/` output directory
- `TODO:` use `ng-annotate` (or similar tool) to process the source files and scrub correctly, as the initial commit's version of things didn't work correctly when a dep was missing (the only one)

## Future

`TODO:` implement a non-trivial application. This has just begun.

## History

AngularJS 1.x had its run. Some pretty good applications were built with it, also some less than ideal ones. Since AngularJS helped create a world in which other, better frameworks exist, along with them came better packagers and loaders. Webpack and Parcel are my two favorites, Parcel requires the least amount of configuration, so it's currently being targeted.

## Credits

- [Parcel](https://parceljs.org/)
- [AngularJS](https://angularjs.org/)

## License

MIT
