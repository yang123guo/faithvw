/**
 * @file: action
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-25 00:00:31
 * @LastEditTime: 2019-04-25 00:00:31
 */

import {
	GET_USERINFO
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
        if(state.userInfo.userId) {
            return;
        }
		const res = {
            userId: 'zhangzhenyong',
            nickName: '张振勇'
        };
		commit(GET_USERINFO, res)
	}
}
