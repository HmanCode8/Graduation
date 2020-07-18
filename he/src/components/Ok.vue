<template>
    <div class="ok">
        <div class="header">
            <div class="top">订单详情</div>
            <div class="take">
                <i class="iconfont icon-chenggong1"></i>
                <span class="success">你下单成功了，请耐心等待卖家发货喔！！</span>
                <div class="success">
                    <router-link :to="{name:'oderlist',query:{'active':0}}">
                        <span >查看订单</span>
                    </router-link>
                    <router-link to="/">
                    <span>返回首页</span>
                </router-link>
                </div>
            </div>

        </div>
        <div class="con"
             v-show="list1"
        >
            <div class="address">
                <div class="left">收货人信息：</div>
                <div class="right">
                    <ul class="list1">
                        <li>
                            <span>收货人姓名</span>：{{addData.name}}
                        </li>
                        <li>
                            <span>联系号码</span>：{{addData.tel}}
                        </li>
                        <li>
                            <span>收货地址</span>：{{addData.address}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="con"
             v-show="list2"
        >
            <div class="address">
                <div class="left">收货人信息：</div>
                <div class="right">
                    <ul class="list1">
                        <li>
                            <span>收货人姓名</span>：{{addData.name}}
                        </li>
                        <li>
                            <span>联系号码</span>：{{addData.tel}}
                        </li>
                        <li>
                            <span>收货地址</span>：{{addData.address}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <ul class="list"
                v-show="list1"
            >
                <li>
                        <span v-if="data.img">
                        <img :src="data.img[0]"/>
                    </span>
                    <div class="goods">
                        <div class="text">{{data.text}}</div>
                        <div class="size" v-if="type">尺码:{{type[0]}}</div>
                        <div class="color" v-if="type">颜色分类:{{type[1]}}</div>
                        <div>
                            <span class="price">￥{{data.price}}</span>
                            <span class="add">
                       <span>x{{this.$route.query.add}}</span>
                    </span>
                        </div>

                    </div>

                </li>
            </ul>
            <ul class="details"
                v-show="list1"
            >
                <li>
                    <span>购物小计:</span>
                    <i>￥{{sum}}</i>
                </li>
                <li>
                    <span>数量:</span>
                    <i>x{{this.$route.query.add}}</i>
                </li>
                <li>
                    <span>买家留言:</span>
                    <i>{{val}}</i>
                </li>
                <li>
                    <span>下单时间:</span>
                    <i>{{this.$route.query.date}}</i>
                </li>
                <li>
                    <span>订单编号:</span>
                    <i>#{{data.aId}}</i>
                </li>
            </ul>
            <ul class="list"
                v-show="list2"
            >
                <li
                        v-for="(item,index) in data1" :key="index"
                >
                        <span v-if="item.img">
                        <img :src="item.img[0]"/>
                    </span>
                    <div class="goods">
                        <div class="text">{{item.text}}</div>
                        <div class="size" v-if="item.type">尺码:{{item.type[0]}}</div>
                        <div class="color" v-if="item.type">颜色分类:{{item.type[1]}}</div>
                        <div>
                            <span class="price">￥{{item.price}}</span>
                            <span class="add">
                       <span>x{{item.add}}</span>
                    </span>
                        </div>

                    </div>

                </li>
            </ul>
            <ul class="details"
                v-show="list2"
            >
                <li>
                    <span>购物小计:</span>
                    <i>￥{{sum1}}</i>
                </li>
                <li>
                    <span>数量:</span>
                    <i>x{{sum2}}</i>
                </li>
                <li>
                    <span>买家留言:</span>
                    <i>{{val}}</i>
                </li>
                <li>
                    <span>下单时间:</span>
                    <i>{{ data.createdAt }}</i>
                </li>
                <li>
                    <span>订单编号:</span>
                    <i>#{{data.aId}}</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    export default {
        name: "Ok",
        data() {
            return {
                data: [],
                data1: [],
                type: '',
                val: '',
                list1: false,
                list2: false,
                addData: ''
            }
        },
        filters: {
            dateFilter(data) {
                // console.log(data)
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
        methods: {
            back() {
                this.$router.go(-1)
            }
        },
        created() {
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
            this.addData = JSON.parse(window.localStorage.getItem('address'));
            this.type = JSON.parse(window.localStorage.getItem('type'));
            this.val = this.$route.query.val;
            if (this.$route.query.from == 'detailsPath' || this.$route.query.from == null) {
                this.data = JSON.parse(window.localStorage.getItem('goods1'))
                this.list1 = true;
                this.list2 = false;


            } else if (this.$route.query.from == 'carPath' || this.$route.query.from == null) {
                // console.log(JSON.parse(window.localStorage.getItem('goods')));
                this.data1 = JSON.parse(window.localStorage.getItem('goods'));
                this.list2 = true;
                this.list1 = false

            }
            setTimeout(()=> {
                // this.$router.push({path:'/my'})
            },6000)

        },
        computed: {
            sum() {
                return this.data.price * this.$route.query.add
            },
            sum1() {
                var n = 0;
                this.data1.forEach(item => {
                    n += item.add * item.price
                });
                return n
            },
            sum2() {
                var n = 0;
                this.data1.forEach(item => {
                    n += parseInt(item.add)
                });
                return n
            }
        }
    }
</script>

<style scoped>
    .header {
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
        border-bottom: 1px solid #eee;
    }

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .take {
        height: 6rem;
        border: 1px solid #eee;
    }

    .icon-chenggong1 {
        font-size: 1rem;
        margin: 0 0 0 0.5rem;
        color: #0f0;
    }

    .success {
        display: block;
        height: 2rem;
        width: 80%;
        font-size: 0.6rem;
        margin-left: 1.5rem;
    }

    /*.con{*/
    /*    border: 1px solid #000;*/
    /*}*/
    .address {
        font-size: 0.6rem;
        height: 3rem;
        background: #fff;
    }

    .left {
        width: 40%;
        float: left;
        font-size: 0.8rem;
    }

    .right {
        text-align: left;
        width: 70%;
        float: left;
        margin-left: 4rem;
    }

    .address {
        height: 5rem;
        border: 1px solid #eee;
    }

    .list1 li span {
        font-weight: bold;
    }

    .list {
        background: #000;
    }

    .list li {
        height: 5rem;
        border: 1px solid #eee;
        background: #fff;
    }

    .list li img {
        height: 3rem;
        width: 3rem;
        margin: 0.6rem 0 0 0.3rem;
        float: left;

    }

    .goods {
        width: 60%;
        float: left;
        height: 4rem;
        margin: 0.4rem 0 0 0.5rem;
        font-size: 0.5rem;
        text-align: left;
        color: #ED5BA4;
        font-weight: bold;
    }

    .text {
        color: #000;
    }

    .add {
        float: right;
    }

    .details li {
        height: 1.8rem;
        line-height: 1.8rem;
        border-bottom: 1px solid #eee;
        font-size: 0.7rem;
    }

    .details li span {
        float: left;
        margin-left: 0.5rem;
    }

    .details li i {
        float: left;
        margin-left: 1.5rem;
        font-style: normal;
    }
</style>