/* Controllers */
app.controller('HomeCtrl', ['$scope', '$timeout', '$localStorage','i18nService','createAjax','utilTool', function ($scope, $timeout, $localStorage,i18nService,createAjax,utilTool) {
    i18nService.setCurrentLang('zh-cn');
    $timeout(function () {
        async.waterfall([function(cb){
          createAjax(null, {key:'agent_index'}, function (res) {
            utilTool.initUser(res,$scope);
            cb(null, null);
          });
        },function (val,cb) {
            if (!!$localStorage.currentUser) {
                currentUser = $localStorage.currentUser;
              $scope.agent=currentUser;
              $scope.app.loginname=currentUser.loginname;
                $scope.app.menus = currentUser.menus;
              $scope.loadContent('agent_index');
            } else {
                delete $localStorage.currentUser;
                location.href = '#/access/signin';
            }
            cb(null, null);
        }], function (err) {
            if (err) {
                console.log(err);
                showNotice(errors.internal_server_error);
            }
        });
    });
    $timeout(function () {
        $.when(
            $.getScript( root_dir+"bower_components/moment/min/moment.min.js" ),
            $.getScript(root_dir+"plugins/echarts.min.js" ),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
            console.log('==========load [moment,echarts]     ok==========')
        });
    });
  $scope.cash= function () {
    if($scope.amount>=100&&currentUser){
      if($scope.amount<=currentUser.balance){
        createAjax(null, {key:'agent_cash',amount:$scope.amount}, function (res) {
          if(res){
            currentUser.balance=res.balance;
            $localStorage.currentUser=currentUser;
          }
        });
      }else{
        showNotice(errors.insufficient_balance);
      }
    }
  }
}]);