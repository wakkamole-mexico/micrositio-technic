<template>
    <v-container ref="contentv" fluid>
        <v-row justify="space-around">
            <v-card
                    outlined
                    color="transparent"
                    class="pa-2 pt-0 mt-0"
                    :elevation="0"
                    :width="$vuetify.breakpoint.mdAndUp?'60%':'85%'"
            >
                <v-card-text style="background-color: transparent" class="ma-0 pa-0">
                    <v-row>
                        <v-col col="12" md="6" style="align-self: flex-end">
                            <div class="font-blink text-center font-weight-bold white--text ma-4" style="font-size: 2em; line-height: 1em;">Disfruta de una playlist llena de aventura para escuchar mientras armas tu set de</div>
                            <div class="font-blink text-center font-weight-bold white--text ma-6" :style="$vuetify.breakpoint.mdAndUp?'font-size: 3em; line-height: 1em':'font-size: 2em; line-height: 1em'">LEGO
                                Technic</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <iframe src="https://open.spotify.com/embed/playlist/5NPVSF0UV2EtxB4h0lZBYI" width="100%" height="400" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>

        <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-img style="position: absolute; bottom: 0px; right: 0px; z-index: 2"
                   max-width="400"
                   src="/sitio/img/backcar.png"></v-img>
        </template>
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
      model: null,
  }),
  created() {},
  mounted() {
  },
  computed: {
  },
  watch: {},
  methods: {

  }
};
</script>
