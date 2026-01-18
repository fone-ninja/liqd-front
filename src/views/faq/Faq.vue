<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  PhQuestion,
  PhChatCircle,
  PhWhatsappLogo,
  PhPhone,
  PhInfo,
  PhEnvelopeSimple,
  PhWarning,
} from "@phosphor-icons/vue";
import MovementModal from "@/components/movements/modal/MovementModal.vue";

const showMovementModal = ref(false);
const movement = ref(null);

const whatsapp = ref(import.meta.env.VITE_WHATSAPP_NUMBER);

function formatWhatsappNumber(num: string | number): string {
  const digits = String(num).replace(/\D/g, "");

  if (digits.length === 11) {
    const ddd = digits.slice(0, 2);
    const prefix = digits.slice(2, 7);
    const suffix = digits.slice(7);
    return `(${ddd}) ${prefix}-${suffix}`;
  }

  if (digits.length === 10) {
    const ddd = digits.slice(0, 2);
    const prefix = digits.slice(2, 6);
    const suffix = digits.slice(6);
    return `(${ddd}) ${prefix}-${suffix}`;
  }

  return num as string;
}
const email = ref(import.meta.env.VITE_EMAIL);

const { t } = useI18n();

const faq = ref([
  {
    id: "1",
    title: "O que é a LIQD?",
    content:
      "A LIQD é uma plataforma que facilita a conversão de Real para USDT (e vice-versa), proporcionando um meio seguro e eficiente para lojistas e usuários em geral realizarem transações em criptomoedas.",
  },
  {
    id: "2",
    title: "O que é USDT?",
    content:
      "USDT (Tether) é uma stablecoin, ou seja, uma criptomoeda com valor estável atrelado ao dólar americano, o que facilita transações e armazenamento de valor com menor volatilidade.",
  },
  {
    id: "3",
    title: "Como funciona o processo de conversão de Real para USDT?",
    content:
      "Através do nosso aplicativo, você pode converter Real para USDT de maneira simples e rápida. Basta cadastrar-se, verificar sua identidade, e seguir as instruções para depositar reais e receber USDT na sua carteira digital.",
  },
  {
    id: "4",
    title: "É seguro usar a LIQD para converter minhas criptomoedas?",
    content:
      "Sim, a LIQD utiliza os mais altos padrões de segurança e transparência para garantir que suas transações sejam protegidas. Nossa plataforma é projetada para proteger os interesses dos clientes em todas as etapas do processo.",
  },
  {
    id: "5",
    title: "Posso converter USDT para Real usando a LIQD?",
    content:
      "Sim, nosso aplicativo permite que você converta USDT para Real de maneira fácil e rápida. O valor será depositado na sua conta bancária cadastrada após a conversão.",
  },
  {
    id: "6",
    title: "Quais são as taxas envolvidas nas transações?",
    content:
      "As taxas variam conforme o valor e o tipo de transação. Você pode consultar a tabela de taxas no nosso aplicativo ou site para obter informações detalhadas.",
  },
  {
    id: "7",
    title:
      "Como posso armazenar minhas criptomoedas de forma segura com a LIQD?",
    content:
      "A LIQD oferece soluções seguras de armazenamento de criptomoedas, utilizando tecnologias avançadas para garantir a proteção dos seus ativos digitais.",
  },
  {
    id: "8",
    title: "O que eu preciso para começar a usar a LIQD?",
    content:
      "Para começar, você precisa baixar nosso aplicativo, criar uma conta e realizar a verificação de identidade. Após isso, você poderá começar a converter e armazenar suas criptomoedas.",
  },
  {
    id: "9",
    title: "O aplicativo LIQD está disponível para quais plataformas?",
    content:
      "Nosso aplicativo está disponível para download nas plataformas iOS e Android.",
  },
  {
    id: "10",
    title: "Como entro em contato com o suporte da LIQD?",
    content:
      "Você pode entrar em contato com nosso suporte através do chat no aplicativo, e-mail ou telefone. Estamos disponíveis para ajudar com qualquer dúvida ou problema que você possa ter.",
  },
  {
    id: "11",
    title: "A LIQD é regulamentada?",
    content:
      "Sim, a LIQD opera em conformidade com as regulamentações brasileiras para garantir segurança e transparência em todas as transações.",
  },
  {
    id: "12",
    title: "Quais são os benefícios de usar a LIQD para lojistas?",
    content:
      "Os lojistas podem aceitar pagamentos em USDT, facilitando transações com menor volatilidade e maior segurança. A conversão para Real também é simplificada, tornando o processo de recebimento mais eficiente.",
  },
  {
    id: "13",
    title: "Posso usar a LIQD para transações internacionais?",
    content:
      "Sim, com a conversão para USDT, você pode realizar transações internacionais de maneira fácil e segura, aproveitando a estabilidade da stablecoin.",
  },
  {
    id: "14",
    title: "Como a LIQD protege meus dados pessoais?",
    content:
      "A LIQD utiliza tecnologias avançadas de criptografia e conformidade com as normas de proteção de dados para garantir que suas informações pessoais estejam sempre seguras.",
  },
  {
    id: "15",
    title: "Posso ganhar recompensas usando a LIQD?",
    content:
      "Sim, temos programas de fidelidade e promoções periódicas onde você pode ganhar recompensas ao usar nossos serviços. Fique atento às novidades no nosso aplicativo e redes sociais.",
  },
]);

