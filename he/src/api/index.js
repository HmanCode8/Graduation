const API_URL = process.env.VUE_APP_API_URL;
//接口统一管理
var api = 'http://192.168.43.154:3000';
import {ajax} from "./ajax";

//获取所有商品数据
export function goods(params) {
    return ajax({
        method:'get',
        url:`${api}/goods`,
        params
    })
}
export function goodsAdd(params) {
    return ajax({
        method:'post',
        url:`${api}/goods`,
        params
    })
}
//获取收藏商品的数据
export function getcollection(params) {
    return ajax({
        method:'get',
        url:`${api}/collection`,
    })
}

//提交收藏商品数据
export function postcollection(params) {
    return ajax({
        method:'post',
        url:`${api}/collection`,
        params
    })
}

//获取购物车数据
export function getcar(params) {
    return ajax({
        method:'get',
        url:`${api}/car`,
    })
}

//提交购物车数据
export function postcar(params) {
    return ajax({
        method:'post',
        url:`${api}/car`,
        params
    })
}

//获取订单数据
export function getorder(params) {
    return ajax({
        method:'get',
        url:`${api}/order`,
    })
}

//提交订单数据
export function postorder(params) {
    return ajax({
        method:'post',
        url:`${api}/order`,
        params
    })
}

//获取购物车多订单
export function getcarorder(params) {
    return ajax({
        method:'get',
        url:`${api}/carorder`,
    })
}

//提交购物车多订单
export function postcarorder(params) {
    return ajax({
        method:'post',
        url:`${api}/carorder`,
        params
    })
}

//获取地址数据
export function getaddress(params) {
    return ajax({
        method:'get',
        url:`${api}/address`,
    })
}

//提交地址数据
export function postaddress(params) {
    return ajax({
        method:'post',
        url:`${api}/address`,
        params
    })
}

//获取注册数据
export function getregister(params) {
    return ajax({
        method:'get',
        url:`${api}/register`,
    })
}

//提交注册数据
export function postregister(params) {
    return ajax({
        method:'post',
        url:`${api}/register`,
        params
    })
}

//提交登录数据
export function login(params) {
    return ajax({
        method:'post',
        url:`${api}/login`,
        params
    })
}

//提交登录数据
export function admin(params) {
    return ajax({
        method:'post',
        url:`${api}/admin`,
        params
    })
}

//获取评论数据
export function getcomment(params) {
    return ajax({
        method:'get',
        url:`${api}/comment`,
    })
}

//提交评论数据
export function postcomment(params) {
    return ajax({
        method:'post',
        url:`${api}/comment`,
        params
    })
}

//删除数据
export function del(params) {
    return ajax({
        method:'post',
        url:`${api}/delete`,
        params
    })
}
//更新数据
export function update(params) {
    return ajax({
        method:'post',
        url:`${api}/update`,
        params
    })
}

//更新库存
export function count(params) {
    return ajax({
        method:'post',
        url:`${api}/count`,
        params
    })
}
export function carcount(params) {
    return ajax({
        method:'post',
        url:`${api}/carcount`,
        params
    })
}
