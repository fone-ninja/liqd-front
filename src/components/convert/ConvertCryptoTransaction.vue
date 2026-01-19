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
import { formatCurrency } from "@/utils/currency";

defineProps({
  cryptoFrom: {
    type: String,
    required: true,
  },
  cryptoTo: {
    type: String,
    required: true,
  },
  balanceFrom: {
    type: [Number, null],
    required: true,
  },
  balanceTo: {
    type: [Number, null],
    required: true,
  },
});

const CRYPTO = {
  usdt: {
    name: "Tether",
    sufix: "USDT",
    image: "https://app.tcr.finance/img/coins/tether.svg",
    symbol: "$",
  },
  brl: {
    name: "Brazilian Real",
    sufix: "BRL",
    image: "https://app.tcr.finance/img/home/flag_brazil.svg",
    symbol: "R$",
  },
  trx: {
    name: "Tron",
    sufix: "TRX",
    image: "https://app.tcr.finance/img/coins/tron.svg",
  },
};
</script>

<template>
  <div class="flex gap-2">
    <div class="">
      <div class="flex items-center gap-2">
        <img
          :src="CRYPTO[cryptoFrom].image"
          :alt="cryptoFrom"
          class="w-8 h-8"
        />
        <div>
          <p class="font-semibold text-white text-lg">
            {{ CRYPTO[cryptoFrom].sufix }}
          </p>
        </div>
      </div>

      <div class="mt-2 text-xl font-bold">
        {{ CRYPTO[cryptoFrom].symbol }} {{ balanceFrom }}
      </div>
    </div>

    <div class="flex items-center px-4">
      <PhArrowRight :size="28" weight="fill" class="text-white" />
    </div>

    <div>
      <div class="flex items-center gap-2">
        <img :src="CRYPTO[cryptoTo].image" :alt="cryptoTo" class="w-8 h-8" />
        <div>
          <p class="font-semibold text-white">{{ CRYPTO[cryptoTo].sufix }}</p>
        </div>
      </div>

      <div class="mt-2 text-xl font-bold">
        {{ CRYPTO[cryptoTo].symbol }} {{ balanceTo }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
