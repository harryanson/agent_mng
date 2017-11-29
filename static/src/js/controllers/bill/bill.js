/**
 * Created by Harry on 2016/4/20.
 */
app.controller('BillCtrl', ['$scope', '$timeout', 'ModalService', 'gridTool','createAjax', function ($scope, $timeout, ModalService,gridTool, createAjax) {
    $scope.gridOptions = angular.extend(angular.copy(gridOptions,{}),{
        columnDefs: [
          {field: 'agentname', displayName: '昵称', width: 80, enableHiding: false},
          {field: 'userLevel', displayName: '代理属性', width: 80, enableHiding: false,cellFilter:'agentLevel'},
          {field: 'srcAmount', displayName: '操作前', minWidth: 80, width: '8%', enableHiding: false,cellFilter : 'number:1'},
          {field: 'tradeAmount', displayName: '操作', minWidth: 80, width: '8%', enableHiding: false,cellFilter : 'number:1'},
          {field: 'dstAmount', displayName: '剩余', minWidth: 80, width: '8%', enableHiding: false,cellFilter : 'number:1'},
          {field: 'remark', displayName: '备注', minWidth: 100, width: '10%', enableHiding: false},
          {field: 'tradetime', displayName: '交易时间', minWidth: 100, width: '10%', enableHiding: false,type : 'date',filterCellFiltered : 'true',cellFilter : 'date:"yyyy-MM-dd HH:mm"'},
          {field: 'userno', displayName: '游戏ID', minWidth: 80, width: '8%', enableHiding: false},
          {field: 'nickname', displayName: '游戏昵称', minWidth: 80, width: '8%', enableHiding: false},
          {field: 'totalAmount', displayName: '总额', minWidth: 60, width: '5%', enableHiding: false,cellFilter : 'number:1'},
          {field: 'tradeAmount', displayName: '提成', minWidth: 60, width: '5%', enableHiding: false,cellFilter : 'number:1'},
        ]
    });
  /**
   * 下级代理
   */
  $scope.search = function () {
    var data = {
      key: 'billinfo', pageNumber: 1,
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
        var $$hashKey, title = "账号添加", info = {}, option = option;
        if (!!row) {
            info = row.entity;
            title = "账号修改";
            $$hashKey=info.$$hashKey;
        }
        async.waterfall([function (cb) {
            var data;
            createAjax(null, {"key": "rolelist_all"}, function (res) {
                cb(null, res);
            });
        }, function (val, cb) {
            info = angular.extend({title: title, role: val, key: option}, info);
            ModalService.baseModal({
                htmlId: 'html/sys/sysuser/info.html',
                openCtrl: 'ModalCtrl',
                size: 'lg',
                param: angular.extend(info)
            }, function (val) {
                val.$$hashKey=$$hashKey;
                cb(null, val);
            })
        }, function (val, cb) {
            delete  val.role;
            delete  val.title;
            createAjax(null, val, function (res) {
                showNotice(res);
                if(/_add/.test(option)){
                    gridTool.addRow(val,$scope);
                }else{
                    gridTool.editRow(val,$scope);
                }
            });
        }], function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    /**
     * 密码修改
     * @param option
     * @param row
     */
    $scope.editpwd = function (option, row) {
        var title = "密码修改", loginname = row.entity.loginname;
        async.waterfall([function (cb) {
            ModalService.baseModal({
                htmlId: 'html/blocks/pwd.html',
                openCtrl: 'ModalCtrl',
                size: 'lg',
                param: {title: title, loginname: loginname, key: option}
            }, function (val) {
                cb(null, val);
            })
        }, function (val, cb) {
            if (val.newpwd != val.isnewpwd) {
                alert('两次密码输入不一致!');
                return false;
            }
            createAjax(null, val, function (res) {
                showNotice(errors.ok);
            });
        }], function (err) {
            if (err) {
                console.log(err);
            }
        });
    };

    $scope.resetPwd = function (option, row) {
        var title = "密码重置", loginname = row.entity.loginname;
        async.waterfall([function (cb) {
            ModalService.baseModal({
                htmlId: 'html/sys/sysuser/reset.html',
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

    $scope.delUser = function (option, row) {
        var enableText = row.entity.enable == 1 ? '禁用' : '启用';
        var r = confirm("确定要" + enableText + "吗?");
        if (r == true) {
            var loginname = row.entity.loginname;
            var val = {loginname: loginname, enable: row.entity.enable == 1 ? 0 : 1, key: option};
            row.entity.enable=val.enable;
            createAjax(null, val, function (res) {
                showNotice(res);
                gridTool.editRow(row.entity,$scope);
            });
        }
        else {
            return false;
        }
    }
}]);
