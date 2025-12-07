<script setup lang="ts">
import logo from "../../../public/logo.png";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const goToSignin = () => {
  router.push({ name: "signin" });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <div class="flex justify-center">
      <div class="w-[410px]">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">
          {{ t("auth.reset.title") }}
        </p>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="username">{{ t("auth.shared.password") }}</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">{{
              t("auth.reset.confirm_password_label")
            }}</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <Button
            size="small"
            :label="t('auth.reset.reset_button')"
            @click="goToSignin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
