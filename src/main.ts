import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { VueTelegramPlugin } from 'vue-tg'
import router from './router'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
// import { init } from '@telegram-apps/sdk-vue';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// init()
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueTelegramPlugin)
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
