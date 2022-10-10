import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'


import { router } from './router/index.js'
import store from './stores/index'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)
app.use(store)

app.use(Quasar, {
  plugins: { Notify }

})

app.mount('#app')
