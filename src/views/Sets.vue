<template>
    <v-container ref="contentv" fluid style="align-self: baseline">
        <v-row justify="space-around">
            <v-card v-if="$vuetify.breakpoint.mdAndUp" flat class="ma-0 pa-0 transparent"  width="90%">
                    <v-card-text class="ma-0 pa-0">
                        <v-row>
                            <v-col cols="12" class="pa-0 ma-0">
                                <div class="font-blink white--text text-center font-weight-bold ma-6" :style="$vuetify.breakpoint.mdAndUp?'font-size: 3em; line-height: 1em':'font-size: 2em; line-height: 1em'">Vive la velocidad con nuestros sets</div>
                            </v-col>
                        </v-row>
                        <v-sheet
                                :elevation="0"
                                class="mx-auto transparent"
                        >
                            <v-slide-group
                                    v-model="model"
                                    show-arrows
                            >
                                <template v-slot:prev>
                                    <v-btn
                                            fab
                                            color="white"
                                            small
                                    >
                                        <v-icon color="black">
                                            mdi-chevron-left
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:next>
                                    <v-btn
                                            fab
                                            color="white"
                                            small
                                    >
                                        <v-icon color="black">
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-slide-item
                                        v-for="(s,index) in sets"
                                        :key="s.id"
                                        v-slot="{ active, toggle }"
                                >
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-card
                                                    class="ma-12"
                                                    width="380"
                                                    max-width="380"
                                                    style="background: #0855A6"
                                            >
                                                <v-card-text>
                                                    <h2 class="title white--text">
                                                        <span class="font-blink">{{s.name}}</span>
                                                    </h2>
                                                </v-card-text>
                                                <v-img contain :src="s.img"></v-img>

                                                <v-fade-transition>
                                                    <v-overlay
                                                            v-if="hover"
                                                            absolute
                                                            color="#036358"
                                                    >
                                                        <v-btn x-large color="#3D7EF5" fab @click="showItem(s,index)">
                                                            <v-icon class="my-5">mdi-rotate-3d</v-icon>
                                                        </v-btn>
                                                    </v-overlay>
                                                </v-fade-transition>
                                            </v-card>
                                        </template>
                                    </v-hover>

                                </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                    </v-card-text>
            </v-card>
            <v-item-group v-else>
                    <v-row>
                        <v-col
                                v-for="s in sets"
                                :key="s.id"
                                cols="12"
                                md="4"
                                class="mt-0"
                        >
                            <v-item v-slot="{ active, toggle }">
                                <v-card
                                        outlined
                                        class="pa-2 mx-auto"
                                        :elevation="10"
                                        width="80%"
                                        style="border: 10px #000 solid;"
                                        @click="toggle"
                                >
                                    <v-card-text class="text-center">
                                        <h2 class="title font-blink texto-azul-fuerte">
                                            {{s.name}}
                                        </h2>
                                    </v-card-text>
                                    <v-img
                                            contain
                                            :aspect-ratio="16/9"
                                            :height="200"
                                            :src="s.img"
                                            @click="showItem(s)"
                                    ></v-img>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
            </v-item-group>
        </v-row>
        <v-dialog
                v-model="dialog"
                persistent
                max-width="600"
        >
            <v-card>
                <v-card-title class="headline">
                    Política de Cookies
                </v-card-title>
                <v-card-text>
                    En esta web se utilizan cookies de terceros y propias para conseguir
                    que tengas una mejor experiencia de navegación, si permanece aquí acepta su uso.
                    Puede leer más sobre el uso de cookies en nuestra <a href="/privacidad">política de privacidad</a>.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="aceptar()"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
                v-model="dialogItem"
                persistent
                scrollable
                max-width="600"
        >
            <v-card v-if="selected!=null" style="border: 10px #000 solid;">
                <v-card-title :class="$vuetify.breakpoint.mdAndUp?'display-1':'headline'">
                    <div class="font-blink font-weight-bold">{{selected.name}}</div>
                </v-card-title>
                <v-card-text>
                    <v-img @click="goShop(selected.url)" contain height="400" :src="selected.gif"></v-img>
                    <v-row v-if="selected.url==''">
                        <v-col>Disponible en tiendas físicas</v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialogItem = false"
                    >
                        Cerrar
                    </v-btn>
                    <v-btn v-if="selected.url!=''"
                            color="green darken-1"
                            text
                            @click="goShop(selected.url)"
                    >
                        Comprar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

export default {
  name: "Home",
  mixins: [],
  components: {},
  data: () => ({
      var: false,
      dialog: false,
      dialogItem: false,
      model: 1,
      selected: null,
      sets: [
          {
              id: 11,
              name: 'Lamborghini Sián FKP 37',
              img: '/sitio/img/sets/42115.jpg',
              gif: '/sitio/img/gif/42115.gif',
              url: 'https://www.juguetron.mx/lego-technic-42115-lamborghini-sian-fkp-37-673419318679?utm_source=WM&utm_medium=LandingL-anding_JG&utm_campaign=24_11_2020-Technic&utm_content=42115-&cm_mmc=WM-_-Landing-_-Landing_JG-_-Adults-42115-0'
          },
          {
              id: 1,
              name: 'Bugatti Chiron',
              img: '/sitio/img/sets/42083.png',
              gif: '/sitio/img/gif/42083.gif',
              url: ''
          },
          {
              id: 2,
              name: 'Camión de Huida',
              img: '/sitio/img/sets/42090.png',
              gif: '/sitio/img/gif/42090.gif',
              url: ''
          },
          {
              id: 3,
              name: 'Chevrolet Corvette ZR1',
              img: '/sitio/img/sets/42093.png',
              gif: '/sitio/img/gif/42093.gif',
              url: ''
          },
          {
              id: 4,
              name: 'Porsche 911 RSR',
              img: '/sitio/img/sets/42096.png',
              gif: '/sitio/img/gif/42096.gif',
              url: ''
          },
          {
              id: 5,
              name: "Camión de Transporte de Vehículos",
              img: '/sitio/img/sets/42098.png',
              gif: '/sitio/img/gif/42098.gif',
              url: ''
          },
          {
              id: 6,
              name: 'Buggy',
              img: '/sitio/img/sets/42101.png',
              gif: '/sitio/img/gif/42101.gif',
              url: 'https://www.juguetron.mx/lego-42101-buggy-673419318549'
          },
          {
              id: 7,
              name: "Auto de Rally Top Gear",
              img: '/sitio/img/sets/42109.png',
              gif: '/sitio/img/gif/42109.gif',
              url: ''
          },
          {
              id: 8,
              name: "Land Rover Defender",
              img: '/sitio/img/sets/42110.png',
              gif: '/sitio/img/gif/42110.gif',
              url: ''
          },
          {
              id: 9,
              name: "Dom's Dodge Charger",
              img: '/sitio/img/sets/42111.png',
              gif: '/sitio/img/gif/42111.gif',
              url: ''
          },
          {
              id: 10,
              name: 'Dragster',
              img: '/sitio/img/sets/42103.png',
              gif: '/sitio/img/gif/42103.gif',
              url: 'https://www.juguetron.mx/lego-42103-dragster-673419318563'
          },
      ]
  }),
  created() {},
  mounted() {
  },
  computed: {
  },
  watch: {},
  methods: {
      goShop(url){
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('target', '_blank');
          document.body.appendChild(link);
          link.click();
          /*this.dialogItem = false;
          this.selected = null;*/
      },
    showItem(item,index){
          this.model = index;
        this.selected = Object.assign({},item);
        this.dialogItem = true;
    }
  }
};
</script>
