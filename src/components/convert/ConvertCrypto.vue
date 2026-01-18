<script setup lang="ts">
import {
  PhBook,
  PhHouse,
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhArrowDown,
  PhArrowRight,
  PhHandWithdraw,
  PhArrowsHorizontal,
} from "@phosphor-icons/vue";

defineProps({
  cryptoFrom: {
    type: String,
    required: true,
  },
  cryptoTo: {
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
  trx: {
    name: "Tron",
    symbol: "TRX",
    image: "https://app.tcr.finance/img/coins/tron.svg",
  },
};
</script>

<template>
  <div class="flex gap-2">
    <div class="flex items-center gap-2">
      <img :src="CRYPTO[cryptoFrom].image" :alt="cryptoFrom" class="w-6 h-6" />
      <div>
        <p class="font-semibold text-white">{{ CRYPTO[cryptoFrom].symbol }}</p>
      </div>
    </div>

    <div class="flex items-center">
      <PhArrowRight :size="20" weight="fill" class="text-white" />
    </div>

    <div class="flex items-center gap-2">
      <img :src="CRYPTO[cryptoTo].image" :alt="cryptoTo" class="w-6 h-6" />
      <div>
        <p class="font-semibold text-white">{{ CRYPTO[cryptoTo].symbol }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
