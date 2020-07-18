<template>
    <div class="collection">
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">商品收藏</span>
        </div>
        <div class="con">
            <span class="iconfont icon-sousuo1"></span>
            <input type="text" v-model="input" placeholder="请输入商品名称">
        </div>
        <div class="footer">
            <ul class="list">

                <li
                        v-for="(item,index) in search" :key="index"
                        class="move"
                >
                    <router-link :to="{name:'goodsdetails',query:{id:item.id}}">
                        <img :src="item.img[0]"/>
                    </router-link>
                        <div class="context">
                            <div class="text">{{item.text}}</div>
                            <div class="pricebox">
                                <span class="pass">{{item.passprice |priceFilter}}</span>
                                <span class="price">￥{{item.price}}</span>
                            </div>
                            <div class="sale">
                                <span>库存：{{item.num}}</span>
                                <span class="delCollection" style="font-size: 0.5rem;"
                                    @click="del(item)"
                                >取消收藏</span>
                            </div>
                        </div>
                </li>


            </ul>
        </div>
        <div class="null"
            v-show="dis"
        >
            <el-button type="success"
                @click="go"
            >去逛逛</el-button>
        </div>
    </div>
</template>

<script>
    import {getcollection,del} from "../api/index";

    export default {
        name: "Goods",
        data() {
            return {
                goodsData: [],
                input: '',
                dis:false
            }
        },
        filters: {
            priceFilter(data) {
                if (data) {
                    return '￥' + data
                }
            }
        },
        created() {
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
         this.loading()
        },
        computed: {
            search() {
                if (!this.input) {
                    return this.goodsData
                }
                return this.goodsData.filter(item => {
                    return item.text.includes(this.input)
                })
            }
        },
        methods: {
            loading(){
                var username = JSON.parse(window.localStorage.getItem('username'));
                getcollection().then(res => {
                    console.log(res.data);
                    var arr = [];
                    res.data.forEach(item=>{
                        if (parseInt(item.phone)===username){
                            arr.push(item)
                        }
                        this.goodsData = arr;

                    });

                    if (this.goodsData.length){
                        this.dis = false
                    }else {
                        this.dis = true
                    }
                })


            },
            go(){
              this.$router.push({path:'/search'})
            },
            fnAdd() {
                alert(111)
            },
            back() {
                this.$router.go(-1)
            },
            del(item){
                del(item).then(res=>{
                       this.loading()
                })
            }
        }
    }
</script>

<style scoped>
    .collection {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #eee;
    }

    .null{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 2rem;
        background: #eee;
        border: 1px solid #eee;
    }
    .null button{
        height: 1.5rem;
        width: 5rem;
        margin: 7rem auto;
        font-size: 0.7rem;
    }
    .router-link-exact-active {
        color: #f00;
    }

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
    .con {
        height: 1.5rem;
        width: 96%;
        background: #fff;
        margin: 0.5rem auto;
    }

    .con span {
        font-size: 0.6rem;
    }

    .con input {
        height: 1rem;
        margin-top: 0.2rem;
        width: 70%;
        background: #fff;
        border: none;
        padding: 0 0.5rem;
        caret-color: red;
        font-size: 0.5rem;
    }
    .list li {
        height: 4rem;
        border-bottom: 2px solid #fff;
        width: 95%;
        margin: 0.2rem auto;
        background: #fff;
        border-radius: 0.5rem;
        box-shadow: 20px 20px 12px #AAA;
    }

    .list li img {
        height: 3rem;
        width: 25%;
        float: left;
        margin: 0.5rem 0 0 0.3rem;
    }

    .context {
        height: 4.5rem;
        width: 70%;
        float: right;

    }

    .context div {
        width: 100%;
        height: 25%;
        font-size: 0.6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .pricebox {
        text-align: left;
        font-size: 0.55rem;
    }

    .price {
        width: 80%;
        margin: 0 auto;
        font-size: 0.6rem;
        color: #f00;
    }

    .pass {
        color: #AAAAAA;
        text-decoration: line-through;
    }

    .sale {
        width: 80%;
        margin: 0 auto;
    }

    .sale span {
        font-size: 0.6rem;

    }

    .sale span:nth-child(1) {
        font-size: 0.6rem;
        color: #AAAAAA;
        float: left;
    }

    .sale span:nth-child(2) {
        float: right;
        margin-right: 0.5rem;
        color: #EC4196;
    }
</style>