<script setup lang="ts">
import { defineModel, defineProps } from "vue";
import { PhFileText, PhCopy, PhDownload } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import MovementWithdrawContent from "./MovementWithdrawContent.vue";
import MovementConvertContent from "./MovementConvertContent.vue";
import MovementDepositContent from "./MovementDepositContent.vue";

const { t } = useI18n();

defineProps({
  movement: {
    type: [Object, null],
    default: () => {},
    required: true,
  },
});

const model = defineModel({ default: false });

const MODAL_CONTENT = {
  withdrawal: {
    contentComponent: MovementWithdrawContent,
    title: "modal.withdrawal.title",
  },
  trade: {
    contentComponent: MovementConvertContent,
    title: "modal.trade.title",
  },
  deposit: {
    contentComponent: MovementDepositContent,
    title: "modal.deposit.title",
  },
};
</script>

<template>
  <Dialog
    v-model:visible="model"
    modal
    :style="{ width: '30rem', backgroundColor: '#181818', margin: '0 8px' }"
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
            t(MODAL_CONTENT[movement.movable_type].title)
          }}</span>
          <div class="flex items-center gap-2 text-green-400 text-sm">
            <div class="w-2 h-2 rounded bg-green-400"></div>
            {{ t("modal." + movement.movable_type + ".status_completed") }}
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <component
        :is="MODAL_CONTENT[movement.movable_type].contentComponent"
        :movement
      />
    </template>

    <!-- TODO: Adicionar quando o back tiver suporte -->
    <!-- <template #footer>
      <Button
        fluid
        :label="t('modal.shared.download_receipt')"
        @click="visible = false"
        autofocus
      >
        <div class="flex items-center justify-center gap-2">
          <PhDownload :size="18" weight="fill" />
          <span class="font-bold">{{
            t("modal.shared.download_receipt")
          }}</span>
        </div>
      </Button>
    </template> -->
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
