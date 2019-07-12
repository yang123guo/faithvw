<template>
    <div>
        <label
            :class="{ 'fa-form-item-label-required': isRequired }"
            v-if="label">{{ label }}
        </label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="fa-form-item-message">
                {{ validateMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import Emitter from 'mixins/emitter.js';
import AsyncValidator from 'async-validator';
export default {
    name: "faFormItem",
    data() {
        return {
            isRequired: false, // 是否为必填
            validateState: '', // 校验状态
            validateMessage: '', // 校验不通过时的提示信息
        }
    },
    props: {
        label: {
            type: String,
            default: ""
        },
        prop: {
            type: String
        }
    },
    computed: {
        fieldValue() {
            // this.form是form提供的 动态获取表单组件对应prop的值
            return this.form.model[this.prop];
        }
    },
    // 上下文中的form为高层级的form组件传递过来的
    mixins: [Emitter],
    inject: ['form'],
    mounted() {
        // 如果有prop传入，需要在form中做个缓存
        // 组件：faForm 事件：on-form-item-add 参数：当前组件实例
        // 需要在form的created生命周期去监听事件
        if(this.prop) {
            this.dispatch('faForm', 'on-form-item-add', this);

            // 设置初始值，以便在重置时恢复默认值
            this.initialValue = this.fieldValue;

            this.setRules();
        }
    },
    beforeDestroy() {
        // 从缓存中移出数据
        this.dispatch('faForm', 'on-form-item-remove', this);
    },
    methods: {
        setRules() {
            let rules = this.getRules();
            if (rules.length) {
                // 如果当前校验规则中有必填项，则标记出来
                this.isRequired = rules.some(rule => rule.required);
            }

            // 监听来自子组件的派发
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        },
        // 重置数据
        resetField () {
            this.validateState = '';
            this.validateMessage = '';
            this.form.model[this.prop] = this.initialValue;
        },

        onFieldChange() {
            // 在formItem中进行change事件的校验
            // *** 数据来源其实都是从上层的form传递下来的 ***
            this.validate('change');
        },
        onFieldBlur() {
            // 在formItem中进行blur的事件校验
            this.validate('blur');
        },
        // 获取此prop下所有相关rule
        getRules() {
            // 没有props，都是通过最上层的form传递下来
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] : [];
            return [].concat(formRules || []);
        },
        // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
        getFilteredRule(trigger) {
            const rules = this.getRules();
            // rule规则的trigger有参数则过滤出来
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        // 校验函数 trigger是 事件名
        validate(trigger, callback = function () {}) {
            // 没有对应trigger不校验，返回true。
            let rules = this.getFilteredRule(trigger);
            if(!rules && rules.length === 0) return true;

            this.validateState = 'validating'; // 校验中

            // 调用async-validator检验
            let descriptor = {};
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);

            // 取得form中的值，放进model中
            let model = {};
            model[this.prop] = this.fieldValue;
            /**
             * 将 validateMessage 通过回调 callback 传递给调用者，
             * 这里的调用者是 onFieldBlur 和onFieldChange，
             * 它们只传入了第一个参数 trigger，
             * callback 并未传入，因此也不会触发回调，
             *
             * 而这个回 调主要是给 Form 用的，
             * 因为 Form 中可以通过提交按钮一次性校验所有的
             * FormItem(后文会介绍)这里 只是表单组件触发事件时，
             * 对当前 FormItem 做校验
             *
             * 除了校验，还可以对当前数据进行重置。
             * 重置是指将表单组件的数据还原到最初绑定的值，
             * 而不是清空，因此需要预先缓存一份初始值。
             */
            validator.validate(model, { firstFields: true }, errors => {
                // 设置了当前的校验状态 validateState 和 校验不通过提示信息 validateMessage(通过值为空);
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage);
            });
        }
    }
};
</script>
<style>
    .fa-form-item-label-required:before {
        content: '*';
        color: red;
    }
    .fa-form-item-message {
        color: red;
    }
</style>
