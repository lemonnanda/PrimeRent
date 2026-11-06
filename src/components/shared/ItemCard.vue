<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../base/BaseButton.vue';
import BaseCard from '../base/BaseCard.vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const store = useStore();
const formatPrice = (n) => 'Rp ' + n.toLocaleString('id-ID');

const isFav = computed(() => store.getters.isFavorite(props.item.id));
const toggleFav = () => store.commit('TOGGLE_FAVORITE', props.item.id);
</script>

<template>
  <BaseCard tag="article" hoverable padding="none" class="item-card">
    <div class="card-media">
      <img :src="item.imageUrl" :alt="item.title" loading="lazy" />
      <span :class="['status-badge', item.isAvailable ? 'available' : 'rented']">
        <span class="dot"></span>
        {{ item.isAvailable ? 'Tersedia' : 'Disewa' }}
      </span>
      <span class="category-badge">{{ item.category }}</span>
      <button
        :class="['fav-btn', { active: isFav }]"
        @click.prevent="toggleFav"
        :aria-label="isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'"
      >
        <svg viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ item.title }}</h3>
      <p class="card-summary">{{ item.summary }}</p>

      <div class="card-highlights">
        <span v-for="h in item.highlights.slice(0, 2)" :key="h" class="highlight-chip">{{ h }}</span>
        <span v-if="item.highlights.length > 2" class="highlight-more">+{{ item.highlights.length - 2 }}</span>
      </div>

      <div class="card-footer">
        <div class="price">
          <span class="price-amount">{{ formatPrice(item.pricePerDay) }}</span>
          <span class="price-unit">/ hari</span>
        </div>
        <BaseButton
          :to="{ name: 'detail', params: { slug: item.slug } }"
          variant="primary"
          size="sm"
        >
          Lihat Detail
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.item-card { display: flex; flex-direction: column; height: 100%; }
.card-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.card-media img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}
.item-card:hover .card-media img { transform: scale(1.06); }

.status-badge {
  position: absolute;
  top: var(--space-3); right: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
  backdrop-filter: blur(8px);
}
.status-badge .dot { width: 7px; height: 7px; border-radius: 50%; }
.status-badge.available { background: rgba(34, 197, 94, 0.2); color: var(--success-400); border: 1px solid rgba(34, 197, 94, 0.4); }
.status-badge.available .dot { background: var(--success-400); box-shadow: 0 0 8px var(--success-400); animation: pulse 2s infinite; }
.status-badge.rented { background: rgba(239, 68, 68, 0.2); color: var(--error-400); border: 1px solid rgba(239, 68, 68, 0.4); }
.status-badge.rented .dot { background: var(--error-400); }

.category-badge {
  position: absolute;
  bottom: var(--space-3); left: var(--space-3);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
  background: rgba(6, 10, 16, 0.7);
  color: var(--primary-400);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-default);
}

.card-body { display: flex; flex-direction: column; gap: var(--space-3); padding: var(--space-5); flex: 1; }
.card-title { font-size: var(--fs-lg); font-weight: 700; }
.card-summary {
  color: var(--text-secondary);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-highlights { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.highlight-chip {
  font-size: var(--fs-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
.highlight-more {
  font-size: var(--fs-xs);
  padding: var(--space-1) var(--space-2);
  color: var(--primary-400);
  font-weight: 600;
}
.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding-top: var(--space-3);
}
.price { display: flex; align-items: baseline; gap: var(--space-1); }
.price-amount { font-size: var(--fs-xl); font-weight: 700; font-family: var(--font-display); color: var(--primary-400); }
.price-unit { font-size: var(--fs-xs); color: var(--text-muted); }

.fav-btn {
  position: absolute;
  top: var(--space-3); left: var(--space-3);
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: rgba(6, 10, 16, 0.7);
  border: 1px solid var(--border-default);
  backdrop-filter: blur(8px);
  color: var(--neutral-300);
  transition: color var(--transition-fast), background var(--transition-fast),
    border-color var(--transition-fast), transform var(--transition-fast);
}
.fav-btn:hover { color: var(--error-400); border-color: var(--error-400); transform: scale(1.1); }
.fav-btn.active { color: var(--error-500); border-color: var(--error-500); animation: pop 300ms ease; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
</style>
