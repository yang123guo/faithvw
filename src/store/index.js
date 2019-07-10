/**
 * @file: Vuex实例化
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-25 00:00:31
 * @LastEditTime: 2019-04-25 00:00:31
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	token: '',
    userInfo: {}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
