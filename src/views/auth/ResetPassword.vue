<script setup lang="ts">
import logo from "../../../public/logo.png";
import { useRouter } from "vue-router";

const router = useRouter();

const goToSignin = () => {
  router.push({ name: "signin" });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <div class="flex justify-center">
      <div class="w-[410px]">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">Forgot password</p>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="username">Password</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">Confirm password</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <Button size="small" label="Reset Password" @click="goToSignin" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
