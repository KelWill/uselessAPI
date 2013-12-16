var app = angular.module('useless', [])
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
})
.factory('getApiList', function($q, $http){
  var service = {};

  service.call = function(url, method, data) {
    var p = $q.defer();

    $http({
      method: method,
      url: url,
      data: data
    }).success(function(data) {
      p.resolve(data);
    }).error(function(err) {
      p.reject(err);
    });

    return p.promise;
  };

  service.getList = function(){
    return service.call('/apilist', 'GET');
  };

  return service;
})
.controller('apiList', function($scope, getApiList){
  var list = getApiList.getList();
  $scope.list = list;

  $scope.callApi = function(){

  };
}).controller('main', function($rootScope, $scope){
  $rootScope.siteUrl = "uselessAPI.azurewebsites.net";
});