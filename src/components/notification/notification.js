import Vue from 'vue';
import Notification from './index.vue';

Notification.newInstance = properities => {
    const props = properities || {};
    const Instance = new Vue({
        data: props,
        // render函数有个h参数，代表的是createElement方法
        render(h) {
            // 类似react， 组件 + 属性选项
            return h(Notification, {
                props
            })
        }
    });

    // 插入到body中
    const component = Instance.$mount();
    document.body.appendChild(component.$el);

    // 获取组件实例，就能获取实例下面的方法。
    const notice = Instance.$children[0];

    return {
        add(props) {
            notice.add(props);
        },
        remove(name) {
            notice.remove(name);
        }
    }
};

export default Notification;
