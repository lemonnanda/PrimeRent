<script setup>
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';

const values = [
  { icon: 'wallet', title: 'Hemat Pelajar', text: 'Harga sewa dirancang setara uang jajan harian — mulai Rp4.500 per hari. Semua pelajar bisa ikut menikmati.' },
  { icon: 'shield', title: 'Aman & Transparan', text: 'Setiap akun resmi dari Steam. Tidak ada trik curang. Garansi penuh selama masa sewa berlangsung.' },
  { icon: 'whatsapp', title: 'Praktis via WhatsApp', text: 'Checkout langsung lewat WhatsApp admin. Draf pesan terisi otomatis dengan rincian lengkap pesananmu.' }
];

const mission = [
  'Memberi pelajar akses menikmati game story AAA tanpa harus beli akun mahal.',
  'Membangun ekosistem sewa akun yang aman, terpercaya, dan fair untuk semua pihak.',
  'Mendukung hobi gaming pelajar Indonesia tanpa membebani keuangan keluarga.'
];
</script>

<template>
  <div class="about-view">
    <section class="about-hero">
      <span class="eyebrow">Tentang PrimeRent</span>
      <h1 class="hero-title">Sewa akun Steam, bukan beli mahal.</h1>
      <p class="hero-subtitle">
        PrimeRent lahir dari satu ide sederhana: setiap pelajar berhak menikmati game story impian
        tanpa harus menguras uang jajan. Kami menyewakan akun Steam berisi koleksi game AAA lengkap
        dengan harga per hari yang ramah di kantong.
      </p>
    </section>

    <section class="section">
      <div class="value-grid">
        <BaseCard v-for="v in values" :key="v.title" padding="lg" hoverable class="value-card">
          <div class="value-icon">
            <svg v-if="v.icon === 'wallet'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" /><path d="M18 12h.01" /></svg>
            <svg v-else-if="v.icon === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
          </div>
          <h3 class="value-title">{{ v.title }}</h3>
          <p class="value-text">{{ v.text }}</p>
        </BaseCard>
      </div>
    </section>

    <section class="section mission-section">
      <BaseCard padding="lg" class="mission-card">
        <div class="mission-content">
          <span class="eyebrow">Misi Kami</span>
          <h2 class="mission-title">Kenapa PrimeRent ada</h2>
          <ul class="mission-list">
            <li v-for="m in mission" :key="m">
              <span class="bullet"></span>{{ m }}
            </li>
          </ul>
        </div>
      </BaseCard>
    </section>

    <section class="section cta">
      <div class="cta-inner">
        <h2>Mau mulai sewa?</h2>
        <p>Lihat katalog pilihan dan langsung pesan via WhatsApp.</p>
        <BaseButton to="/explore" variant="primary" size="lg">Lihat Katalog Game</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view { min-height: 100vh; }
.about-hero {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  padding: calc(var(--header-height) + var(--space-16)) var(--space-6) var(--space-10);
}
.eyebrow {
  display: inline-block;
  color: var(--primary-500);
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}
.hero-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; }
.hero-subtitle { margin-top: var(--space-6); color: var(--text-secondary); font-size: var(--fs-lg); line-height: var(--lh-body); }

.section { max-width: var(--max-width); margin: 0 auto; padding: var(--space-8) var(--space-6); }

.value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.value-card { display: flex; flex-direction: column; gap: var(--space-4); }
.value-icon {
  width: 56px; height: 56px;
  display: grid; place-items: center;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 212, 255, 0.05));
  color: var(--primary-400);
}
.value-title { font-size: var(--fs-xl); }
.value-text { color: var(--text-secondary); line-height: var(--lh-body); }

.mission-section { padding-top: var(--space-12); }
.mission-card {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.06), var(--bg-card));
  border-color: var(--border-strong);
}
.mission-content { max-width: 640px; }
.mission-title { font-size: var(--fs-2xl); margin-bottom: var(--space-6); }
.mission-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.mission-list li { display: flex; align-items: flex-start; gap: var(--space-3); color: var(--text-secondary); line-height: var(--lh-body); }
.bullet {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--primary-500);
  margin-top: 9px;
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
}

.cta { padding-bottom: var(--space-16); }
.cta-inner { text-align: center; }
.cta-inner h2 { font-size: var(--fs-3xl); margin-bottom: var(--space-3); }
.cta-inner p { color: var(--text-secondary); margin-bottom: var(--space-6); font-size: var(--fs-lg); }

@media (max-width: 900px) { .value-grid { grid-template-columns: 1fr; } }
</style>
