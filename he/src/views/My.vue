<template>
    <div class="my">
        <van-pull-refresh
                v-model="isLoading"
                @refresh="onRefresh"
                success-text="刷新成功"
        >
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">个人中心</span>
        </div>
        <div class="con">
            <div class="user">
                <el-avatar :src="url"></el-avatar>
                <span class="email">用户昵称：{{username}}</span>
                <router-link to="/user">
                    <span class="iconfont icon-jinru"></span>
                </router-link>
            </div>
        </div>
        <div class="footer">
            <div class="myorder">
                <strong class="title">我的订单</strong>
                <router-link :to="{name:'oderlist',query:{'active':0}}">
                    <div class="num" v-if="num!=0">{{num}}</div>
                    <span class="iconfont icon-shizhong"></span>
                    <strong>全部订单</strong>
                </router-link>
                <router-link :to="{name:'oderlist',query:{'active':3}}">
                    <span class="iconfont icon-fukuanchenggong"></span>
                    <strong>已付款</strong>
                </router-link>
                <router-link :to="{name:'oderlist',query:{'active':2}}">
                    <span class="iconfont icon-chenggong"></span>
                    <strong>发货中</strong>
                </router-link>
                <router-link :to="{name:'oderlist',query:{'active':3}}">
<!--                    <div class="num">3</div>-->
                    <span class="iconfont icon-quxiao"></span>
                    <strong>已取消</strong>
                </router-link>
                <router-link :to="{name:'oderlist',query:{'active':4}}">
                    <span class="iconfont icon-tuikuan"></span>
                    <strong>已退款</strong>
                </router-link>
            </div>
            <div class="myorder">
                <strong class="title">我的工具</strong>
                <a href="/car">
                    <div class="num" v-if="num1!=0">{{num1}}</div>
                    <span class="iconfont icon-gouwuche"></span>
                    <strong>购物车</strong>
                </a>
                <a href="/collection">
                    <div class="num" v-if="num2!=0">{{num2}}</div>
                    <span class="iconfont icon-shoucang"></span>
                    <strong>我的收藏</strong>
                </a>
            </div>
            <div class="myorder">
                <strong class="title">会员中心</strong>
                <a href="#">
                    <span class="iconfont icon-youhuiquan"></span>
                    <strong>优惠券</strong>
                </a>
            </div>
        </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {getorder,getcar,getcollection,getregister,getcarorder} from "../api/index";
    import {Toast} from 'vant'
    export default {
        name: "My",
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                data: '',
                data1: '',
                data2: '',
                data3: '',
                username: '',
                isLoading: false
            }
        },
        created() {
          this.loading()
        },
        methods: {
            loading(){
                var username = JSON.parse(window.localStorage.getItem('username'));
                if (username==null){
                    this.$router.push({
                        name:'login'
                    })
                }
                getorder().then(res => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (parseInt(item.phone)===username) {
                            arr.push(item)
                        }
                        this.data = arr
                    });
                    return getcar()
                }).then(res => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (parseInt(item.phone)===username) {
                            arr.push(item)
                        }
                        this.data1 = arr
                    });
                    return getcollection()
                }).then(res => {
                    var arr = [];
                    res.data.forEach(item => {
                        if (parseInt(item.phone)===username) {
                            arr.push(item)
                        }
                        this.data2 = arr
                    });
                    return getcarorder()
                }).then(res=>{
                    var arr = [];
                    res.data.forEach(item=>{
                        if (parseInt(item.arr[0].phone) === username) {
                            arr.push(item)
                        }
                    });
                    this.data3 = arr;
                    return  getregister()
                }).then(res=>{
                        // console.log(res.data)
                        res.data.forEach(item=>{
                            if (parseInt(item.number)==username){
                                this.username = item.nikname
                            }
                        })
                    })
            },
            back() {
                this.$router.go(-1)
            },
            onRefresh() {
                setTimeout(() => {
                    this.loading()
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            }
        },
        computed: {
            num(){
                return this.data.length +  this.data3.length
            },
            num1(){
                return this.data1.length
            },
            num2(){
                return this.data2.length
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 2rem;
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

    .user {
        height: 4rem;
        line-height: 4rem;
        background: #F74FA3;
        text-align: left;
    }

    .el-avatar {
        height: 3rem;
        width: 3rem;
        float: left;
        margin: 0.5rem 0 0 0.5rem;
    }

    .email {
        color: #fff;
        font-size: 0.8rem;
        height: 2rem;
        line-height: 2rem;
        margin-left: 0.5rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        width: 8rem;
        display: block;
        padding-top: 1rem;
    }

    .icon-jinru {
        font-size: 1rem;
        color: #fff;
        position: absolute;
        right: 0;
        top: 2rem;
    }

    .myorder {
        border-bottom: 0.2rem solid #eee;
        overflow: hidden;
        padding-bottom: 0.2rem;
    }

    .num {
        font-size: 0.6rem;
        color: #fff;
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background: #FF7100;
    }

    .myorder a {
        display: block;
        width: 3rem;
        height: 3rem;
        float: left;
        margin-left: 0.5rem;
        position: relative;
    }

    .myorder a span {
        display: block;
        font-size: 1.5rem;
        width: 3rem;
        height: 2rem;
        color: #F74FA3;
        line-height: 3rem;
    }

    .myorder a strong {
        padding: 0;
        font-size: 0.6rem;
        font-weight: lighter;
    }

    .title {
        font-size: 0.6rem;
        display: block;
        text-align: left;
        text-indent: 0.3rem;
        margin-top: 0.5rem;
    }
</style>