<template>
    <div>
        <fa-checkbox
            :value="1"
            :trueValue="1"
            :falseValue="0"
            @on-change="checkboxChange">
            开
        </fa-checkbox>
        <fa-checkbox
            :value="0"
            :trueValue="1"
            :falseValue="0"
            @on-change="checkboxChange">
            关
        </fa-checkbox>

        <h3>组合多选框组件——CheckboxGroup & Checkbox</h3>

        <fa-checkbox v-model="single">单独选项</fa-checkbox>

        <br>
        数据：{{ single }}

        <br><br>

        <fa-checkbox-group v-model="multiple">
            <fa-checkbox label="option1">选项 1</fa-checkbox>
            <fa-checkbox label="option2">选项 2</fa-checkbox>
            <fa-checkbox label="option3">选项 3</fa-checkbox>
            <fa-checkbox label="option4">选项 4</fa-checkbox>
        </fa-checkbox-group>

        <br>
        数据：{{ multiple }}
    </div>
</template>
<script>
    import faCheckbox from 'components/checkbox/checkbox.vue';
    import faCheckboxGroup from 'components/checkbox/checkbox-group.vue';
    export default {
        components: {
            faCheckbox,
            faCheckboxGroup
        },
        data() {
            return {
                single: false,
                multiple: ['option1']
            }
        },
        methods: {
            checkboxChange(val) {
                console.log(val, '11');
            }
        }
    }
</script>
