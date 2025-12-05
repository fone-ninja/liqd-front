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

        <p class="py-5 text-xl font-bold text-white">Recovery code sent</p>

        <div class="flex flex-col gap-4">
          <div>
            <p class="mb-1">
              Enviamos um link de recuperação de senha para o seu e-mail.
              <b>eduardo.cmr@hotmail.com</b>.
            </p>
            <p>
              Caso em até 2 minutos não encontre em sua caixa de entrada ou
              caixa de spam, entre em contato conosco pelo botão de whatsapp
              abaixo.
            </p>
          </div>

          <Button
            size="small"
            label="WhatsApp Support"
            class="mt-4"
            @click="() => {}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
