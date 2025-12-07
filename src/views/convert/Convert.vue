<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import useUser from "@/use/useUser/useUser.ts";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import ConvertCrypto from "@/components/convert/ConvertCrypto.vue";
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
  PhHandWithdraw,
  PhArrowsHorizontal,
  PhArrowsDownUp,
  PhFile,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useQRCode } from "@vueuse/integrations/useQRCode";

const showMovementModal = ref(false);
const movement = ref(null);

const hiddenFrom = ref(false);
const hiddenTo = ref(false);

const qrcode = useQRCode("text-to-encode");

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
    type: "convert",
    date: "2018-04-04T16:00:00.000Z",
    cryptoFrom: "brl",
    cryptoTo: "usdt",
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
    type: "convert",
    date: "2018-04-04T16:00:00.000Z",
    cryptoFrom: "brl",
    cryptoTo: "usdt",
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
    type: "convert",
    date: "2018-04-04T16:00:00.000Z",
    cryptoFrom: "brl",
    cryptoTo: "usdt",
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
        t("convert.title")
      }}</b>
    </h1>

    <div class="mt-12 w-full">
      <div class="flex gap-2 mb-4">
        <div class="w-full bg-[#111111] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                src="https://app.tcr.finance/img/home/flag_brazil.svg"
                alt="br"
                class="w-6 h-6"
              />
              <h3 class="text-lg font-bold text-white">
                {{ t("convert.balance_brl") }}
              </h3>
            </div>

            <div class="flex gap-4">
              <component
                :is="hiddenFrom ? PhEyeSlash : PhEye"
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="hiddenFrom = !hiddenFrom"
              />
              <PhArrowsClockwise :size="16" weight="fill" class="text-white" />
            </div>
          </div>
          <div class="flex mt-4">
            <span class="text-2xl text-white">{{
              hiddenFrom ? "••••••" : "R$ 5,00"
            }}</span>
          </div>
        </div>

        <div class="w-full bg-[#111111] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                src="https://app.tcr.finance/img/home/flag_usa.svg"
                alt="us"
                class="w-6 h-6"
              />
              <h3 class="text-lg font-bold text-white">
                {{ t("convert.balance_usd") }}
              </h3>
            </div>

            <div class="flex gap-4">
              <component
                :is="hiddenTo ? PhEyeSlash : PhEye"
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="hiddenTo = !hiddenTo"
              />
              <PhArrowsClockwise :size="16" weight="fill" class="text-white" />
            </div>
          </div>
          <div class="flex mt-4">
            <span class="text-2xl text-white">{{
              hiddenTo ? "••••••" : "R$ 5,00"
            }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-4">
        <div class="bg-[#111111] p-6 rounded-lg flex-1">
          <div
            class="flex gap-4 border-b border-gray-400 pb-8 mb-4 justify-between items-start"
          >
            <div class="lg:w-1/2">
              <InputNumber
                placeholder="Price"
                class="flex-1 lg:flex-initial lg:w-full"
                :pt="{
                  root: { class: 'min-w-[100px]!' },
                  pcinputtext: { root: { class: 'min-w-[100px]!' } },
                }"
              />
              <p class="mt-1 text-xs">
                {{ t("convert.min_value", { value: "R$25,00" }) }}
              </p>
            </div>

            <MovementCrypto crypto="brl" />
          </div>

          <div class="flex flex-col">
            <p>{{ t("convert.available") }}</p>
            <div class="flex justify-between">
              <span class="text-white">BRL 0,00</span>
              <div class="cursor-pointer text-[#E94F06]">
                {{ t("common.max") }}
              </div>
            </div>
          </div>
        </div>

        <div class="px-2">
          <div class="flex flex-col items-center justify-center h-full">
            <PhArrowsHorizontal size="32" class="text-white hidden lg:block" />
            <PhArrowsDownUp size="32" class="text-white block lg:hidden" />
            <Button
              size="small"
              :label="t('common.converter_button')"
              class="mt-4 min-w-[130px] w-min mb-1 hidden! lg:block!"
              @click="goToSignin"
            />
          </div>
        </div>

        <div class="bg-[#111111] p-6 rounded-lg flex-1">
          <div class="flex gap-4 pb-8 mb-4 justify-between">
            <div class="lg:w-1/2">
              <InputNumber
                placeholder="Price"
                class="flex-1 lg:flex-initial lg:w-full"
                :pt="{
                  root: { class: 'min-w-[100px]!' },
                  pcinputtext: { root: { class: 'min-w-[100px]!' } },
                }"
              />
            </div>
            <MovementCrypto crypto="usdt" />
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full bg-[#111111] p-6 rounded-lg mt-4">
        <div class="flex flex-col gap-1">
          <div class="flex justify-between">
            <span>{{ t("convert.value_to_receive") }}</span>
            <span>$ 0,00</span>
          </div>

          <div class="flex justify-between">
            <span>{{ t("convert.usdt_buy_quote") }}</span>
            <span>R$ 50,00</span>
          </div>
        </div>
      </div>
      <small>{{ t("convert.quote_notice") }}</small>
    </div>

    <div class="block lg:hidden w-full">
      <Button
        fluid
        size="small"
        :label="t('common.converter_button')"
        class="mt-4 min-w-[130px] w-min mb-1"
        @click="goToSignin"
      />
    </div>

    <div>
      <div class="mt-4 w-full bg-[#111111] p-2 rounded-lg">
        <DataTable :value="products" tableStyle="min-width: 50rem" scrollable>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">{{
                t("convert.last_movements")
              }}</span>
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
          <Column :header="t('table.type')">
            <template #body="slotProps">
              <MovementTag :type="slotProps.data.type" />
            </template>
          </Column>
          <Column field="price" :header="t('table.currency')">
            <template #body="slotProps">
              <ConvertCrypto
                :cryptoFrom="slotProps.data.cryptoFrom"
                :cryptoTo="slotProps.data.cryptoTo"
              />
            </template>
          </Column>
          <Column field="category" :header="t('table.value')">
            <template #body="slotProps">
              <span v-if="slotProps.price < 0" class="text-red-400">-</span>
              <span v-else class="text-green-400">+</span>
              {{ Math.abs(slotProps.data.price) }}
              {{ slotProps.data.cryptoTo.toUpperCase() }}
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
