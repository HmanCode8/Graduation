<template>
  <div id="app">
    <div id="nav"  >
      <van-tabbar route>
        <van-tabbar-item
                replace
                to="/home"
                icon="wap-home-o"
        >
          首页
        </van-tabbar-item>
        <van-tabbar-item
                replace
                to="/sort"
                icon="apps-o"
        >
          分类
        </van-tabbar-item>
        <van-tabbar-item
                replace
                to="/car"
                icon="cart-o"
        >
          购物车
        </van-tabbar-item>
        <van-tabbar-item
                replace
                to="/my"
                icon="manager-o"
        >
          个人中心
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!--<div class="fixed">-->
     <!--<span class="iconfont icon-erji"></span>-->
      <!--<router-link to="/car">-->
        <!--<span class="iconfont icon-gouwuche"></span>-->
      <!--</router-link>-->
    <!--</div>-->
    <router-view class="container"/>
  </div>
</template>
<script>
  import router from "./router";

  export default {
    name:'app',
    data(){
      return{

      }
    },
    created() {
      router.beforeEach((to,from,next)=>{
        // console.log(to)
        // console.log(from)
        // console.log(n)
        if (to.meta.onOff){
          if (localStorage.getItem('username')){
            next()
          }else {
            next({
              name:'login',
              query:{
                topath:to.name
              }
            })
          }
        }else {
          next()
        }
      });

    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

  }

  #nav li {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav li.router-link-exact-active {
    color: #42b983;
  }

  .container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 3rem;
    overflow: auto;
    /*background:  #eee;*/
  }
</style>
<style scoped>
  .van-tabbar-item--active{
    color: #F74FA3;
  }
  .van-tabbar{
    height: 2.5rem;
  }
  .van-tabbar-item{
    font-size: 0.5rem;
  }
  .fixed{
    position: absolute;
    right: 0.2rem;
    bottom: 2.5rem;
    height: 4rem;
    width: 2rem;
    z-index: 2;
  }
  .fixed span{
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.5rem;
    border-radius: 50%;
    background: #FBA3CC;
    opacity: 0.7;
    font-size: 01rem;
    line-height: 1.5rem;
    color: #fff;

  }
</style>

