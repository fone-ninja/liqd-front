<script setup lang="ts">
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

const TAG_TYPES = {
  deposit: { label: "Deposito", severity: "success", icon: PhArrowUp },
  withdraw: { label: "Saque", severity: "danger", icon: PhArrowDown },
  convert: { label: "Conversão", severity: "info", icon: PhArrowsClockwise },
};
</script>

<template>
  <Tag
    :value="TAG_TYPES[type].label"
    :severity="TAG_TYPES[type].severity"
    class="min-w-[140px]"
  >
    <div class="flex items-center gap-2 px-1">
      <component :is="TAG_TYPES[type].icon" :size="14" />
      <span class="text-sm">{{ TAG_TYPES[type].label }}</span>
    </div>
  </Tag>
</template>

<style scoped></style>
