<script setup>
defineEmits(['update:modelValue']);
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Cari...' }
});
</script>

<template>
  <div class="search-bar">
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="search-input"
    />
    <button v-if="modelValue" class="clear-btn" @click="$emit('update:modelValue', '')" aria-label="Hapus">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-pill);
  padding: var(--space-3) var(--space-5);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.search-bar:focus-within {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.12);
}
.search-icon { width: 20px; height: 20px; color: var(--text-muted); flex-shrink: 0; }
.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: var(--fs-base);
}
.search-input::placeholder { color: var(--text-muted); }
.clear-btn {
  display: grid; place-items: center;
  width: 24px; height: 24px;
  border-radius: 50%;
  color: var(--text-muted);
  transition: color var(--transition-fast), background var(--transition-fast);
}
.clear-btn:hover { color: var(--text-primary); background: var(--bg-card); }
</style>
