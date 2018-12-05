require('angular-mocks');
require('../src/js/services');
require('../src/js/houseControllers');

describe('house collection controller', () => {
  var CONTROLLER_NAME = 'HouseListCtrl';
  var scope
  var createController;

  beforeEach(angular.mock.module('westerosiApp'));

  beforeEach(angular.mock.inject(($rootScope, $controller) => {
    scope = $rootScope.$new();

    createController = () => {
      return $controller(CONTROLLER_NAME, {
        '$scope': scope
      });
    };
  }));

  it('has housesOfWesteros ar', () => {
    createController();    
    expect(Array.isArray(scope.housesOfWesteros)).toBe(true);
  });
});