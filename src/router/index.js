/**
 * @file: 路由生成工具
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-24 15:35:48
 * @LastEditTime: 2019-04-24 15:35:48
 */



import Vue from 'vue';
import Router from 'vue-router';
const HelloWorld = r => require.ensure(
	[],
	() => r(require('pages/hello/HelloWorld')),
	'hello'
);
const Notification = r => require.ensure(
	[],
	() => r(require('components/notification/index.vue')),
	'hello'
);

Vue.use(Router);



const routes = [
    {
        path: '/hello',
        component: HelloWorld
    },
    {
        path: '/notification',
        component: Notification
    }
]


// 生成路由的配置
export default new Router({
	mode: 'history', // history模式
	routes,
	strict: process.env.NODE_ENV !== 'production',  // 不是生产环境启用strict模式
})
