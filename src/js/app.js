const fs = require('fs');

//defines the AngularJS app as a module
angular
  .module('westerosiApp', [
    'ngAria',
    'ui.router',
    'ngTagsInput',
    'ngMessages' //'ngAnimate'
  ])

  //ui-router config
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ariaProvider',
    function($stateProvider, $urlRouterProvider, $ariaProvider) {
      $ariaProvider.config({
        ariaValue: true,
        tabindex: false
      });

      $urlRouterProvider.otherwise('/about');

      $stateProvider
        .state('about', {
          url: '/about',
          template: fs.readFileSync('./src/partials/about.html', 'utf8')
        })
        .state('houses', {
          url: '/houses',
          template: fs.readFileSync('./src/partials/houseList.html', 'utf8'),
          controller: 'HouseListCtrl'
        })
        .state('newHouse', {
          url: '/newHouse',
          template: fs.readFileSync('./src/partials/house.html', 'utf8'),
          controller: 'NewHouseCtrl'
        })
        .state('houses.item', {
          url: '/:item',
          template: fs.readFileSync('./src/partials/house.html', 'utf8'),
          controller: 'OneHouseCtrl'
        })
        .state('characters', {
          url: '/characters',
          template: fs.readFileSync(
            './src/partials/characterList.html',
            'utf8'
          ),
          controller: 'CharacterListCtrl'
        })
        .state('newCharacter', {
          url: '/newCharacter',
          template: fs.readFileSync('./src/partials/character.html', 'utf8'),
          controller: 'NewCharacterCtrl'
        })
        .state('characters.item', {
          url: '/:item',
          template: fs.readFileSync('./src/partials/character.html', 'utf8'),
          controller: 'OneCharacterCtrl'
        });
    }
  ]);
