<script setup lang="ts">
import {
  defineModel,
  defineProps,
  defineEmits,
  ref,
  onMounted,
  computed,
  watch,
} from "vue";
import {
  PhFileText,
  PhCopy,
  PhDownload,
  PhSwap,
  PhWarning,
} from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/utils/currency";
import ConvertCryptoTransaction from "@/components/convert/ConvertCryptoTransaction.vue";
import useTransaction from "@/use/useTransaction/useTransaction";
import { quoteStore } from "@/stores/quoteStore";
import { userStore } from "@/stores/userStore";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();

const emit = defineEmits(["update:getMovements"]);

const props = defineProps({
  brlBalance: {
    type: [Number, null],
    required: true,
  },
  quoteAmount: {
    type: [Number, null],
    required: true,
  },
});

const model = defineModel({ default: false });
const userState = userStore();
const quoteData = quoteStore();
const toast = useToast();
const { createTransactions } = useTransaction();
const loading = ref(false);
const showChangeQuoteAlert = ref(false);

const quoteResponse = ref<any>(null);
const initialQuote = ref(0);
const initialBrlBalance = ref(0);
const localQuote = ref(0);
const localBrlBalance = ref(0);
const localUsdtBalance = ref(0);

const resultConvertedAmount = computed(() => {
  return localUsdtBalance.value || 0;
});

const newWalletBalanceUSDT = computed(() => {
  const currentUSDT = Number(userState.userData?.usdt) || 0;
  return currentUSDT + (localUsdtBalance.value || 0);
});

const generateQuote = async () => {
  loading.value = true;

  try {
    const data = await quoteData.createQuote({
      base: "brz",
      quote: "usdt",
      amount: localBrlBalance.value,
    });

    quoteResponse.value = data;

    localUsdtBalance.value = Number(quoteResponse.value.offer_price);
    localQuote.value = Number(quoteResponse.value.unit_price || 0);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const generateNewQuote = async () => {
  await generateQuote();
  showChangeQuoteAlert.value = false;
};

const generateTransaction = async () => {
  loading.value = true;

  try {
    await createTransactions({
      quote_id: quoteResponse.value.quote_id,
    });
    toast.add({
      severity: "success",
      summary: "Conversão efetuada",
      detail: "Sua conversão está sendo processada e em breve será concluída.",
      life: 5000,
    });
    emit("update:getMovements");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => quoteData.quoteData,
  (newQuote) => {
    console.log(newQuote?.price, localQuote.value);

    if (localQuote.value !== newQuote?.price) {
      showChangeQuoteAlert.value = true;
    }
  }
);

onMounted(() => {
  initialQuote.value = Number(props.quoteAmount || 0);
  initialBrlBalance.value = Number(props.brlBalance || 0);
  localQuote.value = initialQuote.value;
  localBrlBalance.value = initialBrlBalance.value;
  generateQuote();
});
</script>

<template>
  <Dialog
    v-model:visible="model"
    modal
    :style="{ width: '50rem', backgroundColor: '#181818', margin: '0 8px' }"
    :pt="{
      header: {
        class: 'p-0! border-b border-surface-500',
      },
      headeractions: {
        class: 'pr-4! ',
      },
    }"
  >
    <template #header>
      <div class="pt-4 pl-4 pb-6 inline-flex items-center gap-4 w-full">
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/10"
        >
          <PhSwap :size="26" weight="fill" class="text-green-400" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-lg font-semibold">{{
            t("Confirmar conversão")
          }}</span>
        </div>
      </div>
    </template>
    <template #default>
      <div v-if="loading" class="flex items-center justify-center h-[280px]">
        <ProgressSpinner strokeWidth="2" class="w-20! h-20!" />
      </div>
      <div v-else class="mb-6">
        <Message
          v-if="showChangeQuoteAlert"
          class="mt-8"
          severity="warn"
          :pt="{
            text: {
              class: 'w-full!',
            },
          }"
        >
          <div class="flex gap-1 justify-between w-full">
            <div class="flex justify-center items-center">
              <PhWarning :size="24" weight="fill" class="text-yellow-500" />
              <span class="ml-2"
                >A cotação foi atualizada. Atualize o valor para
                prosseguir.</span
              >
            </div>
            <Button
              size="small"
              variant="outlined"
              severity="warn"
              @click="generateNewQuote"
              >Atualizar cotação</Button
            >
          </div>
        </Message>

        <div class="flex justify-center my-8">
          <ConvertCryptoTransaction
            :cryptoFrom="'brl'"
            :cryptoTo="'usdt'"
            :balanceFrom="localBrlBalance"
            :balanceTo="localUsdtBalance"
          />
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
                    value: Number(initialQuote || 0),
                  })
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        size="small"
        type="button"
        label="Confirmar"
        :disabled="showChangeQuoteAlert || loading"
        :loading
        @click="generateTransaction"
      />
    </template>
  </Dialog>
</template>

<style scoped>
li {
  padding: 16px 0;
  border-bottom: 1px solid #333333;
  display: flex;
  justify-content: space-between;
}
</style>
