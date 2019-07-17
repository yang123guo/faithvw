<!-- a.vue -->
<template>
    <div>
        组件 A
    </div>
</template>
<script>
    export default {
        mounted () {
            console.log('A组件创建了'); },
        beforeDestroy () {
            console.log('A组件销毁了');
        }
    }
</script>
