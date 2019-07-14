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
        updateModel(flag) {
            // 取得子元素集合
            this.childrens = findComponentsDownward(this, 'faCheckbox');
            if(this.childrens) {
                // 当前选中值
                const {
                    value
                } = this;
                this.childrens.forEach(child => {
                    child.model = value;

                    // update是开关
                    if (flag) {
                        // 每个子组件的值的：value数组中有这个值为true，否则false
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true;
                    }
                });
            }
        }
    }
}
</script>
