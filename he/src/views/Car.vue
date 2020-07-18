<template>
    <div class="car">
        <div class="header">
                <span class="iconfont icon-fanhui"
                    @click="back"
                ></span>
            <span class="top">购物车({{sum}})</span>
        </div>
            <carList :data="data1"/>
    </div>
</template>

<script>
    import carList from '../common/carList'
    import {getcar,goods,count} from "../api/index";

    export default {
        name: "Car",
        data(){
            return {
                data1:[],
                data2:[],
                type:'',
                money:'',
                dis:false
            }
        },
        created(){
            var username = JSON.parse(window.localStorage.getItem('username'))
            if (username==null){
               this.$router.push({
                   name:'login'
               })
            }
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
                            this.data1 = arr
                        })
            });

        },
        methods:{
            back(){
                this.$router.go(-1);
            },
        },
        computed:{
            sum(){
                return this.data1.length
            }
        },
        components:{
            carList
        }
    }
</script>

<style scoped>


    .car{
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 2.5rem;
        overflow: auto;
        background: #eee;
    }
    .header {
        height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
        border-bottom: 1px solid #AAA;
    }

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }
    .top{
        font-size: 0.7rem;
    }
</style>