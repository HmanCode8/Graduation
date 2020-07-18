<template>
    <div class="hou">
        <div class="header">
            <i class="el-icon-s-custom"></i>
            当前用户：
            <el-link type="primary"
                     style="font-size: 18px;padding-bottom: 5px"
                     @click="back"
            >{{title}} {{phone}}
            </el-link>
        </div>
        <div class="con">
            <template>
                <el-tabs
                        v-model="activeName"
                        type="border-card"
                        @tab-click="handleClick"
                        :tab-position="tabPosition"
                        style="height: 100%"
                >
                    <el-tab-pane label="单个订单" name="0">
                        <template>
                            <el-table
                                    :data="orderData"
                                    height="700"
                                    style="width: 100%"
                                    border
                            >
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="商品名称:">
                                                <span>{{ props.row.text }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单数量:">
                                                <span>{{ props.row.shuliang }}</span>
                                            </el-form-item>
                                            <el-form-item label="商品单价/元:">
                                                <span>{{ props.row.price |priceFilter(2)}}</span>
                                            </el-form-item>
                                            <el-form-item label="订单花费:">
                                                <span>{{ props.row.price * props.row.shuliang |priceFilter(2) }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单类型">
                                                <span>尺寸：{{ props.row.size }}----</span>
                                                <span>颜色：{{ props.row.color }}</span>
                                            </el-form-item>
                                            <el-form-item label="收货人">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="联系方式">
                                                <span>{{ props.row.number }}</span>
                                            </el-form-item>
                                            <el-form-item label="收货地址">
                                                <span>{{ props.row.address }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单生成时间 ">
                                                <span>{{ props.row.createdAt |dateFilter}}</span>
                                            </el-form-item>
                                            <el-form-item label="支付方式">
                                                <span>{{ props.row.payment}}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商品 ID"
                                        :index="indexMethod"
                                        type="index"
                                        width="200px"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="商品名称"
                                        prop="text">
                                </el-table-column>
                                <el-table-column
                                        label="配送方式"
                                        prop="sale">
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index, scope.row,'first')">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="购物车订单" name="1">
                        <template>
                            <el-table
                                    :data="carorderData"
                                    height="700"
                                    style="width: 100%"
                                    border
                            >
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form label-position="left" inline class="demo-table-expand">
                                            <el-form-item label="商品名称:">
                                                <span>{{ props.row.text }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单数量:">
                                                <span>{{ props.row.shuliang }}</span>
                                            </el-form-item>
                                            <el-form-item label="商品单价/元:">
                                                <span>{{ props.row.price |priceFilter(2) }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单花费:">
                                                <span>{{ props.row.price * props.row.shuliang |priceFilter(2) }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单类型">
                                                <span>尺寸：{{ props.row.size }}----</span>
                                                <span>颜色：{{ props.row.color }}</span>
                                            </el-form-item>
                                            <el-form-item label="收货人">
                                                <span>{{ props.row.name }}</span>
                                            </el-form-item>
                                            <el-form-item label="联系方式">
                                                <span>{{ props.row.number }}</span>
                                            </el-form-item>
                                            <el-form-item label="收货地址">
                                                <span>{{ props.row.address }}</span>
                                            </el-form-item>
                                            <el-form-item label="订单生成时间 ">
                                                <span>{{ props.row.createdAt }}</span>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商品 ID"
                                        prop="_id">
                                </el-table-column>
                                <el-table-column
                                        label="商品名称"
                                        prop="text">
                                </el-table-column>
                            </el-table>
                            <div class="alldel">
                                <el-button type="danger"
                                    @click="delAll"
                                >删除全部订单</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="用户地址" name="2">
                        <el-table
                                :data="addressData"
                                height="700"
                                border
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    label="编号"
                                    width="100"
                                    :index="indexMethod">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="280">
                            </el-table-column>
                            <el-table-column
                                    prop="tel"
                                    label="手机号码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="province"
                                    label="省份/市/县"
                                    width="250">
                            </el-table-column>
                            <el-table-column
                                    prop="postalCode"
                                    label="邮政编码"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="addressDetail"
                                    label="详细地址"
                                    width="250"
                            >
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">

                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete1(scope.$index, scope.row,)">删除
                                    </el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="购物车" name="3">
                        <template>
                            <el-table
                                    border
                                    :data="carData.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
                                    style="width: 100%"
                                    height="700"
                            >
                                <el-table-column
                                        label="商品编号"
                                        width="250px"
                                        prop="_id">
                                </el-table-column>
                                <el-table-column
                                        label="商品名称"
                                        width="500px"
                                        prop="text">
                                </el-table-column>
                                <el-table-column
                                        label="商品详情图"
                                        width="200px"
                                >
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top">
                                            <img class="img" :src="scope.row.img[0]"/>
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium">商品详情图</el-tag>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商品价格"
                                        width="100px"
                                        prop="price">
                                    <template slot-scope="scope1">
                                        <p class="size">{{ scope1.row.price |priceFilter(2) }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商品类型"
                                        width="200px"
                                >
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top">
                                            <p class="size">尺寸: {{ scope.row.type[0] }}</p>
                                            <p class="size">颜色: {{ scope.row.type[1] }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium">商品类型</el-tag>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                >
                                    <template slot="header" slot-scope="scope">
                                        <el-input class="search"
                                                  v-model="search"
                                                  size="mini"
                                                  placeholder="输入关键字搜索"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete2(scope.$index, scope.row,)">Delete
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="评论管理" name="4">
                        <template>
                            <el-table
                                    :data="commentData"
                                    style="width: 100%"
                                    :default-sort="{prop: 'date', order: 'descending'}"
                                    border
                            >
                                <el-table-column
                                        prop="createdAt"
                                        label="日期"
                                        sortable
                                        width="180">
                                    <template slot-scope="scope">
                                        <p class="size">{{ scope.row.createdAt |dateFilter}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="nikname"
                                        label="用户名"
                                        sortable
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="text"
                                        label="商品名称"
                                        sortable
                                        width="350">
                                </el-table-column>
                                <el-table-column
                                        label="评论内容"
                                        :formatter="formatter"
                                >
                                    <template slot-scope="scope">
                                        <p class="size">{{ scope.row.input}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete3(scope.$index, scope.row,)">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="alldel">
                                <el-button type="danger"
                                           @click="delAll"
                                >删除全部评论</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>
        <div class="footer">
        </div>
    </div>
</template>

<script>
    import {getorder, getcarorder, getaddress, del, getcar, getcomment} from "../api/index";

    export default {
        data() {
            return {
                activeName: window.localStorage.getItem('index'),
                tabPosition: 'left',
                orderData: [],
                carorderData: [],
                addressData: [],
                carData: [],
                search: '',
                title: '',
                phone: '',
                commentData: []
            };
        },
        filters: {
            priceFilter(data, n) {
                // //console.log(data)
                return '￥' + data.toFixed(n)
            },
            dateFilter(data) {
                var time = new Date(data);

                function timeAdd0(str) {
                    if (str < 10) {
                        str = '0' + str;
                    }
                    return str
                }

                var y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
            }
        },
        created() {
            var status = window.sessionStorage.getItem('status');
            console.log(12)
            if (status==200){
                // this.$router.push({
                //     name:'alluser',
                //     query:{id:1}
                // })
            }else {
                this.$router.push({
                    name:'hou1'
                })
            }
            let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
            this.title = params.nikname;
            this.phone = params.phone;
            //获取订单数据
            this.getorder()
            //获取购物车订单数据
            this.getcarorder()
            //获取用户地址信息
            this.getaddress();
            //获取购物车
            this.getcar();
            //获取评论数据
           this.getcomment()
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            getcarorder(){
                let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
                var add = JSON.parse(window.localStorage.getItem('address'));

                getcarorder().then((res) => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (parseInt(item.arr[0].phone) == params.phone) {
                            arr.push(item)
                        }
                    });
                    res.data = arr;
                    var dataArr = [];
                    res.data.forEach(item => {
                        var date = item.createdAt;
                        item.arr.forEach(t => {
                            dataArr.push(t);
                            dataArr.forEach(item => {
                                item.name = add.name;
                                item.address = add.address;
                                item.createdAt = date;
                                item.size = item.type[0];
                                item.color = item.type[1];
                                item.shuliang = item.add
                            });
                        })
                    });
                    this.carorderData = dataArr;

                });
            },
            getorder() {
                //获取订单数据
                let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
                getorder().then(res => {
                    //console.log(res.data)
                    var arr = [];
                    res.data.forEach(item => {
                        if (item.phone == params.phone) {
                            arr.push(item)
                        }
                    });
                    this.orderData = arr
                });
            },
            getaddress() {
                let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
                getaddress().then(res => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (item.phone == params.phone) {
                            arr.push(item)
                        }
                    });
                    this.addressData = arr
                });
            },
            getcar() {
                let params = JSON.parse(this.$Base64.decode(this.$route.query.info));
                getcar().then(res => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (item.phone == params.phone) {
                            arr.push(item)
                        }
                    });
                    this.carData = arr
                });
            },
            delFn() {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            },
            getcomment(){
                getcomment().then(res => {
                    console.log(res.data)
                    this.commentData = res.data
                })
            },
            handleClick(tab, event) {
                window.localStorage.setItem('index', tab.index);
                //console.log(parseInt( tab.index), event);
            },
            handleEdit(index, row) {
                //console.log(index, row);
            },
            handleDelete(index, item) {
                del(item).then((res) => {
                    this.getorder();
                    this.delFn()
                });
            },
            handleDelete1(index, item) {
                del(item).then((res) => {
                    this.getaddress();
                    this.delFn()
                });
            },
            handleDelete2(index, item) {
                del(item).then((res) => {
                    this.getcar();
                    this.delFn()
                })
            },
            handleDelete3(index, item) {
                del(item).then((res) => {
                    this.getcomment();
                    this.delFn()
                });
            },
            delAll(){
               this.axios.post('http://192.168.43.154:3000/all')
                .then(res=>{
                    this.getcarorder()
                    this.delFn()
                })
            },
            formatter(row, column) {
                return row.address;
            },
            indexMethod(index) {
                return index * 1 + 1;
            }
        }
    };
