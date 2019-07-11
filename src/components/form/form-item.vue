<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Emitter from 'mixins/emitter.js';
export default {
    name: "faFormItem",
    data() {
        return {
            validateState: '', // 校验状态
            validateMessage: '', // 校验不通过时的提示信息
        }
    },
    props: {
        label: {
            type: String,
            default: ""
        },
        prop: {
            type: String
        }
    },
    // 上下文中的form为高层级的form组件传递过来的
    mixins: [Emitter],
    inject: ['form'],
    mounted() {
        // 如果有prop传入，需要在form中做个缓存
        // 组件：faForm 事件：on-form-item-add 参数：当前组件实例
        // 需要在form的created生命周期去监听事件
        if(this.prop) {
            this.dispatch('faForm', 'on-form-item-add', this);

            // 监听来自子组件的派发
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }
    },
    beforeDestroy() {
        // 从缓存中移出数据
        this.dispatch('faForm', 'on-form-item-remove', this);
    },
    methods: {
        onFieldChange() {
            // 在formItem中进行change事件的校验
            // *** 数据来源其实都是从上层的form传递下来的 ***
            this.validate('change');
        },
        onFieldBlur() {
            // 在formItem中进行blur的事件校验
            this.validate('blur');
        }
    }
};
</script>
