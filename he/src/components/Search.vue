<template>
    <div class="search">
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">商品搜索页面</span>
        </div>
        <div class="con">
            <span class="iconfont icon-sousuo1"></span>
            <input type="text" v-model="input" placeholder="请输入商品名称">
        </div>
        <div class="footer">
            <ul class="list">

                <li
                        v-for="(item,index) in search" :key="index"
                >
                    <router-link :to="{name:'goodsdetails',query:{id:item._id}}">
                        <img :src="item.img[0]"/>
                        <div class="context">
                            <div class="text">{{item.text}}</div>
                            <div class="pricebox">
                                <span class="pass">{{item.passprice |priceFilter}}</span>
                                <span class="price">￥{{item.price}}</span>
                            </div>
                            <div class="sale">
                                <span>库存：{{item.num}}</span>
                            </div>
                        </div>
                    </router-link>
                </li>


            </ul>
        </div>
    </div>
</template>

<script>
    import {goods,goods1} from "../api/index";
    export default {
        name: "Goods",
        data() {
            return {
                goodsData: [],
                input: '',

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
            this.input = this.$route.query.search;
                goods().then((res) => {
                    // console.log(res.data);
                    this.goodsData = res.data;
                });
        },
        computed: {
            search: {
                get() {
                    if (!this.input) {
                        return this.goodsData
                    }
                    return this.goodsData.filter(item => {
                        return item.text.includes(this.input)
                    })
                },
                set(val) {
                    console.log(val)
                }
            }
        },
        methods: {
            fnAdd() {
                alert(111)
            },
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .search {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #eee;
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

    .list {
        position: absolute;
        left: 0;
        right: 0;
        top: 4rem;
        bottom: 2.5rem;
        overflow: auto;
    }

    .list li {
        height: 5rem;
        border-bottom: 2px solid #fff;

    }

    .list li img {
        height: 4rem;
        width: 30%;
        float: left;
        margin: 0.5rem 0 0 0.3rem;
        border-radius: 0.2rem;
    }

    .context {
        height: 4rem;
        width: 65%;
        margin-top: 0.5rem;
        float: right;
    }
    .text{
        box-sizing: border-box;
        height: 2rem;
        text-align: left;
    }

    .context div {
        width: 100%;
        height: 30%;
        font-size: 0.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .pricebox {
        text-align: left;
        margin-top: 0.2rem;
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
        font-size: 0.7rem;

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