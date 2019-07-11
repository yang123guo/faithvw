function broadcast(componentName, eventName, params) {
    // 注意this的使用,它的所有只实例 Array<Vue instance> 只读的
    this.$children.forEach(child => {
        // 实例.$option.属性 求得组件实例下面的属性
        const name = child.$option.name;
        // apply里面的child组件就指代着上面的this。
        if(name === componentName) { // 如果是目标组件
            // 组件调用$emit方法，等待被监听调用
            child.$emit.apply(child, [eventName].concat(params));
        } else { // 如果不是目标组件，继续递归调用
            broadcast.apply(child, [componentName, eventName].concat(params))
        }
    });
};
export default {
    methods: {
        broadcast() {
            broadcast.call(this, componentName, eventName, params);
        },
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            // 有上级或者根  但名称不对的 再往上找一层然后取名称
            while(parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        }
    }
};
