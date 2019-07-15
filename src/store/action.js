

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
