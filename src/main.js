import Vue from 'vue'
import App from './app.component.vue'
import store from './app.store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});