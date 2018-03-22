console.log("This is just a test");

import 'angular'

const app = angular.module('myApp', [])
.controller('MyCtrl', ['$http', function($http) {
  const vm = this;

  vm.something = 'hello world!';

}]);