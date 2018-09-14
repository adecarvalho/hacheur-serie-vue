import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		parametres: {
			ve: "50",
			r: "33",
			l: "0.1",
			vd0: "1.0",
			rdson: "0.1",
			f: "200",
			alpha: "50"
		},
		mesures: {
			tabUc: [],
			tabIc: [],
			tabTime: []
		}
	},
	mutations: {
		SET_PARAMETRES(state, payload) {
			state.parametres = payload
		},

		SET_PARAMETRES_RESET(state) {
			state.ve = "50"
			state.r = "33"
			state.l = "0.1"
			state.vd0 = "1.0"
			state.rdson = "0.1"
			state.f = "200"
			satte.alpha = "50"
		},

		SET_TAB_UC(state, payload) {
			state.mesures.tabUc = payload
		},

		SET_TAB_IC(state, payload) {
			state.mesures.tabIc = payload
		},

		SET_TAB_TIME(state, payload) {
			state.mesures.tabTime = payload
		}
	},
	getters: {
		getParametres(state) {
			return state.parametres
		},
		getMesures(state) {
			return state.mesures
		}
	},
	actions: {
		setParametres({ commit }, payload) {
			commit("SET_PARAMETRES", payload)
		},

		setTabUc({ commit }, payload) {
			commit("SET_TAB_UC", payload)
		},

		setTabIc({ commit }, payload) {
			commit("SET_TAB_IC", payload)
		},

		setTabTime({ commit }, payload) {
			commit("SET_TAB_TIME", payload)
		},

		setParametresReset({ commit }) {
			commit("SET_PARAMETRES_RESET")
		},
		//
		process({ commit, getters }) {
			const valmax = 1000
			const frequence = Number(getters.getParametres.f)
			const periode = 1 / frequence
			const pas = periode / 100.0
			const alpha = Number(getters.getParametres.alpha)

			const ve = Number(getters.getParametres.ve)
			const r = Number(getters.getParametres.r)
			const rdson = Number(getters.getParametres.rdson)
			const rcharge = r + rdson

			const lcharge = Number(getters.getParametres.l)
			const vd0 = Number(getters.getParametres.vd0)

			let tabIc = []
			let tabUc = []
			let tabTime = []

			//init
			for (let i = 0; i < valmax; i++) {
				tabTime.push(pas * i)
				tabUc.push(-vd0)
				tabIc.push(0.0)
			}

			//uc
			for (let cmp = 0; cmp <= 900; cmp += 100) {
				for (let i = 0 + cmp; i < alpha + cmp; i++) {
					tabUc[i] = ve
				}
			}
			//
			let cour1 = 0
			let cour2 = 0
			let cour3 = 0
			let tens1 = 0
			let tens2 = 0
			let tens3 = 0
			let tens4 = 0
			let f1 = 0
			let f2 = 0
			let f3 = 0
			let f4 = 0
			let tmp = 0
			let inc2 = 1
			//
			while (inc2 < valmax - 1) {
				cour1 = tabIc[inc2]
				tens1 = tabUc[inc2]
				f1 = (tens1 - rcharge * cour1) / lcharge

				cour2 = cour1 + pas / 2
				tens2 = tens1 + (f1 * pas) / 2
				f2 = (tens2 - rcharge * cour2) / lcharge

				tens3 = tens1 + (f2 * pas) / 2
				f3 = (tens3 - rcharge * cour2) / lcharge

				cour3 = cour1 + pas
				tens4 = tens1 + f3 * pas
				f4 = (tens4 - rcharge * cour3) / lcharge

				tmp = tabIc[inc2] + (pas * (f1 + 2 * f2 + 2 * f3 + f4)) / 6

				if (tmp < 0) {
					tmp = 0
					tabIc[inc2] = 0
				} else {
					tabIc[inc2 + 1] = tmp
				}

				inc2++
			}
			//
			//uc=uc - rsonIc
			//uc
			for (let cmp = 0; cmp <= 900; cmp += 100) {
				for (let i = 0 + cmp; i < alpha + cmp; i++) {
					tabUc[i] = tabUc[i] - rdson * tabIc[i]
				}
			}

			//mise en forme
			for (let i = 0; i < valmax; i++) {
				tabTime[i] = tabTime[i].toFixed(5)
				tabIc[i] = tabIc[i].toFixed(4)
				tabUc[i] = tabUc[i].toFixed(3)
			}
			//

			commit("SET_TAB_TIME", tabTime)

			commit("SET_TAB_UC", tabUc)

			commit("SET_TAB_IC", tabIc)
		}
	}
})
