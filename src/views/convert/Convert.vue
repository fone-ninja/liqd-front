<script setup lang="ts">
import { ref } from "vue";
import useUser from "@/use/useUser/useUser.ts";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import ConvertCrypto from "@/components/convert/ConvertCrypto.vue";
import MovementModal from "@/components/movements/MovementModal.vue";
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
  PhFile,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useQRCode } from "@vueuse/integrations/useQRCode";

const showMovementModal = ref(false);
const movement = ref(null);

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
    cryptoFrom: "usdt",
    cryptoTo: "brl",
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
    cryptoFrom: "usdt",
    cryptoTo: "brl",
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
    cryptoFrom: "usdt",
    cryptoTo: "brl",
  },
];

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const { getUser, user } = useUser();

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
      <b class="text-white pb-2 border-b-2 border-white">Converter</b>
    </h1>

    <div class="mt-12 w-full">
      <div class="flex gap-4">
        <div class="bg-[#111111] p-6 rounded-lg flex-1">
          <div
            class="flex gap-4 border-b border-gray-400 pb-8 mb-4 justify-between"
          >
            <InputNumber placeholder="Price" class="w-1/2" />
            <MovementCrypto crypto="brl" />
          </div>

          <div class="flex flex-col">
            <p>Disponível</p>
            <div class="flex justify-between">
              <span class="text-white">BRL 0,00</span>
              <div class="cursor-pointer text-[#E94F06]">MAX</div>
            </div>
          </div>
        </div>

        <div class="px-4">
          <div class="flex items-center justify-center h-full">
            <PhArrowsHorizontal size="32" class="text-white" />
          </div>
        </div>

        <div class="bg-[#111111] p-6 rounded-lg flex-1">
          <div
            class="flex gap-4 border-b border-gray-400 pb-8 mb-4 justify-between"
          >
            <InputNumber placeholder="Price" class="w-1/2" />
            <MovementCrypto crypto="usdt" />
          </div>

          <div class="flex flex-col">
            <p>Disponível</p>
            <div class="flex justify-between">
              <span class="text-white">BRL 0,00</span>
              <div class="cursor-pointer text-[#E94F06]">MAX</div>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-2 text-sm">Valor mínimo: R$25,00</p>
    </div>

    <div>
      <div class="mt-8 w-full bg-[#111111] p-2 rounded-lg">
        <DataTable :value="products" tableStyle="min-width: 50rem" scrollable>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">Últimas movimentações</span>
            </div>
          </template>
          <Column field="name" header="Data">
            <template #body="slotProps">
              <p>{{ getFormatDate(slotProps.data.date) }}</p>
              <small class="text-gray-400">{{
                getFormatTime(slotProps.data.date)
              }}</small>
            </template>
          </Column>
          <Column header="Tipo Mov.">
            <template #body="slotProps">
              <MovementTag :type="slotProps.data.type" />
            </template>
          </Column>
          <Column field="price" header="Moeda">
            <template #body="slotProps">
              <ConvertCrypto
                :cryptoFrom="slotProps.data.cryptoFrom"
                :cryptoTo="slotProps.data.cryptoTo"
              />
            </template>
          </Column>
          <Column field="category" header="Valor">
            <template #body="slotProps">
              <span v-if="slotProps.price < 0" class="text-red-400">-</span>
              <span v-else class="text-green-400">+</span>
              {{ Math.abs(slotProps.data.price) }}
              {{ slotProps.data.cryptoTo.toUpperCase() }}
            </template>
          </Column>

          <Column
            field="balance"
            header="Ações"
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
            <small class="text-gray-400"
              >{{ products ? products.length : 0 }} movimentações
              existentes.</small
            >
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
