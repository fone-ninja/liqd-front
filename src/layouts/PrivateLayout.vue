<script setup lang="ts">
import Loading from "@/components/fallback/Loading.vue";
import StartContent from "@/components/content/StartContent.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <StartContent />
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
