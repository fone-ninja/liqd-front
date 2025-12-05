<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import * as authService from "@/services/auth/authService";
import {
  PhBook,
  PhHouse,
  PhSignOut,
  PhCoins,
  PhHandDeposit,
  PhHandWithdraw,
} from "@phosphor-icons/vue";

import logo from "../../../public/logo.png";

const router = useRouter();
const route = useRoute();

const items = [
  { key: "home", route: "home", icon: PhHouse, label: "Home" },
  { key: "deposit", route: "deposit", icon: PhHandDeposit, label: "Depositar" },
  { key: "convert", route: "convert", icon: PhCoins, label: "Converter" },
  { key: "withdraw", route: "withdraw", icon: PhHandWithdraw, label: "Sacar" },
];

const isSelected = (routeName: string) => {
  return String(route.name) === routeName;
};

const goTo = (routeName) => {
  router.push({ name: routeName });
};

const signout = async () => {
  try {
    // await authService.signout();
    router.push({ name: "signin" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="tabbar">
    <ul class="flex justify-between items-center h-full">
      <li
        v-for="item in items"
        :key="item.key"
        :class="['flex items-center gap-2']"
        @click="goTo(item.route)"
      >
        <component
          :is="item.icon"
          :size="28"
          weight="fill"
          :color="isSelected(item.route) ? 'white' : undefined"
          class="item-icon"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #111111;
  border-top: 1px solid var(--color-border);
  padding: 0 64px;
  height: 64px;
  z-index: 1;
}
</style>
