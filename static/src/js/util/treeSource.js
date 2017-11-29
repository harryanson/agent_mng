window.menuTree =[
    {id: "01", "text": "代理管理", expand: 'active',icon:"glyphicon-wrench", children: [
      {id: "0101", text: "代理信息", key: "agent_index",path:"/agent/index",method:"get",html:"html/agent/index.html",load_js:["js/controllers/agent/agent.js"],children:[
        {id:"010101",text:"校验密码", key: "agent_checkpwd",path:"/agent/checkpwd",method:"post"},
        {id:"010102",text:"修改密码", key: "agent_editpwd",path:"/agent/editpwd",method:"post"},
        {id:"010103",text:"取款", key: "agent_cash",path:"/agent/bill/cash",method:"post"}
      ]},
      {id: "0102", "text": "我的代理", icon:"glyphicon-shopping-cart",key: "agent_list",path:"/agent/find",method:"get",html:"html/agent/list.html",load_js: ["js/controllers/agent/agent.js"],children:[
        {id:"010201",text:"代理禁用启用", key: "agent_del",path:"/agent/enable",method:"post"},
        {id:"010202",text:"代理密码重置", key: "agent_reset",path:"/agent/resetpwd",method:"post"},
        {id:"010203",text:"代理号是否存在", key: "agent_exist",path:"/agent/noexist",method:"post"}
      ]},
      {id: "0103", text: "我的会员", key: "myusers",path:"/agent/user/myusers",method:"get",html:"html/user/list.html",load_js:["js/controllers/user/user.js"]},
      {id: "0104", text: "账单明细", key: "billinfo",path:"/agent/bill/list",method:"get",html:"html/bill/list.html",load_js:["js/controllers/bill/bill.js"]},
      {id: "0105", text: "会员查询", key: "user_search",path:"/agent/user/search",method:"get",html:"html/user/search_user.html",load_js:["js/controllers/user/user.js"]}
    ]},
  {id: "02", "text": "代理推广", expand: '',icon:"glyphicon-wrench", children: [
    {id: "0201", text: "下级代理查询", key: "agent_children",path:"/agent/children",method:"get",html:"html/agent/children.html",load_js:['js/controllers/agent/children_agent.js'],children:[
      {id:"020101",text:"代理添加",key: "agent_add",path:"/agent/add",method:"post"},
      {id:"020102",text:"代理修改",key: "agent_edit",path:"/agent/edit",method:"post"}
    ]}
  ]}
]