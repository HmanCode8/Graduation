<template>
    <div class="allgoods">
        <div class="header">
            <div class="title">
               商品管理
            </div>
            <div>
                <input type="text"
                       placeholder="请输入商品名称"
                       v-model="input1"
                       clearable>
                </input>
                <div class="add">
                    <el-button type="success"
                               @click="add"
                    >添加商品
                    </el-button>
                    <el-button type="primary">所有商品( {{sum}} )</el-button>

                </div>
            </div>
        </div>
        <div class="con">
            <table>
                <thead>
                <tr>
                    <th>商品编号</th>
                    <th>商品名称</th>
                    <th>详情图</th>
                    <th>尺码</th>
                    <th>颜色</th>
                    <th>旧价/现价</th>
                    <th>库存/件</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in search" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.text }}</td>
                    <td>
                        <img :src="item.img[0]"/>
                    </td>
                    <td>
                       <span style="font-size: 15px;"
                             v-for="option in item.size"
                       >
                           {{option}},
                       </span>
                    </td>
                    <td>
                       <span style="font-size: 15px;"
                             v-for="option in item.color" :key="index"
                       >
                           {{option}},
                       </span>
                    </td>
                    <td>
                        <span class="pass">￥{{ item.passprice }}</span>
                        ￥{{ item.price }}
                    </td>
                    <td>{{ item.num }}</td>
                    <td>
                        <el-button
                                @click="edit( item )"
                        >编辑
                        </el-button>
                        <el-button type="success"
                                   @click="deleteFn( item )"
                        >删除
                        </el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="footer"
             v-show="dispaly"
        >
            <div class="addgoods">
                <span class="close"
                      @click="close"
                >X</span>
                <ul>
                    <li>
                        <div class="title">商品标题：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value"
                                           @change="change"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">商品类型：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value2"
                                           @change="change2"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in types"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">添加尺码：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value1"
                                           multiple
                                           @change="change1"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in size"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">添加颜色：</div>
                        <div class="color">
                            <input type="text" v-model="form.color[0]">
                            <input type="text" v-model="form.color[1]">
                            <input type="text" v-model="form.color[2]">
                            <input type="text" v-model="form.color[3]">
                            <input type="text" v-model="form.color[4]">
                        </div>
                    </li>
                    <li>
                        <div class="title">商品名称：</div>
                        <input name="" v-model="form.text"></input>
                    </li>
                    <li>
                        <div class="img">
                            <div> 详情图URL：</div>
                            <input type="text" v-model="form.img[0]">
                            <input type="text" v-model="form.img[1]">
                            <input type="text" v-model="form.img[2]">
                        </div>
                    </li>
                    <li>
                        <div class="title">旧价格：
                            <input type="text" v-model="form.passprice"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                    <li>
                        <div class="title">现价格：
                            <input type="text" v-model="form.price"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                    <li>
                        <div class="title">库存量：
                            <input type="text" v-model="form.num"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                </ul>
                <el-button type="success" class="finish"
                           @click="finish"
                >上架商品
                </el-button>
            </div>
        </div>
        <div class="edit"
             v-show="disEdit"
        >
            <div class="addgoods">
                <span class="close"
                      @click="close"
                >X</span>
                <ul>
                    <li>
                        <div class="title">商品标题：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value3"
                                           @change="change"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">商品类型：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value4"
                                           @change="change2"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in types"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">添加尺码：</div>
                        <div class="select">
                            <template>
                                <el-select v-model="value5"
                                           multiple
                                           @change="change1"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in size"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="title">添加颜色：</div>
                        <div class="color">
                            <input type="text" v-model="form1.color[0]">
                            <input type="text" v-model="form1.color[1]">
                            <input type="text" v-model="form1.color[2]">
                            <input type="text" v-model="form1.color[3]">
                            <input type="text" v-model="form1.color[4]">
                        </div>
                    </li>
                    <li>
                        <div class="title">商品名称：</div>
                        <input name="" v-model="form1.text"></input>
                    </li>
                    <li>
                        <div class="img">
                            <div> 详情图URL：</div>
                            <input type="text" v-model="form1.img[0]">
                            <input type="text" v-model="form1.img[1]">
                            <input type="text" v-model="form1.img[2]">
                        </div>
                    </li>
                    <li>
                        <div class="title">旧价格：
                            <input type="text" v-model="form1.passprice"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                    <li>
                        <div class="title">现价格：
                            <input type="text" v-model="form1.price"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                    <li>
                        <div class="title">库存量：
                            <input type="text" v-model="form1.num"
                                   style="width: 100px"
                            >
                        </div>
                    </li>
                </ul>
                <el-button type="success" class="finish"
                           @click="finish1"
                >上架商品
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {goods, goodsAdd,del,update} from "../api/index";

    export default {
        name: "Allgoods",
        data() {
            return {
                dispaly: false,
                disEdit: false,
                input1:'',
                tableData: [],
                form: {
                    title:'',
                    text: '',
                    img: [],
                    price: '',
                    passprice: '',
                    num: '',
                    size: [],
                    color:[],
                    types:''
                },
                form1: {
                    title:'',
                    text: '',
                    img: [],
                    price: '',
                    passprice: '',
                    num: '',
                    size: [],
                    color:[],
                    types:''
                },
                options: [{
                    label: '新品上市'
                }, {
                    label: '热销推荐'
                }],

                size: ['X','XL','XXL','M','L','S'],
                types:['T桖','连衣裙','半身裙','短裤','牛仔裤','休闲裤','外套','衬衫'],
                value: '',
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: [],

            }
        },
        methods: {
            change(data){
                this.form.title = data
                this.form1.title = data
            },
            change1(data){
                console.log(data);
                this.form.size = data
                this.form1.size = data
            },
            change2(data){
                console.log(data);
                this.form.types = data
                this.form1.types = data
            },
            add() {
                this.dispaly = true
            },
            close() {
                this.dispaly = false;
                this.disEdit = false;
            },
            re(){
                goods().then((res) => {
                    // console.log(res.data);
                    this.tableData = res.data
                })
            },
            finish() {
                var obj = this.form;
                goodsAdd(obj).then((res) => {
                    this.tableData.push(res.data)
                })
                    .catch((err)=>{
                        console.log(err)
                    });
                // console.log(obj)

                this.dispaly = false;

            },
            deleteFn(i) {
                del(i).then((res) => {
                    // console.log()
                    this.re()
                });
            },
            edit(i) {
                console.log(i);
                this.value3 = i.title;
                this.value4 = i.types;
                this.value5 = i.size;
                this.disEdit = true;
                this.form1 = i;
                update(i).then((res) => {
                    // console.log()
                });
            },
            finish1() {
                var obj = this.form1;
                update(obj).then((res) => {
                    // console.log()
                });
                // console.log(obj)
                this.disEdit = false;
            },
            indexMethod(index) {
                return index * 1 + 1;
            }

        },
        created() {
            goods().then((res) => {
                // console.log(res.data);
                this.tableData = res.data
            })
        },
        computed: {
            sum() {
                return this.tableData.length
            },
            //搜索功能
            search(){
                if (!this.input1){
                    return this.tableData
                }
                return this.tableData.filter(item=>{
                    return item.text.includes(this.input1)
                })
            }
        }
    }