function openWhatsapp() {
  const digits = String(whatsapp.value).replace(/\D/g, "");
  window.open(`https://wa.me/55${digits}`, "_blank");
}

function openEmail() {
  window.open(`mailto:${email.value}`);
}
</script>

<template>
  <div class="px-8 py-4">
    <MovementModal v-model="showMovementModal" :movement />

    <h1 class="text-xl mb-2">
      <b class="text-white pb-2 border-b-2 border-white">{{
        t("faq.title")
      }}</b>
    </h1>

    <div class="mt-12 w-full">
      <div class="flex flex-col w-full bg-[#111111] p-6 rounded-lg mt-4">
        <div class="flex flex-col gap-8">
          <div class="flex gap-2 items-center">
            <PhQuestion
              :size="26"
              weight="fill"
              class="text-white cursor-pointer"
            />
            <h2 class="text-white text-2xl font-bold">Perguntas frequentes</h2>
          </div>

          <div>
            <div class="card">
              <Accordion value="0">
                <AccordionPanel
                  v-for="value in faq"
                  :key="value.id"
                  :value="value.id"
                >
                  <AccordionHeader
                    :pt="{
                      root: {
                        class: 'bg-[#111111]! px-0!',
                      },
                    }"
                    >{{ value.title }}</AccordionHeader
                  >
                  <AccordionContent
                    :pt="{
                      content: {
                        class: 'bg-[#111111]! px-0!',
                      },
                    }"
                  >
                    <p class="m-0">
                      {{ value.content }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="flex flex-col w-full bg-[#111111] p-6 rounded-lg mt-4">
        <div class="flex flex-col gap-8">
          <div class="flex gap-2 items-center">
            <PhChatCircle
              :size="26"
              weight="fill"
              class="text-white cursor-pointer"
            />
            <h2 class="text-white text-2xl font-bold">Fale conosco</h2>
          </div>

          <div>
            <div class="flex-col lg:flex-row flex gap-4">
              <div class="w-full lg:w-1/2 whatsapp bg-[#181818] p-4 rounded-lg">
                <div class="contact-content">
                  <div class="flex gap-4">
                    <div
                      class="bg-[#21C55E] rounded-full flex items-center justify-center p-2"
                    >
                      <PhWhatsappLogo :size="34" class="whatsapp-icon" />
                    </div>

                    <div>
                      <div class="contact-title font-bold text-white">
                        WhatsApp
                      </div>
                      <div class="contact-desc">
                        Atendimento rápido e direto
                      </div>
                    </div>
                  </div>

                  <div class="contact-info-row mt-4">
                    <span class="contact-info">
                      <PhPhone
                        :size="18"
                        class="inline-block mr-2"
                        color="#21C55E"
                      />
                      <span class="text-white font-semi-bold">{{
                        formatWhatsappNumber(whatsapp)
                      }}</span>
                    </span>
                  </div>

                  <div class="contact-info-row mt-2">
                    <PhInfo
                      :size="18"
                      class="inline-block mr-2"
                      color="#bdbdbd"
                    />
                    <span class="contact-info"
                      >Segunda a Sexta: 8h às 20h | Sábado: 9h às 15h</span
                    >
                  </div>

                  <Button
                    variant="outline"
                    size="small"
                    class="mt-4"
                    fluid
                    @click="openWhatsapp"
                  >
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>

              <div class="w-full lg:w-1/2 whatsapp bg-[#181818] p-4 rounded-lg">
                <div class="contact-content">
                  <div class="flex gap-4">
                    <div
                      class="bg-blue-500 rounded-full flex items-center justify-center p-2"
                    >
                      <PhEnvelopeSimple :size="34" class="whatsapp-icon" />
                    </div>

                    <div>
                      <div class="contact-title font-bold text-white">
                        Email
                      </div>
                      <div class="contact-desc">
                        Para dúvidas mais complexas
                      </div>
                    </div>
                  </div>

                  <div class="contact-info-row mt-4">
                    <span class="contact-info">
                      <PhEnvelopeSimple
                        :size="18"
                        class="inline-block mr-2"
                        color="#2B7FFF"
                      />
                      <span class="text-white font-semi-bold">{{ email }}</span>
                    </span>
                  </div>

                  <div class="contact-info-row mt-2">
                    <PhInfo
                      :size="18"
                      class="inline-block mr-2"
                      color="#bdbdbd"
                    />
                    <span class="contact-info">Resposta em até 24 horas</span>
                  </div>

                  <Button
                    outlined
                    size="small"
                    class="mt-4"
                    fluid
                    @click="openEmail"
                  >
                    Enviar Email
                  </Button>
                </div>
              </div>
            </div>

            <div class="bg-[#181818] rounded-md p-4 mt-4">
              <div class="mb-1 text-white flex items-center">
                <PhWarning
                  :size="18"
                  class="inline-block mr-2"
                  color="#FFD500"
                />
                <b>Importante</b>
              </div>

              <span
                >Para questões relacionadas à segurança da conta, suspeita de
                fraude ou problemas urgentes, entre em contato imediatamente
                pelo WhatsApp. Nossa equipe está preparada para ajudar você com
                qualquer situação relacionada aos seus investimentos e
                transações.</span
              >
            </div>
          </div>
        </div>
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
