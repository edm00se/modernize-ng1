# Migrating Your App

<p align="center">
  <img alt="dalek shouting 'migrate! migrate!'" src="migrate.png">
</p>

## Major Steps

- [Encapsulate for Bundling](#encapsulate-for-bundling)
- [Dependencies](#dependencies)
- [Font Awesome](#font-awesome), special considerations
- [Babel Configuration](#babel-configuration)
- [Asset Importing](#asset-importing)
- [Updating the Router](#updating-the-router)
- [ngMessages](#ngmessages)

### Encapsulate for Bundling

The application will need to be "ingested" to its new format. For this application, I began by moving everything into a `src` directory. When parcel builds its files, it will go into the `dist` directory. At the root of the project structure, we'll have our usual `package.json` and any other high level files for things such as babel configuration.

### Dependencies

For this application, the dependencies were migrated from [bower][bower] to [npm][npm]. This required verifying that each name would resolve to the correct package, the correct version, and that an `npm install <package>` would yield the correct files. None of those things were generally a problem, and I found that I was more likely to spend time ensuring that I included a minor upgrade to the dependencies during the process.

On that note, the largest dependency jump, aside from upgrading an Angular 1.5 application to the latest stable of 1.6(.9), was that I wound up upgrading jQuery (for Bootstrap 3.x) from 2.x to 3.x; Bootstrap 3.3.7 supports jQuery 3.

The other main dependencies are all quite straightforward. I invite you to look through the `package.json`.

Development dependencies of note:

- `parcel-bundler`
- babel
  - babel comes with parcel, but it's here to be explicit for configured environments and plugins
  - the env and stage-2 presets
  - the plugins needed are syntax-decorators and [ng-annotate][npm-babel-plugin-ng-annotate] (which requires the syntax decorators babel plugin)
    - the ng-annotate babel plugin does some automagic handling to allow for smarter minification/uglification of the source JavaScript, a la ng-annotate
    - to see an example of how this works out, check out [the ng-annotate babel plugin in action][ng-annotate-plguin-in-action]
- [node-sass for scss compilation][parcel-sass]
- optional\*: [`gh-pages`][npm-gh-pages] and [`rimraf`][npm-rimraf] to aid in cleaning, building, and deploying of the site to [GitHub Pages][gh-pages]

### Font Awesome

There's a special exception for Font Awesome. It currently doesn't play nicely with Parcel. Here are the two links for the respective GitHub Issues:

- [Font Awesome 4 (\#763)][parcel-issue-fa-4]
- [Font Awesome 5 (\#764)][parcel-issue-fa-5]

My attempts to get something working, such as importing in `main.scss` or `link` tag in `index.html` pointing to the lib in `node_modules`, proved fruitless. The current solutuion I have is to load it from CDN.

### Babel Configuration

This is where the most actual configuration occurs. This has to do with the need to wire up the babel plugin of ng-annotate. The `.babelrc`, with snipped out target browsers, looks like this:

```
{
  "presets": [
    [
      "env",
      // ...snipped for simplicity
    ],
    "stage-2"
  ],
  "plugins": [
    "syntax-decorators",
    "ng-annotate"
  ]
}
```

As you can see, it's pretty terse and straight forward. View this project's `.babelrc` to see that it's targeting only the last couple versions of browsers, and no Internet Explorer versions below 11. This is one of the benefits of [babel's env preset][babel-env].

### Asset Importing

Since the project is changing over to use dependencies from npm, the `index.html` needs to be updated accordingly.

#### CSS

Using a path relative declaration in the `link` tags in the head of the file is a pretty easy way of managing library inclusion. It looks like so:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="../node_modules/bootswatch/flatly/bootstrap.min.css">
```

This application includes a couple more, and does not directly reference the `main.scss` file here, that's handled in the main entrypoint for the JavaScript. These will be rolled up together when parcel builds its files.

#### JavaScript

Similarly, in `main.js`, which is the only directly mentioned `script` tag with `src` now in the `index.html` file, we'll `import` our vendor libraries, then our application files, and the `main.scss` file. Here's what the majority of the file reads like:

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
const $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');
```

### Updating the Router

Parcel currently has [an issue importing html from js][parcel-issue-html-from-js]. This specifically becomes [a problem for AngularJS 1.x applications][parcel-issue-angular-router], regardless of whether you use [ngRoute][ng-route] or [ui-router][ui-router], if you make use of `templateUrl` with an html mpartial.

The solution implemented here was to make use of the fact that parcel runs with a node context. As [the assets page of the parcel documentaton][parcel-docs-assets] states, we can make use of `fs.readFileSync`. Note this must be the synchronous method, and it can only use variables of `__dirname` or `__filename`. Encapsulating some of your partial loading logic into a utility library is tempting, but it didn't work out for me, as any other such variable inclusion meant that parcel would cite an inability to statically analyze the code. So, sticking with loading your app routes in a router file and just prefixing each line with a well formed path is the way to go. Make sure to use the second argument of `utf8`, so as to return a string and not a buffer; also note that the path is relative to the project root.

Example, with ui-router:

```javascript
$stateProvider
  .state('about', {
    url: '/about',
    template: fs.readFileSync('./src/partials/about.html', 'utf8')
  })
```

For a closer look, feel free to check out these examples on code sandbox:
- [ngRoute][ng-router-example]
- [ui-router][ui-router-example]

### ngMessages

This application makes use of [a shared error message template, via ngMessages][ng-messages-template]. The ngMessages implementation suffers the same issue encountered in the router. Without being able to pass a string literal, converting the HTML partial into a script tag with `type="text/ng-template"` was the way to go.

```html
<script type="text/ng-template" id="generic-error-messages">
  <p ng-message="required">This field is required</p>
  <p ng-message="minlength">This field is too short</p>
  <p ng-message="maxlength">This field is too long</p>
  <p ng-message="required">This field is required</p>
  <p ng-message="email">This needs to be a valid email</p>
</script>
```

## Found Anything Else?

Feel free to reach out if there's something more that's unaccounted for. [Open an Issue][open-issue] or [submit a Pull Request][open-pr].

[bower]: https://bower.io/
[npm]: https://www.npmjs.com/
[parcel-issue-fa-4]: https://github.com/parcel-bundler/parcel/issues/763
[parcel-issue-fa-5]: https://github.com/parcel-bundler/parcel/issues/764
[npm-babel-plugin-ng-annotate]: http://npm.im/babel-plugin-ng-annotate
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
