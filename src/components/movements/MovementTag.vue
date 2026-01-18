<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  PhBook,
  PhHouse,
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhArrowDown,
  PhHandWithdraw,
} from "@phosphor-icons/vue";

defineProps({
  type: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();

const TAG_TYPES = {
  deposit: { severity: "success", icon: PhArrowUp },
  withdraw: { severity: "danger", icon: PhArrowDown },
  convert: { severity: "info", icon: PhArrowsClockwise },
  withdrawal: { severity: "danger", icon: PhArrowDown },
  trade: { severity: "info", icon: PhArrowsClockwise },
};
</script>

<template>
  <Tag
    :value="t(`tags.${type}`)"
    :severity="TAG_TYPES[type].severity"
    class="min-w-[140px]"
  >
    <div class="flex items-center gap-2 px-1">
      <component :is="TAG_TYPES[type].icon" :size="14" />
      <span class="text-sm">{{ t(`tags.${type}`) }}</span>
    </div>
  </Tag>
</template>

<style scoped></style>
