<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps({
  type: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();

const TAG_TYPES = {
  confirmed: { severity: "success" },
  sent: { severity: "info" },
  canceled: { severity: "danger" },
  error: { severity: "danger" },
};
</script>

<template>
  <Tag :severity="TAG_TYPES[type].severity" class="min-w-[140px]">
    <div class="flex items-center gap-2 px-1">
      <span class="text-sm">{{ t(`moviment_status.${type}`) }}</span>
    </div>
  </Tag>
</template>

<style scoped></style>
