(function() {
  //defines the AngularJS app as a module
  angular
    .module('westerosiApp')

    /*
     *	House Controllers
     */

    //provies the controller to the app, which handles the interaction of data (model) with the view (a la MVC)
    .controller('HouseListCtrl', [
      '$scope',
      '$state',
      '$http',
      '$log',
      'houseCollectionFactory',
      function($scope, $state, $http, $log, houseCollectionFactory) {
        //defines filter/search/etc. vars
        $scope.pageQty = 5; //detectPhone() ? 10 : 30;
        $scope.curPage = 0;

        //calculates the number of results
        $scope.numberOfPages = function() {
          return (
            Math.ceil($scope.housesOfWesteros.length / $scope.pageQty) || 0
          );
        };

        //defines a boolean var
        $scope.showSearch = false;

        $scope.housesOfWesteros = [];
        //the factory is returning the promise of the $http, so handle success/error here
        houseCollectionFactory
          .then(function(response) {
            if (!response.data.hasOwnProperty('dataAr')) {
              //loading by non-Domino method, probably json-server; just use the response
              $scope.housesOfWesteros = response.data;
            } else {
              $scope.housesOfWesteros = response.data.dataAr;
            }
          })
          .catch(function(err) {
            $scope.housesOfWesteros = null;
            $log.error('error: ', err);
          });

        $scope.removeHouse = function(unid) {
          $http
            .delete('houses/' + unid)
            .then(function(res) {
              $log.info('successfully deleted house with id: ' + unid);
            })
            .catch(function(err) {
              //might as well say something
              $log.error('error: ', err);
            })
            .then(function() {
              $state.go('houses', {}, { reload: true });
            });
        };
      }
    ])

    .controller('OneHouseCtrl', [
      '$scope',
      '$state',
      '$stateParams',
      '$http',
      'houseFactory',
      function($scope, $state, $stateParams, $http, houseFactory) {
        // check for empty ID
        var tmpItm = $stateParams.item;
        console.log('unid: ' + tmpItm);
        if (tmpItm.indexOf('-') > -1) {
          tmpItm = tmpItm.replace(/-/g, '');
        }
        var re = /^[0-9A-Za-z]{32}$/;
        //var re = /\d/;
        if (
          tmpItm == null ||
          tmpItm == undefined ||
          (!tmpItm || !tmpItm.trim()) ||
          !re.test(tmpItm)
        ) {
          $state.go('houses');
        }

        $scope.editForm = false;
        $scope.canEditForm = false;
        $scope.myHouse = {};
        var fieldNames = [];

        houseFactory($stateParams.item).then(
          function(data, status, headers, config) {
            if (!data.hasOwnProperty('values')) {
              var values = {};
              for (var prop in data) {
                values[prop] = data[prop];
              }
              var tmpResp = {
                editMode: true,
                unid: data.unid,
                values: values || values.data
              };
              $scope.myHouse = tmpResp;
            } else {
              $scope.myHouse = data;
            }
            $scope.canEditForm = true;
            angular.forEach($scope.myHouse, function(value, key) {
              if (key != 'unid') {
                fieldNames.push(key);
              }
            });
          },
          function(data, status, headers, config) {
            console.log('status: ' + status);
            console.log('data: ' + data);
            console.log('headers: ' + headers);
            console.log('config: ' + JSON.parse(config));
          }
        );
        $scope.setFormEditable = function() {
          if ($scope.canEditForm == true) {
            $scope.editForm = true;
          }
        };
        $scope.clearCancelForm = function() {
          $state.go('houses');
        };

        $scope.saveHouseForm = function() {
          if (houseForm.$valid) {
            var tmpOb = { unid: $scope.myHouse.unid };
            //console.log("checking field names: "+fieldNames.toString());
            angular.forEach(fieldNames, function(fldNm) {
              if ($scope.houseForm[fldNm].$dirty === true) {
                var tmpVal = $scope.myHouse[fldNm];
                //console.log("updated field: "+fldNm+" with value: "+tmpVal);
                tmpOb[fldNm] = tmpVal;
              }
            });

            $http({
              method: 'PUT',
              url: 'houses/' + $scope.myHouse.unid,
              data: JSON.stringify(tmpOb)
            })
              .then(
                function(data, status, headers, config) {
                  console.log(
                    'successfully updated house with unid: ' +
                      $scope.myHouse.unid
                  );
                },
                function(data, status, headers, config) {
                  //might as well say something
                  console.log('poop');
                }
              )
              .then(function() {
                $state.go('houses', {}, { reload: true });
              });
          } else {
            var tmpFldAr = [];
            angular.forEach($scope.houseForm, function(value, key) {
              if (key.indexOf('$') < 0) {
                //only look at the fields
                tmpFldAr.push(key);
                angular.element(houseForm[key]).blur();
              }
            });
            alert(
              'The form shows that there are fields which need to be fixed before you can save.\n\nPlease review the form, correct any validation requirements, and try again.'
            );
          }
        };

        $scope.$on('$locationChangeStart', function(event) {
          if (
            $scope.form != undefined &&
            $scope.form.$dirty &&
            !confirm('Abandon unsaved changes?')
          ) {
            event.preventDefault();
          }
        });
      }
    ])

    .controller('NewHouseCtrl', [
      '$scope',
      '$state',
      '$stateParams',
      '$http',
      function($scope, $state, $stateParams, $http) {
        $scope.editForm = true;
        $scope.canEditForm = true;
        $scope.myHouse = {};
        var fieldNames = [];

        $scope.myHouse = {};
        $scope.setFormEditable = function() {
          if ($scope.canEditForm == true) {
            $scope.editForm = true;
          }
        };
        $scope.clearCancelForm = function() {
          $state.go('houses');
        };

        $scope.saveHouseForm = function() {
          // if( houseForm.$valid ){
          var nwUnid = null;

          $http({
            method: 'POST',
            url: 'houses',
            data: JSON.stringify($scope.myHouse.values)
          })
            .then(
              function(resp) {
                var data = resp.data;
                var config = resp.config;
                var headers = resp.headers;
                var status = resp.status + ': ' + resp.statusText;
                console.log('data: ');
                console.table(data);
                var nwUnid = headers('Location') || data.unid; // ex: /xsp/houses/:unid
                nwUnid = data.unid;
                console.log(
                  'successfully saved new house with unid: ' + nwUnid
                );
              },
              function(data, status, headers, config) {
                //might as well say something
                console.log('error: ' + data);
              }
            )
            .then(function() {
              if (nwUnid != null) {
                $state.go('houses.item', { item: nwUnid }, { reload: true });
              } else {
                $state.go('houses', {}, { reload: true });
              }
            });
          /*
          }else{
            var tmpFldAr = [];
            angular.forEach($scope.houseForm, function(value, key){
              if( key.indexOf("$") < 0 ){ //only look at the fields
                tmpFldAr.push(key);
                angular.element(houseForm[key]).blur();
              }
            });
            alert("The form shows that there are fields which need to be fixed before you can save.\n\nPlease review the form, correct any validation requirements, and try again.");
          }
          */
        };

        $scope.$on('$locationChangeStart', function(event) {
          if (
            $scope.form != undefined &&
            $scope.form.$dirty &&
            !confirm('Abandon unsaved changes?')
          ) {
            event.preventDefault();
          }
        });
      }
    ]);
})();
