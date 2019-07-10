<template>
    <form>
        <slot>

        </slot>
    </form>
</template>
<script>
export default {
    name: 'faForm',
    // 上面传递两个参数
    props: {
        model: { // 数据源
            type: Object
        },
        rules: { // 校验规则
            type: Object
        }
    },
    methods: {

    },
}
</script>
<style lang="less">
    @import "./index.less";
</style>


