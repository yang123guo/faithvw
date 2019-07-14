<template>
    <label>
        <span>
            <!-- 单选组 -->
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change">

            <!-- 单个单选 -->
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change">

            <!-- 文字内容 -->
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import Emitter from 'mixins/emitter.js';
    import { findComponentUpward } from 'utils/assist.js';
    export default {
        name: 'faCheckbox',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            // 能跟form结合的组件，value都是通过props引入的。
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            label: {
                    type: [String, Number, Boolean]
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            }
        },
        data () {
            return {
                // currentValue 仍然是布尔值(true / false)，因为它是组件 Checkbox 自己使用的，
                // 对于使用者无需关 心，而 value 可以是 String、Number 或 Boolean，
                // 这取决于 trueValue 和 falseValue 的定义。
                currentValue: this.value,
                model: [],
                group: false,
                parent: null
            };
        },
        methods: {
            /**
             * 因为 value 被定义为 prop，它只能由父级修改，本身是不能修改的，
             * 在 <input> 触发 change 事件，也就是 点击选择时，
             * 不能由 Checkbox 来修改这个 value，
             * 所以我们在 data 里定义了一个 currentValue，
             * 并把它绑 定在 <input :checked="currentValue">，
             * 这样就可以在 Checkbox 内修改 currentValue。
             *
             * *****这是自定义组件使 用 v-model 的“惯用伎俩”******。
             */
            change (event) {
                if (this.disabled) {
                    return false;
                }
                const checked = event.target.checked;
                // this.currentValue 永远是true.false  value自由
                this.currentValue = checked;
                const value = checked ? this.trueValue : this.falseValue;

                // 主动操作向外派发
                this.$emit('input', value);

                if(this.group) {
                    this.parent.change(this.model);
                } else {
                    this.$emit('on-change', value);
                    // 支持表单form
                    this.dispatch('faFormItem', 'on-form-change', value);
                }
            },

            updateModel () {
                this.currentValue = this.value === this.trueValue;
            }
        },
        mounted() {
            this.parent = findComponentUpward(this, 'faCheckboxGroup');
            if (this.parent) {
                this.group = true;
            }

            // 如果是group，那么执行父组件的updateModel
            // 否则执行本身的updateModel
            // 目的是：计算当前value
            if (this.group) {
                this.parent.updateModel(true);
            } else {
                this.updateModel();
            }
        },
        watch: {
            // 使用者手动修 改了 prop value ，
            // Checkbox 需要作出相应的变化
            // 对 prop value 使用 watch 进行了监听，当父级修改它时，
            // 会调用 updateModel 方法，同步修改内部的 currentValue 。
            value(val) {
                if (val === this.trueValue || val === this.falseValue) {
                    this.updateModel();
                } else {
                    throw 'Value should be trueValue or falseValue.';
                }
            }
        }
    }
</script>
