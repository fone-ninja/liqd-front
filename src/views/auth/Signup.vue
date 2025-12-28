<script setup lang="ts">
import logo from "../../../public/logo.png";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useAuth from "@/use/useAuth/useAuth";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const router = useRouter();
const { t } = useI18n();
const { signup } = useAuth();

const signupSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(4, t("validation.name_min_length")),
      email: z.email(t("validation.email_invalid")),
      password: z.string().min(8, t("validation.password_min_length")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwords_do_not_match"),
      path: ["confirmPassword"],
    })
);

const { handleSubmit, meta } = useForm({
  validationSchema: signupSchema,
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const { value: nameValue, errorMessage: nameErrorMessage } =
  useField<string>("name");
const { value: emailValue, errorMessage: emailErrorMessage } =
  useField<string>("email");
const { value: passwordValue, errorMessage: passwordErrorMessage } =
  useField<string>("password");
const {
  value: confirmPasswordValue,
  errorMessage: confirmPasswordErrorMessage,
} = useField<string>("confirmPassword");

const goToSignin = () => {
  router.push({ name: "signin" });
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await signup(values);
    goToSignin();
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
          {{ t("auth.signup.title") }}
        </p>

        <form @submit="onSubmit" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="name" :class="{ 'text-red-300': nameErrorMessage }">{{
              t("auth.signup.name_label")
            }}</label>
            <InputText
              size="small"
              id="name"
              v-model="nameValue"
              aria-describedby="name-help"
              fluid
              :invalid="!!nameErrorMessage"
            />
            <small v-if="nameErrorMessage" class="text-red-300">{{
              nameErrorMessage
            }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" :class="{ 'text-red-300': emailErrorMessage }">{{
              t("auth.shared.email")
            }}</label>
            <InputText
              size="small"
              id="email"
              v-model="emailValue"
              aria-describedby="email-help"
              fluid
              :invalid="!!emailErrorMessage"
            />
            <small v-if="emailErrorMessage" class="text-red-300">{{
              emailErrorMessage
            }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label
              for="password"
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

          <div class="flex flex-col gap-1">
            <label
              for="confirmPassword"
              :class="{ 'text-red-300': confirmPasswordErrorMessage }"
              >{{ t("auth.signup.confirm_password_label") }}</label
            >
            <Password
              fluid
              size="small"
              v-model="confirmPasswordValue"
              :feedback="false"
              :invalid="!!confirmPasswordErrorMessage"
            />
            <small v-if="confirmPasswordErrorMessage" class="text-red-300">{{
              confirmPasswordErrorMessage
            }}</small>
          </div>

          <Button
            size="small"
            :label="t('auth.signup.create_button')"
            :disabled="!meta.valid"
            type="submit"
          />

          <Divider align="center" class="my-2! hidden! lg:block">
            <b>{{ t("auth.signup.have_account") }}</b>
          </Divider>

          <Button
            size="small"
            :label="t('auth.signup.signin_button')"
            severity="secondary"
            @click="goToSignin"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
