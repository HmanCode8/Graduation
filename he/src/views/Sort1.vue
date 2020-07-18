<template>
    <div class="sort">
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">商品分类</span>
        </div>
        <div class="con">
            <van-search
                    v-model="value"
                    shape="round"
                    background="#4fc08d"
                    placeholder="请输入搜索关键词"
            />
        </div>
        <div class="footer">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item title="T桖" ></van-sidebar-item>
                <van-sidebar-item title="衬衫" />
                <van-sidebar-item title="半身裙" />
                <van-sidebar-item title="短裤" />
                <van-sidebar-item title="牛仔裤" />
                <van-sidebar-item title="外套" />
                <van-sidebar-item title="连衣裙" />
            </van-sidebar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sort1",
        data(){
            return {
                value:'',
                activeKey: 0
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

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
    .footer a{
        width: 4rem;
        height: 2rem;
        line-height: 1rem;
        font-size: 0.6rem;
    }

</style>
