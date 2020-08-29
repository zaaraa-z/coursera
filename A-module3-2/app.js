(function () {
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService )
  .constant('ApiMenuPath', "https://davids-restaurant.herokuapp.com/menu_items.json")
  .directive('foundItems', FoundItemsDirective);
  
  
  function FoundItemsDirective () {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };
    //Directive definition object
    return ddo;
  }
  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var controller = this;
  
  
    controller.notFound = false;
  
    controller.getMatchedMenuItems = function (searchTerm) {
      if (searchTerm !== "") {
         var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
         promise.then (function (response) {
           controller.found = response;
           if (controller.found.length > 0 || searchTerm=="") {
             controller.notFound = false;
           } else { controller.notFound = true;}
         })
         .catch (function (error) {
           controller.notFound = true;
         });
      }
      else {controller.notFound = true;controller.found=[];}
    }
  
    controller.removeItem = function(itemIndex) {
      controller.found.splice(itemIndex, 1);
    }
  }
  
  MenuSearchService.$inject = ['$http', 'ApiMenuPath']
  function MenuSearchService ($http, ApiMenuPath) {
    var service = this;
  
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({ method: "GET", url: ApiMenuPath})
      .then(function (response) {
        var foundItems = [];
        var menu_items = response.data.menu_items;
        for (var item in menu_items) {
          if (menu_items[item].description.toLowerCase().indexOf(searchTerm)!==-1) {
            foundItems.push(menu_items[item]);
          }
        }
        return foundItems;
      })
      .catch(function (error) {
        console.log("Unable to connect to the server.");
      });
    };
  }
  
  })();
  