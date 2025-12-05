<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
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
