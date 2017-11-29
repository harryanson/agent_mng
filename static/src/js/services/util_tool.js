angular.module('app')
  .service('utilTool', ['$localStorage', '$timeout','createAjax', function ($localStorage, $timeout,createAjax) {
    var self = this, ret;
    self.initUser = function (data, $scope) {
      console.log(data.limits)
      var paths = {},menus=[],limits=data.limits,tree= JSON.parse(JSON.stringify(menuTree));
      for (var i = 0; i < tree.length; i++) {
        if (tree[i].id.length == 2 &&limits.includes(tree[i].id)) {
          var leaftree = [];
          if (tree[i].children != undefined) {
            for (var j = 0; j < tree[i].children.length; j++) {
              if (limits.includes(tree[i].children[j].id)) {
                if (tree[i].children[j].path) {
                  paths[tree[i].children[j].key] = {
                    text: tree[i].children[j].text,
                    method: tree[i].children[j].method,
                    path: tree[i].children[j].path,
                    html: tree[i].children[j].html,
                    load_js: tree[i].children[j].load_js
                  };
                }
                var leaftree2 = [];
                if (tree[i].children[j].children != undefined) {
                  for (var k = 0; k < tree[i].children[j].children.length; k++) {
                    if (limits.includes(tree[i].children[j].children[k].id)) {
                      if (tree[i].children[j].children[k].path) {
                        paths[tree[i].children[j].children[k].key] = {
                          text: tree[i].children[j].children[k].text,
                          method: tree[i].children[j].children[k].method,
                          path: tree[i].children[j].children[k].path,
                          html: tree[i].children[j].children[k].html,
                          load_js: tree[i].children[j].children[k].load_js
                        };
                      }
                      leaftree2.push(tree[i].children[j].children[k]);
                    }
                  }
                }
                tree[i].children[j].children = leaftree2;
                leaftree.push(tree[i].children[j]);
              }
            }KK
          }
          tree[i].children = leaftree;
          menus.push(tree[i]);
        }
      }
      data.menus = menus;
      $scope.app.menus = menus;
      data.paths = paths;
      $localStorage.currentUser = currentUser =data;
    }
  }]);