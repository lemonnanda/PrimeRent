<script setup>
import BaseButton from '../components/base/BaseButton.vue';
</script>

<template>
  <div class="not-found">
    <div class="nf-content">
      <span class="nf-code">404</span>
      <h1 class="nf-title">Halaman Tidak Ditemukan</h1>
      <p class="nf-text">Sepertinya rute yang kamu tuju tidak ada, atau sudah dipindahkan. Yuk balik ke beranda.</p>
      <div class="nf-actions">
        <BaseButton to="/" variant="primary" size="lg">Ke Beranda</BaseButton>
        <BaseButton to="/explore" variant="secondary" size="lg">Lihat Katalog</BaseButton>
      </div>
    </div>
    <div class="nf-glow"></div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-6);
}
.nf-glow {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.12), transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}
.nf-content { text-align: center; position: relative; z-index: 1; max-width: 480px; }
.nf-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(120deg, var(--primary-500), var(--primary-400));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}
.nf-title { font-size: var(--fs-2xl); margin: var(--space-4) 0 var(--space-3); }
.nf-text { color: var(--text-secondary); margin-bottom: var(--space-8); }
.nf-actions { display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; }
</style>
