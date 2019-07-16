<template>
    <div ref="display"></div>
</template>
<script>
    import Vue from 'vue';
    import { getRandomStr } from 'utils';
    export default {
        props: {
            code: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                html: '',
                js: '',
                css: '',
                component: null,
                id: getRandomStr()
            }
        },
        methods: {
            // 父级传递 code 后，将其分割
            // 使用正则，基于 <> 和 </> 的特性进行分割:
            getSource (source, type) {
                const regex = new RegExp(`<${type}[^>]*>`);
                let openingTag = source.match(regex);
                if (!openingTag) {
                    return '';
                } else {
                    openingTag = openingTag[0];
                }
                return source.slice(source.indexOf(openingTag) + openingTag.length,
                    source.lastIndexOf(`</${type}>`));
            },

            // 分别获取template script 和 style
            splitCode () {
                const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
                const style = this.getSource(this.code, 'style');
                const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';
                this.js = script;
                this.css = style;
                this.html = template;
            },

            renderCode() {
                this.splitCode();
                if (this.html !== '' && this.js !== '') {
                    // 把script标签东西通过 new Function转为函数并执行，变为了对象object
                    const parseStrToFunc = new Function(this.js)();
                    parseStrToFunc.template =  this.html;
                    const Component = Vue.extend( parseStrToFunc );
                    this.component = new Component().$mount();
                    this.$refs.display.appendChild(this.component.$el);

                    if(this.css !== '') {
                        const style = document.createElement('style');
                        style.type = 'text/css';
                        style.id = this.id;
                        style.innerHTML = this.css;
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }
                }
            },

            //  Display 组件销毁
            destroyCode() {
                // 获取对应id的style标签
                const $target = document.getElementById(this.id);
                // dom中移出style文件
                if ($target) $target.parentNode.removeChild($target);

                // 移出display中的生成dom
                //
                if (this.component) {
                    this.$refs.display.removeChild(this.component.$el);
                    this.component.$destroy();
                    this.component = null;
                }
            }
        },
        watch: {
            // 当 this.code 更新时，整个过程要重新来一次
            code() {
                // 删除旧的
                this.destroyCode();
                // 渲染新的
                this.renderCode();
            }
        },
        mounted () {
            this.renderCode();
        },
        beforeDestroy () {
            this.destroyCode();
        }
    }
</script>
