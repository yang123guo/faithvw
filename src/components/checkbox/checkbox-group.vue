<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import { findComponentsDownward } from 'utils/assist.js';
import Emitter from 'mixins/emitter.js';
export default {
    name: 'faCheckboxGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data() {
        return {
            currentValue: this.value,
            children: []
        };
    },
    methods: {
        /**
         * 通过 findComponentsDownward 方法 找到所有的 Checkbox，
         * 然后把 CheckboxGroup 的 value，
         * 赋值给 Checkbox 的 model，并根据 Checkbox 的 label，
         * 设置一次当前 Checkbox 的选中状态。
         *
         * 这样无论是由内而外选择，或由外向内修改数据，
         * 都是双向 绑定的，而且支持动态增加 Checkbox 的数量。
         */
        updateModel(flag) {
            // 取得子元素集合
            this.childrens = findComponentsDownward(this, 'faCheckbox');
            if(this.childrens) {
                // 当前选中值
                const {
                    value
                } = this;
                this.childrens.forEach(child => {
                    // 把value传递给子组件的model
                    child.model = value;

                    // update是开关
                    if (flag) {
                        // 每个子组件的值的：value数组中有这个值为true，否则false
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true;
                    }
                });
            }
        },
        change(data) {
            this.currentValue = data;
            this.$emit('input', data);
            this.$emit('on-change', data);
            this.dispatch('faFormItem', 'on-form-change', data);
        }
    },
    mounted () {
        this.updateModel(true);
    },
    watch: {
        value () {
            this.updateModel(true);
        }
    }
}
</script>
