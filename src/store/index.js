import { createStore } from 'vuex';
import { items } from '../data/items.js';

export default createStore({
  state: {
    items,
    bookings: [],
    favorites: []
  },
  getters: {
    allItems: (state) => state.items,
    getItemBySlug: (state) => (slug) => state.items.find((i) => i.slug === slug),
    availableItems: (state) => state.items.filter((i) => i.isAvailable),
    itemCategories: (state) => [...new Set(state.items.map((i) => i.category))],
    isFavorite: (state) => (id) => state.favorites.includes(id),
    favoriteCount: (state) => state.favorites.length
  },
  mutations: {
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking);
    },
    TOGGLE_FAVORITE(state, id) {
      const idx = state.favorites.indexOf(id);
      if (idx === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(idx, 1);
      }
    }
  },
  actions: {
    createBooking({ commit }, booking) {
      commit('ADD_BOOKING', booking);
      return booking;
    }
  }
});
