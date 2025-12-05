<script setup lang="ts">
defineProps({
  crypto: {
    type: String,
    required: true,
  },
});

const CRYPTO = {
  usdt: {
    name: "Tether",
    symbol: "USDT",
    image: "https://app.tcr.finance/img/coins/tether.svg",
  },
  brl: {
    name: "Brazilian Real",
    symbol: "BRL",
    image: "https://app.tcr.finance/img/home/flag_brazil.svg",
  },
};
</script>

<template>
  <div class="flex items-center gap-4">
    <img :src="CRYPTO[crypto].image" :alt="crypto" class="w-8 h-8" />
    <div>
      <p class="font-bold text-white">{{ CRYPTO[crypto].symbol }}</p>
      <small class="text-gray-400">{{ CRYPTO[crypto].name }}</small>
    </div>
  </div>
</template>

<style scoped></style>
