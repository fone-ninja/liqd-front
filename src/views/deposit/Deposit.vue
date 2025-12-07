<script setup lang="ts">
import { ref, nextTick, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import useUser from "@/use/useUser/useUser.ts";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import MovementStatus from "@/components/movements/MovementStatus.vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";
import {
  PhBook,
  PhHouse,
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhArrowDown,
  PhArrowRight,
  PhFile,
  PhPlus,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useQRCode } from "@vueuse/integrations/useQRCode";

const pixQrCode = shallowRef("");
const qrcode = useQRCode(pixQrCode);
const qrcodeLoading = ref(false);

const showMovementModal = ref(false);
const movement = ref(null);

const products = [
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    price: 653333.12,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    type: "deposit",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "brl",
  },
  {
    id: "1001",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    price: 72,
    category: "Accessories",
    quantity: 61,
    inventoryStatus: "INSTOCK",
    rating: 4,
    type: "deposit",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "brl",
  },
  {
    id: "1001",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    price: 72,
    category: "Accessories",
    quantity: 61,
    inventoryStatus: "INSTOCK",
    rating: 4,
    type: "deposit",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "brl",
  },
];

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const generateQRCode = async () => {
  qrcodeLoading.value = true;
  await new Promise<void>(async (resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  pixQrCode.value =
    "00020126360014BR.GOV.BCB.PIX0136+55119999999952040000530398654041000062070503***6304B14F";
  qrcode.value = pixQrCode.value;
  qrcodeLoading.value = false;
};

const { getUser, user } = useUser();
const { t } = useI18n();

const getProfile = async () => {
  try {
    await getUser();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

await getProfile();
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
            <h3 class="font-bold text-white">Método de recebimento</h3>
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

                    <span class="text-sm">R$ 1200,00 BRL</span>
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

                  <Button size="small" class="w-full">
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
        <DataTable :value="products" tableStyle="min-width: 50rem" scrollable>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">{{ t("deposit.history") }}</span>
            </div>
          </template>
          <Column field="name" :header="t('table.date')">
            <template #body="slotProps">
              <p>{{ getFormatDate(slotProps.data.date) }}</p>
              <small class="text-gray-400">{{
                getFormatTime(slotProps.data.date)
              }}</small>
            </template>
          </Column>
          <Column field="price" :header="t('table.currency')">
            <template #body="slotProps">
              <MovementCrypto :crypto="slotProps.data.crypto" />
            </template>
          </Column>

          <Column field="category" :header="t('table.value')">
            <template #body="slotProps">
              <span v-if="slotProps.price < 0" class="text-red-400">-</span>
              <span v-else class="text-green-400">+</span>
              {{ Math.abs(slotProps.data.price) }}
              {{ slotProps.data.crypto.toUpperCase() }}
            </template>
          </Column>

          <Column :header="t('table.status')">
            <template #body="slotProps">
              <MovementStatus type="confirmed" />
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
                count: products ? products.length : 0,
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
