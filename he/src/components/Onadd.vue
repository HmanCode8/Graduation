<template>
    <div class="onadd">
        <div class="header">
               <span class="iconfont icon-fanhui"
                     @click="back"
               ></span>
            <div class="top">地址信息</div>
        </div>
        <div class="con">
            <van-address-edit
                    :area-list="areaList"
                    show-postal
                    show-delete
                    show-set-default
                    show-search-result
                    :search-result="searchResult"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @change-detail="onChangeDetail"
            >
            </van-address-edit>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import areaList from '../assets/area'
    import {postaddress} from "../api/index";

    export default {
        name:'onadd',
        data() {
            return {
                areaList,
                searchResult: [],
            }
        },
        created() {
            console.log(this.$route.query.from)
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
            this.onSave()
        },
        methods: {
            onSave(data) {
                console.log(data)
              postaddress(
                  {
                      phone:JSON.parse(window.localStorage.getItem('username')),
                      name:data.name,
                      tel:data.tel,
                      province:data.province +data.city +data.county,
                      postalCode:data.postalCode,
                      addressDetail:data.addressDetail,
                      areaCode:data.areaCode,
                      isDefault:data.isDefault
                  }
              )
                    .then((res) => {

                    });
                console.log(data);
                this.$router.push({path:'/address',query:{from:this.$route.query.from}})
            },
            onDelete() {
                Toast('delete');
            },
            back(){
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

    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

</style>