(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http){
    var service = this;

    service.getAllCategories = function(){
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      })
      .then(function success(result) {
                return result.data;
            }, function error(response) {
                throw new Error('Failed to fetch data!');
            })
    };

    service.getItemsForCategory = function(categoryShortName){
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
        params: {
          category: categoryShortName
        }
      })
      .then(function success(result) {
                return result.data;
            }, function error(response) {
                throw new Error('Failed to fetch category details!');
            });
    };
  };

})();
