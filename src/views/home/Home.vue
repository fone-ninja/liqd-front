<script setup lang="ts">
import { ref } from "vue";
import useUser from "@/use/useUser/useUser.ts";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import MovementModal from "@/components/movements/MovementModal.vue";
import {
  PhBook,
  PhHouse,
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhArrowDown,
  PhFile,
  PhHandWithdraw,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";

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
    type: "withdraw",
    date: "2018-04-04T16:00:00.000Z",
    crypto: "usdt",
  },
];

const showMovementModal = ref(false);
const movement = ref(null);

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
      <b class="text-white pb-2 border-b-2 border-white">Home</b>
    </h1>

    <div class="flex flex-col lg:flex-row gap-4 mt-12">
      <div class="w-full lg:w-[400px] bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img
              src="https://app.tcr.finance/img/home/flag_brazil.svg"
              alt="br"
            />
            <h3 class="text-lg font-bold text-white">Saldo BRL</h3>
          </div>

          <div class="flex gap-4">
            <PhEyeSlash :size="20" weight="fill" class="text-white" />
            <PhArrowsClockwise :size="20" weight="fill" class="text-white" />
          </div>
        </div>
        <div class="flex mt-4">
          <span class="text-3xl text-white">R$ 5,00</span>
        </div>
      </div>

      <div class="flex-1 bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-white">Cotação LIQD</h3>
          </div>
        </div>
        <div class="flex gap-12">
          <div class="flex flex-col gap-2 mt-4">
            <div class="rounded-full w-max px-2 py-1 bg-green-500/10 ml-[-2px]">
              <PhArrowUp
                :size="14"
                weight="fill"
                class="text-green-500 inline-block mr-1"
              />
              <span class="text-green-500 text-sm">Compra</span>
            </div>

            <span class="text-3xl text-green-500"><b>R$ 5,00</b></span>
            <small>Melhor preço para comprar USDT</small>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <div class="rounded-full w-max px-2 py-1 bg-green-500/10 ml-[-2px]">
              <PhArrowDown
                :size="14"
                weight="fill"
                class="text-red-500 inline-block mr-1"
              />
              <span class="text-red-500 text-sm">Venda</span>
            </div>

            <span class="text-3xl text-red-500"><b>R$ 5,00</b></span>
            <small>Melhor preço para vender USDT</small>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="mt-4 w-full bg-[#111111] p-2 rounded-lg">
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
              <MovementCrypto :crypto="slotProps.data.crypto" />
            </template>
          </Column>
          <Column field="category" header="Valor">
            <template #body="slotProps">
              <span v-if="slotProps.price < 0" class="text-red-400">-</span>
              <span v-else class="text-green-400">+</span>
              {{ Math.abs(slotProps.data.price) }}
              {{ slotProps.data.crypto.toUpperCase() }}
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
