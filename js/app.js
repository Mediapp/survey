'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/todo', {templateUrl: 'partials/todo.html', controller: 'TodoCtrl'});
  $routeProvider.when('/newsurvey', {templateUrl: 'partials/newsurvey.html', controller: 'NewSurveyCtrl'});
  $routeProvider.when('/form', {templateUrl: 'partials/form.html', controller: 'FormCtrl'});
  $routeProvider.otherwise({redirectTo: '/view1'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
