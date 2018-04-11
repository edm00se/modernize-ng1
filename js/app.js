const fs = require('fs');

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
          template: fs.readFileSync('./partials/about.html', 'utf8')
        })
        .state('houses', {
          url: '/houses',
          template: fs.readFileSync('./partials/houseList.html', 'utf8'),
          controller: 'HouseListCtrl'
        })
        .state('newHouse', {
          url: '/newHouse',
          template: fs.readFileSync('./partials/house.html', 'utf8'),
          controller: 'NewHouseCtrl'
        })
        .state('houses.item', {
          url: '/:item',
          template: fs.readFileSync('./partials/house.html', 'utf8'),
          controller: 'OneHouseCtrl'
        })
        .state('characters', {
          url: '/characters',
          template: fs.readFileSync('./partials/characterList.html', 'utf8'),
          controller: 'CharacterListCtrl'
        })
        .state('newCharacter', {
          url: '/newCharacter',
          template: fs.readFileSync('./partials/character.html', 'utf8'),
          controller: 'NewCharacterCtrl'
        })
        .state('characters.item', {
          url: '/:item',
          template: fs.readFileSync('./partials/character.html', 'utf8'),
          controller: 'OneCharacterCtrl'
        });
    }
  ]);
