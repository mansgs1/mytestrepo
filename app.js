angular.module('pdTypeadhead', ['pdTypeAhead'])
.value('DATA_SERVICE', 'API/Data.JSON')
.controller('mainCtrl', ['$scope', 'pdTypeAheadService', function($scope,  pdTypeAheadService) {
  	pdTypeAheadService.getData()
        .then(function (httpData) {
            $scope.dataToPopulate = httpData;
        },
        function(httpData) {
          //error
        });
    }
]);