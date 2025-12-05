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
  PhArrowRight,
  PhFile,
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
    type: "deposit",
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
    type: "deposit",
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
      <b class="text-white pb-2 border-b-2 border-white">Depositar</b>
    </h1>

    <div class="flex gap-4 mt-12 w-full">
      <div class="flex-shrink-0 w-4/12 bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-white">Deposite seu dinheiro</h3>
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
                <p class="font-bold text-white">PIX</p>
                <small class="text-gray-400">Transferência instantânea</small>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <Button size="small" label="Prosseguir">
              <div class="flex items-center gap-4">
                <span class="font-semibold">Prosseguir</span>
                <PhArrowRight :size="20" weight="fill" />
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div class="flex flex-1">
        <div class="bg-[#111111] p-6 rounded-lg w-full">
          <div class="flex h-full w-full">
            <div
              class="flex items-center justify-center w-1/2 border-r border-gray-600"
            >
              <div>
                <img :src="qrcode" alt="QR Code" class="rounded-lg h-[180px]" />
              </div>
            </div>

            <div class="w-1/2">
              <div class="flex flex-col p-6">
                <div class="flex items-center gap-3">
                  <img
                    src="https://app.tcr.finance/img/home/flag_brazil.svg"
                    alt="br"
                  />
                  <div class="flex flex-col">
                    <span class="text-md font-bold text-white">Saldo</span>

                    <span class="text-sm">R$ 1200,00 BRL</span>
                  </div>
                </div>

                <div class="mt-6 w-full">
                  <p class="text-white mb-2 font-bold">Código QR</p>

                  <div
                    class="rounded-md p-6 bg-[#181818] h-[140px] my-4 break-all overflow-auto"
                  >
                    {{ pixQrCode }}
                  </div>

                  <Button size="small" class="w-full">
                    <div class="flex items-center gap-4">
                      <span class="font-semibold">Copiar código QR</span>
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
              <span class="text-xl font-bold">Histórico de depósitos</span>
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

          <Column header="Status">
            <template #body="slotProps">
              <Tag severity="success" class="min-w-[140px]">
                <div class="flex items-center gap-2 px-1">
                  <span class="text-sm">Confirmado</span>
                </div>
              </Tag>
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
