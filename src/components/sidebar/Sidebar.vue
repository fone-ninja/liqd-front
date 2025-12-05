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

const isSelected = (routeName: string) => {
  return String(route.name) === routeName;
};

const goTo = (routeName: string) => {
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
  <aside class="sidebar">
    <div>
      <div>
        <div class="font-bold pl-5 pt-6 text-xs text-white mb-[-4px]">
          <span>PRINCIPAL</span>
        </div>

        <ul>
          <li
            :class="['flex items-center gap-2', { active: isSelected('home') }]"
            @click="goTo('home')"
          >
            <PhHouse :size="16" weight="fill" class="item-icon" />
            <span class="item-text">Home</span>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <div class="font-bold pl-5 text-xs text-white mb-[-4px]">
          <span>TRANSAÇÕES</span>
        </div>

        <ul>
          <li
            :class="[
              'flex items-center gap-2',
              { active: isSelected('deposit') },
            ]"
            @click="goTo('deposit')"
          >
            <PhHandDeposit :size="16" weight="fill" class="item-icon" />
            <span class="item-text">Depositar</span>
          </li>
          <li
            :class="[
              'flex items-center gap-2',
              { active: isSelected('convert') },
            ]"
            @click="goTo('convert')"
          >
            <PhCoins :size="16" weight="fill" class="item-icon" />
            <span class="item-text">Converter</span>
          </li>
          <li
            :class="[
              'flex items-center gap-2',
              { active: isSelected('withdraw') },
            ]"
            @click="goTo('withdraw')"
          >
            <PhHandWithdraw :size="16" weight="fill" class="item-icon" />
            <span class="item-text">Sacar</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="cta-section">
      <ul>
        <li class="flex items-center gap-2" @click="signout">
          <PhSignOut :size="16" weight="fill" class="item-icon" />
          <span class="item-text">Sair da conta</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: var(--sidebar-width);
  border-right: 1px solid #3f3f45;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
  position: fixed;
}

ul {
  padding: 12px 8px;
}

li {
  padding: 8px 12px;
}

.cta-section {
  border-top: 1px solid #3f3f45;
  display: flex;
}

li:hover,
li.active {
  cursor: pointer;
  background-color: #111111;
  border-radius: 8px;

  & .item-icon {
    color: white;
  }
  & .item-text {
    color: white;
  }
}
</style>
