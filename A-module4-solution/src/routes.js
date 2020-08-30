(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    $stateProvider

    // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.html',
    controller: 'MainCategoriesController as mainCtrl',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'MainItemsController as mainItems',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  });

  }

})();
