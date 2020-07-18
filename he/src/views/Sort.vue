<template>
    <div class="sort">
        <div class="header">
            <span class="iconfont icon-fanhui"
                @click="back"
            ></span>
            <span class="top">商品分类</span>
        </div>
        <div class="con">
            <form action="/">
                <van-search
                        v-model="input"
                        placeholder="请输入搜索关键词"
                        @search="onSearch"
                        @cancel="onCancel"
                        background="#eee"
                />
            </form>
        </div>
        <div class="footer">
            <ul class="list">
                <router-link :to="{name:'search'}">
                    <li>
                        <span class="name">连衣裙</span>
                        <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                    </li>
                </router-link>
                <router-link :to="{name:'search'}">
                <li>
                    <span class="name">T恤</span>
                    <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                </li>
                </router-link>
                <router-link :to="{name:'search'}">
                <li>
                    <span class="name">衬衫</span>
                    <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                </li>
                </router-link>
                <li>
                    <span class="name">半身裙</span>
                    <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                </li>
                <li>
                    <span class="name">短裤</span>
                    <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                </li>
                <li>
                <span class="name">牛仔裤</span>
                <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
            </li>
                <li>
                    <span class="name">外套</span>
                    <span class="all">
                        <span>全部</span>
                        <i class=" iconfont icon-jinru"></i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>

    .sort {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom:0;
        background: #eee;
    }

    .header {
        height: 2rem;
        font-size: 0.6rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
    }

    .icon-fanhui {
        font-size: 0.6rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .con {
        height: 2rem;
        margin: 0.5rem auto;
        /*background: #f00;*/
    }

    .con span {
        font-size: 0.6rem;
        position: absolute;
        top: 3rem;
    }

    .con input {
        height: 1.5rem;
        margin-top: 0.2rem;
        width: 75%;
        background: #fff;
        border: none;
        padding: 0 0.5rem;
        caret-color: red;
        font-size: 0.5rem;
        border-radius: 0.5rem;
    }
    .footer{
        width: 100%;
        position: absolute;
        top: 5rem;
        bottom: 3rem;
        overflow: auto;
        background: #eee;

    }
    .list li{
        height: 2rem;
        width: 100%;
        background: #fff;
        margin-top: 0.5rem;
    }
    .name{
        float: left;
        text-indent: 0.5rem;
        font-size: 0.6rem;
        text-align: center;
        line-height: 2rem;
    }
    .all{
        float: right;
        font-size: 0.6rem;
        text-align: center;
        line-height: 2rem;
        color: #AAAAAA;

    }
    .icon-jinru{
        font-size: 0.6rem;
    }
</style>
<script>
import {Toast} from 'vant'
    export default {
        name: 'sort',
        data() {
            return {
                data:[],
                input:''
            }
        },
        created() {
            console.log(this.$store.state)
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            onSearch(input){
                this.$router.push({name:'search',query:{search:input}})
            },

            onCancel() {
                Toast('确认');
            }
        }
    }
</script>
