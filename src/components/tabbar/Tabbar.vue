<script setup lang="ts">
import { useRouter } from "vue-router";
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
      <li class="flex items-center gap-2" @click="goTo('home')">
        <PhHouse :size="28" weight="fill" class="item-icon" />
      </li>
      <li class="flex items-center gap-2" @click="goTo('deposit')">
        <PhHandDeposit :size="28" weight="fill" class="item-icon" />
      </li>
      <li class="flex items-center gap-2" @click="goTo('convert')">
        <PhCoins :size="28" weight="fill" class="item-icon" />
      </li>
      <li class="flex items-center gap-2" @click="goTo('withdraw')">
        <PhHandWithdraw :size="28" weight="fill" class="item-icon" />
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
