<template>
    <div class="login" >
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">登录</span>
        </div>
        <div id="logo">
            <img src="../assets/logo.png"/>
        </div>
        <div class="con">
            <span class="title">账号</span>
            <input type="text" maxlength="11"
                   v-model="form.user"
                   v-focus
                   autocomplete="off"
                   placeholder="请输入手机号"
            >
            <span class="title">密码</span>
            <el-input placeholder="请输入密码"
                      v-model="form.password"
                      show-password
                      autocomplete="new-password"
            ></el-input>
<!--            <span class="title">验证码</span>-->
            <input type="text"
                   class="Ver-code"
                   maxlength="4"
                   placeholder="请输入验证码"
                    v-model="vercode"
                   style="margin-top: 1rem"
            >
            <van-field class="Ver-code1"
                       :value="placeholder"
                       @click="createCode"
                       style="margin-top: 1rem"
                       readonly>
            </van-field>
        </div>
        <div class="footer">
            <div class="tologin"
                @click="tologin"
            >登录</div>
            <div class="err">{{ err }}</div>
            <div class="ok">{{ok}}</div>
            <router-link to="/register">
                <div class="register">注册</div>
            </router-link>
            <div class="pass"
            @click="forget"
            >忘记密码？点击这里找回</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from "vant";
    import {login,getregister} from "../api/index";

    export default {
        name: "Login",
        data(){
            return {
                imgurl:'.../assets/img/login.jpg',
                err:'',
                ok:'',
                one:false,
                two:false,
                show:false,
                show1:false,
                username:'',
                vercode:'',
                placeholder:'获取验证码',
                form:{
                    user:'',
                    password:''
                }

            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            tologin(){
                // console.log(this.$route.query.topath)
                // console.log(this.form.user,this.form.password,this.vercode)
                if (this.form.user=='' || this.form.password=='' ||this.vercode=='' ){
                    if (this.form.user==''){
                        Toast.fail('请输入正确的账号')
                    }else if (this.form.password==''){
                        Toast.fail('请输入密码')
                    }else if(this.vercode=='') {
                        Toast.fail('请输入验证码')
                    }else {

                    }
                }else {
                    if (this.vercode==this.placeholder){
                        var path =this.$route.query.topath;
                        var obj = this.form;
                        login(obj).then((res)=>{
                                console.log(res)
                                if (res.data.status == 200){
                                    // alert('成功');
                                    this.ok = '登录成功正在跳转......'
                                    this.err = ''
                                    setTimeout(()=>{
                                        if (path==undefined){
                                            path='home'
                                        }
                                        this.$router.push({path:'/'+path});

                                    },3000)
                                    localStorage.setItem('username',res.data.aa.number);
                                    var users  = res.data.aa.number +'@email.com';
                                    console.log(users)
                                    // this.$router.push({path:'/my',query:{username:users}})
                                }else if(res.data.status == 300) {
                                    // alert('用户名或密码错误')
                                    this.err = '用户名或密码错误'
                                }
                            })
                    }else {
                        alert('验证码错误')
                    }

                }

            },
            forget(){
                getregister().then(res=>{
                    var onOff = res.data.some(item=>{
                        return item.number == this.form.user
                    })
                    if (onOff){
                        this.$router.push({path:'/secret'})
                        // console.log(this.form.user)
                        localStorage.setItem('forgetName',this.form.user)
                    }else {
                        Toast.fail('此账号还没有注册喔')
                    }
                });

            },
            createCode(){
                var code = '';
                var codeLength = 4;//验证码的长度
                var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                    'S','T','U','V','W','X','Y','Z');//随机数
                for(var i = 0; i < codeLength; i++) {
                    //循环操作
                    var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
                    code += random[index];//根据索引取得随机数加到code上
                    this.placeholder = code
                    // console.log(code)
                }
            }
        }
    }
</script>

<style scoped>
    .login{
        /*background: #F06BAD;*/
        background: url("../assets/img/login1.jpg")no-repeat left/cover;
    }
    .Ver-code1[data-v-ef68022e]{
        width: 40%;
        height: 1.3rem;
        text-align: center;
        line-height: 1.3rem;
        padding: 0 1rem;
        font-size: 0.5rem;

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
    .con{
        border-bottom: 1px solid #eee;
        height: 11rem;
        width: 80%;
        margin: 0 auto;
    }
    .title{
        display: block;
        font-size: 0.7rem;
        margin-top: 0.5rem;
        text-align: left;
        text-indent: 0.5rem;
        color:#fff;

    }

    input{
        background: #eee;
        border: 2px solid #E5E5E5;
        border-radius: 0.1rem;
        padding: 0 0.3rem;
        height: 1.2rem;
        font-size: 0.6rem;
        width: 95%;
    }
    .Ver-code{
        width: 45%;
        float: left;
    }
    .Ver-code1{
        width: 30%;
        float: right;
        text-align: center;
        background: yellow;
    }
    .tologin,.register{
        height: 1.5rem;
        width: 80%;
        background: #000;
        color: #fff;
        margin: 0.5rem auto;
        font-size: 0.6rem;
        line-height: 1.5rem;
    }
    .register{
        background: #eee;
        color: #AAA;
    }
    .pass{
        font-size: 0.6rem;
        text-align: right;
        margin-right: 1.5rem;
    }
    .err{
        font-size: 0.5rem;

        color: #f00;
    }
    .ok{
        font-size: 0.5rem;
        color: #0f0 ;
    }
</style>