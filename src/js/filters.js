(function() {
  //defines the AngularJS app as a module
  angular
    .module('westerosiApp')

    /*
     *	Filters
     */

    // we already use the limitTo filter built-in to AngularJS,
    // this is a custom filter for startFrom
    .filter('startFrom', function() {
      return function(input, start) {
        if (Object.prototype.toString.call(input) === '[object Array]') {
          start = +start; //parse to int
          return input.slice(start);
        } else {
          return input;
        }
      };
    })

    // filters array of objects by property, src: http://stackoverflow.com/a/18186947/1720082
    .filter('orderObjectBy', function() {
      return function(input, attribute) {
        if (!angular.isObject(input)) {
          return input;
        }

        var array = [];
        for (var objectKey in input) {
          array.push(input[objectKey]);
        }

        array.sort(function(a, b) {
          a = parseInt(a[attribute]);
          b = parseInt(b[attribute]);
          return a - b;
        });
        return array;
      };
    });
})();
