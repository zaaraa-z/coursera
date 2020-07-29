(function(){
	'use strict';

	angular.module('LunchCheck',[])
	.controller('LunchCheckController',LunchCheckController);

	function LunchCheckController($scope){
		$scope.countdishes = function(){
			var items = count($scope.dishes);
			console.log(items);
			$scope.message = display(items);
		};

		function count(dishes){
			var total = 0;
			if(dishes){
				var array = dishes.split(',');
				for(var i in array){
					if(array[i].trim().length != 0){
						total++;
					}
				}
			}
			return total;
		}

		function display(items){
			if(items == 0){
				return 'Please enter data first';
			}
			else if( items <=  3)
			{
				return 'Enjoy!';
			}
			else
			{
				return 'Too Much!';
			}
			}
		}
})();