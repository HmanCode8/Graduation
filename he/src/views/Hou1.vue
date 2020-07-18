<template>
    <div class="hou1">
        <div class="header"
             v-if="show">
            <img src="../assets/img/hou.png"/>
        </div>
        <div class="con"
            v-if="show"
        >
            <el-container style="height: 800px; border: 1px solid #eee">
                <el-aside width="200px">
                    <el-menu :default-openeds="['2','2']"
                             text-color="#000"
                             active-text-color="#f00"
                             unique-opened="true"
                            >
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
                            <el-menu-item-group>
                                <router-link :to="{name:'alluser',query:{id:'1'}}">
                                    <el-menu-item index="1-2">所有用户</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-coin"></i>商品管理</template>
                            <el-menu-item-group>
                                <router-link :to="{name:'allgoods',query:{id:'2'}}">
                                    <el-menu-item index="2-1">所有商品</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </el-container>
            <router-view class="contain"/>
        </div>
        <div class="footer"
            v-if="show1"
        >
            <template>
                <div class="clickBox">
<!--                    <div @click="show3 = !show3" class="top">登录</div>-->
                    <div class="box">
                        <el-collapse-transition>
                            <div v-show="show3">
                                <h3>管理员登录</h3>
                                <el-input
                                        placeholder="请输入管理员账号"
                                        v-model="input"
                                        clearable
                                        v-focus
                                >
                                </el-input>
                                <el-input
                                        placeholder="请输入密码"
                                        v-model="input1"
                                        show-password
                                        @keyup.13="login"
                                ></el-input>
                                <div class="to">
                                    <el-button type="primary"
                                        @click="login"
                                    >确认</el-button>
                                    <el-button plain
                                    @click="clearFn"
                                    >重置</el-button>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </template>
        </div>
<!--        <video controls autoplay>-->
<!--            <source src="../assets/img/bg.mp4">-->
<!--        </video>-->
    </div>
</template>
<script>
    import {admin} from "../api/index";

    export default {
        name:'hou1',
        data() {
            return {
                show:false,
                show1:true,
                show3: true,
                input:'',
                input1:'',
            }
        },
        created() {
            var status = JSON.parse(window.sessionStorage.getItem('status'));
            if (status==200){
                this.show = true;
                this.show1 = false;
            }else {
                // alert('登录失败')
            }
        },
        methods:{
            login(){
                var obj = {
                    user:this.input,
                    password:this.input1,
                };
                admin(obj).then(res=>{
                    window.sessionStorage.setItem('status',JSON.stringify(res.data.status));
                    console.log(status);
                    if (res.data.status==200){
                        this.show = true;
                        this.$router.push({
                            name:'alluser',
                            query:{id:1}
                        })
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            clearFn(){
                this.input = '';
                this.input1 = '';
            }
        }
    };
</script>
<style scoped>

    /*video {*/

    /*    position: fixed;*/
    /*    right: 0;*/
    /*    min-width: 100%;*/
    /*    min-height: 100%;*/
    /*    width: auto;*/
    /*    height: auto;*/
    /*    z-index: -999;*/
    /*}*/
    .footer{
        width: 500px;
        height: 500px;
        margin: 200px auto;
        text-align: center;
        background: #fff;
        box-shadow: 20px 20px 12px #AAA;
        border-radius: 20px;
    }
    .box{
        /*border: 1px solid #000;*/
        padding-top: 20px;
        position: relative;
    }
    .to button{
        float: left;
        margin-left: 20px;
    }

    h3{
        margin-top: 10px;
        font-size: 20px;
    }
    .to{
        width: 80%;
        height: 40px;
        margin: 50px auto;
    }
    .to button{

    }
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        /*background-color: #409EFF;*/
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
    .transition-box{
        font-size: 14px;
    }
    * {
        font-size: 30px;
    }
    .el-header[data-v-076659f8]{
        background: #f0f    ;
    }

    .hou1 {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        /*background: url("../assets/img/ling.png");*/
        z-index: 2;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-table td, .el-table th {
        text-align: center;
    }


    .header img {
        /*background: #0f0;*/
        width: 100%;
        height: 100%;

    }
    .header{
        height: 120px;
        background: #000;
    }
    .contain {
        position: absolute;
        left: 200px;
        right: 0;
        top: 200px;
        bottom: 0;
        overflow: auto;
    }
</style>
<style>
    .box .el-input__inner{
        font-size: 15px;
        height: 40px;
        width: 80%;
        margin-top: 50px;
    }
    .box .el-input .el-input__clear{
        font-size: 18px;
        position: absolute;
        right: 40px;
        top: -25px;

    }
</style>

