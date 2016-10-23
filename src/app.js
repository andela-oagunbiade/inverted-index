"use strict";

let invertedApp = angular  
    .module("InvertedIndex", [])
    .controller("invertedController", function($scope) {
        $scope.message = "Inverted Index";
        $scope.readFile = function(){
            let newIndex = new InvertedIndex();
            let thefile = document.getElementById("selectFiles").files[0];
            let reader = new FileReader();
            reader.readAsText(thefile);

            reader.onload = function(e) {
                let filed = JSON.parse(e.target.result);
                let index = newIndex.createIndex(filed);
                let range = [];
                for(let i=0;i<filed.length;i++) {
                    range.push(i);
                }
                $scope.filed =filed;
                $scope.index = index;
                $scope.range = range;
                $scope.$apply();                
            };
        };
    });