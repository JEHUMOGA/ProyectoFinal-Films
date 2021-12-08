<template>
  <div>
    <h1>Editar</h1>
    <form @submit.prevent="guardarPersona">
    <Input
        :value="film.filmID"
        id="filmID"
        class="mb-2"
        titulo="ID"
        disabled: true
        placeholder="Ingrese ID"
      />
      <Input
        :value="film.filmName"
        id="filmName"
        class="mb-2"
        titulo="Nombre"
        :maxlength="80"
        disabled = true
        placeholder="Ingrese Descripción"
      />
      <Input
        :value="film.filmDirector"
        id="filmDirector"
        class="mb-2"
        titulo="Nombre"
        :maxlength="60"
        disabled = true
        placeholder="Ingrese Descripción"
      />
      <Input
        :value="film.filmDescription"
        id="filmDescription"
        class="mb-2"
        titulo="Descripcion"
        :maxlength="200"
        disabled
        placeholder="Ingrese Descripción"
      />
      <Input
        v-model="film.filmType"
        id="filmType"
        class="mb-2"
        titulo="Tipo"
        :maxlength="1"
        placeholder="Ingrese un nombre"
        :error="erroresValidacion && !validacionNombre"
        mensajeError="El nombre es obligatorio"
      />
      <Input
        v-model="film.filmYear"
        id="filmYear"
        class="mb-2"
        titulo="Año"
        :maxlength="4"
        placeholder="Ingrese año"
      />
      <Input
        v-model="film.filmReview"
        id="filmReview"
        class="mb-2"
        titulo="Review"
        :maxlength="500"
        placeholder="Ingrese Review"
      />
      <Input
        v-model="film.filmScore"
        id="filmScore"
        class="mb-2"
        titulo="Teléfono"
        :maxlength="1"
        placeholder="Ingrese Score"
      />
      <b-button type="submit" variant="success">Guardar</b-button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from "vuex";
import Input from "../components/Input.vue";
export default {
  name: "Agregar",
  components: {
    Input,
  },
  data() {
    return {
      film: {
        filmID: 0,
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
    validacionType() {
      return (
        this.film.filmType !== undefined && this.film.filmType.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["obtenerPersona", "editarPersona"]),
    guardarPersona() {
      if (this.validacionType) {
        this.erroresValidacion = false;
        this.editarPersona({
          filmID: this.film.filmID,
          body: this.film,
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
              title: error.response.data.mensaje
            });
          }
        })
      } else {
        this.erroresValidacion = true;
      }
    },
  }/*,
  created() {
      this.obtenerPersona({
          id: this.$route.params.id,
          onComplete: (response) => {
            Vue.set(this, 'film', response.data.data);
          }
      })
  }*/
};
</script>