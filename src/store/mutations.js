

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
