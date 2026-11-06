<script setup>
defineProps({
  tag: { type: String, default: 'div' },
  hoverable: { type: Boolean, default: false },
  padding: { type: String, default: 'md' }
});
</script>

<template>
  <component :is="tag" :class="['base-card', { 'is-hoverable': hoverable }, `pad-${padding}`]">
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}
.pad-sm { padding: var(--space-4); }
.pad-md { padding: var(--space-6); }
.pad-lg { padding: var(--space-8); }
.pad-none { padding: 0; }

.is-hoverable {
  transition: transform var(--transition-base), border-color var(--transition-base),
    box-shadow var(--transition-base);
}
.is-hoverable:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-lg);
}
</style>
