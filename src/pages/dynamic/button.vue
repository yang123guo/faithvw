<!-- button.vue -->
<template>

    <!-- component原生组件 有is属性 -->
    <component :is="tagName" v-bind="tagProps">
        <slot></slot>
    </component>
</template>
<script>
export default {
    props: {
        // 链接地址
        to: {
            type: String,
            default: ''
        },
        // 链接打开方式，如 _blank
        target: {
            type: String,
            default: '_self'
        }
    },
    computed: {
        // 没有to 渲染button标签 有to渲染a标签
        tagName () {
            return this.to === '' ? 'button' : 'a';
        },
        // 没有to props为{}  否则关于跳转属性
        tagProps () {
            let props = {};
            if (this.to) {
                props = {
                    target: this.target,
                    href: this.to
                }
            }
            return props;
        }
    }
}
</script>
