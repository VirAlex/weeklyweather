import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSearch, faBars, faStickyNote, faCalendar, faCog, faPlusSquare, faSun, faMapMarker, faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faSearch, faBars, faStickyNote, faCalendar, faCog, faPlusSquare, faSun, faMapMarker, faArrowCircleRight, faArrowCircleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
