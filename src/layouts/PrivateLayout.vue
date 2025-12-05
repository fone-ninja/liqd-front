<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import Header from '@/components/header/Header.vue'
import Loading from '@/components/fallback/Loading.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <div class="flex flex-col h-screen">
        <Header />
        <div class="flex h-screen">
          <Sidebar />
          <main class="main-content">
            <RouterView />
          </main>
        </div>
      </div>
    </template>

    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style scoped>
.main-content {
  padding-left: var(--sidebar-width);
  padding-top: var(--header-height);
  width: 100%;
}
</style>
