/**
 * Created by Harry on 2016/4/20.
 */
app.controller('ChildrenAgentCtrl', ['$scope', '$timeout', 'ModalService', 'gridTool','createAjax', function ($scope, $timeout, ModalService,gridTool, createAjax) {
    $scope.gridOptions = angular.extend(angular.copy(gridOptions,{}),{
        columnDefs: [
          {field: 'username', displayName: '姓名', width: '100', enableHiding: false},
          {field: 'agentLevel', displayName: '代理属性', minWidth: 100, width: '8%', enableHiding: false,cellFilter:'agentLevel'},
          {field: 'agentno', displayName: '邀请码', width: '100', enableHiding: false},
          {field: 'userCount', displayName: '会员数', minWidth: 100, width: '8%', enableHiding: false,cellFilter : 'number'},
          {field: 'nickname', displayName: '昵称', minWidth: 100, width: '8%', enableHiding: false},
          {field: 'userno', displayName: '游戏ID', minWidth: 100, width: '8%', enableHiding: false},
          {field: 'loginTime', displayName: '最后登录时间', minWidth: 100, width: '10%', enableHiding: false,type : 'date',filterCellFiltered : 'true',cellFilter : 'date:"yyyy-MM-dd HH:mm"'},
          {field: 'enable', displayName: '状态', minWidth: 50, width: '5%', enableHiding: false,cellFilter:'enable'},
          {
            field: 'info',
            displayName: '操作',
            enableSorting: false,
            enableHiding: false,
            pinnedRight: true,
            minWidth: 200, width: '15%',
            cellTemplate: '<div class="text-center"><span  ng-if="row.entity.complete">已设置</span><button type="button" ng-if="!row.entity.complete" class="btn btn-link"  ng-click="grid.appScope.openModal(\'agent_edit\', row);"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></div>'
          }
        ]
    });
  /**
   * 下级代理
   */
  $scope.search = function () {
    var data = {
      key: 'agent_children', pageNumber: 1,
      pageSize: gridOptions.paginationPageSize,
      content: $scope.content
    };
    gridTool.refresh(data,$scope);
  };
  $scope.search();

  /**
   * 用户编辑 和添加
   * @param option
   * @param row
   */
  $scope.openModal = function (option, row) {
    var $$hashKey, title = "账号添加",htmlTmp='html/agent/add.html', info = {}, option = option;
    if (!!row) {
      info = row.entity;
      $$hashKey=info.$$hashKey;
      title = "账号设置";
      htmlTmp='html/agent/info.html';
    }else{
      info.rate=0.4;
      info.enable=1;
    }
    async.waterfall([function (cb) {
      info = angular.extend({title: title,key: option}, info);
      ModalService.baseModal({
        htmlId: htmlTmp,
        openCtrl: 'ModalCtrl',
        size: 'lg',
        param: angular.extend(info)
      }, function (val) {
        val.$$hashKey=$$hashKey;
        cb(null, val);
      })
    }, function (val, cb) {
      delete  val.title;
      createAjax(null, val, function (res) {
        showNotice(res);
        if(/_add/.test(option)){
          gridTool.addRow(res.data,$scope);
        }else{
          val.$$hashKey=$$hashKey;
          gridTool.editRow(val,$scope);
        }
      });
    }], function (err) {
      if (err) {
        console.log(err);
      }
    });
  };
}]);