</script>

<style scoped>
    * {
        font-size: 30px;

    }


    .hou {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        background:url("../assets/img/hou.jpg");
        z-index: 2;
    }

    .header {
        width: 90%;
        /*border: 1px solid #000;*/
        margin: 10px auto;
        text-align: left;
        background: #fff;
        font-size: 18px;
        height: 40px;

    }

    .con {
        width: 90%;
        height: 90%;
        margin: 0 auto;
        /*border-radius: 50px;*/
        box-shadow: 20px 20px 10px #AAA;
    }

    .el-tabs--border-card {
        /*border-radius: 50px;*/
        /*background: rgba(0,0,0,0.5);*/
    }

    .el-table__body-wrapper {
        background: #f00;
    }

    .el-table__expanded-cell div {
        display: block;
        text-align: left;
        font-weight: bold;
    }

    .el-table__expanded-cell span {
        /*border: 1px solid #000;*/
        font-size: 10px;
        line-height: 40px;
    }

    .size {
        font-size: 12px;
    }

    .img {
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }

    .title {
        height: 70px;
    }

    .title img {
        width: 100%;
        height: 100%;
    }
    .alldel{
        float: left;
        margin-top: 20px;
    }
</style>
<style>
    .con.el-checkbox__inner {
        /*height: 1rem;*/
        /*width: 1rem;*/
        border-radius: 50%;
        margin-left: 0.3rem;

    }
</style>

