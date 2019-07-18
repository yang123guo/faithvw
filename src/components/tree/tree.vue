<!-- src/components/tree/tree.vue -->
<template>
    <div>
        <!--
            tree-node接收两个参数：
            1、是否显示复选框
            2、每个组件数据data
        -->
        <tree-node
            v-for="(item, index) in cloneData"
            :key="index"
            :data="item"
            :show-checkbox="showCheckbox">
        </tree-node>
    </div>
</template>
<script>
import TreeNode from './node.vue';
import { deepCopy } from 'utils/assist.js';
export default {
    name: 'Tree',
    components: { TreeNode },
    props: {
        data: {
            type: Array,
            default () {
                return [];
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            cloneData: []
        }
    },
    created () {
        this.rebuildData();
    },
    watch: {
        data () {
            this.rebuildData();
        }
    },
    methods: {
        // 深克隆一份数据
        rebuildData () {
            this.cloneData = deepCopy(this.data);
        },
        // 父组件的事件  留给子组件调用（ 参数是父组件的数据，也就是树的全部数据 ）
        emitEvent (eventName, data) {
            this.$emit(eventName, data, this.cloneData);
        }
    }
}
</script>
