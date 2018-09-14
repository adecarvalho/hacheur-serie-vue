import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/modele",
			name: "modele",
			component: () => import("@/views/SaisieModele.vue")
		},
		{
			path: "/mesure",
			name: "mesure",
			component: () => import("@/views/Mesure.vue")
		}
	]
})
