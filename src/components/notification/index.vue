<template>
    <div class="fa-notification-wrap">
        <div class="fa-notification-main"
            v-for="item in notices"
            :key="item.name">
            <div class="fa-notification-content">
                {{ item.content }}
            </div>
            <a class="fa-notification-close" @click="close(item)" v-if="item.closable">
                <i>X</i>
            </a>
        </div>
    </div>
</template>
<script>

let seed = 0;

function getUid() {
    return `notification_${seed++}`;
}

export default {
    data () {
        return {
            notices: []
        }
    },
    methods: {
        add(notice) {
            // 给notice混入一个不重复的名字
            const name = getUid();
            const _notice = {
                name,
                ...notice
            };

            // 加入notice
            this.notices.push(_notice);

            // 到一定时间自动移除
            const duration = notice.duration;
            this.closeTimer = setTimeout(() => {
                this.remove(name);
            }, duration * 1000);
            console.log(this.closeTimer, '定时器', name, notice.content);
        },

        // 根据name删除列表中的notice，删除的是内容，不是这个实例。
        remove(name) {
            const notices = this.notices;
            for(let i = 0; i < notices.length; i++) {
                if(notices[i].name === name) {
                    this.notices.splice(i, 1);
                    break;
                }
            }
        },

        // 清除关闭定时器
        clearCloseTimer () {
            if (this.closeTimer) {
                // 这里应该建立个数组存放 this.closeTimer  否则操作的是最后一个
                // 如果有定时器，那么清除，并释放资源。
                clearTimeout(this.closeTimer);
                this.closeTimer = null;
            }
        },

        // 点击关闭按钮
        close(item) {
            console.log('tag', item, this.closeTimer, item.content)
            // 执行清除关闭的定时器
            this.clearCloseTimer();
            this.remove(item.name);
        }
    },

    beforeDestroy () {
        this.clearCloseTimer();
    }
}
</script>
<style lang="less">
    @import "./index.less";
</style>


