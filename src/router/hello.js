/**
 * @file: 测试文件
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2018-09-05 11:31:26
 * @LastEditTime: 2019-04-24 15:37:35
 */


const HelloWorld = r => require.ensure(
	[],
	() => r(require('pages/hello/HelloWorld')),
	'hello'
);

export default [
	{
		path: '/hello',
		title: 'HelloWorld',
		name: 'HelloWorld',
		component: HelloWorld
	}
]
