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
            <!--
                复选框区域
                多选框直接使用了Checkbox 组件(单用模式)，
                这里将 prop: value 和事件 @input 分开绑定，没有使用 v-model 语法糖（input处理额外动作）。
                value 绑定的数据 data.checked 表示当前节点是否选中，
                在点击多选框时， handleCheck 方法会修改 data.checked 数据
            -->
            <fa-checkbox
                v-if="showCheckbox"
                @input="handleCheck"
                :value="data.checked">
            </fa-checkbox>
            <!-- 文字渲染区域 -->
            <span>{{ data.title }}</span>

            <!--
                1、自己作为组件被调用 成为上面li的子区域
                2、有没有下级 只看expand是否为true吗？不看children属性，还是同等地位的？？
                3、和在tree中使用一样，就是多了v-if的条件
                4、同一级：v-for 的优先级高于 v-if，template使得v-if高一级
                5、终结递归的条件，就是 v-for="(item, index) in data.children"，
                   当 data.children 不存 在或为空数组时，自然就不会继续渲染子节点，递归也就停止了
                6、v-if="data.expand" 并不是递归组件的终结条件，用处是判断当前节点的子节点是否展开(渲染)，
                   如果当前节点不展开，那它所有的子节点也就不 会展开(渲染)。
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
    import { findComponentUpward } from 'utils/assist.js';
    export default {
        // 自调用的话，name相当于 components注册组件功能
        name: 'TreeNode',
        data() {
            return {
                // 上层的Tree组件，不用 $parent，防止递归产生跨级等副作用
                tree: findComponentUpward(this, 'Tree')
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
                // 给对象里面的键设置值  取反
                // this.data，是一个 props，它 是通过上一级传递的
                // cloneData 里的节点数据，是不一定含有 expand 或 checked 字段的，
                // 如果不含有，直接通过 this.data.expand 修改，这个 expand 就不是可响应的数据
                // Vue.js 是无法追踪到它的变化，视图自然不会更新
                // 而 $set 的用法就是对可响应对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
                this.$set(this.data, 'expand', !this.data.expand);

                // 如果找到上层的Tree组件，执行Tree组件的emitEvent方法
                // TODO: 借鉴。
                if(this.tree) {
                    this.tree.emitEvent('on-toggle-expand', this.data);
                }
            },
            handleCheck(checked) {
                // 当前组件 下面的所有子节点都会被选中/取消
                this.updateTreeDown(this.data, checked);

                if(this.tree) {
                    this.tree.emitEvent('on-check-change', this.data);
                }
            },

            // 子组件的操作
            updateTreeDown(data, checked) {
                this.$set(data, 'checked', checked);

                if(data.children && data.children.length) {
                    data.children.forEach(item => {
                        this.updateTreeDown(item, checked)
                    })
                }
            }
        },
        watch: {
            'data.children': {
                handler(data) {
                    if(data) {
                        // some有一个为true即为true
                        // 有一个checked为false 那么为data.some为true，取反为false
                        // 即：有一个checked为false，checkedAll结果为false
                        // 直接用every多简单。
                        const checkedAll = !data.some(item => !item.checked);
                        this.$set(this.data, 'checked', checkedAll);
                    }
                },
                deep: true
            }
        }
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
