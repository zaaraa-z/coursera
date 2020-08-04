(function () {
    'use strict';
    angular.module('ShoppingListCheckOff',[])
        .controller('ToBuyController',ToBuyController)
        .controller('AlreadyBoughtController',AlreadyBoughtController)
        .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemList=this;

        itemList.items=ShoppingListCheckOffService.getBuyItems();

        itemList.checkStatus=function(){
            if(itemList.items.length==0){
                return true;
            }else {
                return false;
            }
        }

        itemList.buyItem=function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList=this;

        boughtList.items=ShoppingListCheckOffService.getBoughtItems();

        boughtList.checkStatus=function(){
            if(boughtList.items.length==0){
                return true;
            }else {
                return false;
            }
        }
    }

    function ShoppingListCheckOffService() {
        var service=this;
        var buyItems=[
            { name: "Cookies",quantity: 10 },
            { name: "Buns",quantity: 5 },
            { name: "Donuts",quantity: 15 },
            { name: "Burgers",quantity: 10 },
            { name: "Egg Rolls",quantity: 5 }
        ];
        var boughtItems=[];

        service.buyItem=function (itemIndex) {
            boughtItems.push(buyItems[itemIndex]);
            buyItems.splice(itemIndex,1);
        };

        service.getBuyItems=function () {
            return buyItems;
        };
        service.getBoughtItems=function () {
            return boughtItems;
        };
    }
})();