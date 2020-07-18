
<template>
    <div class="address">
        <div class="header">
               <span class="iconfont icon-fanhui"
                     @click="back"
               ></span>
            <div class="top">地址编辑</div>

        </div>
        <div class="con"
             v-show="nothing"
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
                                @click="edit(item)"
                        >编辑</div>
                        <div
                                @click="del(item)"
                        >删除</div>
                    </div>
                </li>
            </ul>

        </div>
        <div class="footer"
             v-show="have"
        >
            <van-address-edit
                    :area-list="areaList"
                    :address-info="AddressInfo"
                    show-postal
                    show-delete
                    show-set-default
                    show-search-result
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @change-detail="onChangeDetail"
            >
            </van-address-edit>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import {getaddress,del,update} from "../api/index";
    import areaList from '../assets/area'
    export default {
        data() {
            return {
                chosenAddressId: '',
                list: [],
                check:false,
                nothing:true,
                data:[],
                have:false,
                areaList,
                infoData:'',
                AddressInfo:{//收货人信息初始值
                    name:'',//姓名
                    tel:'',//电话
                    province:'',//省份
                    city:'',//城市
                    country:'',//区县
                    areaCode:'',//地址code：ID
                    addressDetail:'',//详细地址
                    postalCode:'',
                    isDefault:false,//是否选择默认
                },

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
                            this.list = arr
                        })

                    })
            },
            edit(item){
                this.AddressInfo = item;
                console.log(item)
                this.have = true;
                this.nothing = false
            },
            onSave(data) {
                console.log(this.AddressInfo._id);
                var aa = this.AddressInfo._id;
                update({
                    phone:JSON.parse(window.localStorage.getItem('username')),
                    id:aa,
                    name:data.name,
                    tel:data.tel,
                    province:data.province +data.city +data.county,
                    postalCode:data.postalCode,
                    addressDetail:data.addressDetail,
                    areaCode:data.areaCode,
                    isDefault:data.isDefault
                }).then(res=>{

                });
                this.loading()
                this.have = false;
                this.nothing = true
            },
            del(item){
                // console.log('删除')
                del(item).then(res=>{
                    this.loading()
                })
                // if (!this.list.length){
                //     var a = window.localStorage.getItem('address')
                //     a=''
                // }
            },
            back() {
                this.$router.go(-1)
            },
            onChangeDetail(val) {
                console.log(val)
                if (val) {
                    this.searchResult = [{
                        name: '贺州学院1',
                        address: '西校区'
                    }];
                } else {
                    this.searchResult = [];
                }
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

    .addList li {
        height: 5.2rem;
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








