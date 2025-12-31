<script setup lang="ts">
import { useRouter } from "vue-router";
import logo from "../../../public/logo.png";
import {
  PhUser,
  PhSignOut,
  PhEye,
  PhEyeSlash,
  PhFlag,
} from "@phosphor-icons/vue";
import useAuth from "@/use/useAuth/useAuth";
import { markRaw, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { setDateLocal } from "@/utils/date";
import { userStore } from "@/stores/userStore";
import { getInitials } from "@/utils/text";

const { signout } = useAuth();

const router = useRouter();
const userState = userStore();
const hiddenValues = ref(false);

const amountUSDT = ref(3000);
const amountBRL = ref(3000);

const amoountUSDTShown = computed(() => {
  if (hiddenValues.value) {
    return "••••••";
  }

  return `${amountUSDT.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
});

const amoountBRLShown = computed(() => {
  if (hiddenValues.value) {
    return "••••••";
  }

  return `${amountBRL.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
});

const logout = async () => {
  try {
    await signout();
    router.replace({ name: "signin" });
  } catch (error) {
    console.log(error);
  }
};

const menu = ref();
const { t, locale } = useI18n();
const items = computed(() => [
  {
    id: "profile",
    label: t("header.my_profile"),
    icon: markRaw(PhUser),
    command: () => {
      router.push({ name: "profile" });
    },
  },
  {
    id: "language",
    label: t("header.language"),
    icon: markRaw(PhFlag),
    items: [
      {
        id: "en",
        parentId: "language",
        label: t("languages.english"),
        img: "https://app.tcr.finance/img/language_flags/EN.svg",
        command: () => {
          locale.value = "en";
          if (typeof window !== "undefined") {
            localStorage.setItem("locale", "en");
            setDateLocal("en");
          }
        },
      },
      {
        id: "pt",
        parentId: "language",
        label: t("languages.portuguese"),
        img: "https://app.tcr.finance/img/language_flags/pt-BR.svg",
        command: () => {
          locale.value = "pt";
          if (typeof window !== "undefined") {
            localStorage.setItem("locale", "pt");
            setDateLocal("pt");
          }
        },
      },
      {
        id: "es",
        parentId: "language",
        label: t("languages.spanish"),
        img: "https://app.tcr.finance/img/language_flags/ES.svg",
        command: () => {
          locale.value = "es";
          if (typeof window !== "undefined") {
            localStorage.setItem("locale", "es");
            setDateLocal("es");
          }
        },
      },
    ],
  },
  {
    id: "logout",
    label: t("header.logout"),
    icon: markRaw(PhSignOut),
    command: () => {
      logout();
    },
  },
  {
    separator: true,
  },
]);

const handleLanguageSelection = (item) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale");
    return saved && item.id === saved;
  }

  return false;
};

const getItemSelected = (item) => {
  if (item.parentId === "language") return handleLanguageSelection(item);

  return false;
};

onMounted(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (saved) locale.value = saved;
  }
});

const toggle = (event) => {
  menu.value.toggle(event);
};

const goTo = (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<template>
  <header>
    <div @click="goTo('home')" class="cursor-pointer">
      <img :src="logo" alt="logo" class="w-[100px]" />
    </div>

    <div class="flex items-center">
      <div class="hidden lg:flex gap-4">
        <!-- DISPONIBILIZAR QUANDO TIVER SOCKET -->
        <!-- <div class="flex flex-col">
          <span class="text-sm text-white font-semibold">USDT Compra</span>
          <div class="flex items-center gap-1">
            <span class="text-sm text-green-500">$ 3.000,00</span>
            <PhArrowClockwise
              :size="16"
              weight="fill"
              color="white"
              class="cursor-pointer"
            />
          </div>
        </div> -->

        <!-- DISPONIBILIZAR QUANDO O BACK TIVER SUPORTE -->
        <!-- <div class="flex flex-col border-l border-white-500 pl-4">
          <span class="text-sm text-white font-semibold">USDT Venda</span>
          <div class="flex items-center gap-1">
            <span class="text-sm text-red-500">$ 3.000,00</span>
            <PhArrowClockwise
              :size="16"
              weight="fill"
              color="white"
              class="cursor-pointer"
            />
          </div>
        </div> -->

        <div class="flex flex-col ml-4 justify-end">
          <span class="text-sm text-white font-semibold text-right"
            >AMERICA ASSET LLC</span
          >
          <div class="flex items-center justify-end gap-1">
            <span class="text-xs text-green-500">R$ {{ amoountBRLShown }}</span>
            <span>|</span>
            <span class="text-xs text-blue-300"
              >{{ amoountUSDTShown }} USDT</span
            >
            <component
              :is="hiddenValues ? PhEyeSlash : PhEye"
              :size="16"
              weight="fill"
              color="white"
              class="cursor-pointer ml-1"
              @click="hiddenValues = !hiddenValues"
            />
          </div>
        </div>
      </div>
      <div
        class="ml-8 rounded-full bg-blue-400 text-white h-[36px] w-[36px] flex items-center justify-center font-bold cursor-pointer"
        @click="toggle"
      >
        {{ getInitials(userState.userData?.name) }}
      </div>
      <TieredMenu ref="menu" id="overlay_menu" :model="items" :popup="true">
        <template #item="{ item, props, hasSubmenu }">
          <a
            v-ripple
            class="flex items-center"
            v-bind="props.action"
            :class="{ 'menu-item-selected': getItemSelected(item) }"
          >
            <component v-if="item.icon" :is="item.icon" />
            <img v-else :src="item.img" class="h-4 w-4 rounded" />
            <span class="ml-1">{{ item.label }}</span>

            <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
          </a>
        </template>
        <template #end>
          <div class="flex justify-start items-center p-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              class="mr-2 w-[26px]! h-[26px]!"
              shape="circle"
            />
            <small class="font-bold">{{ userState.userData?.email }}</small>
          </div>
        </template>
      </TieredMenu>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  height: var(--header-height);
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #3f3f45;
  background-color: #111111;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.menu-item-selected {
  background-color: #27272a;
}
</style>
