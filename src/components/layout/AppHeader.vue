<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const scrolled = ref(false);
const mobileOpen = ref(false);

const onScroll = () => { scrolled.value = window.scrollY > 24; };
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const closeMobile = () => { mobileOpen.value = false; };
</script>

<template>
  <header :class="['app-header', { 'is-scrolled': scrolled }]">
    <div class="container">
      <RouterLink to="/" class="brand" @click="closeMobile">
        <span class="brand-mark">P</span>
        <span class="brand-text">Prime<span class="brand-accent">Rent</span></span>
      </RouterLink>

      <nav class="nav-desktop">
        <RouterLink to="/" exact-active-class="is-active">Beranda</RouterLink>
        <RouterLink to="/explore" active-class="is-active">Jelajahi</RouterLink>
        <RouterLink to="/about" active-class="is-active">Tentang</RouterLink>
      </nav>

      <button class="nav-toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <span :class="{ open: mobileOpen }"></span>
      </button>
    </div>

    <Transition name="slide">
      <nav v-if="mobileOpen" class="nav-mobile">
        <RouterLink to="/" @click="closeMobile">Beranda</RouterLink>
        <RouterLink to="/explore" @click="closeMobile">Jelajahi</RouterLink>
        <RouterLink to="/about" @click="closeMobile">Tentang</RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
  transition: background var(--transition-base), backdrop-filter var(--transition-base),
    border-color var(--transition-base);
  background: rgba(6, 10, 16, 0.2);
  border-bottom: 1px solid transparent;
}
.app-header.is-scrolled {
  background: rgba(6, 10, 16, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border-default);
}
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
}
.brand-mark {
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--primary-500), var(--primary-400));
  color: var(--text-on-primary);
  font-weight: 800;
  font-size: var(--fs-lg);
  font-family: var(--font-display);
  box-shadow: 0 4px 14px rgba(0, 212, 255, 0.4);
}
.brand-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-xl);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}
.brand-accent { color: var(--primary-500); }

.nav-desktop {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}
.nav-desktop a {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--fs-base);
  position: relative;
  transition: color var(--transition-fast);
  padding: var(--space-2) 0;
}
.nav-desktop a:hover { color: var(--text-primary); }
.nav-desktop a.is-active { color: var(--primary-400); }
.nav-desktop a.is-active::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
}

.nav-toggle {
  display: none;
  width: 40px; height: 40px;
  position: relative;
}
.nav-toggle span,
.nav-toggle span::before,
.nav-toggle span::after {
  content: '';
  position: absolute;
  left: 8px; right: 8px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base), top var(--transition-base);
}
.nav-toggle span { top: 19px; }
.nav-toggle span::before { top: -7px; }
.nav-toggle span::after { top: 7px; }
.nav-toggle span.open { background: transparent; }
.nav-toggle span.open::before { top: 0; transform: rotate(45deg); }
.nav-toggle span.open::after { top: 0; transform: rotate(-45deg); }

.nav-mobile {
  position: absolute;
  top: var(--header-height); left: 0; right: 0;
  background: rgba(6, 10, 16, 0.98);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-default);
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6);
}
.nav-mobile a {
  padding: var(--space-4) 0;
  color: var(--text-secondary);
  font-weight: 500;
  border-bottom: 1px solid var(--border-default);
}
.nav-mobile a:last-child { border-bottom: none; }
.nav-mobile a.router-link-active { color: var(--primary-400); }

.slide-enter-active, .slide-leave-active { transition: opacity var(--transition-base), transform var(--transition-base); }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 768px) {
  .nav-desktop { display: none; }
  .nav-toggle { display: block; }
}
</style>
