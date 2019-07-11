<template>
    <input
        type="text"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"/>
</template>
<script>
import Emitter from 'mixins/emitter.js';
export default {
    name: 'faInput',
    mixins: [Emitter],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            currentValue: this.value
        }
    },
    methods: {
        handleInput(event) {
            // 为什么用this.currentValue呢？因为多处使用，用全局作用域变量保存
            const value = event.targe.value;
            this.currentValue = value;
            this.$emit('input', value);
            // 向上的FormItem派发on-form-blur事件
            this.$dispatch('faFormItem', 'on-form-change', value);
        },
        handleBlur() {
            // 这里不用在用value来转化了，直接使用this.currentValue
            this.$dispatch('faFormItem', 'on-form-blur', this.currentValue);
        }
    },
    watch: {
        value (val) {
            // 每次改变，取新值
            this.currentValue = val;
        }
    }
}
</script>
