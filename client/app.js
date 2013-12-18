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

  service.call = function(url, method, data, params, contentType) {
    var p = $q.defer();
    contentType = contentType || "application/JSON";

    if (params){
      for (var key in params){
        url += '?' + key + '=' + params[key];
      }
    }

    if (data){
      data = JSON.stringify(data);
    }

    $http({
      method: method,
      url: url,
      data: data,
      headers: {
        'Content-Type': contentType
      }
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
  $scope.test = "YES";

}).controller('api', function($scope, getApiList){
  $scope.callApi = function(url){
    var method = $scope.method || "GET";
    var data = $scope.data;
    if (data){
      data = JSON.parse(data);
      // If sending data, default method is POST
      method = "POST";
    }
    var params = $scope.params;

    getApiList.call(url, method, data, params).then(function(responseData){
      if (responseData){
        $scope.response = responseData;
      } else {
        if (data){
          $scope.response = "Something went wrong! Was your data properly formatted?";
        } else {
          $scope.response = "Well...we did say it was useless... Something went wrong.";
        }
      }
    });
  };
}).controller('main', function($rootScope, $scope){
  $rootScope.siteUrl = "localhost:3000";
});