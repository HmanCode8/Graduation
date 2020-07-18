<template>
    <div class="app">
        <router-link :to="{name:'goodsdetails',query:{id:item._id}}"
               v-for="(item,index) in data" :key="index"
                     v-if="item.img[0]"
            >
                <img :src="item.img[0]"/>
                <div class="text">{{item.text}}</div>
                <div class="price">
                    <!--<span class="pass">{{item.passprice}}</span>-->
                    <span>￥{{item.price}}</span>
                </div>
                <div class="sale">
                    <span>库存：{{item.num}}</span>
                    <span class="iconfont icon-jiarugouwuche"
                          @click="fnAdd(item,index)"
                    ></span>
                </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Appcar",
        props:['data'],
        data(){
            return {

            }
        },
        methods:{
            fnAdd(){

            }
        }
    }
</script>

<style scoped>

    .app{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0.6rem;
    }
    .app a{
        display: block;
        width: 50%;
        height: 10rem;
        box-sizing: border-box;
    }
    .app a img{
        display: block;
        width: 80%;
        height: 70%;
        margin: 0 auto;
    }

    .text{
        margin: 0 auto;
        width: 80%;
        font-size: 0.4rem;
        color: #000;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .price{
        width: 80%;
        margin: 0 auto;
        font-size: 0.6rem;
        text-align: left;
        color: #f00;
    }
    .pass{
        color: #AAAAAA;
        text-decoration: line-through;
    }

    .sale{
        width: 80%;
        margin: 0 auto;
    }
    .sale span{
        font-size: 0.7rem;

    }
    .sale span:nth-child(1){
        font-size: 0.6rem;
        color: #AAAAAA;
        float: left;
    }.sale span:nth-child(2){
         float: right;
         color: #EC4196;
     }

</style>