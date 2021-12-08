<template>
  <div>
    <h1>Editar</h1>
    <div class="divEditar" style="text-align: center;">
      <form class="form-editar" @submit.prevent="guardarFilm">
        <Input
            :value="film.filmID"
            id="filmID"
            class="mb-2"
            titulo="ID"
            disabled 
          />
          <Input
            :value="film.filmName"
            id="filmName"
            class="mb-2"
            titulo="Nombre"
            :maxlength="80"
            disabled 
          />
          <Input
            :value="film.filmDirector"
            id="filmDirector"
            class="mb-2"
            titulo="Director"
            :maxlength="60"
            disabled 
          />
          <Input
            v-model="film.filmDescription"
            :value="film.filmDescription"
            id="filmDescription"
            class="mb-2"
            titulo="Descripcion"
            :maxlength="200"
            placeholder="Ingrese Descripción"
          />
          <Input
            v-model="film.filmType"
            :value="film.filmType"
            id="filmType"
            class="mb-2"
            titulo="Tipo"
            :maxlength="1"
            placeholder="Ingrese un nombre"
            :error="erroresValidacion && !validacionType"
            mensajeError="El tipo es obligatorio"
          />
          <Input
            v-model="film.filmYear"
            :value="film.filmYear"
            id="filmYear"
            class="mb-2"
            titulo="Año"
            :maxlength="4"
            placeholder="Ingrese año"
            :error="erroresValidacion && !validacionYear"
            mensajeError="El año es obligatorio"
          />
          <Input
            v-model="film.filmReview"
            :value="film.filmReview"
            id="filmReview"
            class="mb-2"
            titulo="Review"
            :maxlength="500"
            placeholder="Ingrese Review"
          />
          <Input
            v-model="film.filmScore"
            :value="film.filmScore"
            id="filmScore"
            class="mb-2"
            titulo="Score"
            :maxlength="1"
            placeholder="Ingrese Score"
          />
        <b-button type="submit" variant="success">Guardar</b-button>
      </form>
    </div>
    
    {{film}}
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState,mapActions } from "vuex";
import axios from 'axios'
import Input from "../components/Input.vue";


export default {
  name: "Agregar",
  components: {
    Input,
  },
  data() {
    return {
      fimmID: 0,
      editar: {
        filmDescription: "",
        filmType: "",
        filmYear: "",
        filmReview: "",
        filmScore: 0,
      },
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(['film']),
    validacionType() {
      return (
        this.editar.filmType !== undefined && this.editar.filmType.trim() !== ""
      );
    },
    validacionYear() {
      return (
        this.editar.filmYear !== undefined && this.editar.filmYear.trim() !== ""
      );
    },
    
  },
  methods: {
    ...mapActions(["getFilm", "editarFilm"]),
    guardarFilm() {
      console.log("Entro en guardado");
      if (this.validacionType && this.validacionYear) {
        this.erroresValidacion = false;
        this.editarFilm({
          filmID: this.film.filmID,
          body: this.editar,
          onComplete: (response) => {
              this.$notify({
                type: 'success',
                title: response.data.mensaje
              });
              
          },
          onError: (error) => {
            this.$notify({
              type: 'error',
              title: error.mensaje
            });
          }
        })
      } else {
        this.erroresValidacion = true;
      }
    },
    
  },
  created() {
    var filmID = this.$route.params.filmID;
      this.getFilm(filmID);
      this.editar.filmDescription = this.film.filmDescription;
      this.editar.filmType = this.film.filmType;
      this.editar.filmYear = this.film.filmYear;
      this.editar.filmReview = this.film.filmReview;
      this.editar.filmScore = this.film.filmScore;
      //console.log
  }
};

/*
computed

validacionType() {
      return (
        this.film.filmType !== undefined && this.film.filmType.trim() !== ""
      );
    },
    validacionYear() {
      return (
        this.film.filmYear !== undefined && this.film.filmYear.trim() !== ""
      );
    },

methods
guardarFilm() {
      if (this.validacionType && this.validacionYear) {
        this.erroresValidacion = false;
        this.editarFilm({
          filmID: this.film.filmID,
          body: this.editar,
          onComplete: (response) => {
              this.$notify({
                type: 'success',
                title: response.data.mensaje
              });
              
          },
          onError: (error) => {
            this.$notify({
              type: 'error',
              title: error.response.data.mensaje
            });
          }
        })
      } else {
        this.erroresValidacion = true;
      }
    },
*/
</script>

