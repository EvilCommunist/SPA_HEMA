// Импорт функциональных элементов
const { createApp } = Vue;
const { createRouter, createWebHistory } = VueRouter;

// Импорт видов страниц
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Order from './pages/Order.vue';

// Создание роутера и определение маршрутов
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/howToOrder', component: Order }
    ]
});

const app = createApp({});
app.use(router);
app.mount('#page');
