module.exports = {
      ok:0,//操作成功
      bad_request:400000,//错误的请求
      invalid_mobile:400001,//无效的手机号码
      invalid_id_number:400002,//无效的证件号码
      Invalid_id_type:400003,//无效的证件类型
      invalid_appid:400004,//无效的AppId
      invalid_domain:400005,//无效的域
      invalid_order_number:400006,//无效的订单号
      invalid_transaction_number:400007,//无效的交易号
      invalid_transaction_code:400008,//无效的交易编码
      invalid_transaction_amount:400009,//无效的交易金额
      order_is_checking:400010,//正在对账
      order_check_fail:400011,//对账失败
      duplicate_submission:400012,//重复提交
      invalid_billno:400013,//无效账单号
      exceeds_limit:400014,//超出限制范围
      unauthorized:401000,//请求未授权
      accesstoken_expired:401001,//授权码已过期
      insufficient_balance:402001,//余额不足
      pay_error:402002,//支付失败
      insufficient_stock:402003,//库存不足
      order_cancel_forbidden:402004,//有服务订单无法取消
      forbidden:403000,//请求被拒绝
      incorrect_usr_or_pwd:403001,//用户名或密码错误
      mobile_in_use:403002,//手机号已经被使用
      incorrect_vcode:403003,//验证码错误
      vcode_expired:403004,//验证码已过期
      nickname_in_use:403005,//昵称已经被使用
      data_not_exist:403006,//数据不存在
      nickname_change_limit:403007,//昵称距离上次修改不足30天
      gender_not_permitted_modify:403008,//性别不充许修改
      user_already_bind:403009,//用户已绑定
      qr_code_overdue:403010,//二维码过期
      invalid_qr_code:403011,//无效二维码
      upper_limit_of_the_number:403012,//数量达到上限
      fa_token_invalid:403013,//无效的网关服务器token
      fa_token_auth_error:403014,//网关token验证错误
      fa_token_expire:403015,//网关token超时
      no_server_available:403016,//无可用连接服务器
      user_not_login:403017,//用户未登录
      user_not_online:403018,//用户不在线
      user_not_found:403019,//用户未找到
      data_already_exists:403020,//数据已存在
      cannot_refund:403021,//不能退款
      max_count_limit:403022,//最大数量限制
      min_count_limit:403023,//最小数量限制
      only_one_data_cannot_delete:403024,//只有一条数据不能删除
      product_not_found:403025,//商品不存在
      uuid_not_found:403026,//UID不存在
      not_found:404000,//访问的对象不存在
      internal_server_error:500000//内部服务器错误
}