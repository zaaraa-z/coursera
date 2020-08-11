(function(){
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems',FoundItems)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    
    function FoundItems(){
        var ddo = {
            templateUrl:'foundItems.html',
            scope:{
                foundArray:'<',
                onRemove:'&',
                itemsInList:'&',
                click:'&'
            },
            link:MenuListDirectiveLink
        };
        return ddo;
    }

    function MenuListDirectiveLink(scope, element, attrs, controller){

        var elem=element.find("div.resultTable");
        var errorElem=element.find("div.error");
        scope.$watch('itemsInList()',function(newValue,oldValue){
            if(newValue===true){
                elem.slideDown();
            }else{
                elem.slideUp();
                errorElem.css("display","block");
            }
        });
    }

    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var ctrl=this;
        ctrl.searchTerm="";
        ctrl.found=[];
        ctrl.click=0;
        ctrl.firstClick=function(){
            if(ctrl.click===0){
                return true;
            }else{
                return false;
            }
        }
        ctrl.narrowDown=function(search){
            ctrl.click=ctrl.click+1;
            var promise=MenuSearchService.getMatchedMenuItems(search);
            promise.then(function(resultArray){
                ctrl.found=resultArray;
                console.log("Search list:",ctrl.found);
                ctrl.searchTerm="";
            });
        };
        ctrl.removeItem=function(itemIndex){
            MenuSearchService.removeUnwantedItem(itemIndex);
        };
        ctrl.showMenuItemsTable=function(){
                if(ctrl.found.length===0){
                    return false;
                }else{
                    return true;
            }
        }
    }

    MenuSearchService.$inject=['ApiBasePath','$http'];
    function MenuSearchService(ApiBasePath,$http){
        var service=this;
        var search_list=[];
        service.getMatchedMenuItems=function(searchItem){
           return $http({
            method:"GET",
            url:(ApiBasePath+"/menu_items.json")
           })
           .then(function(response){
            search_list=[];
            var menu_items=response.data.menu_items;
            var i;
            for(i=0;i<menu_items.length;i++){
                if(menu_items[i].description.indexOf(searchItem.toLowerCase())>0){
                    search_list.push(menu_items[i]);
                }
            }
            console.log("Search list:",search_list);
            return search_list;
           });
        };
        service.removeUnwantedItem=function(itemIndex){
            search_list.splice(itemIndex,1);
        };
    }

})()