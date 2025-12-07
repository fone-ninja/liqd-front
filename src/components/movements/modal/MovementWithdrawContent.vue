<script setup lang="ts">
import { PhCopy } from "@phosphor-icons/vue";

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
  <div class="mt-6">
    <div class="flex items-center justify-center gap-2">
      <img :src="CRYPTO.usdt.image" :alt="crypto" class="w-8 h-8" />
      <span class="text-2xl text-white font-bold">-3,6640,00 USDT</span>
    </div>

    <div class="mt-8">
      <ul>
        <li>
          <span>ID da Transação</span>
          <span>#3243532</span>
        </li>
        <li>
          <span>Data</span>
          <span>25/08/2025 16:07</span>
        </li>
        <li>
          <span>Valor</span>
          <span>3,640.00 USDT</span>
        </li>
        <li>
          <span>Hash</span>
          <div class="flex flex-col items-end gap-1">
            <div class="flex items-center gap-2">
              <span>Ver Comprovante</span>
              <PhCopy :size="18" weight="fill" />
            </div>
            <small>0x09767f12...6c76a93d82be</small>
          </div>
        </li>
        <li>
          <span>Wallet</span>
          <div class="flex items-center gap-2">
            <span class="font-semibold">0x09767f12...6c76a93d82be</span>
            <PhCopy :size="18" weight="fill" />
          </div>
        </li>
        <li>
          <span>Rede</span>
          <span>Polygon</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
li {
  padding: 16px 0;
  border-bottom: 1px solid #333333;
  display: flex;
  justify-content: space-between;
}
</style>
