require('angular-mocks');
require('../src/js/services');

describe('services: ', () => {
  beforeEach(angular.mock.module('westerosiApp'));

  describe('- houseCollectionFactory', () => {
    var _houses;

    beforeEach(angular.mock.inject(houseCollectionFactory => {
      _houses = houseCollectionFactory.$$state.value.data;
    }));

    it('returns a well structured array', () => {
      // is an array
      expect(typeof _houses).toBe('object');
      expect(Array.isArray(_houses)).toBe(true);
      expect(_houses.length).toBeGreaterThan(0);
      // of objects
      expect(typeof _houses[0]).toBe('object');
      // with requisite properties
      expect(Object.keys(_houses[0]).includes('name'));
      expect(Object.keys(_houses[0]).includes('title'));
      expect(Object.keys(_houses[0]).includes('region'));
    });
  });

  describe('- houseFactory', () => {
    var _house;

    beforeEach(inject(houseFactory => {
      _house = houseFactory('896AA1D0286E4FE088257E0000123C29');
    }));

    it('returns a well structured house object', function(){
      // is an array
      expect(typeof _house).toBe('object');
      // with requisite properties
      expect(Object.keys(_house).includes('name'));
      expect(Object.keys(_house).includes('title'));
      expect(Object.keys(_house).includes('region'));
    });
  });

  describe('- characterCollectionFactory', () => {
    var _characters;

    beforeEach(inject(characterCollectionFactory => {
      _characters = characterCollectionFactory.$$state.value.data;
    }));

    it('returns a well structured array', () => {
      // is an array
      expect(typeof _characters).toBe('object');
      expect(Array.isArray(_characters)).toBe(true);
      expect(_characters.length).toBeGreaterThan(0);
      // of objects
      expect(typeof _characters[0]).toBe('object');
      // with requisite properties
      expect(Object.keys(_characters[0]).includes('house'));
      expect(Object.keys(_characters[0]).includes('charFirstName'));
      expect(Object.keys(_characters[0]).includes('charLastName'));
    });
  });

  describe('- characterFactory', () => {
    var _character;

    beforeEach(inject(characterFactory => {
      _character = characterFactory('896AA1D0286E4FE088257E0000123C29');
    }));

    it('returns a well structured house object', () => {
      // is an array
      expect(typeof _character).toBe('object');
      // with requisite properties
      expect(Object.keys(_character).includes('name'));
      expect(Object.keys(_character).includes('title'));
      expect(Object.keys(_character).includes('region'));
    });
  });

  describe('- abilitiesTagFactory', () => {
    var _abilities;

    beforeEach(inject(abilitiesTagFactory => {
      _abilities = abilitiesTagFactory.$$state.value;
    }));

    it('returns a well structured array', () => {
      // is an array
      expect(typeof _abilities).toBe('object');
      expect(Array.isArray(_abilities)).toBe(true);
      expect(_abilities.length).toBeGreaterThan(0);
      // of objects
      expect(typeof _abilities[0]).toBe('object');
      // with text property
      expect(Object.keys(_abilities[0]).includes('text'));
    });
  });

});