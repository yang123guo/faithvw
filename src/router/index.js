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
const FormTest = r => require.ensure(
	[],
	() => r(require('pages/form/index.vue')),
	'hello'
);
const CheckboxTest = r => require.ensure(
	[],
	() => r(require('pages/checkbox/index.vue')),
	'hello'
);
const IsABC = r => require.ensure(
	[],
	() => r(require('pages/dynamic/isABC.vue')),
	'hello'
);
const useButton = r => require.ensure(
	[],
	() => r(require('pages/dynamic/useButton.vue')),
	'hello'
);
const treeTest = r => require.ensure(
	[],
	() => r(require('pages/tree/tree.vue')),
	'hello'
);
const tabTest = r => require.ensure(
	[],
	() => r(require('pages/tabs/tab.vue')),
	'hello'
);

Vue.use(Router);



const routes = [
    {
        path: '/hello',
        component: HelloWorld
    },
    {
        path: '/form-test',
        component: FormTest
    },
    {
        path: '/checkbox-test',
        component: CheckboxTest
    },
    {
        path: '/use-button',
        component: useButton
    },
    {
        path: '/abc-test',
        component: IsABC
    },
    {
        path: '/tree-test',
        component: treeTest
    },
    {
        path: '/tab-test',
        component: tabTest
    }
]


// 生成路由的配置
export default new Router({
	mode: 'history', // history模式
	routes,
	strict: process.env.NODE_ENV !== 'production',  // 不是生产环境启用strict模式
})
