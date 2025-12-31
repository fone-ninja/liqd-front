<script setup lang="ts">
import dayjs from "dayjs";
import { getLongDate } from "@/utils/date";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/stores/userStore";
import { getInitials } from "@/utils/text";
import MovementModal from "@/components/movements/modal/MovementModal.vue";

const showMovementModal = ref(false);
const movement = ref(null);
const userState = userStore();

const { t } = useI18n();
</script>

<template>
  <div class="px-8 py-4">
    <MovementModal v-model="showMovementModal" :movement />

    <h1 class="text-xl mb-2">
      <b class="text-white pb-2 border-b-2 border-white">{{
        t("profile.title")
      }}</b>
    </h1>

    <div class="mt-12 w-full">
      <div class="flex flex-col w-full bg-[#111111] p-6 rounded-lg mt-4">
        <div class="flex gap-8">
          <div
            class="hidden lg:flex rounded-full bg-blue-400 text-white h-[112px] w-[112px] flex items-center justify-center font-bold cursor-pointer text-4xl"
          >
            {{ getInitials(userState.userData?.name) }}
          </div>

          <div>
            <h2 class="text-white text-2xl font-bold mb-1">
              {{ userState.userData?.name.toLocaleUpperCase() }}
            </h2>
            <p class="font-semibold">{{ userState.userData?.email }}</p>
            <p v-if="userState.userData?.created_at" class="mt-6">
              {{ t("profile.member") }}
              {{ getLongDate(userState.userData?.created_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep .p-datatable-header,
:deep(.p-datatable-header) {
  background-color: #111111;
}

::v-deep .p-datatable-thead > tr > th,
:deep(.p-datatable-thead > tr > th) {
  background-color: #111111;
}

::v-deep .p-datatable-tbody > tr,
:deep(.p-datatable-tbody > tr) {
  background-color: #111111;
}

::v-deep .p-datatable-tbody > tr > .p-datatable-frozen-column,
:deep(.p-datatable-tbody > tr > .p-datatable-frozen-column) {
  background-color: #111111;
}

::v-deep .p-datatable-footer,
:deep(.p-datatable-footer) {
  background-color: #111111;
}
</style>
