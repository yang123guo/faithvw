<template>
    <div class="">
        <button type="button" class="arrow left" @click="arrowEvent(-1)">
            <Icon type="ios-arrow-back"></Icon>
        </button>
        <div class="carousel-list">
            <div :class="[prefixCls + '-track', showCopyTrack ? '' : 'higher']" :style="trackStyles" ref="originTrack">
                <slot></slot>
            </div>
            <div :class="[prefixCls + '-track', showCopyTrack ? 'higher' : '']" :style="copyTrackStyles" ref="copyTrack" v-if="loop">
            </div>
        </div>
        <button type="button" class="arrow right" @click="arrowEvent(1)">
            <Icon type="ios-arrow-forward"></Icon>
        </button>
        <ul class="carousel-dots">
            <template v-for="n in slides.length">
                <li :class="[n - 1 === currentIndex ? prefixCls + '-active' : '']"
                    @click="dotsEvent('click', n - 1)"
                    @mouseover="dotsEvent('hover', n - 1)">
                    <button type="button" :class="[radiusDot ? 'radius' : '']"></button>
                </li>
            </template>
        </ul>
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
        arrowEvent() {

        }
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
