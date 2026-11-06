<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
import ItemCard from '../components/shared/ItemCard.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const item = computed(() => store.getters.getItemBySlug(route.params.slug));

const rentDays = ref(1);
const minDays = 1;
const maxDays = 30;

const totalPrice = computed(() => {
  if (!item.value) return 0;
  return rentDays.value * item.value.pricePerDay;
});

const sliderProgress = computed(() => {
  return ((rentDays.value - minDays) / (maxDays - minDays)) * 100;
});

const formatPrice = (n) => 'Rp ' + n.toLocaleString('id-ID');

// WhatsApp checkout (MVP 3)
const WHATSAPP_NUMBER = '6281959502169';
const waLink = computed(() => {
  if (!item.value) return '#';
  const message =
    `Halo Admin PrimeRent!\n\n` +
    `Saya ingin menyewa akun Steam berikut:\n\n` +
    `ID Akun       : ${item.value.id}\n` +
    `Nama Bundle   : ${item.value.title}\n` +
    `Kategori      : ${item.value.category}\n` +
    `Durasi Sewa   : ${rentDays.value} hari\n` +
    `Harga / Hari  : ${formatPrice(item.value.pricePerDay)}\n` +
    `Total Harga   : ${formatPrice(totalPrice.value)}\n\n` +
    `Mohon konfirmasi ketersediaan dan langkah pembayaran selanjutnya. Terima kasih!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
});

const relatedItems = computed(() => {
  if (!item.value) return [];
  return store.getters.allItems
    .filter((i) => i.slug !== item.value.slug && i.category === item.value.category)
    .slice(0, 3);
});

watch(() => route.params.slug, () => { rentDays.value = 1; });
</script>

<template>
  <div class="detail-view">
    <!-- Not found fallback -->
    <div v-if="!item" class="not-found-wrap">
      <BaseCard padding="lg" class="nf-card">
        <h2>Bundle tidak ditemukan</h2>
        <p>Paket yang kamu cari mungkin sudah dihapus atau URL salah.</p>
        <BaseButton to="/explore" variant="primary" style="margin-top: 16px">Kembali ke Katalog</BaseButton>
      </BaseCard>
    </div>

    <template v-else>
      <!-- Breadcrumb -->
      <div class="breadcrumb-bar">
        <div class="breadcrumb">
          <RouterLink to="/">Beranda</RouterLink>
          <span class="sep">/</span>
          <RouterLink to="/explore">Jelajahi</RouterLink>
          <span class="sep">/</span>
          <span class="current">{{ item.title }}</span>
        </div>
      </div>

      <div class="detail-grid">
        <!-- Left: image -->
        <div class="media-col">
          <BaseCard padding="none" class="media-card">
            <img :src="item.imageUrl" :alt="item.title" />
            <div class="media-overlay">
              <span :class="['status-badge', item.isAvailable ? 'available' : 'rented']">
                <span class="dot"></span>
                {{ item.isAvailable ? 'Tersedia untuk Disewa' : 'Sedang Disewa' }}
              </span>
              <span class="cat-badge">{{ item.category }}</span>
            </div>
          </BaseCard>

          <div class="highlights-card">
            <h3>Game dalam Bundle Ini</h3>
            <ul>
              <li v-for="h in item.highlights" :key="h">
                <span class="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14" height="14"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                {{ h }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: info + calculator -->
        <div class="info-col">
          <h1 class="detail-title">{{ item.title }}</h1>
          <p class="detail-summary">{{ item.summary }}</p>

          <BaseCard padding="md" class="price-card">
            <div class="price-row">
              <div>
                <span class="price-label">Harga Sewa</span>
                <div class="price-main">
                  <span class="price-amount">{{ formatPrice(item.pricePerDay) }}</span>
                  <span class="price-unit">/ hari</span>
                </div>
              </div>
              <span :class="['avail-tag', item.isAvailable ? 'ok' : 'no']">
                {{ item.isAvailable ? 'Tersedia' : 'Sedang Disewa' }}
              </span>
            </div>
          </BaseCard>

          <p class="detail-desc">{{ item.description }}</p>

          <!-- MVP 2: Duration calculator -->
          <BaseCard padding="lg" class="calculator-card">
            <h3 class="calc-title">Kalkulator Durasi Sewa</h3>
            <div class="calc-slider-row">
              <span class="calc-label">Jumlah Hari</span>
              <div class="days-input">
                <button @click="rentDays = Math.max(minDays, rentDays - 1)" :disabled="!item.isAvailable || rentDays <= minDays" aria-label="Kurangi">&minus;</button>
                <input type="number" v-model.number="rentDays" :min="minDays" :max="maxDays" :disabled="!item.isAvailable" />
                <button @click="rentDays = Math.min(maxDays, rentDays + 1)" :disabled="!item.isAvailable || rentDays >= maxDays" aria-label="Tambah">+</button>
              </div>
            </div>
            <input
              type="range"
              v-model.number="rentDays"
              :min="minDays"
              :max="maxDays"
              :disabled="!item.isAvailable"
              class="slider"
              :style="{ '--progress': sliderProgress + '%' }"
            />
            <div class="calc-breakdown">
              <div class="breakdown-row">
                <span>{{ formatPrice(item.pricePerDay) }} &times; {{ rentDays }} hari</span>
                <span>{{ formatPrice(totalPrice) }}</span>
              </div>
              <div class="breakdown-total">
                <span>Total Estimasi</span>
                <span class="total-amount">{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>

            <!-- MVP 1 + MVP 3: Availability check + WhatsApp checkout -->
            <BaseButton
              v-if="item.isAvailable"
              :href="waLink"
              variant="whatsapp"
              size="lg"
              fullWidth
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z" /></svg>
              Checkout via WhatsApp
            </BaseButton>
            <BaseButton v-else variant="secondary" size="lg" fullWidth disabled>
              Akun Sedang Disewa
            </BaseButton>

            <p v-if="!item.isAvailable" class="unavail-note">
              Bundle ini sedang disewa pelanggan lain. Coba lagi nanti atau pilih bundle lain.
            </p>
          </BaseCard>
        </div>
      </div>

      <!-- Related -->
      <section v-if="relatedItems.length" class="related-section">
        <h2 class="related-title">Bundle Sejenis</h2>
        <div class="related-grid">
          <ItemCard v-for="ri in relatedItems" :key="ri.id" :item="ri" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-view { min-height: 100vh; }

.not-found-wrap { max-width: 500px; margin: calc(var(--header-height) + var(--space-16)) auto; padding: 0 var(--space-6); }
.nf-card { text-align: center; }
.nf-card h2 { margin-bottom: var(--space-3); }

.breadcrumb-bar { max-width: var(--max-width); margin: 0 auto; padding: calc(var(--header-height) + var(--space-6)) var(--space-6) var(--space-4); }
.breadcrumb { display: flex; align-items: center; gap: var(--space-2); font-size: var(--fs-sm); color: var(--text-muted); flex-wrap: wrap; }
.breadcrumb a { color: var(--text-secondary); }
.breadcrumb a:hover { color: var(--primary-400); }
.breadcrumb .sep { color: var(--text-muted); }
.breadcrumb .current { color: var(--text-primary); font-weight: 500; }

.detail-grid {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6) var(--space-16);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-10);
}

.media-col { display: flex; flex-direction: column; gap: var(--space-6); }
.media-card { overflow: hidden; }
.media-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.media-overlay { position: relative; margin-top: -48px; padding: 0 var(--space-4) var(--space-4); display: flex; align-items: center; justify-content: space-between; }
.status-badge {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--fs-sm); font-weight: 600;
  backdrop-filter: blur(10px);
}
.status-badge .dot { width: 8px; height: 8px; border-radius: 50%; }
.status-badge.available { background: rgba(34, 197, 94, 0.25); color: var(--success-400); border: 1px solid rgba(34, 197, 94, 0.4); }
.status-badge.available .dot { background: var(--success-400); animation: pulse 2s infinite; }
.status-badge.rented { background: rgba(239, 68, 68, 0.25); color: var(--error-400); border: 1px solid rgba(239, 68, 68, 0.4); }
.status-badge.rented .dot { background: var(--error-400); }
.cat-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs); font-weight: 600;
  background: rgba(6, 10, 16, 0.7);
  color: var(--primary-400);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-default);
}

.highlights-card { padding: var(--space-6); background: var(--bg-card); border: 1px solid var(--border-default); border-radius: var(--radius-lg); }
.highlights-card h3 { font-size: var(--fs-lg); margin-bottom: var(--space-4); }
.highlights-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.highlights-card li { display: flex; align-items: center; gap: var(--space-3); color: var(--text-primary); font-size: var(--fs-base); }
.check {
  width: 24px; height: 24px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.15);
  color: var(--primary-400);
  flex-shrink: 0;
}

.info-col { display: flex; flex-direction: column; gap: var(--space-5); }
.detail-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; }
.detail-summary { color: var(--text-secondary); font-size: var(--fs-lg); }

.price-card { display: flex; }
.price-row { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.price-label { font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.price-main { display: flex; align-items: baseline; gap: var(--space-1); margin-top: var(--space-1); }
.price-amount { font-family: var(--font-display); font-size: var(--fs-3xl); font-weight: 800; color: var(--primary-400); }
.price-unit { color: var(--text-muted); font-size: var(--fs-sm); }
.avail-tag { padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill); font-size: var(--fs-sm); font-weight: 600; }
.avail-tag.ok { background: rgba(34, 197, 94, 0.15); color: var(--success-400); border: 1px solid rgba(34, 197, 94, 0.3); }
.avail-tag.no { background: rgba(239, 68, 68, 0.15); color: var(--error-400); border: 1px solid rgba(239, 68, 68, 0.3); }

.detail-desc { color: var(--text-secondary); line-height: var(--lh-body); }

.calculator-card {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.06), var(--bg-card));
  border-color: var(--border-strong);
}
.calc-title { font-size: var(--fs-xl); margin-bottom: var(--space-6); }
.calc-slider-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5); }
.calc-label { font-weight: 600; color: var(--text-secondary); }
.days-input { display: flex; align-items: center; gap: var(--space-2); }
.days-input button {
  width: 36px; height: 36px;
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-size: var(--fs-lg);
  font-weight: 700;
  display: grid; place-items: center;
  transition: all var(--transition-fast);
}
.days-input button:hover:not(:disabled) { border-color: var(--primary-500); color: var(--primary-400); }
.days-input button:disabled { opacity: 0.4; cursor: not-allowed; }
.days-input input {
  width: 64px;
  text-align: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-weight: 700;
  font-size: var(--fs-lg);
  padding: var(--space-2) 0;
  outline: none;
}
.days-input input::-webkit-outer-spin-button,
.days-input input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

.slider {
  width: 100%;
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  margin-bottom: var(--space-6);
  background: linear-gradient(to right, var(--primary-500) 0%, var(--primary-500) var(--progress), var(--bg-elevated) var(--progress), var(--bg-elevated) 100%);
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--primary-400);
  border: 3px solid var(--neutral-900);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.5);
  cursor: pointer;
  transition: transform var(--transition-fast);
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.slider::-moz-range-thumb {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--primary-400);
  border: 3px solid var(--neutral-900);
  cursor: pointer;
}
.slider:disabled { opacity: 0.5; }

.calc-breakdown { margin-bottom: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--border-default); }
.breakdown-row { display: flex; justify-content: space-between; color: var(--text-secondary); font-size: var(--fs-sm); margin-bottom: var(--space-3); }
.breakdown-total { display: flex; justify-content: space-between; align-items: baseline; padding-top: var(--space-3); border-top: 1px solid var(--border-default); }
.breakdown-total span:first-child { font-weight: 600; color: var(--text-primary); }
.total-amount { font-family: var(--font-display); font-size: var(--fs-3xl); font-weight: 800; color: var(--primary-400); }

.unavail-note { text-align: center; color: var(--text-muted); font-size: var(--fs-sm); margin-top: var(--space-4); }

.related-section { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--space-6) var(--space-16); }
.related-title { font-size: var(--fs-2xl); margin-bottom: var(--space-6); }
.related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

@media (max-width: 900px) {
  .detail-grid { grid-template-columns: 1fr; gap: var(--space-6); }
  .related-grid { grid-template-columns: 1fr; }
}
</style>
