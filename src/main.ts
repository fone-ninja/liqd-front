import "./assets/main.css";
import "./assets/tailwind.css";

import { setInitialDateLocal } from "@/utils/date";
import { getInitialLocale } from "@/utils/locale";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

import "dayjs/locale/pt-br";
import "dayjs/locale/en";
import "dayjs/locale/es";

setInitialDateLocal();

const messages = {
  en,
  es,
  pt,
};

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  messages,
});

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ToastService);

app.mount("#app");
