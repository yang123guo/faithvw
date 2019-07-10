<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="handleClick">点击测试</button>
    </div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {
			msg: 'Hello World',
            index: 1
		}
	},
	created() {
		console.log(this)
    },
    methods: {
        handleClick() {
            this.index ++
            this.$Alert.info({
                content: `我是提示信息${this.index}`,
                duration: 15,
                closable: true
            });
        }
    }
}
</script>

