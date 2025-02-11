import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getSession();

  const isAuthPage = ['/login', '/register'].includes(to.path);

  if (!authStore.user && !isAuthPage) {
    return { path: '/login' };
  }

  if (authStore.user && isAuthPage) {
    return { path: '/' };
  }
});

export default router;
