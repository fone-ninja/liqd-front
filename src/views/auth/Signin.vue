<script setup lang="ts">
import { useRouter } from "vue-router";

import logo from "../../../public/logo.png";

const router = useRouter();

const goToSignup = () => {
  router.push({ name: "signup" });
};

const goToForgotPassword = () => {
  router.push({ name: "forgot-password" });
};

const goToHome = () => {
  router.push({ name: "home" });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <div class="flex justify-center">
      <div class="w-[410px]">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">Welcome to X Scan</p>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="username">Email</label>
            <InputText
              size="small"
              id="username"
              v-model="value"
              aria-describedby="username-help"
              fluid
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="username">Password</label>
            <Password fluid size="small" v-model="value" :feedback="false" />
          </div>

          <div class="flex justify-between">
            <div class="flex items-center gap-2">
              <Checkbox
                v-model="pizza"
                inputId="ingredient1"
                name="pizza"
                value="Cheese"
              />
              <label for="ingredient1"> Remember me </label>
            </div>

            <span class="cursor-pointer" @click="goToForgotPassword">
              Forgot Password
            </span>
          </div>

          <Button size="small" label="Sign in" @click="goToHome" />

          <Divider align="center" class="my-2!">
            <b>Don`t have an account?</b>
          </Divider>

          <Button
            size="small"
            label="Sign up"
            severity="secondary"
            @click="goToSignup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
