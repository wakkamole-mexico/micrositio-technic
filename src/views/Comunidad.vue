<template>
    <v-container ref="contentv" fluid>
        <v-row justify="space-around">
            <v-card
                    outlined
                    class="pa-2"
                    :elevation="10"
                    color="transparent"
                    :width="$vuetify.breakpoint.mdAndUp?'60%':'85%'"
            >
                <v-card-text style="background: transparent;">
                    <div class="font-blink white--text text-center font-weight-bold ma-6" :style="$vuetify.breakpoint.mdAndUp?'font-size: 3em; line-height: 1em':'font-size: 2em; line-height: 1em'">Forma parte de una comunidad de pilotos de LEGO Technic </div>
                    <v-row>
                        <v-col class="text-center fb-join">
                            <div class="fb-group" data-href="https://www.facebook.com/groups/JuguetronTechnic" data-show-social-context="true" data-show-metadata="false"><blockquote cite="https://www.facebook.com/groups/JuguetronTechnic" class="fb-xfbml-parse-ignore">Juguetron LEGO Technic</blockquote></div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>
        <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-img style="position: absolute; bottom: 0px; right: 0px; z-index: 2"
                   max-width="400"
                   src="/sitio/img/frontcar.png"></v-img>
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
      setTimeout(()=>{
          window.FB.XFBML.parse();
      },500);
  },
  computed: {
  },
  watch: {},
  methods: {

  }
};
</script>
<style>


</style>