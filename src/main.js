import '@/assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { router } from './routes'

const pinia = createPinia()
const app = createApp(App)

app.use(autoAnimatePlugin).use(router).use(pinia)

app.mount('#app')
