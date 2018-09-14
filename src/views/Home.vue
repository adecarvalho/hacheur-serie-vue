<template>
<v-container>

  <v-layout row justify-center wrap >

    <v-flex xs12 sm12  md5 >
      <v-card>
        <v-img
          :src="imageHacheur"
          height="400px"
          contain
        ></v-img>

         <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Hacheur Série</h3>
            <div>Ce schéma représente un hacheur série, avec une charge RL</div>
          </div>
        </v-card-title>
      </v-card>
        

    </v-flex>

    <v-flex xs12 sm12 md4 offset-md2>
      <v-carousel hide-controls hide-delimiters interval="2000">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          contain
        ></v-carousel-item>
      </v-carousel>
    </v-flex>

  </v-layout>
</v-container>

</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					src: require("@/assets/img_transistor_1.png")
				},
				{
					src: require("@/assets/img_transistor_2.png")
				},
				{
					src: require("@/assets/img_transistor_3.png")
				},
				{
					src: require("@/assets/bloc_1.png")
				},
				{
					src: require("@/assets/diode.png")
				}
			],

			imageHacheur: require("@/assets/Modele_hacheur.svg")
		}
	}
}
</script>

