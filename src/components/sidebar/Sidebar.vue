<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import useAuth from "@/use/useAuth/useAuth";
import {
  PhBook,
  PhHouse,
  PhSignOut,
  PhCoins,
  PhHandDeposit,
  PhHandWithdraw,
  PhWhatsappLogo,
} from "@phosphor-icons/vue";

const { signout } = useAuth();

const router = useRouter();

const route = useRoute();

const isSelected = (routeName: string) => {
  return String(route.name) === routeName;
};

const goTo = (routeName: string) => {
  router.push({ name: routeName });
};

const logout = async () => {
  try {
    await signout();
    router.replace({ name: "signin" });
  } catch (error) {
    console.log(error);
  }
};

const goToFAQ = async () => {
  router.push({ name: "faq" });
};

const { t } = useI18n();
</script>

<template>
  <aside class="sidebar">
    <div>
      <div>
        <div class="font-bold pl-5 pt-6 text-xs text-white mb-[-4px]">
          <span>{{ t("sidebar.section_main") }}</span>
        </div>

        <ul>
          <li
            :class="['flex items-center gap-2', { active: isSelected('home') }]"
            @click="goTo('home')"
          >
            <PhHouse :size="16" weight="fill" class="item-icon" />
            <span class="item-text">{{ t("sidebar.home") }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <div class="font-bold pl-5 text-xs text-white mb-[-4px]">
          <span>{{ t("sidebar.section_transactions") }}</span>
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
            <span class="item-text">{{ t("sidebar.deposit") }}</span>
          </li>
          <li
            :class="[
              'flex items-center gap-2',
              { active: isSelected('convert') },
            ]"
            @click="goTo('convert')"
          >
            <PhCoins :size="16" weight="fill" class="item-icon" />
            <span class="item-text">{{ t("sidebar.convert") }}</span>
          </li>
          <!-- TODO: voltar quando o back estiver pronto -->
          <!-- <li
            :class="[
              'flex items-center gap-2',
              { active: isSelected('withdraw') },
            ]"
            @click="goTo('withdraw')"
          >
            <PhHandWithdraw :size="16" weight="fill" class="item-icon" />
            <span class="item-text">{{ t("sidebar.withdraw") }}</span>
          </li> -->
        </ul>
      </div>
    </div>

    <div class="cta-section">
      <ul class="w-full">
        <li class="flex items-center gap-2" @click="goToFAQ">
          <PhWhatsappLogo :size="16" weight="fill" class="item-icon" />
          <span class="item-text">{{ t("sidebar.help_center") }}</span>
        </li>
        <li class="flex items-center gap-2" @click="logout">
          <PhSignOut :size="16" weight="fill" class="item-icon" />
          <span class="item-text">{{ t("sidebar.sign_out") }}</span>
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
  margin: 2px 0;
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
