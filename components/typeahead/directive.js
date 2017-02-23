// directive.js
angular.module('pdTypeAhead', [])
.directive('typeAhead',['$document', '$compile', '$filter', function($document, $compile, $filter) {
	return {
		restrict: 'A',
		scope : {
			cinfo:'=datalist',
		},
		replace: false,
		controllerAs: 'typeAheadCtrl',
		controller: function($scope, $attrs, pdTypeAheadSelectService) {
			var vm = this,
				getIndex = function(name) {
					if(name.length > 3){
					return vm.results ? vm.results.indexOf(name): 0;
					}
				},
				getMax = function() {
					return vm.results.length;
				};

			this.hide = function() {
				$scope.typeAheadVisible(false);
			};

			this.updateSelection = function(selected) {
				$scope.selectedNameIndex = selected;
				angular.forEach(vm.results, function(name, index) {
					name.selected = false;
					if (index == selected)
						name.selected = true;

						if(document.getElementsByClassName('active').length) {

							document.getElementsByClassName('dropdown')[0].scrollTop =  document.getElementsByClassName('active')[0].offsetTop -248;
						}
				});
			};
			$scope.sterm = '';
			$scope.visible = true;
			$scope.typeAheadVisible = function(visible) {
				$scope.visible = $scope.sterm.length > 3 && visible;
			};

			$scope.$watch(function() {return vm.results}, function(results) {
				var resLength = results.length;
				if ( !resLength ) return;
				pdTypeAheadSelectService.setMax(resLength);
				vm.updateSelection(pdTypeAheadSelectService.getSelected());
				if ( resLength >= 1 ) {
				 	$scope.typeAheadVisible(true);
				}
			});

			$scope.$on('pd.typeahead:enter',function (event, selected) {
				$scope.typeAheadVisible(false);
			});

			$scope.$on('pd.typeahead:backspace',function (event, selected) {
			  if($scope.sterm.length > 3)
					$scope.typeAheadVisible(true);
				else
					$scope.typeAheadVisible(false);
			});

			$scope.$on('pd.typeahead:updatedIndex', function(event, selected) {
				vm.updateSelection(selected);
				$scope.$apply();
			});

			$scope.$on('pd.typeahead:close', function() {
				vm.hide();
				$scope.$apply();
			});

			$scope.$on('pd.typeahead:applySelection', function(event, selected) {
				if ( !vm.results[selected] ) return; //nothing selected show type ahead

				$scope.updateSearchTerm(vm.results[selected]);
				$scope.$apply();
			});


			$scope.updateSearchTerm = function(selName) {
				$scope.sterm = selName.name;
				$scope.company = selName.compName;
				$scope.priority = selName.priority;
				$scope.typeAheadVisible(false);
			};

			$scope.close = function() {
				vm.hide();
			};

			$scope.filterData = function(sterm) {
				vm.results = $filter('filter')($scope.cinfo, sterm);
				vm.results = $filter('limitTo')(vm.results || [], 100);
				pdTypeAheadSelectService.setSelected(getIndex(sterm));
				pdTypeAheadSelectService.setMax(getMax());
				$scope.selectedNameIndex = pdTypeAheadSelectService.getSelected();
				if( sterm === ''){
					//document.getElementById('btn_save').setAttribute('disabled', 'disabled');
				}
			};

			$scope.filterData('');
		},
		link:function(scope,element,attr) {
			element[0].focus();
			element.attr('pd-mousetrap','');
			element.removeAttr("type-ahead");
      element.removeAttr("data-type-ahead");
      $document[0].getElementById('idSearch').focus();
      $compile(element)(scope);
		},
		templateUrl:'templates/typeahead.html'
	}
}]);
