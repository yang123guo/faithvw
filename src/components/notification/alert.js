import Notification from './notification.js';
let messageInstance;
function getMessageInstance () {
    // 单例模式，无再创建
    messageInstance = messageInstance || Notification.newInstance();
    return messageInstance;
}
function notice({
    duration = 1.5,
    content = '',
    closable = false
}) {
    let instance = getMessageInstance(); // 结果返回实例
    instance.add({
        content,
        duration,
        closable
    });
}
export default {
    info(options) {
        return notice(options);
    }
}
