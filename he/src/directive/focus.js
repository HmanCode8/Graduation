import Vue from 'vue'

/** 全局注册*/
Vue.directive('focus',{
    /**
     * 当被绑定元素插入到DOM时 */
    inserted(el) {
        el.focus()
    }
});