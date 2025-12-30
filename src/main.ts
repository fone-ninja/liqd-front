import "./assets/main.css";
import "./assets/tailwind.css";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";

import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

const messages = {
  en,
  es,
  pt,
};

const savedLocale =
  typeof window !== "undefined" ? localStorage.getItem("locale") : null;

const i18n = createI18n({
  legacy: false,
  locale: savedLocale || "en",
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(router);
app.use(i18n);
app.use(ToastService);

app.mount("#app");
