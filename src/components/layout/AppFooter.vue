<script setup>
import { RouterLink } from 'vue-router';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <RouterLink to="/" class="brand">
            <span class="brand-mark">P</span>
            <span class="brand-text">Prime<span class="brand-accent">Rent</span></span>
          </RouterLink>
          <p class="tagline">Sewa akun Steam hemat untuk pelajar SD, SMP, SMA, dan SMK.</p>
        </div>

        <nav class="footer-links">
          <RouterLink to="/">Beranda</RouterLink>
          <RouterLink to="/explore">Jelajahi</RouterLink>
          <RouterLink to="/about">Tentang</RouterLink>
        </nav>

        <div class="footer-contact">
          <p class="contact-label">Pesan langsung</p>
          <a href="https://wa.me/6281959502169" class="contact-link">WhatsApp Admin</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ year }} PrimeRent. Dibuat untuk pelajar Indonesia.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: var(--space-24);
  border-top: 1px solid var(--border-default);
  background: var(--neutral-900);
}
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-12) var(--space-6) var(--space-6);
}
.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: var(--space-8);
  padding-bottom: var(--space-8);
}
.brand { display: flex; align-items: center; gap: var(--space-3); text-decoration: none; }
.brand-mark {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--primary-500), var(--primary-400));
  color: var(--text-on-primary);
  font-weight: 800;
  font-family: var(--font-display);
}
.brand-text { font-family: var(--font-display); font-weight: 700; font-size: var(--fs-lg); color: var(--text-primary); }
.brand-accent { color: var(--primary-500); }
.tagline { color: var(--text-secondary); margin-top: var(--space-4); font-size: var(--fs-sm); max-width: 280px; }

.footer-links { display: flex; flex-direction: column; gap: var(--space-3); }
.footer-links a { color: var(--text-secondary); font-size: var(--fs-sm); }
.footer-links a:hover { color: var(--primary-400); }

.footer-contact { display: flex; flex-direction: column; gap: var(--space-2); }
.contact-label { color: var(--text-muted); font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: 0.08em; }
.contact-link { color: var(--success-400); font-weight: 600; }

.footer-bottom {
  border-top: 1px solid var(--border-default);
  padding-top: var(--space-6);
}
.footer-bottom p { color: var(--text-muted); font-size: var(--fs-sm); text-align: center; }

@media (max-width: 768px) {
  .footer-top { grid-template-columns: 1fr; gap: var(--space-6); }
}
</style>
