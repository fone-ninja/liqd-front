<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import MovementTag from "@/components/movements/MovementTag.vue";
import MovementCrypto from "@/components/movements/MovementCrypto.vue";
import ConvertCrypto from "@/components/convert/ConvertCrypto.vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";
import ConvertModal from "@/components/convert/ConvertModal.vue";
import {
  PhEye,
  PhEyeSlash,
  PhArrowsClockwise,
  PhArrowsHorizontal,
  PhArrowsDownUp,
  PhFile,
} from "@phosphor-icons/vue";
import dayjs from "dayjs";
import { userStore } from "@/stores/userStore";
import { quoteStore } from "@/stores/quoteStore";
import { useToast } from "primevue/usetoast";
import type { InputNumberInputEvent } from "primevue/inputnumber";
import { formatCurrency } from "@/utils/currency";
import useTransaction from "@/use/useTransaction/useTransaction";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const { t } = useI18n();
const toast = useToast();
const showMovementModal = ref(false);
const showConvertModal = ref(false);
const movement = ref(null);
const { getTransaction, getTransactions } = useTransaction();

const hiddenFrom = ref(false);
const hiddenTo = ref(false);

const latestMovements = ref([]);

const userState = userStore();
const quoteState = quoteStore();

const signinSchema = toTypedSchema(
  z.object({
    brlBalance: z
      .number()
      .refine(
        (val) => {
          const max = Number(userState.userData?.brl) ?? 0;
          return val <= max;
        },
        {
          error: `Saldo insuficiente`,
        }
      )
      .gte(25, "O valor mínimo: R$25,00")
      .nullable(),
    usdtBalance: z.number().nullable(),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema: signinSchema,
  initialValues: {
    brlBalance: null,
    usdtBalance: null,
  },
});

const { value: brlBalance, errorMessage: brlBalanceError } = useField<
  number | null
>("brlBalance");
const { value: usdtBalance, errorMessage: usdtBalanceError } = useField<
  number | null
>("usdtBalance");

const showMinBalanceConvert = () => {
  toast.add({
    severity: "warn",
    summary: "Valor insuficiente",
    detail: "O valor mínimo para a conversão é de R$25,00",
    life: 5000,
  });
};

const amountBRL = computed(() => {
  const brlAmount = Number(userState.userData?.brl || 0);

  return formatCurrency({
    value: brlAmount,
    symbol: "BRL",
  });
});

const amoountUSDTShown = computed(() => {
  const usdtAmount = Number(userState.userData?.usdt || 0);

  return formatCurrency({
    value: usdtAmount,
    symbol: "$",
    hiddenValues: hiddenTo.value,
  });
});

const amoountBRLShown = computed(() => {
  const brlAmount = Number(userState.userData?.brl || 0);

  return formatCurrency({
    value: brlAmount,
    symbol: "R$",
    hiddenValues: hiddenFrom.value,
  });
});

const getFormatDate = (dateStr: string) => {
  return dayjs(dateStr).format("DD MMM. YYYY").toLowerCase();
};

const getFormatTime = (dateStr: string) => {
  return dayjs(dateStr).format("HH:mm");
};

const changeAmountBalanceToMax = () => {
  brlBalance.value = Number(userState.userData?.brl) || 0;
  onChangeBalance({ value: brlBalance.value } as InputNumberInputEvent);
};

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

const convertBalance = handleSubmit(() => {
  if ((brlBalance.value || 0) < 25) {
    showMinBalanceConvert();
    return;
  }

  showConvertModal.value = true;
});

const onChangeBalance = (event: InputNumberInputEvent) => {
  const inputValue = Number(event.value || 0);
  const dolarQuote = Number(quoteState.quoteData?.price || 0);

  brlBalance.value = inputValue;
  usdtBalance.value = inputValue / dolarQuote;
};

const resultConvertedAmount = computed(() => {
  return usdtBalance.value || 0;
});

const newWalletBalanceUSDT = computed(() => {
  const currentUSDT = Number(userState.userData?.usdt) || 0;
  return currentUSDT + (usdtBalance.value || 0);
});

const getLatestMovements = async () => {
  const params = {
    filters: {
      movable_type: {
        $eq: "trade",
      },
    },
  };

  try {
    const data = await getTransactions(params);
    latestMovements.value = data.filter((el) => el.movable_type === "trade");
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

onMounted(() => {
  getLatestMovements();
});
</script>

<template>
  <div class="px-8 py-4">
    <MovementModal v-model="showMovementModal" :movement />
    <ConvertModal
      v-if="showConvertModal"
      v-model="showConvertModal"
      :brlBalance
      :quoteAmount="Number(quoteState?.quoteData?.price || 0)"
      @update:getMovements="getLatestMovements"
    />

    <h1 class="text-xl mb-2">
      <b class="text-white pb-2 border-b-2 border-white">{{
        t("convert.title")
      }}</b>
    </h1>

    <div class="mt-12 w-full">
      <div class="flex flex-col lg:flex-row gap-2 mb-4">
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

      <div>
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="bg-[#111111] p-6 rounded-lg flex-1">
            <div
              class="flex flex-col lg:flex-row gap-4 border-b border-gray-400 pb-8 mb-4 justify-between items-start"
            >
              <div class="order-2 lg:w-1/2 lg:order-none">
                <InputNumber
                  :minFractionDigits="2"
                  :maxFractionDigits="4"
                  :modelValue="brlBalance"
                  @input="(e) => onChangeBalance(e)"
                  placeholder="Price"
                  class="flex-1 lg:flex-initial lg:w-full"
                  :pt="{
                    root: { class: 'min-w-[100px]!' },
                    pcinputtext: { root: { class: 'min-w-[100px]!' } },
                  }"
                />

                <p v-if="!!brlBalanceError" class="mt-1 text-xs text-red-400">
                  {{ brlBalanceError }}
                </p>

                <p v-else class="mt-1 text-xs">
                  {{ t("convert.min_value", { value: "R$25,00" }) }}
                </p>
              </div>

              <MovementCrypto crypto="brl" class="order-1 lg:order-none" />
            </div>

            <div class="flex flex-col">
              <p>{{ t("convert.available") }}</p>
              <div class="flex justify-between">
                <span class="text-white"> {{ amountBRL }}</span>
                <div
                  class="cursor-pointer text-[#E94F06]"
                  @click="changeAmountBalanceToMax"
                >
                  {{ t("common.max") }}
                </div>
              </div>
            </div>
          </div>

          <div class="px-2">
            <div class="flex flex-col items-center justify-center h-full">
              <PhArrowsHorizontal
                size="32"
                class="text-white hidden lg:block"
              />
              <PhArrowsDownUp size="32" class="text-white block lg:hidden" />
            </div>
          </div>

          <div class="bg-[#111111] p-6 rounded-lg flex-1">
            <div class="flex flex-col justify-between h-full">
              <div class="flex flex-col lg:flex-row gap-4 justify-between">
                <div class="order-2 lg:w-1/2 lg:order-none">
                  <InputNumber
                    :minFractionDigits="2"
                    :maxFractionDigits="4"
                    v-model="usdtBalance"
                    placeholder="Price"
                    disabled
                    class="flex-1 lg:flex-initial lg:w-full"
                    :pt="{
                      root: { class: 'min-w-[100px]!' },
                      pcinputtext: { root: { class: 'min-w-[100px]!' } },
                    }"
                  />
                </div>
                <MovementCrypto crypto="usdt" class="order-1 lg:order-none" />
              </div>

              <Button
                size="small"
                :label="t('common.converter_button')"
                class="min-w-[130px] w-min hidden! lg:block! self-end!"
                :disabled="!brlBalance || !!brlBalanceError"
                @click="convertBalance"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full bg-[#111111] p-6 rounded-lg mt-4">
        <div class="flex flex-col gap-1">
          <div class="flex justify-between">
            <span>{{ t("convert.value_to_receive") }}</span>
            <span>{{
              formatCurrency({
                value: resultConvertedAmount,
                localeString: "en-US",
                symbol: "$",
              })
            }}</span>
          </div>

          <div class="flex justify-between">
            <span>Novo saldo da carteira</span>
            <span>
              {{
                formatCurrency({
                  value: newWalletBalanceUSDT,
                  localeString: "en-US",
                  symbol: "$",
                })
              }}</span
            >
          </div>

          <div class="flex justify-between">
            <span>{{ t("convert.usdt_buy_quote") }}</span>
            <span>
              {{
                formatCurrency({
                  value: Number(quoteState?.quoteData?.price || 0),
                })
              }}</span
            >
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
      />
    </div>

    <div>
      <div class="mt-4 w-full bg-[#111111] p-2 rounded-lg">
        <DataTable
          :value="latestMovements"
          tableStyle="min-width: 50rem"
          scrollable
        >
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xl font-bold">{{
                t("convert.last_movements")
              }}</span>
            </div>
          </template>

          <template #empty>
            Não há dados para serem exibidos. Faça sua primeira conversão.
          </template>

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
              <ConvertCrypto :cryptoFrom="'brl'" :cryptoTo="'usdt'" />
            </template>
          </Column>

          <Column field="category" :header="t('table.value')">
            <template #body="slotProps">
              <span class="text-green-400">+</span>
              {{ Math.abs(slotProps.data.amount_usdt) }}
              USDT
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
                count: latestMovements ? latestMovements.length : 0,
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
