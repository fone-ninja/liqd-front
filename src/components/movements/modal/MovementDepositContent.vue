<script setup lang="ts">
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
      <img :src="CRYPTO.brl.image" :alt="crypto" class="w-8 h-8" />
      <span class="text-2xl text-white font-bold"
        >+
        {{
          formatCurrency({
            value: Number(movement.amount_brl || 0),
            removeSymbol: true,
          })
        }}
        BRL</span
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

        <!-- TODO: Mostrar as informações quando a API disponibilizar -->
        <!-- <li>
          <span>{{ t("modal.shared.depositor_name") }}</span>
          <span>Eduardo Macedo</span>
        </li>
        <li>
          <span>{{ t("modal.shared.depositor_doc") }}</span>
          <span class="font-semibold">61234565543</span>
        </li> -->
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
