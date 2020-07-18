<template>
    <div class="contain">
        <div class="header">
            <div class="title">用户信息</div>
            <div class="add">

                <el-row>
                    <!--<el-button type="success">添加用户</el-button>-->
                    <el-button type="primary">所有用户({{sum}})</el-button>
                </el-row>
            </div>
        </div>
        <div class="con">
            <template>
                <el-main>
                    <el-table :data="tableData" height="600" border>
                        <el-table-column
                                type="index"
                                label="ID"
                                width="100"
                                :index="indexMethod">
                        </el-table-column>
                        <!--<el-table-column prop="createdAt" label="时间戳" width="250">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="_id" label="编号" width="250">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                width="150"
                                label="用户昵称"
                                prop="nikname"
                        >
                        </el-table-column>
                        <el-table-column prop="number" label="手机号码" width="250">
                        </el-table-column>
                        <el-table-column prop="password" label="密码" width="200">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" width="50">
                        </el-table-column>
                        <el-table-column prop="question" label="密保问题" width="250">
                        </el-table-column>
                        <el-table-column prop="answer" label="答案" width="250">
                        </el-table-column>
                        <el-table-column prop="role" label="角色" width="100">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--<el-button-->
                                <!--size="mini"-->
                                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)"
                                >删除
                                </el-button>
                                    <el-button
                                            size="mini"
                                            @click="toUser(scope.$index, scope.row)"
                                    >查看用户信息
                                    </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </template>
        </div>
    </div>
</template>

<script>
    import {getregister,del} from "../api/index";

    export default {
        name: "Contain",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            indexMethod(index) {
                return index * 1 + 101;
            },
            toUser(i, item) {
                console.log(i)
                console.log(item)
                this.$router.push({
                    name:'hou',
                    query:{
                        info:this.$Base64.encode(JSON.stringify({
                            nikname:item.nikname,
                            phone:item.number
                        }))
                    }
                })
            },
            repeat() {
              getregister().then((res) => {
                        // console.log(res.data);
                        // res.data.forEach(item => {
                        //     item.userName = item.number + '@email.com'
                        // });
                        // console.log(res.data)
                        this.tableData = res.data;
                        // console.log(this.tableData._id)
                    })
            },
            handleDelete(i, item) {
                console.log(item);
                var This = this
                del(item).then((res) => {
                        This.repeat()
                    })
            }
        },
        created() {
            getregister().then((res) => {
                    console.log(res.data);
                    // res.data.forEach(item => {
                    //     item.userName = item.number + '@email.com'
                    // });
                    // console.log(res.data)
                    this.tableData = res.data;
                    // console.log(this.tableData._id)
                })
        },
        computed: {
            sum() {
                return this.tableData.length
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 100px;

    }

    .title {
        border-bottom: 1px solid #eee;
    }

    .add {
        text-align: left;
        padding-top: 10px;
        width: 80%;
        margin-left: 20px;
    }
</style>