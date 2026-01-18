<script setup lang="ts">
import { ref, computed, shallowRef, onMounted } from "vue";
import { useClipboard } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import MovementStatus from "@/components/movements/MovementStatus.vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";
import { PhArrowRight, PhFile, PhPlus } from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useQRCode } from "@vueuse/integrations/useQRCode";
import useTransaction from "@/use/useTransaction/useTransaction";
import { userStore } from "@/stores/userStore";
import { formatCurrency } from "@/utils/currency";

const userState = userStore();
const { getTransaction, getTransactions } = useTransaction();

const deposits = ref([]);
const pixQrCode = shallowRef("");
const qrcode = useQRCode(pixQrCode);
const qrcodeLoading = ref(false);

const showMovementModal = ref(false);
const movement = ref(null);

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const brlAmount = computed(() => {
  const localBRLAmount = userState.userData?.brl || 0;

  return localBRLAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
});

const generateQRCode = async () => {
  qrcodeLoading.value = true;
  pixQrCode.value = userState?.user?.pix_qr_code || "";
  qrcode.value = pixQrCode.value;

  await new Promise<void>(async (resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  qrcodeLoading.value = false;
};

const { t } = useI18n();

const { copy, isSupported } = useClipboard();

const copyQrToClipboard = () => {
  if (isSupported && pixQrCode.value) {
    copy(pixQrCode.value);
  }
};

const getHistory = async () => {
  const params = {
    filters: {
      movable_type: {
        $eq: "deposit",
      },
    },
  };

  try {
    const data = await getTransactions(params);
    deposits.value = data.filter((el) => el.movable_type === "deposit");
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

onMounted(() => {
  getHistory();
});
</script>

<template>
  <div class="px-8 py-4">
    <MovementModal v-model="showMovementModal" :movement />

    <h1 class="text-xl mb-2">
      <b class="text-white pb-2 border-b-2 border-white">{{
        t("deposit.title")
      }}</b>
    </h1>

    <div class="flex flex-col lg:flex-row gap-4 mt-12 w-full">
      <div class="flex-shrink-0 w-full lg:w-4/12 bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-white">
              {{ t("deposit.subtitle") }}
            </h3>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <MovementCrypto crypto="brl" />

          <div class="mt-4">
            <h3 class="font-bold text-white">{{ t("deposit.method") }}</h3>
            <div class="flex items-center gap-4 mt-2">
              <img
                src="https://app.tcr.finance/img/depositar/pix.svg"
                class="w-8 h-8"
              />
              <div>
                <p class="font-bold text-white">{{ t("deposit.pix") }}</p>
                <small class="text-gray-400">{{
                  t("deposit.pix_instant")
                }}</small>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <Button size="small" label="Prosseguir" @click="generateQRCode">
              <div class="flex items-center gap-4">
                <span class="font-semibold">{{ t("deposit.proceed") }}</span>
                <PhArrowRight :size="20" weight="fill" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div class="flex flex-1">
        <div class="bg-[#111111] p-6 rounded-lg w-full">
          <div
            v-if="!pixQrCode && !qrcodeLoading"
            class="flex flex-col items-center justify-center p-6 h-full"
          >
            <div
              class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-400/10 mb-6"
            >
              <PhPlus :size="28" />
            </div>

            <h3 class="font-bold text-lg text-white mb-2">
              {{ t("deposit.ready_qr") }}
            </h3>

            <p>
              {{ t("deposit.select_and_proceed") }}
            </p>
          </div>

          <div
            v-if="qrcodeLoading"
            class="flex items-center justify-center h-full"
          >
            <ProgressSpinner strokeWidth="2" class="w-20! h-20!" />
          </div>

          <div
            v-if="pixQrCode && !qrcodeLoading"
            class="flex flex-col lg:flex-row h-full w-full"
          >
            <div
              class="flex w-full lg:w-1/2 items-center justify-center border-gray-600 pt-8 lg:pt-0 lg:border-r lg:border-b-0 order-2 lg:order-1 mb-6 lg:mb-0"
            >
              <div>
                <img :src="qrcode" alt="QR Code" class="rounded-lg h-[180px]" />
              </div>
            </div>

            <div
              class="w-full lg:w-1/2 border-b lg:border-0 border-gray-600 order-1 lg:order-2"
            >
              <div class="flex flex-col p-6">
                <div class="flex items-center gap-3">
                  <img
                    src="https://app.tcr.finance/img/home/flag_brazil.svg"
                    alt="br"
                  />
                  <div class="flex flex-col">
                    <span class="text-md font-bold text-white">{{
                      t("deposit.balance")
                    }}</span>

                    <span class="text-sm">R$ {{ brlAmount }}</span>
                  </div>
                </div>

                <div class="mt-6 w-full">
                  <p class="text-white mb-2 font-bold">
                    {{ t("deposit.qr_code") }}
                  </p>

                  <div
                    class="rounded-md p-6 bg-[#181818] h-[140px] my-4 break-all overflow-auto"
                  >
                    {{ pixQrCode }}
                  </div>

                  <Button
                    size="small"
                    class="w-full"
                    @click="copyQrToClipboard"
                  >
                    <div class="flex items-center gap-4">
                      <span class="font-semibold">{{
                        t("deposit.copy_qr")
                      }}</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="mt-4 w-full bg-[#111111] p-2 rounded-lg">
        <DataTable :value="deposits" tableStyle="min-width: 50rem" scrollable>
          <template #empty>
            Não há dados para serem exibidos. Faça seu primeiro depósito.
          </template>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">{{ t("deposit.history") }}</span>
            </div>
          </template>
          <Column field="name" :header="t('table.date')">
            <template #body="slotProps">
              <p>{{ getFormatDate(slotProps.data.created_at) }}</p>
              <small class="text-gray-400">{{
                getFormatTime(slotProps.data.created_at)
              }}</small>
            </template>
          </Column>

          <Column field="price" :header="t('table.currency')">
            <template #body="slotProps">
              <MovementCrypto crypto="brl" />
            </template>
          </Column>

          <Column field="category" :header="t('table.value')">
            <template #body="slotProps">
              <div>
                <span v-if="slotProps.data.amount_brl < 0" class="text-red-400"
                  >-</span
                >
                <span v-else class="text-green-400">+</span>
                {{ Math.abs(slotProps.data.amount_brl) }} BRL
              </div>
              <small class="text-xs text-surface-400"
                >≈
                {{
                  formatCurrency({
                    value: Number(slotProps.data.amount_usdt || 0),
                    symbol: "$",
                  })
                }}</small
              >
            </template>
          </Column>

          <Column :header="t('table.status')">
            <template #body="slotProps">
              <MovementStatus :type="slotProps.data.status" />
            </template>
          </Column>

          <Column
            field="balance"
            :header="t('table.actions')"
            alignFrozen="right"
            frozen
            class="w-[80px]"
          >
            <template #body="{ data }">
              <div class="flex justify-center">
                <PhFile
                  :size="18"
                  weight="fill"
                  class="text-white cursor-pointer"
                  @click="
                    showMovementModal = true;
                    movement = data;
                  "
                />
              </div>
            </template>
          </Column>

          <template #footer>
            <small class="text-gray-400">{{
              t("common.movements_count", {
                count: deposits ? deposits.length : 0,
              })
            }}</small>
          </template>
        </DataTable>
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
