<template>
    <div class="home">
        <van-pull-refresh
                v-model="isLoading"
                @refresh="onRefresh"
                success-text="刷新成功"
        >
            <div class="header">
                <div class="top">潮流女装</div>
                <div class="banner">
                    <van-swipe :autoplay="3000"  @change="onChange" indicator-color="white">
                        <van-swipe-item>
                            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2517033184,1316800809&fm=11&gp=0.jpg"/>
                        </van-swipe-item>
                        <van-swipe-item>
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1826998081,3935372297&fm=11&gp=0.jpg"/>
                        </van-swipe-item>
                        <van-swipe-item>
                            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1557444909,2197229618&fm=11&gp=0.jpg"/>
                        </van-swipe-item>
                    </van-swipe>

                </div>
            </div>
            <div class="con">
                <ul class="">
                    <li>
                        <div class="title">
                            <h2 class="red">HOT TYPE</h2>
                            <van-divider>热门分类</van-divider>
                        </div>
                        <div class="navList">
                            <router-link :to="{name:'public',query:{id:'连衣裙'}}">
                            <span>
                              <img src="../assets/img/1.png" />
                          </span>
                                <strong>连衣裙</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'T桖'}}">
                            <span>
                              <img src="../assets/img/2.png"/>
                          </span>
                                <strong>T恤</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'衬衫'}}">
                            <span>
                              <img src="../assets/img/3.png"/>
                          </span>
                                <strong>衬衫</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'半身裙'}}">
                            <span>
                              <img src="../assets/img/4.png"/>
                          </span>
                                <strong>半身裙</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'短裤'}}">
                            <span>
                              <img src="../assets/img/5.png"/>
                          </span>
                                <strong>短裤</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'牛仔裤'}}">
                            <span>
                              <img src="../assets/img/6.png"/>
                          </span>
                                <strong>牛仔裤</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'休闲裤'}}">
                            <span>
                              <img src="../assets/img/7.png"/>
                          </span>
                                <strong>休闲裤</strong>
                            </router-link>
                            <router-link :to="{name:'public',query:{id:'外套'}}">
                            <span>
                              <img src="../assets/img/8.png"/>
                          </span>
                                <strong>外套</strong>
                            </router-link>

                        </div>
                    </li>
                    <li>
                        <div class="title">
                            <h2 class="red" style="margin-top: 0.5rem">NEW ARRIVAL</h2>
                            <van-divider>新品上市</van-divider>
                        </div>
                        <!-- closeable 模式，在右侧显示关闭按钮 -->
                        <van-notice-bar >
                            当季热卖当季热卖当季热卖当季热卖当季热卖当季热卖当季热卖当季热卖
                        </van-notice-bar>

                        <Appcar :data="data1"/>
                    </li>
                    <li>
                        <div class="title">
                            <h2 class="red">HOT SALE</h2>
                            <van-divider
                                    color="#1989fa"
                                    background="#0f0    "
                                    left-icon="info-o"
                            >热销推荐</van-divider>
                        </div>

                        <!-- link 模式，在右侧显示链接箭头 -->
                        <van-notice-bar >
                            热销推荐热销推荐热销推荐热销推荐热销推荐热销推荐热销推荐热销推荐热销推荐
                        </van-notice-bar>
                        <Appcar :data="data2"/>
                    </li>
                </ul>
            </div>
            <div class="footer"></div>
        </van-pull-refresh>
    </div>
</template>
<style scoped>
    .top {
        height: 2rem;
        border-bottom: 1px solid #eee;
        font-size: 0.6rem;
        text-align: center;
        line-height: 2rem;
    }


    .banner img {
        height: 15rem;
        width: 100%;
    }

    .van-swipe__indicators {
        margin-bottom: 0.3rem;
    }

    .title h2 {
        font-size: 0.6rem;
        margin: 0;

    }

    .red {
        color: #ED509E;
    }

    .navList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .navList a {
        height: 3.5rem;
        width: 3.5rem;
        margin-top: 0.3rem;
    }

    .navList a span {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin: 0 auto;
        background: #F3C4F2;
    }

    .navList a span img {
        width: 70%;
        height: 70%;
        margin: 0.25rem auto;
    }

    .navList a strong {
        font-weight: inherit;
        font-size: 0.5rem;
    }

</style>
<script>
    import '../../css/home.css'
    import Appcar from '../common/Appcar'
    import {goods, goods1} from "../api/index";
    import { Toast } from 'vant';
    export default {
        name: 'home',
        data() {
            return {
                data1: [],
                data2: [],
                count: 0,
                isLoading: false,
                show: false,
                index: 0,
                images: [
                    'https://img.yzcdn.cn/1.jpg',
                    'https://img.yzcdn.cn/2.jpg'
                ],
            }
        },
        created(){
            console.log(this.$store.state)
          this.loading()
        },
        components: {
            Appcar,
        },
        methods:{
            loading(){
                goods()
                    .then(res=>{
                        res.data.forEach(item=>{
                           if (item.title=='新品上市'){
                               this.data1.push(item)
                           } else if (item.title=='热销推荐'){
                               this.data2.push(item)
                           }
                        });
                    }).catch(err=>{
                    console.log(err)
                });
            },
            onChange(index) {
                // Toast( index);
                console.log()
            },
            onRefresh() {
                setTimeout(() => {
                    this.loading();
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            }
        }
    }

</script>
