<script setup lang="ts">
import { defineModel, defineProps } from "vue";
import { PhFileText, PhCopy, PhDownload } from "@phosphor-icons/vue";
import MovementWithdrawContent from "./MovementWithdrawContent.vue";
import MovementConvertContent from "./MovementConvertContent.vue";
import MovementDepositContent from "./MovementDepositContent.vue";

defineProps({
  movement: {
    type: [Object, null],
    default: () => {},
    required: true,
  },
});

const model = defineModel({ default: false });

const MODAL_CONTENT = {
  withdraw: {
    contentComponent: MovementWithdrawContent,
    title: "Saque",
  },
  convert: {
    contentComponent: MovementConvertContent,
    title: "Conversão",
  },
  deposit: {
    contentComponent: MovementDepositContent,
    title: "Depósito",
  },
};
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
  <Dialog
    v-model:visible="model"
    modal
    :style="{ width: '30rem', backgroundColor: '#181818' }"
    :dt="{
      header: {
        color: 'red',
      },
    }"
    :pt="{
      header: {
        class: 'p-0! border-b border-surface-500',
      },
      headeractions: {
        class: 'pr-4! ',
      },
    }"
  >
    <template #header>
      <div class="pt-4 pl-4 pb-6 inline-flex items-center gap-4 w-full">
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10"
        >
          <PhFileText :size="26" weight="fill" class="text-green-400" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-lg font-semibold">{{
            MODAL_CONTENT[movement.type].title
          }}</span>
          <div class="flex items-center gap-2 text-green-400 text-sm">
            <div class="w-2 h-2 rounded bg-green-400"></div>
            Concluída
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <component :is="MODAL_CONTENT[movement.type].contentComponent" />
    </template>
    <template #footer>
      <Button
        fluid
        label="Baixar Comprovante"
        @click="visible = false"
        autofocus
      >
        <div class="flex items-center justify-center gap-2">
          <PhDownload :size="18" weight="fill" />
          <span class="font-bold">Baixar comprovante</span>
        </div>
      </Button>
    </template>
  </Dialog>
</template>

<style scoped>
li {
  padding: 16px 0;
  border-bottom: 1px solid #333333;
  display: flex;
  justify-content: space-between;
}
</style>
