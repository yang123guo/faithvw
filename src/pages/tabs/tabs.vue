<template>
    <div class="">
        <fa-tabs :tabList="tabList" />
    </div>
</template>
<script>
import faTabs from 'components/tabs/tab';
export default {
    data() {
        return {
            tabList: [
                {
                    name: 'yang',
                    title: '洋洋哥'
                },
                {
                    name: 'faith',
                    title: '大帅哥'
                }
            ]
        }
    },
    methods: {

    },
    components: {
        faTabs
    }
}
</script>

