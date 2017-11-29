/**
 * Created by Harry on 2016/4/20.
 */
app.controller('AgentCtrl', ['$scope', '$timeout', 'ModalService', 'gridTool','createAjax', function ($scope, $timeout, ModalService,gridTool, createAjax) {
    $scope.gridOptions = angular.extend(angular.copy(gridOptions,{}),{
        columnDefs: [
          {field: 'agentno', displayName: '邀请码', width: '70', enableHiding: false},
          {field: 'username', displayName: '姓名', width: '70', enableHiding: false},
          {field: 'mobile', displayName: '电话', minWidth: 80, width: '8%', enableHiding: false},
          {field: 'weixin', displayName: '微信', minWidth: 100, width: '5%', enableHiding: false},
          {field: 'userno', displayName: '游戏ID', minWidth: 80, width: '5%', enableHiding: false},
          {field: 'address', displayName: '地址', minWidth: 100, width: '15%', enableHiding: false},
          {field: 'userCount', displayName: '会员数', minWidth: 60, width: '5%', enableHiding: false,cellFilter : 'number'},
          {field: 'agentCount', displayName: '下载代理数', minWidth: 75, width: '8%', enableHiding: false,cellFilter : 'number'},
          {field: 'balance', displayName: '可用金额', minWidth: 80, width: '6%', enableHiding: false,filterCellFiltered : 'true',cellFilter : 'number:2'},
          {field: 'totalAmount', displayName: '累计金额', minWidth: 100, width: '10%', enableHiding: false,filterCellFiltered : 'true',cellFilter : 'number:2'},
          {field: 'loginTime', displayName: '最后登录时间', minWidth: 100, width: '10%', enableHiding: false,type : 'date',filterCellFiltered : 'true',cellFilter : 'date:"yyyy-MM-dd HH:mm"'},
          {field: 'enable', displayName: '状态', minWidth: 50, width: '5%', enableHiding: false,cellFilter:'enable'}
        ]
    });
  /**
   * 下级代理
   */
  $scope.search = function () {
    var data = {
      key: 'agent_list', pageNumber: 1,
      pageSize: gridOptions.paginationPageSize,
      content: $scope.content
    };
    gridTool.refresh(data,$scope);
  };
  $scope.search();

    $scope.resetPwd = function (option, row) {
        var title = "密码重置", loginname = row.entity.loginname;
        async.waterfall([function (cb) {
            ModalService.baseModal({
                htmlId: 'html/agent/reset.html',
                openCtrl: 'ModalCtrl',
                size: 'lg',
                param: {title: title, loginname: loginname, key: option}
            }, function (val) {
                cb(null, val);
            })
        }, function (val, cb) {
            createAjax(null, val, function (res) {
                showNotice(res);
            });
        }], function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}]);
