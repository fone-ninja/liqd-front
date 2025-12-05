<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../../../public/logo.png'

defineOptions({ name: 'AuthSuccess' })

const countdown = ref(3)
const router = useRouter()

onMounted(async () => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(interval)
      router.push({ name: 'home' }) // ajuste o nome da rota se necessário
    }
  }, 1000)
})
</script>

<template>
  <div class="success-container">
    <img :src="logo" alt="logo" class="w-[140px] mb-6" />
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/people-celebrate-success-illustration-download-in-svg-png-gif-file-formats--best-employee-businessman-student-pack-business-illustrations-9929363.png?f=webp"
      alt="Sucesso"
      class="success-illustration"
    />
    <h1>Autenticação realizada com sucesso!</h1>
    <p>Você será redirecionado para a página inicial em {{ countdown }} segundos.</p>
  </div>
</template>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.success-illustration {
  width: 160px;
  margin-bottom: 24px;
}

.spinner {
  margin-top: 24px;
  width: 48px;
  height: 48px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
