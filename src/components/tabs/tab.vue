<template>
    <div class="">
        <div :class="getClass(item)"
            v-for="(item, index) in tabList"
            :key="item.name || index"
            @click="handleChange(index)">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeKey: ''
        }
    },
    props: {
        tabList: {
            type: Array,
            default: [],
            required: true
        }
    },
    methods: {
        getClass(item) {
            return [
                    'fa-tab',
                    {
                        'fa-tab-disabled': item.disabled,
                        'fa-tab-active': item.name === this.activeKey
                    }
                ];
        },
        handleChange(index) {
            const nav = this.tabList[index];
             // 当时禁选 那么return
            if (nav.disabled) return;

            // 把当前nav（根据TabPane求得）的name作为当前选中
            this.activeKey = nav.name;
            this.$emit('input', nav.name);
            this.$emit('on-click', nav.name);
        }
    },
}
</script>
<style lang="less">
    @import './tab.less';
</style>

