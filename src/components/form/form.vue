<template>
    <form>
        <slot>

        </slot>
    </form>
</template>
<script>
export default {
    name: 'faForm',
    data() {
        return {
            // 所有form-item的数据缓存数组
            fields: []
        }
    },
    // 上面传递两个参数
    props: {
        model: { // 数据源
            type: Object
        },
        rules: { // 校验规则
            type: Object
        }
    },
    provide() {
        return {
            // 整个form组件都注入到下层，键为form
            form : this
        };
    },
    methods: {

    },
    created() {
        //  其中field为子组件实例
        this.$on('on-form-item-add', field => {
            field && this.fields.push(field);
        });
        this.$on('on-form-item-remove', field => {
            if(field.prop)
            this.fields.splice(this.fields.indexOf(field), 1);
        })
    }
}
</script>
<style lang="less">
    @import "./index.less";
</style>


