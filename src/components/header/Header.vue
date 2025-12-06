<script setup lang="ts">
import { useRouter } from "vue-router";
import logo from "../../../public/logo.png";
import {
  PhUser,
  PhGear,
  PhMoney,
  PhSignOut,
  PhArrowClockwise,
  PhEye,
} from "@phosphor-icons/vue";

import * as authService from "@/services/auth/authService";

import { markRaw, ref, computed } from "vue";

const router = useRouter();
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

const signout = async () => {
  try {
    // await authService.signout();
    router.replace({ name: "signin" });
  } catch (error) {
    console.log(error);
  }
};

const menu = ref();
const items = ref([
  {
    label: "My profile",
    icon: markRaw(PhUser),
  },
  {
    label: "Logout",
    icon: markRaw(PhSignOut),
    command: () => {
      signout();
    },
  },
  {
    separator: true,
  },
]);

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
            <PhEye
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
        ER
      </div>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <component :is="item.icon" class="mr-1" />
            <span class="text-sm">{{ item.label }}</span>
            <Badge v-if="!!item.badge" size="small">{{ item.badge }}</Badge>
          </a>
        </template>
        <template #end>
          <div class="flex justify-start items-center p-2">
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              class="mr-2 w-[26px]! h-[26px]!"
              shape="circle"
            />
            <small class="font-bold">eduardo@gmail.com</small>
          </div>
        </template>
      </Menu>
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
</style>
