/**
 * @file: 入口文件
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-23 17:28:07
 * @LastEditTime: 2019-04-23 17:28:07
 */


import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import filters from './common/filters';
import Alert from 'components/notification/alert';

Vue.config.productionTip = false;

import './assets/css/reset.css';

// 实例化filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 拓展组件，挂接在 Vue.prototype上
Vue.prototype.$Alert = Alert;

// 生成vm实例
const vm = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});

export default vm;
