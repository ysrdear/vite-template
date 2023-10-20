import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "jy-element-plus";
import { AgHeader } from 'agate-ui';
import "jy-element-plus/dist/index.css";
import "agate-ui/dist/style.css"
import "agate-icon/dist/iconFont.css"
import "@/assets/base.scss";
import { createPinia } from 'pinia'

import zhCN from 'jy-element-plus/es/locale/lang/zh-cn';

const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
};

const app = createApp(App);
app.use(createPinia()).use(router).use(ElementPlus,  { locale: zhCN }).use(AgHeader).mount("#app");

