<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useAuth from "@/use/useAuth/useAuth";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import logo from "../../../public/logo.png";

const router = useRouter();
const { t } = useI18n();
const { signin } = useAuth();

const signinSchema = toTypedSchema(
  z.object({
    email: z.email(t("validation.email_invalid")),
    password: z.string().nonempty(t("validation.password_empty")),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema: signinSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { value: emailValue, errorMessage: emailErrorMessage } =
  useField<string>("email");
const { value: passwordValue, errorMessage: passwordErrorMessage } =
  useField<string>("password");

const goToSignup = () => {
  router.push({ name: "signup" });
};

const goToForgotPassword = () => {
  router.push({ name: "forgot-password" });
};

const goToHome = () => {
  router.push({ name: "home" });
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await signin(values);
    goToHome();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen w-full">
    <div class="flex justify-center">
      <div class="w-10/12 lg:w-6/12">
        <img :src="logo" alt="logo" class="w-1/3" />

        <p class="py-5 text-xl font-bold text-white">
          {{ t("auth.signin.title") }}
        </p>

        <form @submit="onSubmit" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label
              for="username"
              :class="{ 'text-red-300': emailErrorMessage }"
              >{{ t("auth.shared.email") }}</label
            >
            <InputText
              size="small"
              id="username"
              v-model="emailValue"
              aria-describedby="username-help"
              fluid
              :invalid="!!emailErrorMessage"
            />
            <small v-if="emailErrorMessage" class="text-red-300">{{
              emailErrorMessage
            }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label
              for="username"
              :class="{ 'text-red-300': passwordErrorMessage }"
              >{{ t("auth.shared.password") }}</label
            >
            <Password
              fluid
              size="small"
              v-model="passwordValue"
              :feedback="false"
              :invalid="!!passwordErrorMessage"
            />
            <small v-if="passwordErrorMessage" class="text-red-300">{{
              passwordErrorMessage
            }}</small>
          </div>

          <div class="flex justify-end">
            <!-- <div class="items-center gap-2 hidden lg:flex">
              <Checkbox
                inputId="ingredient1"
                name="remember"
                value="remember"
              />
              <label for="ingredient1"> {{ t("auth.signin.remember") }} </label>
            </div> -->

            <!-- TODO: Adicionar quando a API estiver pronta -->
            <!-- <span class="cursor-pointer" @click="goToForgotPassword">
              {{ t("auth.signin.forgot_password") }}
            </span> -->
          </div>

          <Button
            size="small"
            type="submit"
            :label="t('auth.signin.signin_button')"
            :disabled="!meta.valid"
          />

          <Divider align="center" class="my-2! hidden! lg:block">
            <b>{{ t("auth.signin.no_account") }}</b>
          </Divider>

          <Button
            size="small"
            :label="t('auth.signin.signup_button')"
            severity="secondary"
            @click="goToSignup"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
