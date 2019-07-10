/**
 * @file: 全局请求配置
 * @version: 1.0.0
 * @author: yangguoqiang<yangguoqiang01@baidu.com>;
 * @Date: 2019-04-25 21:25:37
 * @LastEditors: yangguoqiang<yangguoqiang01@baidu.com>
 * @LastEditTime: 2019-04-25 21:25:37
 * @Description:
 * 	1、		管理系统不需要loading动画 后期 TODO:
 *  2、 	全局的baseUrl   TODO
 *
 */

import axios from 'axios';
import vm from 'src/main';
import {
    getTimeStamp
} from './index';

// 默认配置项
const defaultConfig = {
    axios: {
        timeout: 2000,
        baseUrl: ''
    },
    platform: {
        platformId: 0  // 0 代表的是PC端
    },
    codeMessage: {
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
        0: 'Token失效，请重新点击左侧子列表!',
        default: '服务器异常、超时或返回值异常！'
    },
    methodMap: {
        get: true,
        delete: true,
        head: true,
        post: false,
        put: false,
        patch: false,
    }
};

// 创建axios实例
const $ = axios.create({
    ...defaultConfig.axios
});

// 请求拦截器
$.interceptors.request.use(
    config => {
        // TODO: token 商量下后端改成请求头的吧
        // if (store.state.token) {
        //     config.headers.Authorization = `token ${store.state.token}`
        // }
        console.log('这里是请求配置的拦截：', config)
        return config
    },
    err => {
        return Promise.reject(err)
    },
);

// 封装ajax方法公共处理和拦截
export default async({
	url = '',
	data = {},
    timestamp = true,
	method = 'post',
    ...attr
}) => {
	method = String(method).toLowerCase();
    url = url + (timestamp ? getTimeStamp(url) : '');
	let response;
    const param = {
        ...defaultConfig.platform,
        ...data
    };
	try {
        const mixin = {
            [defaultConfig.methodMap[method] ? 'params' : 'data']: param
        };
        response = await $({
            url,
            method,
            ...mixin,
            ...attr
        });
		let {
			data,
			success,
			message,
			code
		} = response ? response.data : {};
		if(success) {
			return data;
		}else {
			switch(code) {
                // TODO: 确认token失效的错误码
				case '1':
					message = defaultConfig.codeMessage[code];
					break;
			}
			vm.$message({
				showClose: true,
				message: message,
				type: 'error'
			});
			return false;
		}
	} catch (err) {
        console.error(err);
		vm.$message({
			showClose: true,
			message: defaultConfig.codeMessage['default'],
			type: 'error'
		});
		return false;
	}
}
