import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { createLogger } from './util/util.store-logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Store({
  strict: false,
  plugins: debug 
    ? [createLogger()] 
    : []
})