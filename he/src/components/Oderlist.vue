<template>
    <div class="oderlist">
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">订单列表</span>
        </div>
        <div class="con">
        <van-tabs v-model="active" @click="onClick" >
            <van-tab title="单个订单">
                <List :data="data"/>
            </van-tab>
            <van-tab title="多订单">
                <Listcar/>
            </van-tab>
        </van-tabs>
    </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import List from '../common/List'
    import Listcar from '../common/Listcar'
    import {getorder, getcarorder} from "../api/index";

    export default {
        name: "Oderlist",
        data() {
            return {
                active: '',
                data: [],

                arr1: [],
            }
        },
        created() {
            // console.log(this.$route.query.active)
            this.active = this.$route.query.active;
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
         this.loading()
        },
        methods: {
            loading(){
                var username = JSON.parse(window.localStorage.getItem('username'));
                getorder().then(res => {
                    console.log(res.data)
                    var arr = [];
                    res.data.forEach(item => {
                        if (parseInt(item.phone) === username) {
                            arr.push(item)
                        }
                        this.data = arr;
                    });

                });

            },
            back() {
                this.$router.go(-1)
            },
            onClick(name, title) {
                Toast(title);
                // console.log(name, title)
            }
        },
        components: {
            List,
            Listcar
        }
    }
</script>

<style scoped>


    .oderlist {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: #eee;
        z-index: 2;
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
        margin-left: 0.5rem;
        line-height: 2rem;
    }

</style>