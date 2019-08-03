<template>
    <div class="com-affix-wrap">
        <div ref="point" class="com-affix" :style="styles">
            <slot></slot>
        </div>
        <div v-show="slot" :style="slotStyle"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    computed: {

    },
    methods: {

    },
    created() {

    },
    components: {},
    watch: {},
}
</script>
<style lang='less'>
    @import "./index.less";
</style>
