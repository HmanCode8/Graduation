<template>
    <div class="carList">
        <div class="con"
             v-show="to">
            <div class="title">
           <span
                   @click="show"
                   v-show="none"
           >管理</span>
                <span
                        @click="show"
                        v-show="block"
                >完成</span>
            </div>
            <ul class="list">
                <li
                        v-for="(item,index) in data1" :key="index"
                >
                    <van-checkbox v-model="item.checked"
                                  v-show="none"

                    ></van-checkbox>
                    <img :src="item.img[0]"/>
                    <div class="goods">
                        <div class="text" v-if="item.text">{{item.text}}</div>
                        <div class="size" v-if="item.type">尺码:{{item.type[0]}}</div>
                        <div class="color" v-if="item.type">颜色分类:{{item.type[1]}}</div>
                        <div>
                            <span class="price">￥{{item.price}}</span>
                            <span class="add">
                        <van-stepper v-model="item.add" disabled-input/>
                    </span>
                        </div>

                    </div>
                    <i class="iconfont icon-iconzhuanqu_shanchu"
                       v-show="block"
                       @click="delfn(item,$event)"
                    ></i>

                </li>
            </ul>
    </div>
        <div class="footer">
            <div class="all">
                <template>
                    <el-checkbox v-model="allto">全选</el-checkbox>
                </template>
            </div>
            <div class="pay"
                 @click="payTo"
            >结算

            </div>
            <div class="sum">￥{{allMoney}}</div>
        </div>
        <div class="display"
             v-show="dis"
        >
            <i class="iconfont icon-gouwuche"></i>
            <span class="null">
                购物车空空如也喔
            </span>
            <div>
                <el-button type="success"
                           @click="go"
                >快去购物吧！！！
                </el-button>

            </div>
        </div>
    </div>
</template>

<script>
    import {getcar, del, goods, goods1} from "../api/index";
    import { Toast } from 'vant';
    export default {
        name: "carList",
        props: ['data'],
        data() {
            return {
                none: true,
                block: false,
                to: true,
                data1: [],
                add: 1,
                dis: false,
                isLoading: false
            }
        },
        watch: {
            data(val) {
                this.data1 = val;
                //console.log(this.data1);
                if (this.data1.length == 0) {
                    this.dis = true
                }else {
                    this.dis = false
                }
            }

        },
        created() {
            if (this.data1.length==0){
                this.dis = true
            }
        },
        methods: {
            loading(){
                var username = JSON.parse(window.localStorage.getItem('username'))
                goods().then(res=>{
                    var goods = res.data;
                        getcar()
                            .then((res)=>{
                                var arr = [];
                                res.data.forEach(item=>{
                                    if (parseInt(item.phone)===username){
                                        arr.push(item)
                                    }
                                });
                                arr.forEach(t=>{
                                    goods.forEach(t1=>{
                                        if (t.id==t1._id){
                                            t.num=t1.num;
                                        }
                                    })
                                });
                                this.data1 = arr;
                                if (this.data1.length==0){
                                    this.dis = true
                                }
                            })
                });
            },
            show() {
                this.none = !this.none;
                this.block = !this.block
            },
            go() {
                this.$router.push({path: '/'})
            },
            delfn(item,e) {
                this.block = false;
                this.none = true;
                var This = this;
               del(item).then((res) => {
                        // //console.log(res.data)
                     this.loading()

                    })
            },
            payTo() {
                var arr = [];
                this.data1.find(item => {
                    if (item.checked == true) {
                        arr.push(item)
                    }
                });
                if (arr.length){
                    window.localStorage.setItem('goods',JSON.stringify(arr));
                    this.$router.push({path: '/order', query: {from: 'carPath'}})
                }else{
                    Toast.fail('请选择商品');
                }



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
            allto: {
                get() {
                    //只有当所有数组所有都是true返回这一项
                    return this.data1.every(item => item.checked)
                },
                set(val) {
                    //console.log(val);
                    if (val) {
                        this.data1.forEach(item => item.checked = true)
                    } else {
                        this.data1.forEach(item => item.checked = false)
                    }
                }
            },
            allMoney() {
                this.sum = 0;
                this.data1.forEach(item => {
                    if (item.checked) {
                        this.sum += item.price * item.add
                    }
                });
                return this.sum
            }
        },

    }
</script>

<style scoped>

    .display {
        position: absolute;
        left: 0;
        right: 0;
        top: 2.5rem;
        bottom: 2.6rem;
        background: #fff;
        z-index: 30;
    }

    .icon-gouwuche {
        display: block;
        font-size: 5rem;
        color: #AAA;
        margin: 3rem auto;
    }

    .null {
        color: #5555;
        font-style: italic;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .icon-iconzhuanqu_shanchu{
        font-size: 1rem;
        position: absolute;
        bottom: 0;
        right: 0.5rem;
        color: #f00;

    }

    .title {
        height: 1.5rem;
        background: #fff;
        font-size: 0.6rem;
        line-height: 1.5rem;
    }

    .title span {
        float: right;
        margin-right: 0.5rem;
        width: 3rem;
    }

    .list li {
        width: 95%;
        height: 5rem;
        margin: 0.3rem auto;
        border: 1px solid #eee;
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 10px 10px 10px #AAA;
        position: relative;
    }

    .list{
        position: absolute;
        left: 0;
        right: 0;
        top: 3.5rem;
        bottom: 2rem;
        overflow: auto;
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
    }
    .text{
        height: 1.4rem;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;

    }

    .price {
        color: #f00;
    }

    .add {
        float: right;
    }

    .footer {
        position: fixed;
        height: 2rem;
        left: 0;
        right: 0;
        bottom: 2.5rem;
        background: #fff;
        z-index: 2;
        line-height: 2rem;
        font-size: 0.6rem;
        border: 1px solid #eee;
    }

    .all {
        float: left;
    }

    .sum {
        float: right;
        margin-right: 0.3rem;
    }

    .pay {
        float: right;
        width: 4rem;
        height: 80%;
        line-height: 1.7rem;
        background: #f00;
        color: #fff;
        border-radius: 1.5rem;
        margin: 0.2rem auto;
    }
</style>