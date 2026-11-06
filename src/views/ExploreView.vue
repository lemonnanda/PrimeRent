<script setup>
import { useStore } from 'vuex';
import { useItemFilter } from '../composables/useItemFilter.js';
import { categories } from '../data/items.js';
import ItemCard from '../components/shared/ItemCard.vue';
import SearchBar from '../components/shared/SearchBar.vue';
import EmptyState from '../components/shared/EmptyState.vue';
import BaseButton from '../components/base/BaseButton.vue';

const store = useStore();
const totalItems = store.getters.allItems.length;

const { searchQuery, selectedCategory, sortBy, filteredItems, resetFilters } = useItemFilter();
</script>

<template>
  <div class="explore-view">
    <div class="page-hero">
      <span class="eyebrow">Katalog Lengkap</span>
      <h1 class="page-title">Jelajahi Semua Bundle Game</h1>
      <p class="page-subtitle">Temukan {{ totalItems }} paket akun Steam siap sewa, mulai dari RPG epik sampai horor menegangkan.</p>
    </div>

    <div class="explore-body">
      <div class="toolbar">
        <SearchBar v-model="searchQuery" placeholder="Cari nama game atau genre..." />
        <div class="toolbar-right">
          <div class="sort-select">
            <select v-model="sortBy" aria-label="Urutkan">
              <option value="default">Urutkan: Default</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Termahal</option>
              <option value="available">Ketersediaan</option>
            </select>
          </div>
        </div>
      </div>

      <div class="category-bar">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['cat-chip', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="result-meta">
        <span>{{ filteredItems.length }} bundle ditemukan</span>
      </div>

      <TransitionGroup v-if="filteredItems.length" name="grid" tag="div" class="grid">
        <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" />
      </TransitionGroup>

      <EmptyState v-else title="Bundle tidak ditemukan" message="Coba ubah kata kunci atau pilih kategori lain." @reset="resetFilters">
        <BaseButton variant="secondary" size="sm" @click="resetFilters" style="margin-top: 16px">Reset Filter</BaseButton>
      </EmptyState>
    </div>
  </div>
</template>

<style scoped>
.explore-view { min-height: 100vh; }
.page-hero {
  text-align: center;
  padding: calc(var(--header-height) + var(--space-16)) var(--space-6) var(--space-10);
  max-width: 760px;
  margin: 0 auto;
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
.page-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; }
.page-subtitle { margin-top: var(--space-4); color: var(--text-secondary); font-size: var(--fs-lg); }

.explore-body { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--space-6) var(--space-16); }

.toolbar {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}
.toolbar-right { margin-left: auto; }
.sort-select select {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}
.sort-select select:focus { border-color: var(--primary-500); }

.category-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}
.cat-chip {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}
.cat-chip:hover { border-color: var(--primary-500); color: var(--primary-400); }
.cat-chip.active {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-400));
  color: var(--text-on-primary);
  border-color: transparent;
}

.result-meta { color: var(--text-muted); font-size: var(--fs-sm); margin-bottom: var(--space-5); }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.grid-enter-active, .grid-leave-active { transition: opacity var(--transition-base), transform var(--transition-base); }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: scale(0.95); }

@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; }
  .toolbar-right { margin-left: 0; }
}
</style>
