/**
 * @file: mutation
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-25 00:00:31
 * @LastEditTime: 2019-04-25 00:00:31
 */


import * as TYPE from './mutation-types.js';

export default {
	// 记录当前用户信息
	[TYPE.GET_USERINFO](state, {
		userInfo
	}) {
		state.userInfo = {
            ...userInfo
        };
	},
}
