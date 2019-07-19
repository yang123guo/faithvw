<template>
    <fa-tree
        :showCheckbox="showCheckbox"
        :data="data"
    ></fa-tree>
</template>
<script>
import faTree from 'components/tree/tree.vue';
export default {
    data() {
        return {
            showCheckbox: true,
            data: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {

    },
    computed: {

    },
    components: {
        faTree
    }
}
</script>
