<script setup>
import { RouterView } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
</script>

<template>
  <AppHeader />
  <main class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
.app-main { min-height: 100vh; }

.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-base);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
