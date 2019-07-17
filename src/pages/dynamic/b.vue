<!-- a.vue -->
<template>
    <div>
        组件 B
    </div>
</template>
<script>
    export default {
        mounted () {
            console.log('B组件创建了'); },
        beforeDestroy () {
            console.log('B组件销毁了');
        }
    }
</script>
