<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import BaseButton from '../components/base/BaseButton.vue';
import ItemCard from '../components/shared/ItemCard.vue';

const store = useStore();
const featured = computed(() => store.getters.availableItems.slice(0, 3));

const features = [
  { icon: 'wallet', title: 'Harga Pelajar', text: 'Mulai Rp4.500/hari — lebih murah dari jajan cireng.' },
  { icon: 'shield', title: 'Aman & Terpercaya', text: 'Akun resmi, no curang, garansi penuh selama sewa.' },
  { icon: 'whatsapp', title: 'Checkout via WhatsApp', text: 'Pesan langsung ke admin, draf sudah otomatis terisi.' },
  { icon: 'bolt', title: 'Instan & Mudah', text: 'Pilih game, hitung hari, kirim pesan. Selesai.' }
];
const steps = [
  { n: '01', title: 'Pilih Bundle Game', text: 'Jelajahi katalog dan pilih paket akun Steam sesuai genre favoritmu.' },
  { n: '02', title: 'Hitung Durasi Sewa', text: 'Tentukan berapa hari dan lihat total harga otomatis terhitung.' },
  { n: '03', title: 'Kirim ke WhatsApp', text: 'Klik checkout dan pesananmu langsung terkirim ke admin dengan rincian lengkap.' }
];
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <span class="hero-badge">Platform Sewa Akun Steam untuk Pelajar</span>
        <h1 class="hero-title">
          Main Game Impian<br />
          <span class="gradient-text">dengan Uang Jajan</span>
        </h1>
        <p class="hero-subtitle">
          PrimeRent menyewakan akun Steam berisi koleksi game AAA lengkap.
          Hemat, aman, dan cukup bayar per hari. Khusus pelajar SD, SMP, SMA atau SMK.
        </p>
        <div class="hero-actions">
          <BaseButton to="/explore" variant="primary" size="lg">Jelajahi Katalog</BaseButton>
          <BaseButton href="https://youtu.be/9D3SwoSAL0E" variant="secondary" size="lg">Tutorial</BaseButton>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-num">6+</span><span class="stat-label">Bundle Game</span></div>
          <div class="stat"><span class="stat-num">18+</span><span class="stat-label">Judul AAA</span></div>
          <div class="stat"><span class="stat-num">Rp4.5K</span><span class="stat-label">Mulai / Hari</span></div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow">Kenapa PrimeRent</span>
        <h2 class="section-title">Sewa game, bukan beli mahal</h2>
      </div>
      <div class="feature-grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <div class="feature-icon">
            <svg v-if="f.icon === 'wallet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" /><path d="M18 12h.01" /></svg>
            <svg v-else-if="f.icon === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
            <svg v-else-if="f.icon === 'whatsapp'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          </div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-text">{{ f.text }}</p>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section class="section">
      <div class="section-head row">
        <div>
          <span class="eyebrow">Pilihan Populer</span>
          <h2 class="section-title">Bundle yang sedang tren</h2>
        </div>
        <BaseButton to="/explore" variant="ghost">Lihat semua &rarr;</BaseButton>
      </div>
      <div class="featured-grid">
        <ItemCard v-for="item in featured" :key="item.id" :item="item" />
      </div>
    </section>

    <!-- Steps -->
    <section class="section steps-section">
      <div class="section-head">
        <span class="eyebrow">Tiga Langkah Saja</span>
        <h2 class="section-title">Gampang banget, kok</h2>
      </div>
      <div class="steps-grid">
        <div v-for="s in steps" :key="s.n" class="step-card">
          <span class="step-num">{{ s.n }}</span>
          <h3 class="step-title">{{ s.title }}</h3>
          <p class="step-text">{{ s.text }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <BaseCard padding="lg" class="cta-card">
        <h2 class="cta-title">Siap main game impianmu?</h2>
        <p class="cta-text">Jangan tunggu promo. Harga sewa sudah serendah uang jajan harianmu.</p>
        <BaseButton to="/explore" variant="primary" size="lg">Mulai Sewa Sekarang</BaseButton>
      </BaseCard>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-24) var(--space-6) var(--space-16);
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  top: 10%; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.18), transparent 65%);
  filter: blur(40px);
  pointer-events: none;
}
.hero-content { position: relative; z-index: 1; max-width: 760px; }
.hero-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.25);
  color: var(--primary-400);
  font-size: var(--fs-sm);
  font-weight: 600;
  margin-bottom: var(--space-6);
}
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}
.gradient-text {
  background: linear-gradient(120deg, var(--primary-400), var(--accent-400));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  margin-top: var(--space-6);
  color: var(--text-secondary);
  font-size: var(--fs-lg);
  line-height: var(--lh-body);
}
.hero-actions { display: flex; gap: var(--space-4); justify-content: center; margin-top: var(--space-8); flex-wrap: wrap; }
.hero-stats {
  display: flex; gap: var(--space-10); justify-content: center;
  margin-top: var(--space-12); flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-family: var(--font-display); font-size: var(--fs-3xl); font-weight: 800; color: var(--primary-400); }
.stat-label { font-size: var(--fs-sm); color: var(--text-muted); }

.section { max-width: var(--max-width); margin: 0 auto; padding: var(--space-12) var(--space-6); }
.section-head { text-align: center; margin-bottom: var(--space-10); }
.section-head.row { display: flex; align-items: flex-end; justify-content: space-between; text-align: left; flex-wrap: wrap; gap: var(--space-4); }
.eyebrow {
  display: inline-block;
  color: var(--primary-500);
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}
.section-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; }

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}
.feature-card {
  padding: var(--space-8);
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base), border-color var(--transition-base);
}
.feature-card:hover { transform: translateY(-4px); border-color: var(--border-strong); }
.feature-icon {
  width: 52px; height: 52px;
  display: grid; place-items: center;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 212, 255, 0.05));
  color: var(--primary-400);
  margin-bottom: var(--space-5);
}
.feature-title { font-size: var(--fs-lg); margin-bottom: var(--space-2); }
.feature-text { color: var(--text-secondary); font-size: var(--fs-sm); line-height: var(--lh-body); }

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.step-card {
  padding: var(--space-8);
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}
.step-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--primary-500), transparent);
}
.step-num {
  font-family: var(--font-display);
  font-size: var(--fs-4xl);
  font-weight: 800;
  color: rgba(0, 212, 255, 0.15);
  display: block;
  margin-bottom: var(--space-2);
}
.step-title { font-size: var(--fs-lg); margin-bottom: var(--space-3); }
.step-text { color: var(--text-secondary); font-size: var(--fs-sm); }

.cta-section { max-width: var(--max-width); margin: 0 auto; padding: var(--space-8) var(--space-6) var(--space-16); }
.cta-card {
  text-align: center;
  padding: var(--space-16) var(--space-8);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.08), rgba(6, 10, 16, 0.6));
  border-color: var(--border-strong);
}
.cta-title { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: var(--space-4); }
.cta-text { color: var(--text-secondary); margin-bottom: var(--space-8); font-size: var(--fs-lg); }

@media (max-width: 900px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
  .featured-grid, .steps-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .feature-grid { grid-template-columns: 1fr; }
  .hero-stats { gap: var(--space-6); }
}
</style>
