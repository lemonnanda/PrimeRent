<script setup>
defineProps({
  title: { type: String, default: 'Tidak ada hasil' },
  message: { type: String, default: 'Coba ubah kata kunci atau filter pencarianmu.' },
  icon: { type: String, default: 'search' }
});
defineEmits(['reset']);
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">
      <svg v-if="icon === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-message">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
  padding: var(--space-16) var(--space-6);
}
.empty-icon {
  width: 96px; height: 96px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}
.empty-title { font-size: var(--fs-xl); color: var(--text-primary); }
.empty-message { color: var(--text-secondary); max-width: 400px; }
</style>
