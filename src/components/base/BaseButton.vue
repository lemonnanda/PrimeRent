<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  to: { type: String, default: null },
  href: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false }
});

const tag = computed(() => {
  if (props.disabled) return 'button';
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'button';
});

const classes = computed(() => [
  'base-btn',
  `base-btn--${props.variant}`,
  `base-btn--${props.size}`,
  { 'is-disabled': props.disabled, 'is-full': props.fullWidth }
]);
</script>

<template>
  <component
    :is="tag"
    :to="!disabled ? to : undefined"
    :href="!disabled ? href : undefined"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: 600;
  border-radius: var(--radius-pill);
  transition: transform var(--transition-fast), box-shadow var(--transition-base),
    background var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
  white-space: nowrap;
  text-decoration: none;
  line-height: 1;
  border: 1px solid transparent;
}
.base-btn--sm { padding: var(--space-2) var(--space-4); font-size: var(--fs-sm); }
.base-btn--md { padding: var(--space-3) var(--space-6); font-size: var(--fs-base); }
.base-btn--lg { padding: var(--space-4) var(--space-8); font-size: var(--fs-lg); }

.base-btn--primary {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-400));
  color: var(--text-on-primary);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
}
.base-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0, 212, 255, 0.45); }

.base-btn--secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-strong);
}
.base-btn--secondary:hover { border-color: var(--primary-500); color: var(--primary-400); transform: translateY(-1px); }

.base-btn--success {
  background: linear-gradient(135deg, var(--success-500), var(--success-400));
  color: #001a0d;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
}
.base-btn--success:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(34, 197, 94, 0.45); }

.base-btn--whatsapp {
  background: linear-gradient(135deg, #25d366, #1ebe5d);
  color: #00210b;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
}
.base-btn--whatsapp:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37, 211, 102, 0.45); }

.base-btn--ghost {
  background: transparent;
  color: var(--text-secondary);
}
.base-btn--ghost:hover { color: var(--primary-400); }

.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
  transform: none !important;
}
.is-full { width: 100%; }
</style>
