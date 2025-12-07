<script setup lang="ts">
import logo from "../../../public/logo.png";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();
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
          {{ t("auth.codesent.title") }}
        </p>

        <div class="flex flex-col gap-4">
          <div>
            <p class="mb-1">
              {{ t("auth.codesent.message_part1") }}
              <b>{{ route.query.email }}</b
              >.
            </p>
            <p>{{ t("auth.codesent.message_part2") }}</p>
          </div>

          <Button
            size="small"
            :label="t('auth.codesent.back_to_signin_button')"
            class="mt-4"
            @click="
              () => {
                goToSignin();
              }
            "
          />

          <Button
            size="small"
            severity="secondary"
            :label="t('auth.codesent.whatsapp_button')"
            @click="() => {}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
