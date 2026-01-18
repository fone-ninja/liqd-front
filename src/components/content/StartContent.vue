<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Tabbar from "@/components/tabbar/Tabbar.vue";
import Header from "@/components/header/Header.vue";
import { quoteStore } from "@/stores/quoteStore";
import { onMounted, onUnmounted } from "vue";

const quoteData = quoteStore();

let pollingInterval: ReturnType<typeof setInterval> | null = null;

const createQuote = async () => {
  try {
    const data = await quoteData.createQuote({
      base: "usdt",
      quote: "brz",
      amount: 1,
    });
    console.log(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

const getQuote = async () => {
  try {
    const data = await quoteData.getQuote();
    console.log(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

onMounted(() => {
  createQuote();
  pollingInterval = setInterval(() => {
    getQuote();
  }, 12000);
});

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex flex-1 pb-[64px]! lg:pb-0!">
      <Sidebar class="hidden! lg:flex!" />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
    <Tabbar class="block! lg:hidden!" />
  </div>
</template>

<style scoped>
.main-content {
  padding-left: 0;

  padding-top: var(--header-height);
  width: 100%;
}

@media (width >= 64rem) {
  .main-content {
    padding-left: var(--sidebar-width);
  }
}
</style>
