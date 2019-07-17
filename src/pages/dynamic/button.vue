<!-- button.vue -->
<template>
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
        tagName () {
            return this.to === '' ? 'button' : 'a';
        },
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
