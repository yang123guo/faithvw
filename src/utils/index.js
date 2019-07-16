

/**
 * @method   类型检测
 * @author   add by yangguoqiang01
 * @param
 *     type     {String}           原型链上的包装类字符串形式
 *     param    {Any}              校验目标
 * @return   {boolean}             返回true/false
 * @demo     checkType('String', 'xxxxxx')
 */
export function checkType(type, param) {
    const typeList = ['String', 'Number', 'Array', 'Object', 'Boolean', 'Undefined', 'Function', 'Date', 'Null'];
    let isType = typeList.includes(type);
    if (isType) {
        return Object.prototype.toString.call(param).slice(8, -1) === type;
    }
    console.warn(`第一个参数须为${String(typeList)}中其一`)
    return false
}

/**
 * @method   判断是否是无效值
 * @author   add by yangguoqiang01
 * @param
 *     origin    {Any}              校验目标
 * @return     {boolean}            返回true/false
 * @demo       isNull('')
 */
export function isNull(origin) {
    return (origin === '' || origin === null || origin === void 0);
}

/**
 * @method   格式化时间
 * @author   add by yangguoqiang01
 * @param
 *     time    {Date/String}        时间对象
 *     fmt      {String}            字符串格式
 *     type    {Null/stamp}         转化时间
 * @return     {boolean}            返回时间的对应格式的字符串
 * @demo       formatTime(1556080329608, 'yyyy-MM-dd hh:mm', 'stamp')
 */
export function formatTime(time, fmt, type) {
    if (type == 'stamp') {
        time = new Date(+time);
    }
    let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        S: time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    return fmt;
}

/**
 * @method   给url后面补时间戳
 * @author   add by yangguoqiang01
 * @param    {String}     url     传入的url字符串
 * @return   {String}             返回编译后的url字符串
 */
export function getTimeStamp(url) {
    const timeStr = `timestamp=${Date.now()}`;
    return `${/\?/.test(url) ? '&' : '?'}${timeStr}`;
}

export function transPrecision(origin, opr = 'large', num = 2) {
    if (isNull(origin)) {
        return null;
    }
    const mount = Math.pow(10, num);
    return opr === 'large' ? Number((origin * mount).toFixed(2)) : Number((origin / mount).toFixed(2));
}


// 生成随机字符串
export function getRandomStr(len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}
