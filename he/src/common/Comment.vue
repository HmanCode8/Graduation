<template>
    <div class="comment">
        <ul class="list">
            <li
                v-for="(item,index) in data" :key="index"
            >
                <div class="top">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584108278006&di=3e9e4c376c72ec0526fd9fdb7da21174&imgtype=0&src=http%3A%2F%2Fimage.yy.com%2Fyywebalbumbs2bucket%2F144152f8680f421599233c6ffcfcef49_1476265267104.jpeg"/>
                    <div class="name">{{item.nikname}}</div>
                     <div class="time">{{ item.createdAt |dateFilter}}</div>
                </div>
                <div class="context">
                  {{item.input}}
                </div>
                <div class="type">
                    <span>颜色分类：{{item.color}}</span>
                    <span>尺码：{{item.size}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getcomment} from "../api/index";

    export default {
        name: "Comment",
        data(){
            return{
                data:[],
                name:''
            }
        },
        filters: {
        dateFilter(data) {
            // console.log(data)
            var time = new Date(data);

            function timeAdd0(str) {
                if (str < 10) {
                    str = '0' + str;
                }
                return str
            }
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
        }
    },
        created() {
            // console.log(this.$route.query.id)
            var da = Date.now;
            console.log(da)
            this.name = JSON.parse(window.localStorage.getItem('username'))
           getcomment().then(res=>{
               console.log(res.data);
               
                var arr = []
                res.data.forEach(item=>{
                    if (item.aId==this.$route.query.id){
                        arr.push(item)
                    }
                    this.data = arr
                })
            })
        }
    }
</script>

<style scoped>
    .list li{
        width: 15rem;
        border-bottom: 1px solid #eee;
        margin-top: 0.5rem;
    }
    .list li img{
        width: 1rem;
        height: 1rem;
        border: 1px solid #aaa;
        border-radius: 50%;
        float: left;
        margin-left: 0.5rem;
    }
    .top{
        height: 1rem;
    }
    .name{
        font-size: 0.6rem;
        float: left;
        margin:0.2rem 0 0 0.5rem;
        
    }
    .context{
        margin-left: 0.5rem;
        font-size: 0.5rem;
        margin-top: 0.5rem;
        text-align: left;
    }
    .type{

        font-size: 0.5rem;
        color: #aaa;
        text-align: left;
        margin-top: 0.5rem;
    }
    .type span{
        margin-left: 0.5rem;
    }
    .time{
        font-size: 0.6rem;
        color:#aaa;
        float: right;
        margin-right: 0.5rem;
    }
</style>