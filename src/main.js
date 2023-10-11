import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router.js';
import { createPinia } from 'pinia' // Creates a Pinia instance to be used by app

createApp(App).use(router).use(createPinia()).mount('#app')

// import router from './router'
// const app = createApp(App);
// app.use(router).use(store).mount('#app')