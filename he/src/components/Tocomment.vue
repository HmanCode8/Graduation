<template>
    <div class="Tocomment">
        <div class="header">
               <span class="iconfont icon-fanhui"
                @click="back"
               ></span>
            <div class="top">发表评论</div>
        </div>
        <div class="con">
            <div class="title" v-if="data.img">
                <img :src="data.img[0]"/>
                {{data.text}}
            </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="亲您对这个商品满意吗？"
                v-model="value"
            >

            </textarea>
        </div>
        <div class="footer"
            @click="submint"
             v-show="dis"
        >
            立即提交
        </div>
        <div class="footer1"
             v-show="dis1"
        >
            正在提交……
        </div>
    </div>
</template>

<script>
    import {getregister,getorder,postcomment} from "../api/index";
    import {Toast} from 'vant'
    export default {
        name: "Tocomment",
        data(){
            return {
                data:[],
                value:'',
                dis:true,
                dis1:false,
                nikname:''
            }
        },
        created() {
            // console.log(this.$route.query.id)
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
           getregister().then(res=>{
                console.log(res.data)
                res.data.forEach(item=>{
                    if (parseInt(item.number)==username){
                        this.nikname = item.nikname
                    }
                })
            });
            getorder().then(res=>{
                console.log(res.data)
                var data = res.data.find(item=>{
                    return item._id == this.$route.query.id
                });
                // console.log(data)
                this.data = data
            })
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            submint(){
                // this.dis = false;
                // this.dis1 = true;

                if (this.value==''){
                    Toast('请输入你珍贵的评价');
                }else{
                    postcomment(
                        {
                            phone:JSON.parse(window.localStorage.getItem('username')),
                            aId:this.data.aId,
                            input:this.value,
                            size:this.data.size,
                            color:this.data.color,
                            nikname:this.nikname,
                            text:this.data.text
                        }
                    ).then(res=>{
                    });
                    const toast = Toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        // message: '倒计时 3 秒'
                    });

                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `正在提交你的评论 ${second} 秒`;
                        } else {
                            clearInterval(timer);
                            // 手动清除 Toast
                            Toast.clear();
                            this.$router.push({name:'goodsdetails',query:{id:this.data.aId}})
                        }
                    }, 1000);

                }
                // this.dis = false
                // setTimeout(()=>{
                //
                // },3000)
            }
        }
    }
</script>

<style scoped>
    .top {
        height: 2rem;
        border-bottom: 1px solid #eee;
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
    textarea{
        text-indent: 0.5rem;
        border: 1px solid #eee;
        margin-top: 1rem;
        font-size: 0.6rem;
    }
    .title img{
        width: 2rem;
        height: 2rem;
        float: left;
    }
    .title{
        font-size: 0.6rem;
        height: 2rem;
        text-align: left;
        border: 1px solid #eee;
    }
    .footer ,.footer1{
        width: 60%;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.7rem;
        margin: 0.5rem auto;
        background: #f00;
        color:#fff;
    }
    .footer1{
        background: #eee;
    }
</style>