</script>

<style scoped>


    .header {
        height: 100px;
    }

    .header input{
        background: #eee;
        height: 50px;
        border: none;
        width: 95%;
        padding: 0 10px;
        font-size: 16px;
    }
    .add {
        text-align: left;
        margin: 10px 0 0 20px;
    }

    * {
        font-size: 20px;
        font-weight: inherit;
    }

    table {
        margin-top: 30px;
        border-collapse: collapse;

    }
    thead th {
        /*padding: 0 30px;*/
        border: 1px solid #eee;

    }

    img {
        width: 80px;
        height: 80px;
        border: none;
    }

    tr td {
        width: 200px;
        padding: 0 5px;
        font-size: 15px;
        word-break: normal;
        border: 1px solid #eee;

    }

    .pass {
        color: #AAAAAA;
        text-decoration: line-through;
        font-size: 15px;
    }

    .footer, .edit {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .addgoods {
        width: 90%;
        height: 90%;
        background: #eee;
        margin: 10PX auto;
        text-align: left;
        padding-top: 10px;
    }

    .close {
        font-weight: bold;
        float: right;
        margin-right: 10px;
        font-size: 30px;
        border-radius: 50%;
        color: #f00;
        display: block;
        width: 40px;
        height: 40px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
    }

    .addgoods ul {
        margin-left: 20px;
    }

    .addgoods ul li {
        margin-top: 20px;
    }

    .addgoods ul li input {
        background: #fff;
        border: none;
        height: 30px;
        width: 60%;
        padding: 0 5px;
    }
    .size,.color{
        width: 300px;
        /*float: left;*/
    }
    .size input,.color input {
        margin-top: 10px;

    }
    .img input{
        margin-top: 10px;
    }

    .finish {
        position: absolute;
        bottom: 200px;
        right: 600px;
    }

</style>
<style>
    .select input{
        height: 40px;
        width: 500px;
        background: #fff;
        font-size: 12px;
    }
</style>