<!-- a.vue -->
<template>
    <div>
        组件 C
    </div>
</template>
<script>
    export default {
        mounted () {
            console.log('C组件创建了'); },
        beforeDestroy () {
            console.log('C组件销毁了');
        }
    }
</script>
