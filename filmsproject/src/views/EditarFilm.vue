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
          <b-container>  
            <label class="mb-2">Tipo: </label><br> 
          <select v-model="film.filmType" class="mb-3" >
                <option value="0">Seleccione Tipo</option>
                <option v-for="(type, index) in types" 
                    :key="index"
                    :value="type.idType"
                    >             
                        {{type.name}} 
                </option>
            </select>
            <span v-if="erroresValidacion" class="text-danger">Campo obligatorio</span>
          </b-container>
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
      types:[{idType:2, name: "Movie"},{idType:4, name: "Serie"},{idType:6, name: "Documental"},{idType:8, name: "Anime"}],
      selected:0,
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
        this.film.filmType !== undefined && this.film.filmType != 0
      );
    },
    validacionYear() {
      return (
        this.film.filmYear !== undefined && this.film.filmYear.trim() !== ""
      );
    },
    
  },
  methods: {
    ...mapActions(["getFilm", "editarFilm"]),
    guardarFilm() {
      this.editar.filmDescription = this.film.filmDescription;
      this.editar.filmType = this.film.filmType;
      this.editar.filmYear = this.film.filmYear;
      this.editar.filmReview = this.film.filmReview;
      this.editar.filmScore = this.film.filmScore;
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
              this.$router.push({
                name: 'Home'
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
      
      //console.log
  }
};

</script>

