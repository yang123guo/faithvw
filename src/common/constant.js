/**
 * @file: 全局配置
 * @version: 1.0.0
 * @author: yangguoqiang01
 * @LastEditors: yangguoqiang01
 * @Description:
 * @Date: 2019-04-23 18:50:06
 * @LastEditTime: 2019-04-23 18:50:06
 */


// 把数组转换成对象，value为值，index为数字
const _arrMap = arr => arr.map((value, i) => {
    return {
        value,
        index: i + 1
    }
});

// 把对象转换成 数组
const _objKeyValue = (obj, attr = {}, isNum = true) => {
    let arr = [];
    for (let o in obj) {
        arr.push({
            label: obj[o],
            value: isNum ? +o : o,
            ...attr
        });
    }
    return arr;
};

const CONSTANT = {
    // 促销类型
    PROMOTION_TYPE: {
        101: '秒杀',
        102: '抢购',
        104: '直降',
        110: '度码直降',
        201: '普通满减',
        202: '阶梯满减',
        204: '满额赠',
        205: '买赠',
        111: '加价购'
    },

    // 促销状态
    PROMOTION_STATUS: {
        0: '新建',
        1: '审核通过',
        2: '审核拒绝',
        3: '上线',
        4: '下线',
        5: '审核中'
    },

    // 促销状态类名
    PROMOTION_STATUS_CLASS: {
        0: 'new',
        1: 'resolved',
        2: 'rejected',
        3: 'online',
        4: 'outline',
        5: 'pending'
    },

    // sku状态
    SKU_STATUS: {
        0: '新建',
        1: '在架',
        2: '下架'
    },

    // 销售渠道
    PROMOTION_CHANNEL: {
        1: '小度商场',
        2: '其他渠道'
    },

    // 销售平台
    PROMOTION_PLATFORM: {
        1: 'PC端',
        2: 'M站'
    },

    // 会员等级
    PROMOTION_LEVEL: {
        1: '青铜',
        2: '白银',
        3: '黄金',
        4: '铂金',
        5: '钻石'
    },

};

export default {
    PROMOTION_STATUS: CONSTANT.PROMOTION_STATUS,
    PROMOTION_TYPE: CONSTANT.PROMOTION_TYPE,
    SKU_STATUS: CONSTANT.SKU_STATUS,
    PROMOTION_CHANNEL: CONSTANT.PROMOTION_CHANNEL,
    PROMOTION_PLATFORM: CONSTANT.PROMOTION_PLATFORM,
    PROMOTION_STATUS_CLASS: CONSTANT.PROMOTION_STATUS_CLASS,
    PROMOTION_LEVEL: _objKeyValue(CONSTANT.PROMOTION_LEVEL, { name: 'promotionLevel' }),
};
