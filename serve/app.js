const express = require('express');

const path = require('path');//引入path模块

const app = new express();//定义express实例

const router = require('./router');//引入路由模块

const bodyParse = require('body-parser');//引入bodyParse模块

const session = require('express-session');//express-session模块

//配置跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next()
});

//配置静态资源开放
app.use('./public/',express.static(path.join(__dirname,'./public/')));
app.use('./node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//配置art-template模板引擎
app.engine('html', require('express-art-template'));

//配置bodyParse组件，因为post请求需要使用这个获取提交的数据
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//把路由挂载到express实例上
app.use(router);

//配置监听端口
app.listen(3000,function () {
    console.log('服务器正在启动，正在监听3000端口哦！！！！！')
});