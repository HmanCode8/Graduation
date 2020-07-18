var express = require('express');//引入框架
var md5 = require('md5');
var router = express.Router();//通过express获取的他的router方法

//引入数据模型
var Address = require('./modules/address');
var Register = require('./modules/register');
var Admin = require('./modules/admin');
var Goods = require('./modules/goods');
var Order = require('./modules/order');
var Car = require('./modules/car');
var Carorder = require('./modules/carOrder');
var Collection = require('./modules/collection');
var Comment = require('./modules/comment');


// 获取地址数据
router.get('/address', function (req, res) {
    Address.find(function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        res.json(data);
    })
});

//接收地址的提交数据
router.post('/address', function (req, res) {
    //console.log(req.body);
    new Address(req.body).save(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(req.body)
        }
    })
});

//获取注册的数据
router.get('/register', function (req, res) {
    //console.log(req.session.isLogin)
    Register.find(function (err, student) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        student.forEach(item=>{
            item.password = md5(item.password)
        })
        res.json(student);
    })
});

//接收注册提交的数据
router.post('/register', function (req, res) {
    //console.log(req.body)
    var body = req.body;

    //console.log(body.number)
    Register.findOne({
        number: body.number
    }, function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        if (data) {
            res.send({status: 300, msg: "此手机号已经被注册"})
            console.log( md5( req.body.password))
        } else {
            new Register(req.body).save(function (err) {
                if (err) {
                    return res.status(500).send('Serve error')
                }
                // res.redirect('/students')
            });
            res.send({status: 200, msg: "恭喜你，注册成功！"})
            req.session.isLogin = true
        }
    })
});

//登录接口
router.post('/login', function (req, res) {
    // //console.log(req.body)
    var body = req.body;
    console.log(body);
    Register.findOne({
        number: body.user,
        password: body.password
    }, function (err, user) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        if (!user) {
            res.send({status: 300, msg: "用户或者密码错误"})
        } else {
            req.session.user = user;
            res.send({status: 200, msg: "成功", aa: req.session.user})
        }
    });

});

router.post('/admin', function (req, res) {
    console.log(req.body);
    var body = req.body;
    // new Admin(body).save(function (err,data) {
    //      if (err){
    //          return console.log(err)
    //      }
    //     console.log('ok')
    //     console.log(data)
    // })
    Admin.findOne({
        user: body.user,
        password: body.password
    }, function (err, user) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        if (!user) {
            res.send({status: 300, msg: "用户或者密码错误"})
        } else {
            req.session.user = user;
            res.send({status: 200, msg: "成功", aa: req.session.user})
        }
    });
});

//获取新品上市商品的数据
router.get('/goods', function (req, res) {
    Goods.find(function (err, student) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        res.json(student);
    })
});
router.post('/goods', function (req, res) {
    console.log(req.body);
    new Goods(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            // //console.log(req.body)
            res.send(req.body)
        }
    })
});

//收藏商品接口
router.get('/collection', function (req, res) {
    Collection.find(function (err, student) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        res.json(student);
    })
});

//接收收藏请求的数据
router.post('/collection', function (req, res) {
    // //console.log(req.body);
    // //console.log(111)
    new Collection(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            // //console.log(req.body)
            res.send(req.body)
        }
    })
});

//删除数据接口
router.post('/delete', function (req, res) {
    console.log(req.body.id);
    //删除后台的商品
    Goods.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }
    });

    //删除后台的用户数据
    Register.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')

        }
    });

    //删除后台的地址数据
    Address.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')

        }
    });

    //删除后台的订单数据
    Order.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.send({
            status: 200,
            msg: '删除成功？！！！'
        })
    });
    Carorder.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }

    });

    //删除购物车数据
    Car.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }
    });

    //删除收藏的数据
    Collection.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }
    });

    //删除评论的数据
    Comment.findByIdAndRemove(req.body._id, (err) => {
        if (err) {
            return res.status(500).send('Server error')
        }
    });

});
//删除所有
router.post('/all',function (req,res) {
    console.log(req.body)
    Carorder.remove({},function (err,data) {
        if (err){
            return console.log(err)
        }
        console.log(data)
    });
    Comment.remove({},function (err,data) {
        if (err){
            return console.log(err)
        }
        console.log(data)
    })
});

