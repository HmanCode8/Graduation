<template>
    <div class="address">
        <div class="header">
               <span class="iconfont icon-fanhui"
                     @click="back"
               ></span>
            <div class="top">地址列表</div>

        </div>
        <div class="con">
            <van-pull-refresh
                    v-model="isLoading"
                    @refresh="onRefresh"
                    success-text="刷新成功"
            >
            <ul class="addList">

                <li
                    v-for="(item,index) in list" :key="index"
                >
                    <div class="text">
                        <div class="name">姓名：{{item.name}}</div>
                        <div class="tel">手机号码：{{item.tel}}</div>
                        <div class="address1">
                            地址：{{item.address}}
                        </div>
                    </div>
                    <div class="edit">
                       <div
                       @click="use(item)"
                       >使用</div>
                       <div
                       @click="del(item)"
                       >删除</div>
                    </div>
                </li>
            </ul>
            </van-pull-refresh>

        </div>
        <div class="footer"
            @click="onAdd"
        >
            新增地址
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import {getaddress,del} from "../api/index";

    export default {
        data() {
            return {
                chosenAddressId: '',
                list: [],
                check:false,
                data:[],
                isLoading:false
            }
        },
        created() {
            // console.log(this.$route.query.from)
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
                getaddress()
                    .then((res) => {
                        // console.log(res.data)
                        // console.log(res.data);
                        res.data.forEach(item => {
                            item.address = item.province + item.addressDetail
                        });
                        this.data = res.data;
                        var arr = [];
                        this.data.forEach(item=>{
                            if (parseInt(item.phone)===username){
                                arr.push(item)
                            }
                            console.log(arr)
                            this.list = arr
                        })

                    })

            },
            onAdd() {
                Toast('新增地址');
                this.$router.push({path: '/Onadd',query:{from:this.$route.query.from}})
            },
            use(item){
                // console.log(item)
                window.localStorage.setItem('address',JSON.stringify(item));
                this.$router.push({name:'order',query:{from:this.$route.query.from}})
            },
            del(item){
                // console.log('删除')
                del(item).then(res=>{
                    this.loading()
                })
                if (!this.list.length){
                  var a = window.localStorage.getItem('address')
                    a=''
                }
            },
            back() {
                this.$router.push({name:'order',query:{from:this.$route.query.from}})
            },
            onRefresh() {
                setTimeout(() => {
                    // this.loading()
                    this.isLoading = false;
                    this.count++;
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
        border-bottom: 1px solid #eee;
    }

    .address {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #fff;
    }

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

  
    .con {
        background: #eee;
        position: absolute;
        left: 0;
        right: 0;
        top: 2rem;
        bottom: 0;
        overflow: auto;
        z-index: 2;

    }

    .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 2rem;
        line-height: 2rem;
        z-index: 3;
        background: #f00;
        border-radius: 1rem;
        font-size: 0.8rem;
        color: #fff;
    }

    .addList li {
        height: 5.5rem;
        background: #fff;
        border-radius: 1rem;
        width: 95%;
        margin: 0.5rem auto;
        box-shadow: 12px 12px 11px #AAA;
    }
    .text {
        float: left;
        width: 80%;
        height: 100%;
        text-align: left;
        font-size: 0.6rem;
    }
    .name,.tel{
       margin: 0.5rem;
    }
    .address1{
        margin: 0.5rem;
        white-space:normal
    }
    .edit{
        width: 2rem;
        height: 4rem;
        float: right;
        font-size: 0.5rem;
        margin-top: 0.5rem;
        border-left: 1px solid #eee;
    }
    .edit div{
        height: 50%;
        line-height: 2rem;
    }

</style>