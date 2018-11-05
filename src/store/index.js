// import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import getters from './getters'

import bds from './modules/bds'

// Vue.use(Vuex)

const modules = {
    bds,
    app,
    permission,
    errorLog
}

const store = new Vuex.Store({
    modules,
    getters
})

export default store
