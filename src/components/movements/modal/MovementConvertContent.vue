<script setup lang="ts">
import { PhArrowRight } from "@phosphor-icons/vue";
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
</script>

<template>
  <div class="mt-6">
    <div class="flex items-center justify-center gap-2">
      <div class="flex flex-col border border-surface-500 p-4 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <img :src="CRYPTO.usdt.image" :alt="crypto" class="w-8 h-8" />
          <span class="text-xl font-semibold"> USDT</span>
        </div>
        <span class="text-xl text-white font-bold mb-1"
          >-{{
            formatCurrency({
              value: Number(movement.amount_usdt || 0),
              removeSymbol: true,
            })
          }}</span
        >
        <small class="text-surface-400">Tether</small>
      </div>

      <div class="px-4">
        <PhArrowRight :size="20" weight="fill" class="text-white" />
      </div>

      <div class="flex flex-col border border-surface-500 p-4 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <img :src="CRYPTO.brl.image" :alt="crypto" class="w-8 h-8" />
          <span class="text-xl font-semibold"> BRL</span>
        </div>
        <span class="text-xl text-white font-bold mb-1"
          >+{{
            formatCurrency({
              value: Number(movement.amount_brl || 0),
              removeSymbol: true,
            })
          }}</span
        >
        <small class="text-surface-400">Brazilian Real</small>
      </div>
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
          <span>{{ t("modal.shared.usd_quote") }}</span>
          <span>{{
            formatCurrency({
              value: Number(movement.usdt_price_brl || 0),
            })
          }}</span>
        </li>
        <li>
          <span>{{ t("modal.shared.operation") }}</span>
          <div class="flex flex-col items-end gap-1">
            <div class="flex items-center gap-2">
              <span>USDTBRL</span>
              <Tag severity="success" :value="t('modal.shared.buy')" />
            </div>
          </div>
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
