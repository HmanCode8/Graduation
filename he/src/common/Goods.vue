<template>
    <div class="goods">

    </div>
</template>

<script>
    import {goods,goods1} from "../api/index";

    export default {
        name: "Goods",
        data(){
            return {
                goodsData:[],
                input:'',
                data:[
                    {
                        type:'综合',
                        data1:[
                            {
                                img:'http://img2.imgtn.bdimg.com/it/u=686005299,1959899093&fm=11&gp=0.jpg',
                                text:'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price:'200',
                                passprice:'￥500',
                                num:'65',
                            },
                            {
                                img:'http://img2.imgtn.bdimg.com/it/u=4235669055,4218756027&fm=26&gp=0.jpg',
                                text:'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price:'402',
                                num:'31',
                            }
                        ]

                    },
                    {
                        type:'销量',
                        data1:[
                            {
                                img:'http://img2.imgtn.bdimg.com/it/u=4235669055,4218756027&fm=26&gp=0.jpg',
                                text:'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price:'402',
                                passprice:'￥500',
                                num:'321',
                            }
                        ]

                    },
                    {
                        type:'价格',
                        data1:[
                            {
                                img:'http://img3.imgtn.bdimg.com/it/u=1562479805,832204414&fm=11&gp=0.jpg',
                                text:'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price:'350',
                                num:'22',
                            },
                            {
                                img:'http://img2.imgtn.bdimg.com/it/u=686005299,1959899093&fm=11&gp=0.jpg',
                                text:'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price:'200',
                                passprice:'￥500',
                                num:'65',
                            },
                            {
                                img: 'http://img2.imgtn.bdimg.com/it/u=4235669055,4218756027&fm=26&gp=0.jpg',
                                text: 'Vero Moda2018冬季新款假两件式系扣翻领大衣外套女',
                                price: '402',
                            }

                        ]

                    }
                ],
            }
        },
        created() {
            goods().then((res) => {
                    // console.log(res.data);
                    this.goodsData = res.data;
                    goods1.then(res => {
                            this.goodsData1 = res.data;
                            var arr = this.goodsData.concat(this.goodsData1);
                          this.goodsData = arr
                        });
                });
        },
        computed:{
            search(){

            }
        },
        methods:{
            fnAdd(){
                // alert(111)
            }
        }
    }
</script>

<style scoped>

</style>