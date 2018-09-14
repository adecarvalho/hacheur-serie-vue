<template>
  <v-container fluid>
    <v-layout align-center justify-center >
       <h1> <span class="titre">{{titre}} </span>   </h1> 
    </v-layout>

    <v-layout align-center justify-space-around row wrap>
            
        <v-flex xs12 md4 class="ma-2">
          <v-card>
            <v-card-text>
              <v-container>
               <!--   -->
                 <v-form ref="form" v-model="valid" lazy-validation >
                  <v-text-field
                  label="Tension Ve [V]"
                  v-model='ve'
                  id='ve'
                  :rules="positifRule"
                  required
                  class="ma-2"
                  ></v-text-field>

                   <v-text-field
                  label="Résistance R"
                  v-model='r'
                  id='r'
                  :rules="positifRule"
                  required
                  class="ma-2"
                  ></v-text-field>

                   <v-text-field
                  label="Inductance L [H]"
                  v-model='l'
                  id='l'
                  :rules="positifRule"
                  required
                  class="ma-2"
                  ></v-text-field>

                
                   <v-text-field
                  label="Tension de diode Vd0 [V]"
                  v-model='vd0'
                  id='vd0'
                  :rules="positifRule"
                  required
                  class="ma-2"
                  
                  ></v-text-field>

                
                   <v-text-field
                  label="Transistor MosFet Rdson"
                  v-model='rdson'
                  id='rdson'
                  :rules="positifRule"
                  required
                  class="ma-2"
                  ></v-text-field>

                  <v-btn :disabled="!valid" 
                  @click.prevent="onSubmit" 
                  round color="teal darken-3" 
                  class="ma-2"
                  dark>
                  Enregistrer
                  </v-btn>
                </v-form>

                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h4 class="mb-1">Documentations</h4>
                        <div>
                          <v-icon left>event_note</v-icon>
                           <a class="lien_doc" href="http://pdf.datasheetcatalog.com/datasheet/SGSThomsonMicroelectronics/mXutzwy.pdf" 
                               target="blank">datasheet diode</a>
                        </div>

                        <div>
                          <v-icon left>event_note</v-icon>
                          <a class="lien_doc" href="https://www.vishay.com/docs/91021/91021.pdf" 
                               target="blank">datasheet mosfet</a>
                        </div>
                    
                      </div>
                    </v-card-title>
                  </v-card>

              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>  

      <v-flex xs12 md4 class="ma-2">
         <v-card>
            <v-card-text>
              <v-container>
                
                 <v-img
                  :src="imageMli"
                  aspect-ratio="1.25"
                  class="mb-2"
                  contain
                ></v-img>
      
                 <v-form ref="form" v-model="valid" lazy-validation >
                  <v-text-field
                  label="Fréquence MLI [Hz]"
                  v-model='f'
                  id='f'
                  :rules="mli_freq_Rule"
                  required
                  class="ma-2"
                  ></v-text-field>

                  <v-text-field
                  label="Rapport cyclique [%]"
                  v-model='alpha'
                  id='alpha'
                  :rules="mli_alpha_Rule"
                  required
                  class="ma-2"
                  ></v-text-field>
                 </v-form>

              </v-container>
            </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>
</v-container>
</template>


<script>
export default {
	name: "SaisieModele",

	mounted() {
		this.load()
	},
	//

	methods: {
		onSubmit() {
			this.$store.dispatch("setParametres", {
				ve: this.ve,
				r: this.r,
				l: this.l,
				vd0: this.vd0,
				rdson: this.rdson,
				f: this.f,
				alpha: this.alpha
			})
			//
			this.$store.dispatch("process")

			this.$router.push("/mesure")
		},
		//
		load() {
			const val = this.$store.getters.getParametres
			this.ve = val.ve
			this.r = val.r
			this.l = val.l
			this.vd0 = val.vd0
			this.rdson = val.rdson
			this.f = val.f
			this.alpha = val.alpha
		}
	},
	//
	data: function() {
		return {
			valid: false,
			ve: "50",
			r: "33",
			l: "0.11",
			vd0: "1",
			rdson: "0.1",
			f: "200",
			alpha: "50",

			titre: "Saisir les paramètres du hacheur",

			imageMli: require("@/assets/Signal_MLI.svg"),

			positifRule: [
				val => {
					if (isNaN(val)) {
						return "Cette saisie n'est pas un nombre !"
					} else if (val <= 0) {
						return "Ce nombre doit être positif !"
					} else return true
				}
			],

			mli_freq_Rule: [
				val => {
					if (isNaN(val)) {
						return "Cette saisie n'est pa un nombre !"
					} else if (val < 200) {
						return "Fréquence trop faible !"
					} else if (val > 900) {
						return "Fréquence trop importante !"
					} else return true
				}
			],

			mli_alpha_Rule: [
				val => {
					if (isNaN(val)) {
						return "Cette saisie n'est pa un nombre !"
					} else if (val < 0) {
						return "Rapport cyclique doit être positif !"
					} else if (val > 100) {
						return "Rapport cyclique trop important !"
					} else return true
				}
			]
		}
	}
	//
}
</script>

<style scoped>
.titre {
	text-shadow: 3px 3px 5px #555;
	padding: 50px;
	margin-bottom: 20px;
}

.lien_doc {
	text-decoration: none;
	color: #555;
}
</style>


