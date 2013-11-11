'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('FormCtrl', [function() {

  }])
  .controller('NewSurveyCtrl', ['$scope', function($scope) {
	$scope.questions = [
	    {
	    type:"choose",
	    id:"1",
	    text:'you like witch game?',
	    options:
	    	[
	    	{text:"Final Fansity"},
	    	{text:"Fallout"},
	    	{text:"BalderGate"}
	    	],
		},
	    {
	    type:"input",
	    id:"2",
	    text:'build an angular app'
		}];
  }])
 /*
  .controller('GridCtrl', function($scope) {
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
    $scope.gridOptions = { data: 'myData' };
  })	 	 	
*/
  .controller('GridCtrl', function($scope, $http) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };	
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  })
  .controller('TodoCtrl', ['$scope', function($scope) {
	$scope.todos = [
	    {text:'learn angular', done:true},
	    {text:'build an angular app', done:false}];
	 
	
	$scope.addTodo = function() {
	    $scope.todos.push({text:$scope.todoText, done:false});
	    $scope.todoText = '';
	};
	$scope.remaining = function() {
	    var count = 0;
	    angular.forEach($scope.todos, function(todo) {
	      count += todo.done ? 0 : 1;
	    });
	    return count;
	};
	$scope.archive = function() {
	    var oldTodos = $scope.todos;
	    $scope.todos = [];
	    angular.forEach(oldTodos, function(todo) {
	      if (!todo.done) $scope.todos.push(todo);
	    });
	};
	
  }]);


