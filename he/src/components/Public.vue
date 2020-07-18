<template>
    <div class="public">
        <div class="header">
            <router-link to="/home">
                <span class="iconfont icon-fanhui"></span>
            </router-link>
            <span class="title">
               {{title}}
           </span>
        </div>
        <div class="con">
            <img :src="img"/>
        </div>
        <div class="footer">
            <van-tabs v-model="active">
                <van-tab title="默认">
                    <Appcar :data="data2"/>
                </van-tab>
                <van-tab title="销量">
<!--                    <Appcar :data="data3"/>-->
                </van-tab>
                <van-tab title="价格">
<!--                    <Appcar :data="data4"/>-->
                </van-tab>
                <van-tab title="新品">
<!--                    <Appcar :data="data5"/>-->
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<style scoped>
    /*.public{*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    bottom: 0;*/
    /*    top: 0;*/
    /*    z-index: 2;*/
    /*    background: #fff;*/
    /*}*/
    .header {
        height: 2rem;
        border-bottom: 1px solid #eee;
        text-align: center;
        line-height: 2rem;
    }

    .title {
        font-size: 0.8rem;
    }

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .con {
        height: 8rem;
        width: 100%;
    }

    .con img {
        width: 100%;
        height: 100%;
    }

</style>

<script>
    import Appcar from '../common/Appcar'
    import {goods,goods1} from "../api/index";

    export default {
        name: 'public',
        data() {
            return {
                active: 0,
                data: [
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS9mOWNjY2NlMWI4YzJlZmIyMGZkNTkzMmNiMDkxMTViOC02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.m.jpg',
                        type: '连衣裙',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS8xNDZhZmEzZDYzMmIxNzU4MmUxMDBkNGQ4MDgwYTQ1YzEtNjQweDMwMC5qcGc_p_p100_p_3D.m.jpg',
                        type: 'T桖',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS8xNDZhZmEzZDYzMmIxNzU4MmUxMDBkNGQ4MDgwYTQ1Yy02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.m.jpg',
                        type: '衬衫',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS8xOTcyNzZhNWU2M2M4ZGI3YzAzMWVkOWJhMTU1OTc2Zi02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.m.jpg',
                        type: '半身裙',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS83NDI0NDU1YmY2MzgwNjdkZjE5YjgyODhlMGRiZTZmYy02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.jpg',
                        type: '短裤',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS9lYmY4M2MwNzY0YWVjZjJhZjI1ZDhmYzUyZDkzZTBkMS02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.jpg',
                        type: '牛仔裤',

                    },
                    {
                        img: 'http://img0.imgtn.bdimg.com/it/u=3364734178,3483645138&fm=26&gp=0.jpg',
                        type: '休闲裤',

                    },
                    {
                        img: 'https://ccdn.goodq.top/caches/e6a6ce279f8741b536d0a0cc8b39a81f/aHR0cDovLzVjNDE2Y2UyODY3YWEudDczLnFpZmVpeWUuY29tL3FmeS1jb250ZW50L3VwbG9hZHMvMjAxOS8wMS83NmZlNWMwNjlkZTY5ZWZjYjUyMDgxNzYxMjIyMTY4OS02NDB4MzAwLmpwZw_p_p100_p_3D_p_p100_p_3D.jpg',
                        type: '外套',

                    }
                ],
                title:'',
                img:'',
                data1:[],
                data2:[],
                data3:[],
                data4:[],
                data5:[]
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        },
        created() {
            this.title = this.$route.query.id;
            this.data.forEach(item=>{
                if (item.type==this.title){
                    this.img = item.img
                }
            });
            goods().then(res=>{
                var arr = [];
                res.data.forEach(item=>{
                    if (item.types==this.title){
                        arr.push(item)
                    }
                });
                this.data2 = arr
            })
        },
        components: {
            Appcar
        }
    }
</script>