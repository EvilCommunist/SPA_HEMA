import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'; 
import store from './store/index'

window.$ = $;

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
