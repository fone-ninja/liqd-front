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
      <div class="w-10/12 lg:w-6/12">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">
          {{ t("auth.signup.title") }}
        </p>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="username">{{ t("auth.signup.name_label") }}</label>
            <InputText
              size="small"
              id="username"
              v-model="value"
              aria-describedby="username-help"
              fluid
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">{{ t("auth.shared.email") }}</label>
            <InputText
              size="small"
              id="username"
              v-model="value"
              aria-describedby="username-help"
              fluid
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">{{ t("auth.shared.password") }}</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">{{
              t("auth.signup.confirm_password_label")
            }}</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <Button size="small" :label="t('auth.signup.create_button')" />

          <Divider align="center" class="my-2! hidden! lg:block">
            <b>{{ t("auth.signup.have_account") }}</b>
          </Divider>

          <Button
            size="small"
            :label="t('auth.signup.signin_button')"
            severity="secondary"
            @click="goToSignin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
