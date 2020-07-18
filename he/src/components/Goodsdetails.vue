<template>
    <div class="goodsdetails">
        <van-pull-refresh
                v-model="isLoading"
                @refresh="onRefresh"
                success-text="刷新成功"
        >
        <div class="header">
               <span class="iconfont icon-fanhui"
                     @click="back"
               ></span>
            <div class="top">商品详情</div>
            <div class="banner">
                <van-swipe :autoplay="3000" indicator-color="red" @change="onChange">
                    <van-swipe-item
                            v-for="item in data.img"
                    >
                        <img :src="item"/>
                    </van-swipe-item>
                </van-swipe>

            </div>
        </div>
        <div class="con">
            <div class="price">￥{{data.price}}</div>
            <div class="text">{{data.text}}</div>
            <!--            <div class="type">网纱裙摆，珍珠装饰，后背系带装饰,拼接设计</div>-->
            <hr>
            <div class="coupon">
                <span class="activity">活动：<strong class="new">[最新优惠券]</strong></span>
                <span class="take">立即领取<i class=" iconfont icon-jinru"></i></span>
            </div>
            <hr>
            <div class="chose"
            >
                <span>选择商品规格</span>
                <i class=" iconfont icon-jinru"></i>
            </div>
            <hr>
            <van-divider>继续拖动,查看商品详情</van-divider>
            <van-tabs v-model="active">
                <van-tab title="详情">
                    <img :src="item" class="img"
                         v-for="item in data.img"/>
                </van-tab>
                <van-tab title="评论">
                    <div class="comment">
                        <Comment/>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        </van-pull-refresh>
        <div class="footer">
            <div class="goodsAction">
               <span
                       @click="tocat"
               >
                    <i class="iconfont icon-gouwuche"></i>
                    <strong>购物车</strong>
               </span>
                <span
                        @click="collection"
                >
                    <div :class="{active :some}">
                        <i class="iconfont icon-shoucang "></i>
                    </div>
                    <strong>收藏</strong>
               </span>
                <span
                        @click="show1"
                >
                    <strong>加入购物车</strong>
                </span>
                <span
                        @click="show2"
                >
                    <strong>立即购买</strong>
                </span>
            </div>
            <div class="option"
                 v-show="play"
            >
                <div class="Spe">
                    <div class="tishi">
                        {{tishi}}
                    </div>
                    <div class="Spebox">
                        <div class="left" v-if="data.img">
                            <img :src="data.img[0]"/>
                            <div class="right">
                                <div class="textBox">{{data.text}}</div>
                                <span class="iconfont icon-guanbi"
                                      @click="dis"
                                >
                            </span>
                                <div class="pricebox1">
                                    <span class="pass1">￥{{data.passprice}}</span>
                                    <span class="price1">￥{{data.price}}</span>
                                </div>
                                <span class="to">已选：</span>
                                <span class="choseBox"
                                      v-for="item in subList"
                                >
                                {{item}},
                            </span>
                            </div>
                        </div>
                        <div class="center">
                            <div class="sizeBox"
                                 v-for="(item,index) in sizeData" :key="index"
                            >
                                <div class="title">{{item.title}}</div>
                                <div class="toSize">
                                <span
                                        v-for="(option,index2) in item.list" :key="index2"
                                        :class="{yes:index2==item.index1}"
                                        @click="toFn(index,option,index2)"
                                >{{option}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="bottom"
                             v-show="to1"
                        >

                            <div class="addcar1"
                                 @click="addCarFn"
                            >加入购物车
                            </div>

                        </div>
                        <div class="bottom"
                             v-show="to2"
                        >
                            <div class="addcar"
                                 @click="okDo"
                            >确认
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Comment from '../common/Comment'
    import { Toast } from 'vant';
    import {
        goods,
        goods1,
        getcollection,
        postcollection,
        postcar,
        del
    } from "../api/index";
    export default {
        name: 'goodsdetails',
        data() {
            return {
                isLoading: false,
                current: 0,
                active: 0,
                value: 0,
                some: '',
                text:'',
                to1: false,
                to2: false,
                play: false,
                data: [],
                goodsData: [],
                goodsData1: [],
                carData: {},
                sizeData: [
                    {
                        title: '尺寸',
                        index1: -1
                    },
                    {
                        title: '颜色',
                        index1: -1
                    }
                ],
                subList: {},
                toid: '',
                tishi: ''
            }
        },
        created() {
            this.loading()
        },
        methods: {
            loading(){
                // console.log(this.subList);
                var username = JSON.parse(window.localStorage.getItem('username'));
                if (username==null){
                    this.$router.push({
                        name:'login'
                    })
                }
                //判断是否已经收藏了，收藏了就this.some=true，动态绑定样式
                getcollection().then(res=>{
                    var arr = [];
                    res.data.forEach(item=>{
                        if (parseInt(item.phone)===username){
                            arr.push(item)
                        }
                        var filterData = arr;
                        this.some = filterData.some(item => {
                            return this.$route.query.id == item.id
                        })
                        // console.log(this.some)
                    })
                });

                //获取后台的所有商品的数据，然后把它们concat成一个数组
                goods().then(res=>{
                    res.data.forEach(item => {
                        if (item._id == this.$route.query.id) {//判断传过来的id是否等于某一项的id，
                            this.data = item;//等于的话就把这一项赋值给this.data
                            this.sizeData[0].list = item.size;//把尺码赋值给this.sizeData
                            this.sizeData[1].list = item.color//同上
                        }
                    });
                });
                this.toid = this.$route.query.id;
            },
            back() {
                // this.$router.go(-1)
                this.$router.push({path: '/home'});
                // console.log(this.$route.query)
            },
            onChange(index) {
                this.current = index;
            },
            show1() {
                this.play = true;
                this.to1 = true;
                this.to2 = false;
            },
            show2() {
                this.play = true;
                this.to2 = true;
                this.to1 = false;
                // console.log('show2')
            },
            okDo() {
                console.log(this.subList[0])
                // console.log('请选择商品类型')
                if (this.subList[0] == null || this.subList[1] == null) {
                    Toast.fail('请选择完整商品类型');
                    setTimeout(()=>{
                        this.tishi = ''
                    },3000)
                } else {
                    window.localStorage.setItem('type', JSON.stringify(this.subList))
                    // window.localStorage.setItem('goods',JSON.stringify(this.data))
                    window.localStorage.setItem('goods1', JSON.stringify(this.data))
                    this.$router.push({name: 'order', query: {id: this.data._id, from: 'detailsPath'}})
                }

            },
            addCarFn() {
                if (this.subList[0] == null || this.subList[1] == null) {
                    Toast.fail('请选择完整商品类型');
                } else {
                    //加入购物车请求后台存储数据进去数据库
                    postcar(
                            {
                                phone:JSON.parse(window.localStorage.getItem('username')),
                                img: this.data.img,
                                text: this.data.text,
                                price: this.data.price,
                                type: this.subList,
                                num: this.data.num,
                                id: this.data._id,
                                add: 1,
                                size:this.data.size,
                                color:this.data.color,
                            }
                        )
                        .then((res) => {
                            console.log(res.data)

                        });
                    // this.$router.push({name: 'car', query: {id: this.data._id, type: this.subList}})
                    Toast({
                        message: '加入成功',
                        icon: 'cart-o'
                    });
                    this.play = !this.play;
                }

            },
            collection() {
                // console.log(this.data);
                this.some = !this.some;
                if (this.some) {
                    //点击收藏请求后台存储数据进数据库
                    postcollection({
                        phone:JSON.parse(window.localStorage.getItem('username')),
                        text: this.data.text,
                        img: this.data.img,
                        price: this.data.price,
                        num: this.data.num,
                        id: this.data._id
                    }).then(res=>{
                        console.log(res.data);
                        Toast({
                            message: '收藏成功',
                            icon: 'like'
                            });
                    })

                } else {
                    getcollection().then(res=>{
                        var data = res.data.find(item=>{
                            return item.id==this.$route.query.id
                        });
                        console.log(data)
                        del(data).then(res=>{
                            Toast({
                                message: '取消收藏',
                                icon: 'like-o'
                            });
                        })
                    })
                }
            },
            dis() {
                this.play = !this.play;
            },
            toFn(index, option, index2) {
                //给this.subList定义一个添加属性，key为option ，value为index
                this.$set(this.subList, index, option);
                this.sizeData[index].index1 = index2;

            },
            tocat() {
                this.$router.push({path: 'car'})
            },
            onRefresh() {
                setTimeout(() => {
                    this.loading();
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            }

        },
        components: {
            Comment,
        }

    }
</script>

<style scoped>


    .tishi {
        color: #f00;
        font-size: 0.5rem;
        width: 5rem;
        height: 2rem;
        top: 50%;
        left: 50%;
        position: absolute;
        z-index: 13;
    }

    .active {
        color: #f00;
    }

    .to {
        float: left;
        font-size: 0.6rem;
        margin-top: 0.1rem;
    }

    .sizeBox .yes {
        background: #F495C4;
    }

    .goodsdetails {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 2.5rem;
        top: 0;
        overflow: auto;
        z-index: 2;
        background: #fff;
    }

    .top {
        height: 2rem;
        border-bottom: 1px solid #eee;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
    }

    .banner img {
        height: 15rem;
        width: 100%;
    }

    .van-swipe__indicators {
        margin-bottom: 0.3rem;
    }

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .custom-indicator {
        display: inline;
        position: absolute;
        right: 1rem;
        bottom: 10rem;
    }

    .con {
        background: #fff;
    }

    .price {
        font-size: 0.8rem;
        color: #f00;
    }

    .text {
        font-size: 0.6rem;
        padding: 0 0.5rem;
    }

    .type {
        font-size: 0.5rem;
        color: #AAAAAA;
    }

    hr {
        width: 94%;
        border: 0.5px solid #eee;
        margin: 0.3rem auto;
    }

    .coupon {
        margin: 1rem 0 1rem 0;
    }

    .activity {
        font-size: 0.6rem;
        float: left;
        text-indent: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .new {
        color: #F495C4;
        font-weight: inherit;
    }

    .take {
        float: right;
        font-size: 0.6rem;
    }

    .choseBox {
        display: block;
        /*width: 40%;*/
        height: 1rem;
        float: left;
        line-height: 1rem;
        text-align: left;
        font-size: 0.4rem;
        margin-left: 0.1rem;
    }

    .chose {
        height: 1rem;
    }

    .chose span {
        font-size: 0.6rem;
        float: left;
        text-indent: 0.5rem;
    }

    .chose i {
        float: right;
        line-height: 1rem;
    }

    .comment {
        display: flex;
        justify-content: space-around;
    }

    .comment span {
        width: 20%;
        height: 0.5rem;
        font-size: 0.6rem;
        color: #ED509E;
    }

    .img {
        width: 100%;
        /*height: 5rem;*/
    }

    .goodsAction {
        position: fixed;
        background: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2.5rem;
        font-size: 0.7rem;
        display: flex;

    }

    .goodsAction span {
        height: 100%;
        justify-content: space-around;
        text-align: center;
    }

    .goodsAction strong {
        font-weight: inherit;
        font-size: 0.6rem;
    }

    .goodsAction i {
        font-size: 1rem;
        display: block;
        margin-top: 0.2rem;
    }

    .goodsAction span:nth-child(1), .goodsAction span:nth-child(2) {
        width: 20%;
        border: 1px solid #eee;
        color: #AAAAAA;
    }

    .goodsAction span:nth-child(3), .goodsAction span:nth-child(4) {
        width: 30%;
        background: #ED509E;
        line-height: 2.5rem;
        color: #fff;
    }

    .goodsAction span:nth-child(4) {
        background: #f00;
    }

    .option {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 2.5rem;
        background: rgba(0, 0, 0, 0.5);
    }

    .Spebox {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 18rem;
        z-index: 3;
        background: #fff;
    }

    .left {
        height: 4rem;
        border: 1px solid #eee;
    }

    .left img {
        position: absolute;
        left: 0.5rem;
        top: -1rem;
        height: 4rem;
        width: 4rem;
        border: 2px solid #fff;
        border-radius: 0.3rem;
    }

    .right {
        float: right;
        width: 65%;
        height: 4rem;
    }

    .right div {
        margin-top: 0.3rem;
    }

    .textBox {
        float: left;
        width: 80%;
        font-size: 0.6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 1rem;
    }

    .icon-guanbi {
        float: right;
        font-size: 1rem;
    }

    .pricebox1 {
        font-size: 0.7rem;
        text-align: left;
        font-weight: bold;
    }

    .pass1 {
        color: #AAAAAA;
        text-decoration: line-through;
        font-size: 0.5rem;
    }

    .price1 {
        color: #f00;
        font-size: 0.5rem;
    }

    .choseBox {
        font-size: 0.6rem;
    }

    .sizeBox {
        height: 6rem;
        border-bottom: 1px solid #eee;
    }

    .center {
        position: absolute;
        top: 4rem;
        right: 0;
        left: 0;
        bottom: 5rem;
        overflow: auto;
    }

    .bottom {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        height: 2rem;
    }

    .num {
        font-weight: bold;
        border-bottom: 1px solid #eee;
        height: 3rem;
        line-height: 3rem;
    }

    .tonum {
        font-size: 0.8rem;
        float: left;
    }

    .stock {
        float: right;
        font-size: 0.7rem;
    }

    .add {
        padding: 0 0.3rem;
    }

    .addcar, .addcar1 {
        background: #F74FA3;
        height: 2rem;
        line-height: 2rem;
        color: #fff;
        font-size: 0.8rem;
    }

    .toSize span, .colorBox span {
        display: inline-block;
        font-size: 0.5rem;
        background: #eee;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        float: left;
        margin: 0.1rem 0 0 0.3rem;
        padding: 0 0.3rem;

    }

    .in {
        background: #ED509E;
    }

    .toColor span:hover {
        background: #ED509E;
    }

    .title {
        display: block;
        text-align: left;
        font-size: 0.5rem;
        font-weight: bold;
        margin-top: 0.3rem;
        margin-bottom: 0.5rem;
    }
</style>