<template>
   <div class="listcar">
       <ul class="list">
           <li
            v-for="(item,index) in data" :key="index"
           >
               <div class="title">
                   <span class="time">{{item.createdAt |dateFilter}}</span>
               </div>
               <div class="goods"
                v-for="option in item.arr"
               >
                   <img :src="option.img[0]"/>
                   <div class="right">
                       <div class="text">{{option.text}}</div>
                       <div class="size">尺码:{{option.type[0]}}</div>
                       <div class="price">
                           <span>￥{{option.price}}</span>
                           <span>x{{option.add}}</span>
                       </div>
                       <div class="color">颜色分类:{{option.type[1]}}</div>
                   </div>
               </div>
               <div class="button">
                   <div class="sum">配送:
                       <span>免费送货</span>
                   </div>
                   <div class="del">
                   <span class="comment"
                         style="color: #fff"

                   >立即评价</span>
                       <span style="border: 1px solid #eee;"
                             @click="delFn(item)"
                       >删除订单</span>
                   </div>
               </div>
           </li>
       </ul>
   </div>
</template>

<script>
    import {del, getcarorder, getorder} from "../api";
    import {Toast} from "vant";

    export default {
        name: "Listcar",
        props:[],
        data(){
            return {
                data:[]
            }
        },
        filters:{
            dateFilter(data){
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
        created() {
         this.loading()
        },
        methods:{
            loading(){
                var username = JSON.parse(window.localStorage.getItem('username'))
                getcarorder().then(res => {
                    var arr = [];
                    res.data.forEach(item=>{
                        if (parseInt(item.arr[0].phone) === username) {
                            arr.push(item)
                        }
                    });
                    this.data = arr
                })

            },
            delFn(item){
                del(item).then(res=>{
                    this.loading()
                    Toast.success('删除成功');
                })
            },
        }
    }
</script>

<style scoped>

    .comment{
        border: 1px solid #eee;
        background: #f00;
    }
    .list li{
        background: #fff;
        overflow: hidden;
        width: 95%;
        margin:0.3rem auto;
        border-radius: 0.5rem;
        box-shadow: 10px 10px 20px #888888;
    }
    .title{
        margin-top: 0.5rem;
        overflow: hidden;
    }
    .time{
        float: left;
        margin-left: 0.5rem;
        font-size: 0.7rem;
        color: #8C8C8C;
    }
    .pasto{
        float: right;
        margin-right: 0.5rem;
        font-size: 0.7rem;
        color: #F06BAD;
    }
    .goods{
        height: 4.5rem;
        background: #eee;
    }
    .goods img{
        width: 3rem;
        height: 3rem;
        float: left;
        margin: 0.5rem 0 0 0.5rem;
    }
    .right{
        width: 75%;
        height: 3.5rem;
        margin: 0.6rem 0 0 4rem;
        position: relative;
        padding-top: 0.5rem;
    }
    .text{
        font-size: 0.6rem;
        width: 80%;
        text-align: left;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .size,.color{
        font-size: 0.6rem;
        text-align: left;
    }
    .price{
        position: absolute;
        font-size: 0.6rem;
        top: 0.5rem;
        right: 0.5rem;
    }
    .price span{
        display: block;
        color: #F06BAD;
    }

    .sum{
        height: 1rem;
        margin-top: 0.3rem  ;
        font-size: 0.5rem;
        text-align: right;
        line-height: 1rem;
        margin-right: 0.5rem;
    }
    .sum span{
        color:#F06BAD;
    }
    .del{
        padding-bottom: 0.5rem;
        overflow: hidden;
    }
    .del span{
        display: block;
        height: 1rem;
        line-height: 1rem;
        width: 3rem;
        font-size: 0.6rem;
        float: right;
        margin-right: 0.2rem;
        color:#F06BAD;

    }
</style>