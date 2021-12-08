<template>
  <div class="home">
    <h1>Guardar</h1>
    <form  @submit.prevent="guardarFilm">
        <Input
            v-model="guardar.filmName"
            id="filmName"
            class="mb-2"
            titulo="Nombre"
            :maxlength="80"
            placeholder="Ingrese nombre"
            :error="erroresValidacion && !validacionName"
            mensajeError="El nombre es obligatorio"
        />
        <Input
          v-model="guardar.filmDirector"
          id="filmDirector"
          class="mb-2"
          titulo="Director"
          :maxlength="60"
          placeholder="Ingrese director"
          :error="erroresValidacion && !validacionDirector"
          mensajeError="El director es obligatorio"
        />
        <Input
          v-model="guardar.filmDescription"
          id="filmDescription"
          class="mb-2"
          titulo="Descripcion"
          :maxlength="200"
          placeholder="Ingrese descripción"
        />
        <Input
          v-model="guardar.filmType"
          id="filmType"
          class="mb-2"
          titulo="Tipo"
          :maxlength="1"
          placeholder="Ingrese tipo"
          :error="erroresValidacion && !validacionType"
          mensajeError="El tipo es obligatorio"
        />
        <Input
          v-model="guardar.genID"
          id="genID"
          class="mb-2"
          titulo="Genero"
          :maxlength="500"
          placeholder="Ingrese genero"
          :error="erroresValidacion && !validacionGenre"
          mensajeError="El genero es obligatorio"
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
      <b-button type="submit" variant="success">Guardar</b-button>
    </form>
    {{guardar}}
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
      guardar: {
        filmName: "",
        filmDirector: "",
        filmDescription: "",
        filmType: "",
        genID:"",
        filmYear:""
      },
      erroresValidacion: false,
    };
  },
  computed: {
    //...mapState(['film']),
    validacionName() {
      return (
        this.guardar.filmName !== undefined && this.guardar.filmName.trim() !== ""
      );
    },
    validacionDirector() {
      return (
        this.guardar.filmDirector !== undefined && this.guardar.filmDirector.trim() !== ""
      );
    },
    validacionGenre() {
      return (
        this.guardar.genID !== undefined && this.guardar.genID.trim() !== ""
      );
    },
    validacionType() {
      return (
        this.guardar.filmType !== undefined && this.guardar.filmType.trim() !== ""
      );
    },
    validacionYear() {
      return (
        this.guardar.filmYear !== undefined && this.guardar.filmYear.trim() !== ""
      );
    },
    
  },
  methods: {
    ...mapActions(["crearFilm"]),
    guardarFilm() {
      console.log("Entro en guardado");
      if (this.validacionName && this.validacionDirector && this.validacionGenre && this.validacionType && this.validacionYear) {
        this.erroresValidacion = false;
        this.crearFilm({
          params: this.guardar,
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
