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
                    name: 'yang'
                },
                {
                    name: 'faith'
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

