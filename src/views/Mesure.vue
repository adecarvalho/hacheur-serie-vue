<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12 md9 class="ma-2 mychart">
        <line-chart 
        height="50vh"
        :data=chartDataIc
        :dataset=chartDataSetIc
        :library=chartOptionsIc
        ></line-chart>
      </v-flex>
    </v-layout>

  <v-layout align-center justify-center row>
      <v-flex xs12 md9 class="ma-2 mychart">
        <line-chart 
        height="50vh"
        :data=chartDataUc
        :dataset=chartDataSetUc
        :library=chartOptionsUc
        ></line-chart>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
export default {
	name: "Mesure",

	mounted() {
		this.load()
	},

	methods: {
		load() {
			const val = this.$store.getters.getMesures

			for (let i = 0; i < 1000; i++) {
				this.chartDataIc.push([val.tabTime[i], val.tabIc[i]])
				this.chartDataUc.push([val.tabTime[i], val.tabUc[i]])
			}
		}
	},

	data() {
		return {
			chartDataIc: [],
			chartDataUc: [],

			chartDataSetIc: {
				pointRadius: 0,
				fill: false,
				label: "Ic(t)",
				borderColor: "#3cba9f",
				borderWidth: 3
			},

			chartDataSetUc: {
				pointRadius: 0,
				fill: false,
				label: "Uc(t)",
				borderColor: "#3cba9f",
				borderWidth: 3
			},

			chartOptionsUc: {
				legend: {
					display: false
				},
				animation: {
					duration: 1000
				},
				title: {
					display: true,
					fontSize: 16,
					text: "Allure de Uc(t)"
				},
				scales: {
					yAxes: [
						{
							scaleLabel: { display: true, labelString: "V" },

							gridLines: {
								drawTicks: true,
								drawOnChartArea: true
							},

							ticks: {
								fontColor: "rgba(0,0,0,0.5)",
								fontStyle: "bold",
								max: 50,
								min: -10,
								stepSize: 10
							}
						}
					],
					xAxes: [
						{
							scaleLabel: { display: true, labelString: "Times(s)" },

							gridLines: {
								drawTicks: true,
								drawOnChartArea: true
							},

							ticks: {
								padding: 20,
								fontColor: "rgba(0,0,0,0.5)",
								fontStyle: "bold"
							}
						}
					]
				}
			},

			chartOptionsIc: {
				legend: {
					display: false
				},
				animation: {
					duration: 1000
				},
				title: {
					display: true,
					fontSize: 16,
					text: "Allure de Ic(t)"
				},
				scales: {
					yAxes: [
						{
							scaleLabel: { display: true, labelString: "A" },

							gridLines: {
								drawTicks: true,
								drawOnChartArea: true
							},

							ticks: {
								fontColor: "rgba(0,0,0,0.5)",
								fontStyle: "bold",
								min: 0,
								stepSize: 0.1
							}
						}
					],
					xAxes: [
						{
							scaleLabel: { display: true, labelString: "Times(s)" },

							gridLines: {
								drawTicks: true,
								drawOnChartArea: true
							},

							ticks: {
								padding: 20,
								fontColor: "rgba(0,0,0,0.5)",
								fontStyle: "bold"
							}
						}
					]
				}
			}
		}
	}
}
//
</script>

<style scoped>
.mychart {
	border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>


