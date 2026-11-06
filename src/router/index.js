import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'PrimeRent — Sewa Akun Steam Hemat untuk Pelajar' }
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import('../views/ExploreView.vue'),
    meta: { title: 'Jelajahi Katalog Game — PrimeRent' }
  },
  {
    path: '/explore/:slug',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    meta: { title: 'Detail Paket — PrimeRent' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Tentang Kami — PrimeRent' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Halaman Tidak Ditemukan — PrimeRent' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || 'PrimeRent';
});

export default router;
