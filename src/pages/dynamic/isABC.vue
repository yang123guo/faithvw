<template>
    <div>
        <button @click="handleChange('A')">显示 A 组件</button>
        <button @click="handleChange('B')">显示 B 组件</button>
        <button @click="handleChange('C')">显示 C 组件</button>
        <component :is="component"></component>
    </div>
</template>
<script>
import componentA from './a.vue';
import componentB from './b.vue';
import componentC from './c.vue';
export default {
    data () {
        return {
            component: componentA
        }
    },
    methods: {
        handleChange (component) {
            if (component === 'A') {
                this.component = componentA;
            } else if (component === 'B') {
                this.component = componentB;
            } else if (component === 'C') {
                this.component = componentC;
            }
        }
    }
}
</script>
