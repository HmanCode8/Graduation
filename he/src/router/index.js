import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sort from '../views/Sort.vue'
import Sort1 from '../views/Sort1.vue'
import Car from '../views/Car.vue'
import My from '../views/My.vue'
import Public from '../components/Public'
import User from '../components/User'
import Oderlist from '../components/Oderlist'
import Search from '../components/Search'
import Goodsdetails from '../components/Goodsdetails'
import Collection from '../components/Collection'
import Login from '../components/Login'
import Secret from '../components/Secret'
import Order from '../components/Order'
import OK from '../components/Ok'
import Register from '../components/Register'
import Address from '../components/Address'
import Tocomment from '../components/Tocomment'
import Onadd from '../components/Onadd'
import Editadd from '../components/Editadd'
import Hou from '../views/Hou'
import Hou1 from '../views/Hou1'
import Goods from '../common/Goods'
import Alluser from '../common/Alluser'
import Allgoods from '../common/Allgoods'
import Comment from '../common/Comment'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: '/tocomment',
    name: 'tocomment',
    component: Tocomment
  },
  {
    path: '/sort',
    name: 'sort',
    component: Sort
  },
  {
    path: '/sort1',
    name: 'sort1',
    component: Sort1
  },
  {
    path: '/car',
    name: 'car',
    component: Car,
    meta:{
      onOff:true
    },
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    meta:{
      onOff:true
    },
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/oderlist',
    name: 'oderlist',
    component: Oderlist
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/secret',
    name: 'secret',
    component: Secret
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '/ok',
    name: 'ok',
    component: OK
  },
  {
    path: '/public',
    name: 'public',
    component: Public,
  },
  {
    path: '/goodsdetails',
    name: 'goodsdetails',
    component: Goodsdetails,
    meta:{
      onOff:true
    },
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
  },
  {
    path: '/editadd',
    name: 'editadd',
    component: Editadd,
  },
  {
    path: '/onadd',
    name: 'onadd',
    component: Onadd,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    children:[
      {
        path:'/goods',
        name:'goods',
        component:Goods
      }
    ]
  },
  {
    path: '/hou',
    name: 'hou',
    component: Hou,
  },
  {
    path: '/hou1',
    name: 'hou1',
    component: Hou1,
    // redirect:'alluser',
    meta:{
      serve:true
    },
    children:[
      {
        path:'/alluser',
        name:'alluser',
        component:Alluser
      },
      {
        path:'/allgoods',
        name:'allgoods',
        component:Allgoods
      },

    ]
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
