//defines the AngularJS app as a module
angular
  .module('westerosiApp', [
    'ui.router',
    'ngTagsInput',
    'ngMessages' //'ngAnimate'
  ])

  //ui-router config
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/about');

      $stateProvider
        .state('about', {
          url: '/about',
          template: require('../partials/about.html')
        })
        .state('houses', {
          url: '/houses',
          template: require('../partials/houseList.html'),
          controller: 'HouseListCtrl'
        })
        .state('newHouse', {
          url: '/newHouse',
          template: require('../partials/house.html'),
          controller: 'NewHouseCtrl'
        })
        .state('houses.item', {
          url: '/:item',
          template: require('../partials/house.html'),
          controller: 'OneHouseCtrl'
        })
        .state('characters', {
          url: '/characters',
          template: require('../partials/characterList.html'),
          controller: 'CharacterListCtrl'
        })
        .state('newCharacter', {
          url: '/newCharacter',
          template: require('../partials/character.html'),
          controller: 'NewCharacterCtrl'
        })
        .state('characters.item', {
          url: '/:item',
          template: require('../partials/character.html'),
          controller: 'OneCharacterCtrl'
        });
    }
  ]);
