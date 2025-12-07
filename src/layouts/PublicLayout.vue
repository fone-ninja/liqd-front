<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const languages = ref([
  {
    id: "en",
    img: "https://app.tcr.finance/img/language_flags/EN.svg",
  },
  {
    id: "pt",
    img: "https://app.tcr.finance/img/language_flags/pt-BR.svg",
  },
  {
    id: "es",
    img: "https://app.tcr.finance/img/language_flags/ES.svg",
  },
]);

const changeLanguage = (lang: string) => {
  locale.value = lang;
  if (typeof window !== "undefined") localStorage.setItem("locale", lang);
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="w-full">
      <header class="py-6 px-8 flex justify-end items-center w-full gap-4">
        <img
          v-for="language in languages"
          :key="language.id"
          :src="language.img"
          :alt="language.label"
          class="cursor-pointer w-4 h-4"
          @click="changeLanguage(language.id)"
        />
      </header>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
