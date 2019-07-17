<!--
    1. 展开与关闭的按钮(+或-);
    2. 多选框;
    3. 节点标题;
    4. 递归子节点。
-->
<template>
    <!-- 一组ul是tree的一个节点 -->
    <ul class="tree-ul">
        <li class="tree-li">
            <!-- 展开、收回点击区域 -->
            <span class="tree-expand" @click="handleExpand">
                <span v-if="data.children && data.children.length && data.expand">+</span>
                <span v-if="data.children && data.children.length && !data.expand">-</span>
            </span>
            <!-- 复选框区域 -->
            <fa-checkbox
                v-if="showCheckbox"
                @input="handleCheck"
                :value="data.checked">
            </fa-checkbox>
            <!-- 文字渲染区域 -->
            <span>{{ data.title }}</span>

            <!--
                1、自己作为组件被调用 成为上面li的子区域
                2、有没有下级 只看expand是否为true吗？不看children属性？？
                3、和在tree中使用一样，就是多了v-if的条件
                4、同一级：v-for 的优先级高于 v-if，template使得v-if高一级
            -->
            <template v-if="data.expand">
                <tree-node
                    v-for="(item, index) in data.children"
                    :key="index"
                    :data="item"
                    :show-checkbox="showCheckbox">
                </tree-node>
            </template>
        </li>
    </ul>
</template>
<script>
    import faCheckbox from '../checkbox/checkbox';
    export default {
        // 自调用的话，name相当于 components注册组件功能
        name: 'TreeNode',
        data() {
            return {

            }
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {};
                }
            },
            showCheckbox: {
                type: Boolean,
                default: false
            }
        },
        components: {
            faCheckbox
        },
        methods: {
            handleExpand() {

            },
            handleCheck() {

            }
        },
    }
</script>
<style>
    .tree-ul, .tree-li{
        list-style: none;
        padding-left: 10px;
    }
    .tree-expand{
        cursor: pointer;
    }
</style>
