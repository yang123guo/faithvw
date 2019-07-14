<template>
    <div ref="display"></div>
</template>
<script>
    import Vue from 'vue';
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
                component: null
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
                }
            }
        },
        mounted () {
            this.renderCode();
        }
    }
</script>
