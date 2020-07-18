<template>
    <div class="user">
        <div class="header">
            <span class="iconfont icon-fanhui"
                  @click="back"
            ></span>
            <span class="top">用户信息</span>
        </div>
        <div class="con">
            <ul class="list">
                <li>
                    <div>我的头像</div>
                    <span class="iconfont icon-jinru"></span>

                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </li>
                <li
                        @click="niknameFn"
                >
                    <div>昵称</div>
                    <span class="iconfont icon-jinru"></span>
                    <span class="name">{{nikname}}</span>
                    <div
                            v-show="niknameShow">
                        <input type="text" class="nikname"
                               v-focus
                               v-model="nikname"
                               @keyup.13="enter"
                               @blur="enter"
                        >
                    </div>
                </li>
                <li
                        @click="showPicker = true"
                >
                    <div>性别</div>
                    <span class="iconfont icon-jinru"></span>
                    <span class="sex">{{sex}}</span>
                </li>
                <li>
                        <div>收货地址</div>
                        <router-link to="/editadd">
                        <span class="iconfont icon-jinru"></span>
                        </router-link>
                    </li>
                <li>
                    <div>手机号</div>
                    <span class="number">{{ tel }}</span>
                </li>
            </ul>
        </div>
        <div class="footer">
            <router-link to="my">
                <div class="save">保存</div>

            </router-link>
            <router-link to="/login">
                <div class="unlogin"
                     @click="loginOut"
                >退出登录
                </div>
            </router-link>
        </div>
        <div class="popup">
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
    import {update,getregister} from "../api/index";

    export default {
        name: "User",
        data() {
            return {
                imageUrl: '',
                nikname: '',
                tel: '',
                show: false,
                sex: '',
                niknameShow: false,
                data: [],
                showPicker: false,
                columns: ['男', '女'],
                str:''
            }
        },
        created() {
            var username = JSON.parse(window.localStorage.getItem('username'));
            if (username==null){
                this.$router.push({
                    name:'login'
                })
            }
            var user = localStorage.getItem('username');
              getregister().then(res => {
                    // console.log(res.data);
                    res.data.forEach(item => {
                        if (parseInt(item.number) == user) {
                            this.nikname = item.nikname
                            this.data = item;
                            this.sex = item.sex
                            // console.log(this.data)
                        }
                    })
                });
            this.tel = user
        },

        methods: {
            choseSex(obj) {
                update(obj).then(res => {
                    var user = localStorage.getItem('username')
                    getregister().then(res => {
                        console.log(res.data);
                        res.data.forEach(item => {
                            if (parseInt(item.number) == user) {
                                this.nikname = item.nikname
                                this.data = item;
                                this.sex = item.sex
                                console.log(this.data)
                            }
                        })
                    });
                })
                this.show = false
            },
            onConfirm(value) {
                // this.value = value;
                this.showPicker = false;
                console.log(value)
                var obj = {
                    id: this.data._id,
                    sex: value,
                    number: this.data.number,
                    password: this.data.password,
                    question: this.data.question,
                    answer: this.data.answer,
                    nikname: this.data.nikname,
                    role: this.data.role,
                    createdAt: this.data.createdAt,

                };
                this.choseSex(obj)
            },

            enter(){
                var obj = {
                    id: this.data._id,
                    number: this.data.number,
                    password: this.data.password,
                    question: this.data.question,
                    answer: this.data.answer,
                    nikname: this.nikname,
                    role: this.data.role,
                    createdAt: this.data.createdAt,
                };
                this.choseSex(obj);
                window.localStorage.setItem('nikname',JSON.stringify(this.nikname))
                this.niknameShow=false
            },
            niknameFn() {
                this.niknameShow = true
            },
            showPopup() {
                this.show = true;
            },
            back() {
                this.$router.go(-1)
            },
            handleAvatarSuccess(res, file) {
                var str = '../assets/img/54c6353104530da3.jpg'
                // this.imageUrl = URL.createObjectURL(file.raw);
                // this.imageUrl = str+file.name
                console.log(res);
                console.log(file.name)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            loginOut() {
                localStorage.clear()
                this.$router.push({path: 'login'})
            }
        },
    }
</script>

<style scoped>
    .popup p {
        margin-top: 2rem;
    }

    .nikname {
        display: block;
        width: 70%;
        height: 1.5rem;
        border: 1px solid #eee;
        font-size: 0.7rem;
        position: absolute;
        top: 25%;
        left: 20%;

    }

    .man, .men {
        font-size: 0.8rem;
        background: #eee;
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #eee;
    }

    .avatar[data-v-73968b0a] {
        width: 2rem;
        height: 2rem;
        margin: 0.5rem auto;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;

    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 2rem;
        height: 2rem;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 1rem;
        height: 1rem;
        display: block;

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

    .list li {
        border-bottom: 1px solid #eee;
        overflow: hidden;
    }

    .list li div {
        float: left;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        line-height: 3rem;
    }

    .list li span {
        float: right;
        margin-right: 0.5rem;
        line-height: 3rem;
    }

    .el-avatar {
        height: 3rem;
        width: 3rem;
    }

    .icon-jinru {
        font-size: 0.8rem;
    }

    .name, .sex, .number {
        font-size: 0.7rem;
        color: #AAA;
    }

    .save, .unlogin {
        width: 90%;
        height: 1.8rem;
        background: #000;
        color: #fff;
        margin: 0.5rem auto;
        font-size: 0.8rem;
        border-radius: 0.2rem;
        line-height: 1.8rem;
    }

    .unlogin {
        background: #AAA;
    }
</style>