(function() {
  //defines the AngularJS app as a module
  angular
    .module('westerosiApp')

    /*
     *	Factories
     */

    //defines the $HTTP factory, one of the 3 service types
    .factory('houseCollectionFactory', [
      '$http',
      '$q',
      function($http, $q) {
        // return $http({
        //   method: 'GET',
        //   url: 'xsp/houses'
        // });
        // mocked JSON response for f/e only demo
        return $q((resolve, reject) => {
          const mock = require('../mocks/houses.json');
          resolve(mock); // don't even need to parse it
        });
      }
    ])

    .factory('houseFactory', [
      '$http',
      '$q',
      'houseCollectionFactory',
      function($http, $q, houseCollectionFactory) {
        // return function(id) {
        //   return $http({
        //     method: 'GET',
        //     url: 'xsp/houses/' + id
        //   });
        // };
        return function(id) {
          return $q((resolve, reject) => {
            houseCollectionFactory.then(res => {
              const found = res.data.find(el => el.unid === id);
              if (undefined !== found) {
                resolve(found);
              } else {
                reject({});
              }
            });
          });
        };
      }
    ])

    .factory('characterCollectionFactory', [
      '$http',
      '$q',
      function($http, $q) {
        // return $http({
        //   method: 'GET',
        //   url: 'xsp/characters/'
        // });
        // mocked JSON response for f/e only demo
        return $q((resolve, reject) => {
          const mock = require('../mocks/characters.json');
          resolve(mock); // don't even need to parse it
        });
      }
    ])

    .factory('characterFactory', [
      '$http',
      '$q',
      'characterCollectionFactory',
      function($http, $q, characterCollectionFactory) {
        // return function(id) {
        //   return $http({
        //     method: 'GET',
        //     url: 'xsp/characters/' + id
        //   });
        // };
        return function(id) {
          return $q((resolve, reject) => {
            characterCollectionFactory.then(res => {
              const found = res.data.find(el => el.unid === id);
              if (undefined !== found) {
                resolve(found);
              } else {
                reject({});
              }
            });
          });
        };
      }
    ])

    .factory('abilitiesTagFactory', [
      '$http',
      '$q',
      function($http, $q) {
        // return $http.get('/tags/abilities.json');
        return $q((resolve, reject) => {
          const mock = require('../mocks/abilities.json');
          resolve(mock.data);
        });
      }
    ]);
})();
