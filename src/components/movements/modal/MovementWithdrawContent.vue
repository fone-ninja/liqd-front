<script setup lang="ts">
import { PhCopy } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/utils/currency";
import dayjs from "dayjs";

const { t } = useI18n();

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

defineProps({
  movement: {
    type: [Object],
    default: () => {},
    required: true,
  },
});

const getFormatedDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD/MM/YYYY HH:mm").toLowerCase();
};

const viewReceipt = () => {
  window.open(
    "https://polygonscan.com/tx/0x09767f129b1e8e5f6e8c4b5e6c76a93d82be",
    "_blank"
  );
};
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center justify-center gap-2">
      <img :src="CRYPTO.usdt.image" :alt="crypto" class="w-8 h-8" />
      <span class="text-2xl text-white font-bold"
        >-
        {{
          formatCurrency({
            value: Number(movement.amount_usdt || 0),
            removeSymbol: true,
          })
        }}
        USDT</span
      >
    </div>

    <div class="mt-8">
      <ul>
        <li>
          <span>{{ t("modal.shared.transaction_id") }}</span>
          <span>#{{ movement.id }}</span>
        </li>
        <li>
          <span>{{ t("modal.shared.date") }}</span>
          <span>{{ getFormatedDate(movement.created_at) }}</span>
        </li>
        <li>
          <span>{{ t("modal.shared.amount") }}</span>
          <span
            >{{
              formatCurrency({
                value: Number(movement.amount_usdt || 0),
                removeSymbol: true,
              })
            }}
            USDT</span
          >
        </li>
        <li>
          <span>{{ t("modal.shared.hash") }}</span>
          <div class="flex flex-col items-end gap-1">
            <div
              class="flex items-center gap-2 text-orange-500 cursor-pointer"
              @click="viewReceipt"
            >
              <span>{{ t("modal.shared.view_receipt") }}</span>
              <PhCopy :size="18" weight="fill" />
            </div>
            <small class="text-surface-400">0x09767f12...6c76a93d82be</small>
          </div>
        </li>
        <li>
          <span>{{ t("modal.shared.wallet") }}</span>
          <div class="flex items-center gap-2">
            <span class="font-semibold">0x09767f12...6c76a93d82be</span>
            <PhCopy :size="18" weight="fill" />
          </div>
        </li>
        <li>
          <span>{{ t("modal.shared.network") }}</span>
          <span>Tron</span>
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
