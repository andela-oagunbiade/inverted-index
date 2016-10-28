'use strict';

let invertedApp = angular
  .module('InvertedIndex', [])
  .controller('invertedController', function ($scope) {
    $scope.message = 'Inverted Index';
    $scope.uploadError = ' ';

    function setMessage(msg) {
      $scope.$apply(function () {
        $scope.uploadError = msg;
      });
    }
    let newIndex = new InvertedIndex();
    $scope.readFile = function () {
      let thefile = document.getElementById('selectFiles').files[0];
      let reader = new FileReader();
      reader.readAsText(thefile);

      reader.onload = function (e) {
        if (!thefile.name.toLowerCase().match(/\.json$/)) {
          $scope.fileExists = false;
          setMessage('This is not a JSON file.');
          return;
        }
        try {
          let filed = JSON.parse(e.target.result);
          if (filed.length === 0 || !filed[0].title || !filed[0].text) {
            $scope.fileExists = false;
            setMessage('This is an Empty JSON File');
            $scope.$apply();
          } else {
            $scope.fileExists = true;
          }
          let index = newIndex.createIndex(filed);
          let range = [];
          let filedLength = filed.length;
          for (let i = 0; i < filedLength; i++) {
            range.push(i);
          }
          $scope.filed = filed;
          $scope.index = index;
          $scope.range = range;
          $scope.$apply();
        } catch (e) {
          setMessage(e);
        }
      };
    };
    $scope.searchFile = function () {
      $scope.isError = false;
      let searchItem = $scope.searchTerm;
      searchItem = newIndex.uniqueWords(searchItem);
      for (let x in searchItem) {
        let searchResults = newIndex.searchIndex(searchItem[x]);
        if (typeof (searchResults) === 'string') {
          $scope.searchError = searchResults;
          $scope.isError = true;
        }
        $scope.searchResults = searchResults;
      }
    };
  });