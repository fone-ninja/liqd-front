<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Tabbar from "@/components/tabbar/Tabbar.vue";
import Header from "@/components/header/Header.vue";
import Loading from "@/components/fallback/Loading.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-1 pb-[64px]! lg:pb-0!">
          <Sidebar class="hidden! lg:flex!" />
          <main class="main-content">
            <RouterView />
          </main>
        </div>
        <Tabbar class="block! lg:hidden!" />
      </div>
    </template>

    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style scoped>
.main-content {
  padding-left: 0;

  padding-top: var(--header-height);
  width: 100%;
}

@media (width >= 64rem) {
  .main-content {
    padding-left: var(--sidebar-width);
  }
}
</style>
