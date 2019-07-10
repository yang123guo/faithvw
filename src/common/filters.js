/**
 * @file: 过滤器方法
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-23 18:49:43
 * @LastEditTime: 2019-04-23 18:49:43
 */


import CONST from "./constant";

export default {
    dayFormat : c =>  c.slice(0, 10),
    timeFormat : c => c.slice(-8, -3),
    jsonFormat : val => {
        try {
            return JSON.parse(val)
        }catch (e) {
            return e;
        }
    }
}
