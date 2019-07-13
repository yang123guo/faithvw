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
        // 公开方法:全部重置数据 resetFields() {
        resetFields() {
            // this.fields里面存放的是formItem的实例，实例含有resetField方法。
            this.fields.forEach(item => {
                item.resetField();
            })
        },
        // 参数是回调函数，返回值是一个Boolean值。
        validate(callback) {
            const _this = this;
            console.log(this.fields, 'dd')
            return new Promise(resolve => {
                console.log(_this.fields, 'tt')
                let valid = true;
                let count = 0;
                _this.fields.forEach(item => {
                    item.validate('', errors => {
                        if(errors) {
                            valid = false;
                        }
                        // 全部完成
                        if(++count === _this.fields.length) {
                            resolve(valid);
                            if (typeof callback === 'function') {
                                callback(valid);
                            };
                        }
                    })
                })
            })
        }
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


