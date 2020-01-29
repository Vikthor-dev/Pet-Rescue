import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'

import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.use(Croppa);

/*service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
} */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
