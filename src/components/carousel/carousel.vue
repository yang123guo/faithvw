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
            <!-- 当前高亮条件： currentIndex 等于 此个item所在的index -->
            <li :class="[n - 1 === currentIndex ? 'dot-active' : '']"
                v-for="n in slides.length"
                :key="n"
                @click="dotsEvent('click', n - 1)"
                @mouseover="dotsEvent('hover', n - 1)">
                <button type="button" :class="[radiusDot ? 'radius' : '']"></button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slides: []
        };
    },
    computed: {

    },
    props: {
        radiusDot: {
            type: Boolean,
            dafault: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        autoplaySpeed: {
            type: Number,
            default: 2000
        },
        loop: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        // 发现子元素  通过他就可以知道 子元素的个数 也就是每个item的轮播图
        findChild (cb) {
            const find = function (child) {
                const name = child.$options.componentName;

                // 子组件的名字
                if (name) {
                    cb(child);
                } else if (child.$children.length) {
                    // 没有名字就找子元素  下级，一直找下去
                    child.$children.forEach((innerChild) => {
                        find(innerChild, cb);
                    });
                }
            };

            if (this.slideInstances.length || !this.$children) {
                this.slideInstances.forEach((child) => {
                    find(child);
                });
            } else {
                this.$children.forEach((child) => {
                    find(child);
                });
            }
        },
        arrowEvent() {

        },
        updateSlides() {

        }
    },
    mounted() {
        // 更新轮播图
        this.updateSlides(true);
        this.handleResize();
        // 自动播放
        this.setAutoplay();
    },
    components: {},
    watch: {},
}
</script>
<style lang='less'>
    @import "./index.less";
</style>
