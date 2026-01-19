<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Tabbar from "@/components/tabbar/Tabbar.vue";
import Header from "@/components/header/Header.vue";
import { quoteStore } from "@/stores/quoteStore";
import { onMounted, onUnmounted, ref } from "vue";
import { useUiStore } from "@/stores/uiStore";

const quoteData = quoteStore();
const uiStore = useUiStore();

let pollingInterval: ReturnType<typeof setInterval> | null = null;
let timerInterval: ReturnType<typeof setInterval> | null = null;

const timeLeft = ref(uiStore.pollingDuration);

const getQuote = async () => {
  try {
    await quoteData.getQuote();
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

onMounted(() => {
  getQuote();
  timeLeft.value = uiStore.pollingDuration - 1;
  uiStore.setPollingTimeLeft(timeLeft.value);

  pollingInterval = setInterval(() => {
    getQuote();
    timeLeft.value = uiStore.pollingDuration;
    uiStore.setPollingTimeLeft(timeLeft.value);
  }, uiStore.pollingDuration * 1000);

  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
      uiStore.setPollingTimeLeft(timeLeft.value);
    }
  }, 1000);
});

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
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
