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
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import { mapState,mapActions } from "vuex";
import axios from 'axios'
import Input from "../components/Input.vue";

export default {
  name: 'Home',
  components: {
    //HelloWorld
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
    
  },
  methods: {
    ...mapActions(["crearFilm", "getGenres"]),
    guardarFilm() {
      console.log("Entro en guardado");
      if (this.validacionName && this.validacionDirector && this.validacionGenre && this.validacionType && this.validacionYear) {
        this.erroresValidacion = false;
        this.crearFilm({
          params: this.film,
          onComplete: (response) => {
              this.$notify({
                type: 'success',
                title: response.mensaje
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
  },
  created(){
    console.log("Entro en agregar");
    this.getGenres();

  }
}
/*


<Input
            v-model="guardar.filmDirector"
            id="filmDirector"
            class="mb-2"
            titulo="Director"
            :maxlength="60"
            disabled 
          />
          <Input
            v-model="guardar.filmDescription"
            id="filmDescription"
            class="mb-2"
            titulo="Descripcion"
            :maxlength="200"
            placeholder="Ingrese Descripción"
          />
          <Input
            v-model="guardar.filmType"
            id="filmType"
            class="mb-2"
            titulo="Tipo"
            :maxlength="1"
            placeholder="Ingrese un nombre"
            :error="erroresValidacion && !validacionType"
            mensajeError="El tipo es obligatorio"
          />
          <Input
            v-model="guardar.genID"
            id="genID"
            class="mb-2"
            titulo="Review"
            :maxlength="500"
            placeholder="Ingrese Genero"
          />
          <Input
            v-model="guardar.filmYear"
            id="filmYear"
            class="mb-2"
            titulo="Año"
            :maxlength="4"
            placeholder="Ingrese año"
            :error="erroresValidacion && !validacionYear"
            mensajeError="El año es obligatorio"
          />   
*/
</script>
