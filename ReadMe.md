# AngularJS 1.x With Parcel Bundler

This is an attempt to parse down the work needed to get an AngularJS 1.x application to work with Parcel bundler. The intention is to migrate a production app, but first, baby steps are needed

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