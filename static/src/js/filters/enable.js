app.filter('enable', function() {
    return function (type) {
        var ret = '';
        switch (type + '') {
            case '1':
                ret = '已启用';
                break;
            case '0':
                ret = '已禁用';
                break;
        }
        return ret;
    }
});