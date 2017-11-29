'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope','$timeout','createAjax','utilTool', function ($scope, $timeout,createAjax,utilTool) {
    $scope.user = {};
    $scope.authError = null;
    $scope.$watch('user', function () {
        $timeout(function(){
            $scope.user;
        });
    });
    $scope.login = function () {
        $scope.authError = null;

        // Try to login
        createAjax('/agent/login', {loginname: $scope.user.loginname, password: $scope.user.password}, function (data) {
            if (data.code == 0) {
              utilTool.initUser(data.data,$scope);
              $timeout(function () {
              window.location.href = '#/app/home';
              location.reload();
              });
            } else {
                $timeout(function () {
                    $scope.authError = errcode[data.code]['message'];
                });
            }
        }, false,false);
    };
}])
;