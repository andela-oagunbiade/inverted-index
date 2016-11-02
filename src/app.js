'use strict';

const invertedApp = angular
  .module('InvertedIndex', [])
  .controller('invertedController', function ($scope) {
    $scope.message = 'Inverted Index';
    $scope.uploadError = ' ';

    function setMessage(msg) {
      $scope.$apply(function () {
        $scope.uploadError = msg;
      });
    }

    const newIndex = new InvertedIndex();
    $scope.readFile = function () {
      const thefile = document.getElementById('select-files').files[0];
      const reader = new FileReader();
      reader.readAsText(thefile);

      reader.onload = function (e) {
        if (!thefile.name.toLowerCase().match(/\.json$/)) {
          $scope.fileExists = false;
          setMessage('This is not a JSON file.');
          return;
        }
        try {
          const filed = JSON.parse(e.target.result);
          if (filed.length === 0 || !filed[0].title || !filed[0].text) {
            $scope.fileExists = false;
            setMessage('This is an Empty JSON File');
            $scope.$apply();
          } else {
            $scope.fileExists = true;
          }

          const index = newIndex.createIndex(filed);
          const range = [];
          const filedLength = filed.length;
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
      const searchItem = $scope.searchTerm;
      $scope.searchResults = newIndex.searchIndex(searchItem);
    };
    
  });