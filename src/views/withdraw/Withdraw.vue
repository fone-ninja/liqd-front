<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import useUser from "@/use/useUser/useUser.ts";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";
import {
  PhFile,
  PhHouse,
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhArrowDown,
  PhArrowRight,
  PhHandWithdraw,
  PhInfo,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useQRCode } from "@vueuse/integrations/useQRCode";

const qrcode = useQRCode("text-to-encode");

const showMovementModal = ref(false);
const movement = ref(null);
const pixQrCode = ref(
  "00020126360014BR.GOV.BCB.PIX0136+55119999999952040000530398654041000062070503***6304B14F"
);

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
    type: "withdraw",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "usdt",
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
    type: "withdraw",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "usdt",
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
    type: "withdraw",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "usdt",
  },
];

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
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
        t("withdraw.title")
      }}</b>
    </h1>

    <div class="flex flex-col lg:flex-row gap-4 mt-12 w-full">
      <div class="flex-shrink-0 w-full lg:w-4/12 bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-white">
              {{ t("withdraw.subtitle") }}
            </h3>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <MovementCrypto crypto="usdt" />

          <div class="mt-4">
            <h3 class="font-bold text-white">{{ t("withdraw.method") }}</h3>
            <div class="flex items-center gap-4 mt-2">
              <img
                src="https://app.tcr.finance/img/coins/tron.svg"
                class="w-8 h-8"
              />
              <div>
                <p class="font-bold text-white">Tron</p>
                <small class="text-gray-400">TRC-20</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-1">
        <div class="bg-[#111111] p-6 rounded-lg w-full gap-4">
          <div class="flex flex-col">
            <label class="mb-1 text-white">{{
              t("withdraw.amount_label")
            }}</label>
            <InputGroup>
              <InputNumber placeholder="0.00" />
              <InputGroupAddon>USDT</InputGroupAddon>
            </InputGroup>
            <div class="flex justify-between mt-1">
              <small
                >{{
                  t("withdraw.available", { amount: "0,00", currency: "USDT" })
                }}
                <span class="text-[#E94F06] ml-2 cursor-pointer">{{
                  t("common.max")
                }}</span></small
              >
              <small>{{
                t("withdraw.min_value", { value: "$ 100,00" })
              }}</small>
            </div>
          </div>

          <div class="flex flex-col mt-6">
            <label class="mb-1 text-white">Wallet</label>
            <InputText
              type="text"
              :placeholder="t('withdraw.wallet_placeholder')"
              v-model="value"
            />
          </div>

          <div>
            <div class="flex flex-col">
              <div class="pt-6 pb-4">
                <hr />
              </div>
              <div class="flex flex-col gap-1">
                <div class="flex justify-between">
                  <span>{{ t("withdraw.network_fee") }}</span>
                  <span>$ 2.50</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ t("withdraw.net_amount") }}</span>
                  <span>$ 2.50</span>
                </div>
              </div>
            </div>

            <Button size="small" class="w-full mt-6">
              <div class="flex items-center gap-4">
                <span class="font-semibold">{{
                  t("withdraw.withdraw_button")
                }}</span>
              </div>
            </Button>

            <div class="w-8/12 mt-2">
              <p class="text-xs flex items-center gap-2">
                <PhInfo size="16" />
                {{ t("withdraw.note", { fee: "3 USDT" }) }}
              </p>
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
              <span class="text-xl font-bold">{{ t("withdraw.history") }}</span>
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

          <Column field="category" :header="t('table.destination')">
            <template #body="slotProps">
              <span>TDkjzwhcRmPrvSuFe3rqyH5vpLt7TSQSfN</span>
            </template>
          </Column>

          <Column :header="t('table.status')">
            <template #body="slotProps">
              <MovementStatus type="sent" />
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
