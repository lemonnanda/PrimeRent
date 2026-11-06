import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export function useItemFilter() {
  const store = useStore();
  const items = computed(() => store.getters.allItems);

  const searchQuery = ref('');
  const selectedCategory = ref('Semua');
  const sortBy = ref('default');

  const filteredItems = computed(() => {
    let result = items.value;

    if (selectedCategory.value !== 'Semua') {
      result = result.filter((i) => i.category === selectedCategory.value);
    }

    const q = searchQuery.value.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    const favSet = new Set(store.state.favorites);
    const sorted = [...result].sort((a, b) => {
      const aFav = favSet.has(a.id) ? 1 : 0;
      const bFav = favSet.has(b.id) ? 1 : 0;
      if (aFav !== bFav) return bFav - aFav;

      if (sortBy.value === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy.value === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy.value === 'available') return Number(b.isAvailable) - Number(a.isAvailable);
      return 0;
    });
    return sorted;
  });

  const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = 'Semua';
    sortBy.value = 'default';
  };

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredItems,
    resetFilters
  };
}
