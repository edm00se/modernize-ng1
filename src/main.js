// auto polyfill
import '@babel/polyfill';

// libs
import 'angular';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-aria';
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

// helper
const isProd = process.env.NODE_ENV === 'production';

// funky libs
const $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');

if ('serviceWorker' in navigator && isProd) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(r => {
        console.log('service worker registered in scope: ', r.scope);
      })
      .catch(e => console.log('SW error: ', e));
  });
}
