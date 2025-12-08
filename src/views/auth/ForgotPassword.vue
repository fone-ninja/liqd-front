<script setup lang="ts">
import logo from "../../../public/logo.png";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const router = useRouter();
const { t } = useI18n();

const email = ref("");

const goToCodeSent = () => {
  router.push({
    name: "forgot-password-code-sent",
    query: { email: email.value },
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <div class="flex justify-center">
      <div class="w-10/12 lg:w-6/12">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">
          {{ t("auth.forgot.title") }}
        </p>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="username">{{ t("auth.shared.email") }}</label>
            <InputText
              size="small"
              id="username"
              v-model="email"
              aria-describedby="username-help"
              fluid
            />
          </div>

          <Button
            size="small"
            :label="t('auth.forgot.recovery_button')"
            @click="goToCodeSent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
