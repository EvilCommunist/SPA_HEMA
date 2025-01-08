import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '../views/StoreView.vue'
import HowOrder from '../views/HowOrder.vue'
import ProdCard from '../views/ProdCard.vue'

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
  ],
})

export default router
