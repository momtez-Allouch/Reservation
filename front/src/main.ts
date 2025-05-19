import "./assets/main.css";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import { createPinia } from "pinia";
import InlineSvg from "vue-inline-svg";
import App from "./App.vue";
import router from "./router";
import VueKonva from "vue-konva";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.component("inline-svg", InlineSvg);
app.use(VueKonva);

app.mount("#app");
