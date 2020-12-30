<template>
    <v-container ref="contentv" fluid style="align-self: normal">
        <transition name="fade">
            <div class="loading" v-if="loading">
                <div class="loading-window">
                    <div class="car">
                        <div class="strike"></div>
                        <div class="strike strike2"></div>
                        <div class="strike strike3"></div>
                        <div class="strike strike4"></div>
                        <div class="strike strike5"></div>
                        <div class="car-detail spoiler"></div>
                        <div class="car-detail back"></div>
                        <div class="car-detail center"></div>
                        <div class="car-detail center1"></div>
                        <div class="car-detail front"></div>
                        <div class="car-detail wheel"></div>
                        <div class="car-detail wheel wheel2"></div>
                    </div>
                    <div class="loading-text">
                        <span class="loading-text-words">L</span>
                        <span class="loading-text-words">O</span>
                        <span class="loading-text-words">A</span>
                        <span class="loading-text-words">D</span>
                        <span class="loading-text-words">I</span>
                        <span class="loading-text-words">N</span>
                        <span class="loading-text-words">G</span>
                    </div>
                </div>
            </div>
        </transition>
        <v-row>
            <v-col class="text-center">
                <v-btn outlined dark @click="dialog=true">Terminos y condiciones</v-btn>
            </v-col>
        </v-row>
        <v-row justify="space-around" v-if="!login">
            <v-card
                    color="transparent"
                    class="pa-2"
                    flat
                    :elevation="10"
                    :width="$vuetify.breakpoint.mdAndUp?'70%':'90%'"
                    style="position: absolute; bottom: 20px;"
            >
                <v-card-text >
                    <v-row>
                        <v-col cols="12" class="pa-0 ma-0">
                            <div class="font-blink white--text text-center font-weight-bold ma-6" :style="$vuetify.breakpoint.mdAndUp?'font-size: 3em; line-height: 1em':'font-size: 2em; line-height: 1em'">
                                Ingresa a la Segunda Fase del Grand Prix y sigue compitiendo por una réplica LEGO del Bugatti Chiron</div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="10" offset="1" md="6" offset-md="3">
                            <v-text-field
                                    :style="$vuetify.breakpoint.mdAndUp?'font-size: 2.2em; line-height: 1.4em':'font-size: 1.8em; line-height: 1em'"
                                    v-model="access_code"
                                    dark
                                    label="Código"
                                    outlined
                                    hide-details
                                    class="text-center"
                                    @keypress.enter="acceder()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="text-center yellow--text" v-if="error!=''">
                            {{error}}
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <v-btn
                                    @click.prevent="acceder()"
                                    dark
                                    color="#EDD706"
                                    class="text-capitalize black--text font-weight-bold"
                            >
                                Acceder
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row justify="space-around" v-if="login && !started && !finished">
            <v-card
                    color="transparent"
                    class="pa-2"
                    flat
                    :elevation="10"
                    :width="$vuetify.breakpoint.mdAndUp?'70%':'90%'"
            >
                <v-card-text >
                    <v-row>
                        <v-col cols="12" class="pa-0 ma-0">
                            <div class="font-blink white--text text-center font-weight-bold ma-6" :style="$vuetify.breakpoint.mdAndUp?'font-size: 3em; line-height: 1em':'font-size: 2em; line-height: 1em'">
                                Escoge una de estas 3 categorías y contesta el cuestionario. Si eres de los primeros 30 en responder correctamente las preguntas, avanzas a la Gran Final.</div>
                        </v-col>
                    </v-row>
                    <v-form ref="formStart">
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                        dark
                                        v-model="form.categoria"
                                        :items="categorias"
                                        item-value="id"
                                        item-text="label"
                                        label="Categoría"
                                        outlined
                                        :rules="[rules.required]"
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        :dense="$vuetify.breakpoint.smAndDown"
                                        :hide-details="
                                      $vuetify.breakpoint.smAndDown
                                    "
                                        v-model="form.nombre"
                                        dark
                                        label="Nombre"
                                        outlined
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        :dense="$vuetify.breakpoint.smAndDown"
                                        :hide-details="
                                      $vuetify.breakpoint.smAndDown
                                    "
                                        v-model="form.email"
                                        dark
                                        label="E-mail"
                                        outlined
                                        :rules="[rules.required, rules.email]"
                                        @keypress.enter="iniciar()"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn
                                        @click.prevent="iniciar()"
                                        dark
                                        color="#EDD706"
                                        class="text-capitalize black--text font-weight-bold"
                                >
                                    Iniciar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row justify="space-around" v-if="started">
            <v-card
                    color="transparent"
                    class="pa-2"
                    flat
                    :elevation="10"
                    :width="$vuetify.breakpoint.mdAndUp?'70%':'90%'"
            >
                <v-card-text v-if="formquiz!=null">
                    <v-row class="mb-4">
                        <v-col cols="12" class="white--text display-1">
                            <span class="font-blink">Categoría: {{formquiz.name}}</span>
                        </v-col>
                        <v-col cols="12" class="white--text my-0 py-0">
                            <span class="font-blink">{{form.nombre}}</span>
                        </v-col>
                        <v-col cols="12" class="white--text my-0 py-0">
                            <span class="font-blink">{{form.email}}</span>
                        </v-col>
                    </v-row>
                    <v-form ref="formQuiz">
                        <template v-for="(item,index) in formquiz.questions">
                            <v-row>
                                <v-col cols="12" class="white--text mb-0 title">
                                    <span class="font-blink">{{item.question.text}}</span>
                                </v-col>
                                <v-col cols="12" class="mt-0">
                                    <v-radio-group dark v-model="form.choices[index]" :rules="[rules.required]" class="mt-0">
                                        <template v-for="ans in item.answers">
                                            <v-radio :value="ans.id">
                                                <template v-slot:label>
                                                    <div class="title">
                                                        <span class="font-blink">
                                                            <strong>{{ans.id}}. </strong>
                                                        {{ans.text}}
                                                        </span>
                                                    </div>
                                                </template>
                                            </v-radio>
                                        </template>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </template>
                    </v-form>
                    <v-row>
                        <v-col cols="12" class="yellow--text text-center pa-0 ma-0">
                            {{this.errorQuiz}}
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <v-btn
                                    :disabled="sending"
                                    @click="send()"
                                    dark
                                    color="#EDD706"
                                    class="text-capitalize black--text font-weight-bold"
                            >
                                Enviar Respuestas
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row justify="space-around" v-if="finished">
            <v-card
                    color="transparent"
                    class="pa-2"
                    flat
                    :width="$vuetify.breakpoint.mdAndUp?'70%':'90%'"
                    style="position: absolute; bottom: 20px;"
            >
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="display-1 white--text text-center">
                            <span class="font-blink">
                                ¡Gracias por participar! Te enviaremos un mail con el resultado, si acertaste en todas las preguntas avanzas a la Gran Final del Grand Prix.
                            </span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>
        <v-dialog
                v-model="dialog"
                persistent
                scrollable
                max-width="600"
        >
            <v-card>
                <v-card-title class="headline">
                    Términos y Condiciones fase dos del Grand Prix
                </v-card-title>
                <v-card-text style="font-size: .8em">
                    <ul>
                        <li>
                            Recuerda seguirnos en todas nuestras redes sociales, Facebook @Juguetron e Instagram
                            @juguetronmx
                        </li>
                        <li>
                            Cada participante de la primera Fase del Grand Prix recibirá un mail con las instrucciones para
                            participar en la segunda fase del Grand Prix.
                        </li>
                        <li>
                            La fecha de vigencia de la segunda fase del Grand Prix es del 24 de noviembre al 26 de
                            noviembre.
                        </li>
                        <li>
                            Esta es la segunda fase del Grand Prix, los primeros 30 concursantes en responder correctamente
                            las preguntas de la categoría que escojan participarán en la tercera fase del Grand Prix.
                        </li>
                        <li>
                            Estos 30 concursantes recibirán un mail de confirmación si cumplen con los requisitos, y el 27 de
                            noviembre recibirán las instrucciones para participar en la tercera fase del Grand Prix.
                        </li>
                        <li>
                            El participante deberá residir dentro del territorio de la República de México.
                        </li>
                        <li>
                            La tercera fase del Grand Prix se anunciará vía mail a los 30 concursantes que cumplan con los
                            requisitos de la segunda fase.
                        </li>
                        <li>
                            El premio para el primer puesto es un set de LEGO Bugatti Chiron, para el segundo puesto un set
                            de LEGO Dom’s Dodge Charger y para el tercer puesto un set de LEGO Dom’s Dodge Charger.
                        </li>
                        <li>
                            No podrá ganar el Grand Prix, si ha resultado ganador en cualquier dinámica Juguetron en los 6
                            meses anteriores.
                        </li>
                        <li>
                            Juguetron se reserva el derecho a descalificar a cualquier persona que incurra en alguna trampa o
                            conducta inadecuada en esta mecánica.
                        </li>
                    </ul>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog=false"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from "axios";
    import { RULES } from "../mixins/rules";
