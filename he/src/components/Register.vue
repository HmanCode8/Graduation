<template>
    <div class="register">
        <div class="header">
        <span class="iconfont icon-fanhui"
              @click="back"
        ></span>
            <span class="top">注册</span>
        </div>
        <div id="logo">
            <img src="../assets/logo.png"/>
        </div>
        <div class="con">
            <span class="title">手机号码</span>
            <input type="text" maxlength="11"
                   v-model="form.number"
                   placeholder="请输入手机号码"
                   v-focus
            >
            <div class="tishi">{{tishi}}</div>
            <span class="title">密码</span>
            <el-input placeholder="请输入密码"
                      v-model="form.password"
                      show-password
                      autocomplete="new-password"
            ></el-input>
            <div class="tishi">{{tishi1}}</div>
            <span class="title">密保问题</span>
<!--            <input type="text" v-model="form.question" placeholder="请输入问题">-->
            <div class="box1">
                <template>
                    <el-select v-model="form.question" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <div class="tishi">{{tishi2}}</div>
            <span class="title">答案</span>
            <input type="text" v-model="form.answer" placeholder="请输入你的答案">
<!--            <div class="tishi">{{tishi1}}</div>-->
        </div>
        <div class="footer">
            <div class="tologin"
                 @click="register"
            >注册
            </div>
            <div class="ok">
              {{ok}}
            </div>
            <router-link to="/login">
                <div class="toregister">已有账号去登录</div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vant';
    import {getregister,postregister} from "../api/index";

    export default {
        name: "Register",
        data() {
            return {
                data: '',
                tishi:'',
                tishi1:'',
                tishi2:'',
                ok:'',
                one:false,
                two:false,
                show:false,
                show1:false,
                showDiv:true,
                showDiv1:true,
                form: {
                    number: '',
                    password: '',
                    question:'',
                    answer:''
                },
                options:['你父亲的姓名?','你母亲的姓名?','你的生日是哪天?','你的学号?','你的名字是?'],
            }
        },
        methods: {
            showOne(){
                this.show = true;
                this.one = true;
                this.two = false
            },
            back() {
                this.$router.go(-1)
            },
            register() {
                if (this.form.question==''){
                    this.tishi2 = '密保不能为空';
                    setTimeout(()=>{
                        this.tishi2 = ''
                    },2000)
                }
                var obj = this.form;
                var phone = /^1[3|4|5|7|8][0-9]{9}$/;
                var passWord =  /^(?=.*[a-z])(?=.*\d)[^]{6,16}$/;
                if (this.form.number==''||this.form.number.length<=10||!phone.test(this.form.number)){
                   this.tishi = '请输入正确的手机号码'
                    this.tishi1  = ''
                }else if(!passWord.test(this.form.password)){
                    this.tishi1 = '至少8-16个字符，至少1个小写字母和1个数字';
                    setTimeout(()=>{
                        this.tishi1 = ''
                    },2000);
                    this.tishi  = ''
                }else {
               postregister(obj).then((res) => {
                            console.log(res.data);
                            this.data = res.data;
                            this.tishi = this.data.msg;
                            if (this.data.status==200){
                                this.tishi = '';
                                this.tishi1 = '';
                                this.ok = '注册成功，正在跳转到登录界面.........';
                                setTimeout(()=>{
                                    this.$router.push({path:'/login'})
                                },3000)
                            }
                        });
                }

                setTimeout(()=>{
                    this.showDiv=false
                },2000)
            }

        },
        created() {
         if (this.form.number ==''){
             this.tishi = ''
         }

        }
    }
</script>

<style scoped>
    .register{
        background: url("../assets/img/login1.jpg")no-repeat center/cover;
    }
    .el-alert{
        width: 60%;
        margin-left: 2rem;
    }
    .header {
        height: 2rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 2rem;
        background: #fff;
        border-bottom: 1px solid #eee;
    }
    #logo{
        width: 6rem;
        height: 6rem;
        margin: 0.3rem auto;
        box-shadow: 0.3rem 0.3rem 0.3rem 0.3rem #1B274D;
    }
    #logo img{
        width: 100%;
        height: 100%;
    }
    .icon-fanhui {
        font-size: 0.8rem;
        float: left;
        line-height: 2rem;
        margin-left: 0.5rem;
    }

    .con {
        border-bottom: 1px solid #eee;
        height: 15rem;
        width: 80%;
        margin: 0 auto;
    }


    .title {
        display: block;
        font-size: 0.7rem;
        margin-top: 1rem;
        text-align: left;
        text-indent: 0.5rem;
        color:#fff;
    }

    input {
        background: #eee;
        border: 2px solid #E5E5E5;
        border-radius: 0.1rem;
        padding: 0 0.3rem;
        height: 1.45rem;
        font-size: 0.6rem;
        width: 95%;
    }

    .tishi{
        font-size: 0.3rem;
        color: #f00;
    }
    .ok{
        font-size: 0.5rem;
        color: #0f0;
    }
    .tologin, .toregister {
        height: 1.5rem;
        width: 80%;
        background: #000;
        color: #fff;
        margin: 0.5rem auto;
        font-size: 0.6rem;
        line-height: 1.5rem;
    }

    .toregister {
        background: #eee;
        color: #AAA;
    }

</style>
<style>
    .box1 input{
        width:12rem;
        height: 1.7rem;
    }

</style>