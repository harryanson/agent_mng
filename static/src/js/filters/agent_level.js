app.filter('agentLevel', function () {
  return function (type) {
    var ret = '';
    switch (type + '') {
      case '1':
        ret = '一级代理';
        break;
      case '2':
        ret = '二级代理';
        break;
      case '3':
        ret = '三级代理';
        break;
    }
    return ret;
  }
});