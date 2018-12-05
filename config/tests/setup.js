// basic scaffold of 
const angular = require('angular');
require('@uirouter/angularjs');

angular.module('westerosiApp', ['ui.router']);

Object.defineProperty(window, 'angular', { value: angular });