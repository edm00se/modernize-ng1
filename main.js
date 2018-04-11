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

// funky libs
const $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');