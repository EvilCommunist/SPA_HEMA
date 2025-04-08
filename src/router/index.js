import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '../views/StoreView.vue'
import HowOrder from '../views/HowOrder.vue'
import ProdCard from '../views/ProdCard.vue'
import DevView from '../views/DevView.vue'
import CertView from '../views/CartView.vue'
import ChangeView from '@/views/ChangeView.vue'
import AddView from '@/views/AddView.vue'
import LoginView from '@/views/LoginView.vue'
import RegView from '@/views/RegView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/store',
      name: 'store',
      component: StoreView,
    },
    {
      path: '/howToOrder',
      name: 'howToOrder',
      component: HowOrder,
    },
    {
      path: '/product/:id',
      name: 'ProdCard',
      component: ProdCard,
      props: true,
    },
    {
      path: '/admin',
      name: 'DevView',
      component: DevView,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CertView,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: ChangeView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: AddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth',
      name: 'authorize',
      component: RegView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('/api/check_admin.php');
      const data = await response.json();
      if (!data.isAdmin) {
        next('/store');
      } else {
        next();
      }
    } catch (error) {
      console.error('Ошибка проверки администратора:', error);
      next('/store');
    }
  } else {
    next();
  }
});

export default router
