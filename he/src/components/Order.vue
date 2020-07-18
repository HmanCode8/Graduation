<template>
    <div class="order">
        <div class="header">
                   <span class="iconfont icon-fanhui"
                         @click="back"
                   ></span>
            <div class="top">结算页面</div>

        </div>
        <div class="con">
            <router-link :to="{name:'address',query: {from:this.$route.query.from}}">
                <div class="address" v-if="addData">
                    <div class="selfText">
                        <span class="title">收货人信息:</span>
                        <span class="name">{{addData.name}}</span>
                        <span class="number">{{addData.tel}}</span>
                    </div>
                    <div class="addText">
                        {{addData.province +addData.addressDetail}}
                    </div>
                    <i class="iconfont icon-jinru"></i>
                </div>
                <div class="address1" v-show="disto">
                    <!--                    <button >去增加地址</button>-->
                    <el-button type="primary" class="writeAdd"
                               @click="writeAdd"
                    >选择地址
                    </el-button>
                        <i class="iconfont icon-jinru" style="top:2rem"></i>
                </div>
            </router-link>
            <ul class="list"
                v-show="list1"
            >
                <li>
                        <span v-if="data.img">
                        <img :src="data.img[0]"/>
                    </span>
                    <div class="goods">
                        <div class="text">{{data.text}}</div>
                        <div class="size" v-if="type">尺码:{{type[0]}}</div>
                        <div class="color" v-if="type">颜色分类:{{type[1]}}</div>
                        <div>
                            <span class="price" v-if="data.price">￥{{data.price}}</span>
                            <span class="add">
                        <van-stepper v-model="add" :max="max" disabled-input/>
                    </span>
                        </div>

                    </div>

                </li>
            </ul>
            <ul class="list"
                v-show="list2"
            >
                <li
                        v-for="(item,index) in data1" :key="index"
                >
                        <span v-if="item.img">
                        <img :src="item.img[0]"/>
                    </span>
                    <div class="goods">
                        <div class="text">{{item.text}}</div>
                        <div class="size" v-if="item.type">尺码:{{item.type[0]}}</div>
                        <div class="color" v-if="item.type">颜色分类:{{item.type[1]}}</div>
                        <div>
                            <span class="price" v-if="item.price">￥{{item.price}}</span>
                            <span class="add">
                        <van-stepper v-model="item.add" :max="item.num"/>
                    </span>
                        </div>

                    </div>

                </li>
            </ul>
        </div>
        <div class="footer">
            <ul class="tolist">
                <li>
                    <span>快递方式:</span>
                    <strong class="iconfont icon-dayuhao"></strong>
                    <strong>免费送货￥0</strong>
                </li>

                <li
                        @click="showPicker = true"
                >
                    <span>支付方式:</span>
                    <strong class="iconfont icon-dayuhao"></strong>
                    <strong>{{sheet}}</strong>
                </li>
                <li>
                    <span>买家留言:</span>
                    <input type="text" placeholde="请留言"
                           v-model="val"
                           v-focus
                    >
                </li>
            </ul>
            <div class="topay"
                 v-show="list1"
            >
                <span class="sum">合计：￥{{all}}</span>
                <div class="orderto"
                     @click="orderTo"
                     v-show="orderTohave1"
                >下单
                </div>

            </div>
            <div class="topay"
                 v-show="list2"
            >
                <span class="sum">合计：￥{{all1}}</span>
                <div class="orderto"
                     @click="orderTo"
                     v-show="orderTohave1"
                >下单
                </div>

            </div>
        </div>
        <div class="addChose"
             v-show="addDis"
        >
            <ul class="addList">
                <li
                        v-for="(item,index) in addData1" :key="index"
                >
                    <div class="textadd">
                        <div class="nameadd">姓名：{{item.name}}</div>
                        <div class="teladd">手机号码：{{item.number}}</div>
                        <div class="address1add">
                            地址：{{item.address}}
                        </div>
                    </div>
                    <div class="editadd">
                        <div
                                @click="use(item)"
                        >使用
                        </div>
                        <div

                        >删除
                        </div>
                    </div>
                </li>

            </ul>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getorder,postorder,count,postcarorder,carcount} from "../api/index";
    import {Toast} from 'vant'
    export default {
        name: "Order",
        data() {
            return {
                showPicker: false,
                columns: ['微信支付', '支付宝支付'],
                dis: true,
                disto: false,
                data: {},
                max: '',
                data1: [],
                sum: 0,
                type: '',
                addData: {},
                addData1: [],
                add: '',
                val: '',
                list1: false,
                list2: false,
                addDis: false,
                orderTohave: true,
                orderTohave1:true,
                show:false,
                sheet:'选择支付方式',
            }
        },
        watch:{
            data1:{
                handler(val,oldVal){
                    window.localStorage.setItem('goods',JSON.stringify(val))
                },
                deep:true
            },
            data:{
                handler(val,oldVal){

                    window.localStorage.setItem('goods1',JSON.stringify(val))
                },
                deep:true
            }
        },
        created() {
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
            //这个是表示你选了什么类型的衣服
            this.type = JSON.parse(window.localStorage.getItem('type'));

            if (this.$route.query.from == 'carPath' || this.$route.query.from == null) {
                // console.log(JSON.parse(localStorage.getItem('goods')))
                 this.list2 = true;
                this.list1 = false;
                this.max = this.data1.num;
                var arr =JSON.parse(localStorage.getItem('goods'));
                arr.forEach(item=>{
                    item.shuliang = this.add;
                    this.max = item.num;
                });
                console.log(arr)
                this.data1 = arr
            } else if (this.$route.query.from == 'detailsPath' || this.$route.query.from == null) {
                this.data = JSON.parse(window.localStorage.getItem('goods1'));
                this.list1 = true;
                this.list2 = false;
                this.max = this.data.num;
            }
            if (this.data.length == 0) {
                this.dis = false
            }

            this.addData = JSON.parse(window.localStorage.getItem('address'));
            if (this.addData) {
                this.disto = false;

            }else {
                this.disto = true;

            }

        },
        methods: {
            onConfirm(value) {
                this.sheet = value;
                this.showPicker = false;
            },
            writeAdd() {
                this.$router.push({name: 'onadd'})
            },
            back() {
                this.$router.go(-1)
            },
            use(item) {
                this.addData = item;
                console.log(this.addData);
                this.addDis = false
            },

            orderTo() {
                if (!this.addData){
                    Toast.fail('请选择收货地址')
                }else {
                    if (this.sheet =='选择支付方式'){
                        Toast.fail('请选择支付方式')
                    }else {
                        if (this.$route.query.from=='carPath'){
                            window.localStorage.setItem('goods',JSON.stringify(this.data1));
                            console.log(JSON.parse(localStorage.getItem('goods')));
                            var toArr = JSON.parse(localStorage.getItem('goods'));
                            console.log(toArr);
                            postcarorder(
                                {
                                    arr:toArr,
                                }
                            )
                                .then(res => {
                                    // console.log(res.data)
                                });
                            //减库存
                            // console.log(toArr)
                            toArr.forEach(item=>{
                                console.log(item.id);
                                carcount(
                                    {
                                        id:item.id,
                                        add:item.add
                                    }
                                ).then(res=>{
                                    console.log(res.data)
                                })
                            });

                        }else if(this.$route.query.from == 'detailsPath' ){
                            window.localStorage.setItem('goods1',JSON.stringify(this.data));
                            //把订单存进数据库
                            postorder(
                                {
                                    phone:JSON.parse(window.localStorage.getItem('username')),
                                    aId: this.data._id,
                                    payment: this.sheet,
                                    name: this.addData.name,
                                    address: this.addData.address,
                                    number: this.addData.tel,
                                    text: this.data.text,
                                    img: this.data.img,
                                    shuliang: this.add,
                                    num: this.data.num,
                                    price: this.data.price,
                                    size: this.type[0],
                                    color: this.type[1],
                                }
                            )
                                .then((res) => {
                                });

                            //把订单中的商品数量根据下单后剩余的库存量存进数据库
                            count(
                                {
                                    id: this.data._id,
                                    num: this.data.num - this.add,
                                    img: this.data.img,
                                    text: this.data.text,
                                    passprice: this.data.passprice,
                                    price: this.data.price,
                                    color: this.data.color,
                                    size: this.data.size,
                                    checked: this.data.checked,
                                }
                            )
                                .then((res) => {
                                    // console.log(res)
                                })
                        }
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth();
                        var day = date.getDate();
                        var hour = date.getHours();
                        var min = date.getMinutes();
                        var sen = date.getSeconds();
                        var  resDate = year + '-' + (month + 1) + '-' + day + ' ' + hour + ':' + min + ':' + sen;
                        setTimeout(()=>{
                            Toast({
                                message: '下单成功',
                                icon: 'https://img.yzcdn.cn/vant/logo.png'
                            });
                            this.$router.push({
                                path: '/ok',
                                query: {
                                    val: this.val,
                                    from: this.$route.query.from,
                                    add:this.add,
                                    date:resDate
                                }
                            });
                        },2000)
                    }


                }

            },

        },
        computed: {
            all() {
                // this.sum=0
                // this.data.forEach(item=>{
                //     this.sum += item.price*item.num
                // });
                return this.data.price * this.add
            },
            all1() {
                var sum = 0
                this.data1.forEach(item => {
                    sum += item.price * item.add
                });
                return sum
            }
        },

    }
