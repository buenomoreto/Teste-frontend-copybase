import './assets/index.css'
import 'v-calendar/style.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import VCalendar from 'v-calendar'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VCalendar, {})
app.use(MotionPlugin)
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.use(router)

app.mount('#app')