export default {
  name: "Home",
  mixins: [RULES],
  components: {},
  data: () => ({
      var: false,
      dialog: false,
      model: null,
      login: false,
      started: false,
      finished: false,
      loading: false,
      sending: false,
      error: '',
      errorQuiz: '',
      categorias: [
          {id: 1, label: 'Carreras'},
          {id: 2, label: 'Camiones'},
          {id: 3, label: 'Lujo'},
      ],
      quiz: [
          {
              id: 1,
              name: 'Carreras',
              questions: [
                  {
                      question: {
                          id: 1,
                          text: '¿Cuánto mide el Porsche 911 RSR?',
                          answer: 'A',
                      },
                      answers: [
                          {id: 'A', text: '13 cm de alto, 50 cm de largo y 20 cm de ancho.'},
                          {id: 'B', text: '20 cm de alto, 80 cm de largo y 30 de ancho.'},
                          {id: 'C', text: '10 cm de alto, 60 de largo, y 15 de ancho.'},
                      ]
                  },
                  {
                      question: {
                          id: 2,
                          text: '¿Cuántas velocidades tiene la caja de cambios del Bugatti Chiron?',
                          answer: 'B',
                      },
                      answers: [
                          {id: 'A', text: '6.'},
                          {id: 'B', text: '8.'},
                          {id: 'C', text: '4.'},
                      ]
                  },
                  {
                      question: {
                          id: 3,
                          text: '¿Cuántas ruedas de goma fabrica LEGO cada año?',
                          answer: 'A',
                      },
                      answers: [
                          {id: 'A', text: '318 millones.'},
                          {id: 'B', text: '190,000.'},
                          {id: 'C', text: '100 millones.'},
                      ]
                  }
              ]
          },
          {
              id: 2,
              name: 'Camiones',
              questions: [
                  {
                      question: {
                          id: 1,
                          text: '¿Cuántas piezas tiene el LEGO Technic Getaway Truck 42090 Building Kit?',
                          answer: 'B',
                      },
                      answers: [
                          {id: 'A', text: '250.'},
                          {id: 'B', text: '128.'},
                          {id: 'C', text: '312.'},
                      ]
                  },
                  {
                      question: {
                          id: 2,
                          text: '¿De qué edad en adelante pueden armar el LEGO Car Transporter?',
                          answer: 'B',
                      },
                      answers: [
                          {id: 'A', text: '6+.'},
                          {id: 'B', text: '11+.'},
                          {id: 'C', text: '8+.'},
                      ]
                  },
                  {
                      question: {
                          id: 3,
                          text: '¿Qué motor tiene el LEGO Car Transporter?',
                          answer: 'A',
                      },
                      answers: [
                          {id: 'A', text: 'V6.'},
                          {id: 'B', text: 'V8.'},
                          {id: 'C', text: 'V2.'},
                      ]
                  }
              ]
          },
          {
              id: 3,
              name: 'Lujo',
              questions: [
                  {
                      question: {
                          id: 1,
                          text: '¿En qué año se creó la serie de LEGO® Technic™?',
                          answer: 'C',
                      },
                      answers: [
                          {id: 'A', text: '1960.'},
                          {id: 'B', text: '1996.'},
                          {id: 'C', text: '1977.'},
                      ]
                  },
                  {
                      question: {
                          id: 2,
                          text: '¿En qué año está basado el Dodge Charger de Dom?',
                          answer: 'A',
                      },
                      answers: [
                          {id: 'A', text: '1970.'},
                          {id: 'B', text: '1980.'},
                          {id: 'C', text: '1990.'},
                      ]
                  },
                  {
                      question: {
                          id: 3,
                          text: '¿Cuántas piezas tiene LEGO® Technic™ Bugatti Chiron?',
                          answer: 'B',
                      },
                      answers: [
                          {id: 'A', text: '3599.'},
                          {id: 'B', text: '2500.'},
                          {id: 'C', text: '989.'},
                      ]
                  }
              ]
          },
      ],
      access_code: '',
      form: {
          nombre: '',
          email: '',
          categoria: null,
          choices: [null,null,null],
          resultado: false
      }
  }),
  created() {},
  mounted() {
  },
  computed: {
      formquiz: function () {
          if(this.form.categoria!=null){
              return this.quiz.filter(i => i.id == this.form.categoria)[0];
          }else return null;
      }
  },
  watch: {},
  methods: {
      iniciar(){
          if (this.$refs.formStart.validate()) {
              this.started = true;
          }
      },
      acceder(){
          if(this.access_code!=""){
              if(this.access_code==="GPRIX2020"){
                  /*this.login = true;
                  this.access_code = '';
                  this.error = '';*/
                  this.error = "Lo sentimos el periodo para participar ha terminado";
              }else
                  this.error = "Código de acceso incorrecto";
          }else{
              this.error = "Proporcione el código de acceso";
          }
      },
      send() {
          this.errorQuiz = '';
          if (this.$refs.formQuiz.validate()) {
              this.loading = true;
              this.sending = true;
              let correctos = this.formquiz.questions.map(i => i.question.answer);
              let estatus = correctos.toString()==this.form.choices.toString();
              axios
                  .post("/sitio/functions/save.php", {
                      email: this.form.email,
                      name: this.form.nombre,
                      estatus: estatus,
                      category: this.form.categoria
                  })
                  .then(response => {
                      if (response.data.result) {
                          this.finished = true;
                          this.started = false;
                      }else{
                          this.errorQuiz = response.data.msg;
                      }
                  })
                  .catch(err => {
                      this.loading = false;
                      this.sending = false;
                  })
                  .finally(() => {
                      this.loading = false;
                      this.sending = false;
                  });
          } else {
              console.log("errores en formulario");
          }
      },
  }
};
</script>