</script>

<style scoped>

    .footer{
        background: #ffffff;
    }
    .van-action-sheet__description{
        font-size: 0.6rem;
        color:#07c160;
    }
    .van-popup--bottom{
        height: 6rem;
    }
    .tolist li{
        height: 2rem;
    }
    .tolist li input {
        border: 1px solid #fff;
        width: 70%;
        background: #eee;
        color: #aaa;
        padding: 0 0.2rem;
        height: 1.2rem;
    }

    .order {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 2.5rem;
        background: #eee;
        overflow: auto;
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
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .address {
        font-size: 0.6rem;
        height: 3rem;
        background: #fff;
    }

    .address1 {
        font-size: 0.8rem;
        height: 3rem;
        line-height: 3rem;
        background: #fff;
    }

    .address span {
        float: left;
        margin-left: 1rem;
    }

    .selfText {
        height: 50%;
        line-height: 1.5rem;
        width: 80%;
    }

    .title {
        font-weight: bold;
        color: #000;
    }

    .addText {
        margin-left: 1rem;
        text-align: left;
        width: 80%;
    }

    .icon-jinru {
        position: absolute;
        right: 0;
        top: 3rem;
        font-size: 1rem;
    }

    .list li {
        height: 5.5rem;
        border: 1px solid #eee;
        background: #fff;
    }

    .list li img {
        height: 3rem;
        width: 3rem;
        margin: 0.6rem 0 0 0.3rem;
        float: left;

    }

    .goods {
        width: 60%;
        float: left;
        height: 4rem;
        margin: 0.4rem 0 0 0.5rem;
        font-size: 0.5rem;
        text-align: left;
    }

    .price {
        color: #f00;
    }

    .add {
        float: right;
    }

    .tolist li {
        border-bottom: 1px solid #AAA;
        font-size: 0.6rem;
        height: 1.5rem;
        line-height: 1.5rem;
    }

    .tolist li span {
        float: left;
        margin-left: 0.5rem;
    }

    .tolist li strong {
        float: right;
        margin-right: 0.5rem;
        font-weight: lighter;
    }

    .topay {
        height: 2.5rem;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        background: #fff;
        z-index: 2;
        line-height: 2.5rem;
        font-size: 0.8rem;

    }

    .sum {
        float: left;
        margin-left: 0.5rem;
    }

    .orderto {
        float: right;
        width: 6em;
        height: 2.5rem;
        background: #F06BAD;
    }
    .orderto button{
        width: 100%;
        height: 100%;
        border: none;
        font-size: 0.6rem;
    }
    .orderto button[data-v-5121c764]{
        background: #F06BAD;

    }
    .addChose {
        position: absolute;
        top: 2rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: #eee;
        z-index: 2;
    }

    .addList li {
        margin-top: 0.5rem;
        height: 5rem;
        background: #fff;
    }

    .el-checkbox {
        float: left;
        margin-top: 2rem;
    }


    .textadd {
        float: left;
        width: 80%;
        height: 100%;
        text-align: left;
        font-size: 0.6rem;
    }

    .nameadd, .teladd {
        margin: 0.5rem;
    }

    .address1add {
        margin: 0.5rem;
        white-space: normal
    }

    .editadd {
        width: 2rem;
        height: 4rem;
        float: right;
        font-size: 0.5rem;
        margin-top: 0.5rem;
        border-left: 1px solid #eee;
    }

    .editadd div {
        height: 50%;
        line-height: 2rem;
    }

</style>