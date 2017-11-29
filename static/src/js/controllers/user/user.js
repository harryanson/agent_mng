app.controller('UserCtrl', ['$scope', '$timeout', 'ModalService', 'gridTool','createAjax', function ($scope, $timeout, ModalService,gridTool, createAjax) {
  $scope.gridOptions = angular.extend(angular.copy(gridOptions,{}),{
    columnDefs: [
      {field: 'userno', displayName: '游戏ID', minWidth: '150',width: '30%', enableHiding: false},
      {field: 'nickname', displayName: '昵称', minWidth: 150, width: '30%', enableHiding: false},
      {field: 'bindTime', displayName: '绑定时间', minWidth: 150, width: '40%', enableHiding: false,type : 'date',filterCellFiltered : 'true',cellFilter : 'date:"yyyy-MM-dd HH:mm"'}
    ]
  });
  /**
   * 下级代理
   */
  $scope.list = function () {
    var data = {
      key: 'myusers', pageNumber: 1,
      pageSize: gridOptions.paginationPageSize
    };
    gridTool.refresh(data,$scope);
  };
  $scope.list();
  $scope.search = function () {
    var data = {
      key: 'user_search',
      content: $scope.content
    };
    if ($scope.app) {
      $scope.app.promise = createAjax(null, data, function (data) {
        $timeout(function () {
          if(data){
            $scope.user=data;
          }
        });
      });
    }
  };
}]);