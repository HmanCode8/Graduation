import axios from 'axios'
import {Toast} from 'vant'

export function ajax(reqObj) {

    //定义一个默认参数
    const defaltReq = {
        showLoad:true,//请求是否显示loading框
        loadingText:'加载中',//加载文本
        isErrorToast:true,//是否toast异常
        method:'post',
        url:'',
        params:{}
    };

    //扩展运算符进行对象拼接
    reqObj = { ...defaltReq, ...reqObj};

    //意思是请求数据失败要求做的事情
    if (reqObj.showLoad){ //如果showLoad为true就让组件Toast显示
        Toast.loading({
            message:reqObj.loadingText,
            forbidClick:true,
            duration:0,
            loadingType: 'spinner'
        })
    };

    //否则就是请求数据成功返回axios函数
    return axios({    //axios接收三个参数
        method: reqObj.method,//请求方法，例如：post，get
        url:reqObj.url,   //请求地址
        data:reqObj.params  //提交的数据
    }).then(res =>{
        //成功后的方法
        if (reqObj.showLoad) Toast.clear() //清楚Toast组件提示
        // const hasData = res && res.data && typeof res.data ==='object'
        // if (hasData){
            return Promise.resolve(res) //返回成功后的数据
        // }else{
        //     return Promise.reject(res.data)
        // }
    }).catch(err =>{
        //失败后的方法
        if (reqObj.showLoad) Toast.clear();
        if (reqObj.isErrorToast) Toast(err.msg ? err.msg : '请求发生异常');
            return Promise.reject(err)
    })
}
