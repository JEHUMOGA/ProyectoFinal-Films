<template>
  <div class="home">
    <h1>Guardar</h1>
    <form class="divEditar" @submit.prevent="guardarFilm">
        <Input
            v-model="film.filmName"
            id="filmName"
            class="mb-2"
            titulo="Nombre"
            :maxlength="80"
            placeholder="Ingrese nombre"
            :error="erroresValidacion && !validacionName"
            mensajeError="El nombre es obligatorio"
        />
        <Input
          v-model="film.filmDirector"
          id="filmDirector"
          class="mb-2"
          titulo="Director"
          :maxlength="60"
          placeholder="Ingrese director"
          :error="erroresValidacion && !validacionDirector"
          mensajeError="El director es obligatorio"
        />
        <Input
          v-model="film.filmDescription"
          id="filmDescription"
          class="mb-2"
          titulo="Descripcion"
          :maxlength="200"
          placeholder="Ingrese descripción"
        />
        <b-container>  
            <label class="mb-2">Tipo: </label><br> 
          <select v-model="film.filmType" class="mb-3">
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
        <b-container>  
            <label class="mb-2">Genero: </label><br> 
          <select v-model="film.genID" class="mb-3" mensajeError="El genero es obligatorio" >
                <option value="0">Seleccione Genero</option>
                <option v-for="(genre, index) in genres" 
                    :key="index"
                    :value="genre.genID"
                    >             
                        {{genre.genName}} 
                </option>
            </select>
            <span v-if="erroresValidacion" class="text-danger">Campo obligatorio</span>
          </b-container>
        <Input
          v-model="film.filmYear"
          id="filmYear"
          class="mb-2"
          titulo="Año"
          :maxlength="4"
          placeholder="Ingrese año"
          :error="erroresValidacion && !validacionYear"
          mensajeError="El año es obligatorio"
        />      
      <b-button type="submit" variant="success">Guardar</b-button>
    </form>
    <form class="divEditar" @submit.prevent="guardarGenero">
      <h1 class = "mt-5">Agregar genero</h1>
      <Input
          v-model="genre.genName"
          id="genName"
          class="mb-2"
          titulo="Genero"
          :maxlength="40"
          placeholder="Ingrese nombre del genero"
          :error="erroresGenero && !validacionNombreGenero"
          mensajeError="El nombre del genero es obligatorio"
        />
        <b-button type="submit" variant="success">Crear genero</b-button>
    </form>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
import Input from "../components/Input.vue";

export default {
  name: 'Home',
  components: {
    Input,
  },
  data() {
    return {
      types:[{idType:2, name: "Movie"},{idType:4, name: "Serie"},{idType:6, name: "Documental"},{idType:8, name: "Anime"}],
      film: {
        filmName: "",
        filmDirector: "",
        filmDescription: "",
        filmType: 0,
        genID:0,
        filmYear:""
      },
      erroresValidacion: false,
      genre: {
        genName: ""
      },
      erroresGenero: false
    };
  },
  computed: {
    ...mapState(['genres']),
    validacionName() {
      return (
        this.film.filmName !== undefined && this.film.filmName.trim() !== ""
      );
    },
    validacionDirector() {
      return (
        this.film.filmDirector !== undefined && this.film.filmDirector.trim() !== ""
      );
    },
    validacionGenre() {
      return (
        this.film.genID !== undefined && this.film.genID!== 0
      );
    },
    validacionType() {
      return (
        this.film.filmType !== undefined && this.film.filmType !== 0
      );
    },
    validacionYear() {
      return (
        this.film.filmYear !== undefined && this.film.filmYear.trim() !== ""
      );
    },
    validacionNombreGenero(){
      return(
        this.genre.genName !== undefined && this.genre.genName.trim() !== ""
      )
    }
    
  },
  methods: {
    ...mapActions(["crearFilm", "crearGenero", "getGenres"]),
    guardarFilm() {
      if (this.validacionName && this.validacionDirector && this.validacionGenre && this.validacionType && this.validacionYear) {
        this.erroresValidacion = false;
        this.crearFilm({
          params: this.film,
          onComplete: (response) => {
              this.$notify({
                type: 'success',
                title: response.data.mensaje
              });
              this.$router.push({
              name: "Home",
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
    guardarGenero() {
      if(this.validacionNombreGenero){
      this.erroresGenero = false;
        this.crearGenero({
          params: this.genre,
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
        this.genre.genName = ""
      } else {
        this.erroresGenero = true;
      }
    }
  },
  created(){
    this.getGenres();
  },
  updated(){
    this.getGenres();
  }
}
</script>
