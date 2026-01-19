<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useUiStore } from "@/stores/uiStore";
import { useI18n } from "vue-i18n";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";
import ConvertCrypto from "@/components/convert/ConvertCrypto.vue";
import { userStore } from "@/stores/userStore";
import { quoteStore } from "@/stores/quoteStore";
import useTransaction from "@/use/useTransaction/useTransaction";
import {
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowUp,
  PhFile,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { useToast } from "primevue/usetoast";
import { formatCurrency } from "@/utils/currency";

const { t } = useI18n();
const toast = useToast();

const showMovementModal = ref(false);
const movement = ref(null);
const movements = ref([]);

const hiddenBRL = ref(false);
const hiddenUSD = ref(false);

const spinnerProgress = ref(0);
const uiStore = useUiStore();
const valueRef = ref<HTMLElement | null>(null);
const barWidth = ref("130px");
const userState = userStore();
const quoteState = quoteStore();
const { getTransaction, getTransactions } = useTransaction();

let spinnerInterval: ReturnType<typeof setInterval> | null = null;

const updateBarWidth = () => {
  if (valueRef.value) {
    barWidth.value = valueRef.value.offsetWidth + "px";
  }
};

const startSpinner = () => {
  if (spinnerInterval) clearInterval(spinnerInterval);

  spinnerProgress.value = 0;
  spinnerInterval = setInterval(() => {
    spinnerProgress.value =
      1 - uiStore.pollingTimeLeft / uiStore.pollingDuration;
  }, 50);
};

const stopSpinner = () => {
  if (spinnerInterval) {
    clearInterval(spinnerInterval);
    spinnerInterval = null;
  }
};

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const amoountUSDTShown = computed(() => {
  const usdtAmount = Number(userState.userData?.usdt || 0);

  return formatCurrency({
    value: usdtAmount,
    symbol: "$",
    hiddenValues: hiddenUSD.value,
  });
});

const amoountBRLShown = computed(() => {
  const brlAmount = Number(userState.userData?.brl || 0);

  return formatCurrency({
    value: brlAmount,
    symbol: "R$",
    hiddenValues: hiddenBRL.value,
  });
});

const updateAmount = async () => {
  try {
    await userState.getUser();
  } catch (error) {
    toast.add({
      severity: "warn",
      summary: "Erro ao obter informações",
      detail: "Não foi possível obter as informações de saldo.",
      life: 5000,
    });
  }
};

const getMovements = async () => {
  try {
    const data = await getTransactions();
    movements.value = data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

watch(
  () => quoteState.quoteData,
  async () => {
    await nextTick();
    updateBarWidth();
  }
);

onMounted(() => {
  updateBarWidth();
  startSpinner();
  getMovements();
  window.addEventListener("resize", updateBarWidth);
});

onUnmounted(() => {
  stopSpinner();
  window.removeEventListener("resize", updateBarWidth);
});
</script>

<template>
  <div class="px-8 py-4">
    <MovementModal v-model="showMovementModal" :movement />

    <h1 class="text-xl mb-2">
      <b class="text-white pb-2 border-b-2 border-white">{{
        t("home.title")
      }}</b>
    </h1>

    <div class="flex flex-col lg:flex-row gap-4 mt-12">
      <div class="flex flex-col gap-2">
        <div class="w-full lg:w-[400px] bg-[#111111] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                src="https://app.tcr.finance/img/home/flag_brazil.svg"
                alt="br"
                class="w-6 h-6"
              />
              <h3 class="text-lg font-bold text-white">
                {{ t("home.balance_brl") }}
              </h3>
            </div>

            <div class="flex gap-4">
              <component
                :is="hiddenBRL ? PhEyeSlash : PhEye"
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="hiddenBRL = !hiddenBRL"
              />
              <PhArrowsClockwise
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="updateAmount"
              />
            </div>
          </div>
          <div class="flex mt-4">
            <span class="text-2xl text-white"> {{ amoountBRLShown }}</span>
          </div>
        </div>

        <div class="w-full lg:w-[400px] bg-[#111111] p-6 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img
                src="https://app.tcr.finance/img/home/flag_usa.svg"
                alt="us"
                class="w-6 h-6"
              />
              <h3 class="text-lg font-bold text-white">
                {{ t("home.balance_usd") }}
              </h3>
            </div>

            <div class="flex gap-4">
              <component
                :is="hiddenUSD ? PhEyeSlash : PhEye"
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="hiddenUSD = !hiddenUSD"
              />
              <PhArrowsClockwise
                :size="16"
                weight="fill"
                class="text-white cursor-pointer"
                @click="updateAmount"
              />
            </div>
          </div>
          <div class="flex mt-4">
            <span class="text-2xl text-white">{{ amoountUSDTShown }}</span>
          </div>
        </div>
      </div>

      <div class="flex-1 bg-[#111111] p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-white">
              {{ t("home.liqd_quote") }}
            </h3>
          </div>
        </div>
        <div class="flex gap-12">
          <div class="flex flex-col gap-2 mt-6">
            <div class="rounded-full w-max px-2 py-1 bg-green-500/10 ml-[-2px]">
              <PhArrowUp
                :size="14"
                weight="fill"
                class="text-green-500 inline-block mr-1"
              />
              <span class="text-green-500 text-sm">{{ t("home.buy") }}</span>
            </div>

            <div class="flex flex-col gap-2">
              <div>
                <div>
                  <span
                    ref="valueRef"
                    class="text-3xl text-green-500"
                    v-if="+(quoteState.quoteData?.price || 0) !== 0"
                    ><b
                      >{{
                        formatCurrency({
                          value: Number(quoteState.quoteData?.price || 0),
                        })
                      }}
                    </b></span
                  >
                  <Skeleton
                    v-else
                    height="2rem"
                    :style="{ width: barWidth }"
                    class="mb-3"
                  ></Skeleton>
                </div>
                <div
                  class="bg-gray-700 rounded-full h-2 overflow-hidden mt-2"
                  :style="{ width: barWidth }"
                >
                  <div
                    class="bg-green-500 h-full rounded-full transition-all"
                    :style="{ width: spinnerProgress * 100 + '%' }"
                  />
                </div>
              </div>
            </div>
            <small class="lg:w-full">{{
              t("home.quote_updated_every", { seconds: 12 })
            }}</small>
          </div>

          <!-- DISPONIBILIZAR QUANDO O BACK TIVER SUPORTE -->
          <!-- <div class="flex flex-col gap-2 mt-4">
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
          </div> -->
        </div>
      </div>
    </div>

    <div>
      <div class="mt-4 w-full bg-[#111111] p-2 rounded-lg">
        <DataTable :value="movements" tableStyle="min-width: 50rem" scrollable>
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">{{
                t("home.last_movements")
              }}</span>
            </div>
          </template>
          <template #empty> Não há dados para serem exibidos.</template>

          <Column field="name" :header="t('table.date')">
            <template #body="slotProps">
              <p>{{ getFormatDate(slotProps.data.created_at) }}</p>
              <small class="text-gray-400">{{
                getFormatTime(slotProps.data.created_at)
              }}</small>
            </template>
          </Column>

          <Column :header="t('table.type')">
            <template #body="slotProps">
              <MovementTag :type="slotProps.data.movable_type" />
            </template>
          </Column>

          <Column field="price" :header="t('table.currency')">
            <template #body="slotProps">
              <MovementCrypto
                v-if="slotProps.data.movable_type === 'deposit'"
                :crypto="'brl'"
              />
              <MovementCrypto
                v-if="slotProps.data.movable_type === 'withdrawal'"
                :crypto="'trx'"
              />
              <ConvertCrypto
                v-if="slotProps.data.movable_type === 'trade'"
                :cryptoFrom="'brl'"
                :cryptoTo="'usdt'"
              />
            </template>
          </Column>

          <Column field="category" :header="t('table.value')">
            <template #body="slotProps">
              <div v-if="slotProps.data.movable_type === 'deposit'">
                <span class="text-green-400">+</span>
                {{ Math.abs(slotProps.data.amount_brl) }}
                BRL
              </div>

              <div v-if="slotProps.data.movable_type === 'withdrawal'">
                <div>
                  <span class="text-red-400">- </span>
                  <span> {{ Math.abs(slotProps.data.amount_usdt) }} USDT</span>
                </div>
                <small class="text-xs text-surface-400">≈ 120 TRX</small>
              </div>

              <div v-if="slotProps.data.movable_type === 'trade'">
                <span class="text-green-400">+</span>
                {{ Math.abs(slotProps.data.amount_usdt) }}
                USDT
              </div>
            </template>
          </Column>

          <Column
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
                count: movements ? movements.length : 0,
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
