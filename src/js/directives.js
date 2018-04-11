const fs = require('fs');

//defines the AngularJS app as a module
angular
  .module('westerosiApp')

  /*
  *	Directives
  */

  // navigation
  .directive('navBar', function() {
    return {
      restrict: 'E',
      template: fs.readFileSync('./src/partials/nav.html', 'utf8'),
      controller: ["$scope", "$location", function($scope, $location) {
        $scope.isActive = function(route) {
          return route === $location.path();
        };
      }]
    };
  })

  //This directive allows us to pass a function in on an enter key to do what we want.
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  })

  .directive('tooltip', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        window.jQuery('[data-toggle="tooltip"]').tooltip();
      }
    };
  })

  // scope.enforceTooltips = function () {
  //   // enforce bootstrap tooltips following DOM manipulation
  //   angular.element('[data-toggle="tooltip"]').tooltip();
  // }

  /**
   * A generic confirmation for risky actions.
   * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
   */
  .directive('ngReallyClick', [
    '$window',
    function($window) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.bind('click', function() {
            //fails over should editForm not be in scope
            //confirmed: http://jsfiddle.net/edm00se/5t4rhmcf/show/
            if (!!scope.editForm && scope.editForm) {
              var message = attrs.ngReallyMessage;
              if (message && $window.confirm(message)) {
                scope.$apply(attrs.ngReallyClick);
              }
            } else {
              scope.$apply(attrs.ngReallyClick);
            }
          });
        }
      };
    }
  ]);
