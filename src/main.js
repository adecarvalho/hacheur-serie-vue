import "@babel/polyfill"
import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import VueChartkick from "vue-chartkick"
import Chart from "chart.js"

Vue.use(VueChartkick, { adapter: Chart })

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")
