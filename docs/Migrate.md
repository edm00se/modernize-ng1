# Migrating Your App

<p align="center">
  <img alt="dalek shouting 'migrate! migrate!'" src="migrate.png">
</p>

## Major Steps

- [Migrating Your App](#migrating-your-app)
  - [Major Steps](#major-steps)
    - [Encapsulate for Bundling](#encapsulate-for-bundling)
    - [Dependencies](#dependencies)
    - [Font Awesome](#font-awesome)
    - [Babel Configuration](#babel-configuration)
    - [Asset Importing](#asset-importing)
      - [CSS](#css)
      - [JavaScript](#javascript)
        - [Bootstrap Concerns](#bootstrap-concerns)
    - [Updating the Router](#updating-the-router)
    - [Included Partials](#included-partials)
      - [ngMessages](#ngmessages)
      - [Using PostHTML](#using-posthtml)
    - [IE Support](#ie-support)
      - [Install](#install)
      - [Import](#import)
  - [Contribute What You've Found](#contribute-what-youve-found)

### Encapsulate for Bundling

The application will need to be "ingested" to its new format. For this application, I began by moving everything into a `src` directory. When parcel builds its files, it will go into the `dist` directory. At the root of the project structure, we'll have our usual `package.json` and any other high level files for things such as babel configuration.

### Dependencies

For this application, the dependencies were migrated from [bower][bower] to [npm][npm]. This required verifying that each name would resolve to the correct package, the correct version, and that an `npm install <package>` would yield the correct files. None of those things were generally a problem, and I found that I was more likely to spend time ensuring that I included a minor upgrade to the dependencies during the process.

On that note, the largest dependency jump, aside from upgrading an Angular 1.5 application to the latest stable of 1.7(.2), was that I wound up upgrading jQuery (for Bootstrap 3.x) from 2.x to 3.x; Bootstrap 3.3.7 supports jQuery 3.

The other main dependencies are all quite straightforward. I invite you to look through the `package.json`.

Development dependencies of note:

- [`parcel-bundler`][parcel-main], where the magic happens
- babel configuration, the [`.babelrc`](../.babelrc)
  - babel comes with parcel, you'll note the [`package.json`](../package.json) only lists the things I'm adding
  - the env preset, again parcel comes with babel's env preset (`@babel/preset-env`), but since I'm (optionally) adding the angularjs-annotate plugin
  - the plugins needed are ~~[ng-annotate][npm-babel-plugin-ng-annotate] (which requires the syntax decorators babel plugin)~~ [babel-plugin-angularjs-annotate][npm-nw-ng-annotate]
    - the angularjs-annotate babel plugin does some automagic handling to allow for smarter minification/uglification of the source JavaScript, a la ng-annotate
    - to see an example of how this works out, check out [the ng-annotate babel plugin in action][ng-annotate-plguin-in-action]
- [sass for scss compilation][parcel-sass]
- optional\*: [`gh-pages`][npm-gh-pages] and [`rimraf`][npm-rimraf] to aid in cleaning, building, and deploying of the site to [GitHub Pages][gh-pages]

### Font Awesome

There's a special exception for Font Awesome and possibly other icon fonts. It previously didn't play nicely with Parcel, here are the two links for the respective GitHub Issues:

- [Font Awesome 4 (\#763)][parcel-issue-fa-4]
- [Font Awesome 5 (\#764)][parcel-issue-fa-5]

I'm currently able to import it into `main.scss` via an `@import url('../node_modules/...path...to/font-awesome.min.css');`. Alternatively it could be linked to (from relative node_modules path), in a `link` tag in `index.html`.

### Babel Configuration

This is where the most actual configuration occurs. This has to do with the need to wire up the babel plugin of ng-annotate. The [`.babelrc`](../.babelrc), with snipped out target browsers, looks like this:

```
{
  "presets": [
    [
      "@babel/preset-env"
      // ...snipped for simplicity
  ],
  "plugins": [
    "angularjs-annotate"
  ]
}
```

As you can see, it's pretty terse and straight forward. View this project's `.babelrc` to see that it's targeting only the last couple versions of browsers, and no Internet Explorer versions below 11. This is one of the benefits of [babel's env preset][babel-env].

### Asset Importing

Since the project is changing over to use dependencies from npm, the `index.html` needs to be updated accordingly.

#### CSS

Using a path relative declaration in the `link` tags in the head of the file is a pretty easy way of managing library inclusion. It looks like so:

```html
<!-- I'm not doing this anymore, as I can import in the main.scss file (including font awesome), but it is possible and functional. -->
<link rel="stylesheet" href="../node_modules/bootswatch/flatly/bootstrap.min.css">
```

This application does not directly reference the `main.scss` file here, that's handled in the main entrypoint for the JavaScript. These will be rolled up together when parcel builds its files.

#### JavaScript

Similarly, in [`main.js`](../src/main.js), which is the only directly mentioned `script` tag with `src` now in the [`index.html`](../src/index.html) file, we'll `import` our vendor libraries, then our application files, and the `main.scss` file. Here's what the majority of the file reads like:

```javascript
// libs
import 'angular';
import 'angular-sanitize';
import 'angular-messages';
import '@uirouter/angularjs';
import 'ng-tags-input';

// app
import './js/helpers';
import './js/app';
import './js/directives';
import './js/filters';
import './js/services';
import './js/characterControllers';
import './js/houseControllers';

// scss
import './main.scss';
```

##### Bootstrap Concerns

Loading jQuery and the Bootstrap plugins gets a little silly, to ensure it's in the appropriate name space, but this is what it looks like:

```javascript
// funky libs, `import` statements before `require` statements
const $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');
```

### Updating the Router

Parcel currently has [an issue importing html from js][parcel-issue-html-from-js]. This specifically becomes [a problem for AngularJS 1.x applications][parcel-issue-angular-router], regardless of whether you use [ngRoute][ng-route] or [ui-router][ui-router], if you make use of `templateUrl` with an html mpartial.

The solution implemented here was to make use of the fact that parcel runs with a node context. As [the assets page of the parcel documentaton][parcel-docs-assets] states, we can make use of `require`.

[Example, with ui-router](../src/js/app.js):

```javascript
$stateProvider
  .state('about', {
    url: '/about',
    template: require('./src/partials/about.html')
  })
```

For a closer look, feel free to check out these examples on code sandbox:

- [ngRoute][ng-router-example]
- [ui-router][ui-router-example]

### Included Partials

There are some minor nuances with dealing with `ng-include` directives. These are exemplified below in the `ngMessages` section.

#### ngMessages

This application makes use of [a shared error message template, via ngMessages][ng-messages-template]. The ngMessages implementation suffers the same issue encountered in the router. Without being able to pass a string literal, converting the HTML partial into a script tag with `type="text/ng-template"` was the way to go; parked at the bottom of the [`index.html`](../src/index.html).

```html
<script type="text/ng-template" id="generic-error-messages">
  <p ng-message="required">This field is required</p>
  <p ng-message="minlength">This field is too short</p>
  <p ng-message="maxlength">This field is too long</p>
  <p ng-message="required">This field is required</p>
  <p ng-message="email">This needs to be a valid email</p>
</script>
```

#### Using PostHTML

You can alternatively use PostHTML to perform the a similar solution. This approach is implemented in HTML source as such:

```html
<include src="project/relative/path/to/some.html"></include>
```

If you have conditional visibility logic, you'll want to wrap that `<include>` tag with a `div` or `span` with an `ng-if` or `ng-show` directive.

To start using this approach:

1. install the dependency, `npm install --save-dev posthtml-include`
2. create the posthtml config file

```js
// .posthtmlrc.js
module.exports = {
  plugins: [
    require('posthtml-include')({
      root: './src'
    })
  ]
};
```

### IE Support

Supporting Internet Explorer is about the worst possible thing. Sadly, there's no immediate way of doing this out of the box with Parcel, as [@babel/polyfill][babel-polyfill] doesn't polyfill ~~`Promise` or~~ `fetch` (the v7 babel polyfill won't polyfill `Promise` before Parcel needs it), the APIs for both `Promise` and `fetch` are relied on by Parcel for multiple bundle loading, which is triggered by any HTML partial file `require` statements. I've documented this somewhat extensively in [an issue opened on Parcel's GitHub repo][parcel-ie-issue] and [a boiled down reproducible demo repo][parcel-ie-issue-repro]. This led me to create [parcel-plugin-goodie-bag][parcel-plugin-goodie-bag], which will install and auto-hook polyfills for `Promise` and `fetch`, as-needed, prior to Parcel's generated logic firing. This solved my needs for supporting Internet Explorer in my day job's largest app.

You'll also probably want/need to install and use [@babel/polyfill][babel-polyfill], as anything like `Array.prototype.find` that IE doesn't support, won't work.

#### Install

```sh
npm install --save-dev babel-polyfill
```

#### Import

In your `main.js`:

```js
// auto polyfill
import '@babel/polyfill';

// libs
import 'angular';
//...
```

## Contribute What You've Found

Have You Found Anything Else?

Feel free to reach out if there's something more that's unaccounted for. [Open an Issue][open-issue] or [submit a Pull Request][open-pr].

[parcel-main]: https://parceljs.org/
[bower]: https://bower.io/
[npm]: https://www.npmjs.com/
[parcel-issue-fa-4]: https://github.com/parcel-bundler/parcel/issues/763
[parcel-issue-fa-5]: https://github.com/parcel-bundler/parcel/issues/764
[npm-babel-plugin-ng-annotate]: https://npm.im/babel-plugin-ng-annotate
[npm-nw-ng-annotate]: https://npm.im/babel-plugin-angularjs-annotate
[ng-annotate-plguin-in-action]: https://github.com/edm00se/modernize-ng1/issues/2#issuecomment-382751204
[parcel-sass]: https://parceljs.org/assets.html#scss
[npm-gh-pages]: http://npm.im/gh-pages
[npm-rimraf]: http://npm.im/rimraf
[gh-pages]: https://pages.github.com/
[babel-env]: http://babeljs.io/env
[parcel-issue-html-from-js]: https://github.com/parcel-bundler/parcel/pull/926
[parcel-issue-angular-router]: https://github.com/parcel-bundler/parcel/issues/848
[ng-route]: https://docs.angularjs.org/api/ngRoute
[ui-router]: https://ui-router.github.io/ng1/
[parcel-docs-assets]: https://parceljs.org/assets.html
[ng-router-example]: https://codesandbox.io/s/o8oqn2j5q
[ui-router-example]: https://codesandbox.io/s/x3o563lzzz
[ng-messages-template]: https://docs.angularjs.org/api/ngMessages#reusing-and-overriding-messages
[open-issue]: https://github.com/edm00se/modernize-ng1/issues/new
[open-pr]: https://github.com/edm00se/modernize-ng1/compare
[babel-polyfill]: https://babeljs.io/docs/en/next/babel-polyfill.html
[parcel-ie-issue]: https://github.com/parcel-bundler/parcel/issues/2364
[parcel-ie-issue-repro]: https://github.com/edm00se/parcel-ie11-issue-demo
[parcel-plugin-goodie-bag]: https://github.com/edm00se/parcel-plugin-goodie-bag