//更新数据接口
router.post('/update', function (req, res) {
    // //console.log(req.body._id)
    console.log(req.body);

    //更新商品数据
    Goods.findByIdAndUpdate(req.body._id, req.body, (err) => {
        if (err) {
            return res.status(500).send('Server err')
        }
    });

    //更新用户密码
    Register.findByIdAndUpdate(req.body._id, req.body, (err) => {
        if (err) {
            return res.status(500).send('Server err')
        }
        res.send({
            status: 200,
            msg: '修改成功正在跳转…………'
        })
    });
    Register.findByIdAndUpdate(req.body.id, req.body, (err) => {
        if (err) {
            return res.status(500).send('Server err')
        }
    });
    Address.findByIdAndUpdate(req.body.id, req.body, (err) => {
        if (err) {
            return res.status(500).send('Server err')
        }
    })


});

//获取订单数据
router.get('/order', function (req, res) {
    Order.find(function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        res.json(data);
    })
});

//接收下单提交的数据
router.post('/order', function (req, res) {
    // //console.log(req.body.shuliang)
    new Order(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            // //console.log(req.body)
        }
    })
});

//更新商品下单后的数量减少
router.post('/count', function (req, res) {
    //console.log(req.body)
    var body = req.body;
    console.log(body);
    if (body.num == 0) {
        Goods.findByIdAndRemove(req.body.id, (err) => {
            if (err) {
                return res.status(500).send('Server error')
            }
        });
        Car.findByIdAndRemove(req.body.id, (err) => {
            if (err) {
                return res.status(500).send('Server error')
            }
        });
    } else {
        Goods.findByIdAndUpdate(req.body.id, req.body, (err) => {
            if (err) {
                return res.status(500).send('Server err')
            }
        });
    }
});

router.post('/carcount', function (req, res) {
    console.log(req.body.add)
    Goods.findById({
        _id: req.body.id
    }, function (err, data) {
        if (err) {
            return console.log(err)
        }
        console.log(data.num);
        if (data.num==0){
            Goods.findByIdAndRemove(req.body.id, (err) => {
                if (err) {
                    return res.status(500).send('Server error')
                } else {

                }
            });
        }else {
            Goods.update({
                _id: req.body.id
            }, {

                num: data.num - req.body.add
            }, function (err, data) {
                if (err) {
                    return console.log(err)
                }
                console.log(data)
            })
        }

    });

});

//获取购物车数据
router.get('/car', function (req, res) {
    Car.find(function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        //console.log(data)
        res.json(data);
    })
});

//接收购物车提交的数据
router.post('/car', function (req, res) {
    // //console.log(123)
    //console.log(req.body.id);
    new Car(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            // //console.log(req.body)
        }
    })
});


//获取购物车多单下单的数据
router.get('/carorder', function (req, res) {
    Carorder.find(function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        //console.log(data)
        res.json(data);
    })
});

//接收多下单提交的数据
router.post('/carorder', function (req, res) {
    // //console.log(123)
    //console.log(req.body)
    new Carorder(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            //console.log(req.body)
        }
    })
});


router.get('/comment', function (req, res) {
    Comment.find(function (err, data) {
        if (err) {
            return res.status(500).send('Serve error')
        }
        //console.log(data)
        res.json(data);
    })
});
router.post('/comment', function (req, res) {
    // //console.log(123)
    //console.log(req.body)
    new Comment(req.body).save(function (err) {
        if (err) {
            //console.log(err)
        } else {
            //console.log(req.body)
        }
    })
});

//导出路由
module.exports = router;