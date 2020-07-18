<template>
    <div class="secret">
        <div class="header">
               <span class="iconfont icon-fanhui"
                     @click="back"
               ></span>
            <div class="top">密保问题</div>

        </div>
        <div class="con">
            <div class="title">用户：{{data}}</div>
            <div class="title">密保问题:{{data1.question}}</div>
            <!--            <input type="text" placeholder="请输入一个问题">-->
            <div class="title">答案：<span class="err">{{err}}</span></div>
            <input type="text" autocomplete="new-password" placeholder="你的答案" v-model="answer" v-focus>
        </div>
        <div class="footer">
            <div class="ok"
                 @click="okTo"
            >确认
            </div>
        </div>
        <div class="Repassword"
             v-show="dis"
        >
            <div class="title">设置你的新密码:</div>
<!--            <input type="password" v-model="newsPassword">-->
           <div class="password">
               <el-input placeholder="请输入密码" autocomplete="new-password" v-model="newsPassword" show-password v-focus></el-input>
           </div>
            <div class="title">确认你的新密码:</div>
            <div class="password">
               <el-input placeholder="请输入密码" autocomplete="new-password" v-model="newsPassword1" show-password></el-input>
           </div>
            <div class="tishi">{{tishi}}</div>
            <div class="tishi1">{{tishi1}}</div>
            <div class="ok"
                 @click="okTo1"
            >确认
            </div>
        </div>
    </div>
</template>

<script>
    import {getregister,update} from "../api/index";
    import {Toast} from 'vant'
    export default {
        name: "Secret",
        data() {
            return {
                question: '',
                number: '',
                data: '',
                data1: '',
                answer: '',
                dis: false,
                newsPassword: '',
                newsPassword1: '',
                tishi: '',
                tishi1: '',
                err: ''
            }
        },
        created() {

            var forgetName = localStorage.getItem('forgetName');
            console.log(forgetName)
            this.data = forgetName;
            console.log(this.data)
            getregister().then(res => {
                console.log(res.data)
                this.data1 = res.data.find(item => {
                        return item.number === parseInt(this.data)
                    });
                    console.log(this.data1)
                })
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            okTo() {
                console.log(this.answer);
                if (this.answer == this.data1.answer) {
                    // alert('ok')
                    this.dis = true
                } else {
                    this.err = '错误'
                }
            },
            okTo1() {
                var passWord = /^(?=.*[a-z])(?=.*\d)[^]{6,16}$/;
                if (!passWord.test(this.newsPassword)) {
                    this.tishi1 = '至少8-16个字符，至少1个小写字母和1个数字'
                    setTimeout(()=>{
                        this.tishi1 = ''
                    },2000)
                } else if(this.newsPassword==this.newsPassword1) {
                  update(
                      {
                          role: this.data1.role,
                          _id: this.data1._id,
                          number: this.data1.number,
                          password: this.newsPassword,
                          question: this.data1.question,
                          answer: this.data1.answer,
                      }
                  ).then(res => {
                            console.log(res.data)
                            this.tishi = res.data.msg
                            this.tishi1 = '';
                            setTimeout(() => {
                                //特别注意这个this指向，因为这setTimeout中this指向windows，
                                //箭头函数可以让this指向一致，在Vue实例中统一指向Vue实例
                                this.$router.push({name: 'login'})
                            }, 3000)
                        })
                }else {
                   Toast.fail('两次的密码不一致')
                    setTimeout(()=>{
                        this.tishi2 = ''
                    },3000)
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

    .title {
        width: 85%;
        margin: 1rem auto;
        font-size: 0.6rem;
        text-align: left;

    }

    .password{
        width: 80%;
        margin: 0 auto;
    }
    .con input, .Repassword input {
        width: 80%;
        height: 1.5rem;
        font-size: 0.6rem;
        padding: 0 0.3rem;
        background: #eee;
        border: none;
    }

    .ok {
        width: 60%;
        height: 1.5rem;
        line-height: 1.5rem;
        background: #000;
        color: #fff;
        margin: 1rem auto;
        font-size: 0.6rem;
    }

    .err {
        font-size: 0.4rem;
        color: #f00;
    }

    .Repassword {
        position: absolute;
        left: 0;
        right: 0;
        top: 2rem;
        bottom: 0;
        background: #fff;
    }

    .tishi, .tishi1 {
        font-size: 0.6rem;
        color: #0f0
    }

    .tishi1 {
        color: #f00
    }
</style>