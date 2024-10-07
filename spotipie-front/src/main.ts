import './assets/main.css'

import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AuthorizationAdapter } from './adapter/AuthorizationAdapter'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authorizationAdapter = new AuthorizationAdapter()
provide('authorizationPort', authorizationAdapter)

app.mount('#app')
