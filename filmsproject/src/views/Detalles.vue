<template>
  <div class="detalles">
    <h1 class = "mb-5">Detalles</h1>
    <h4 class = "mb-4">FilmID: {{ film.filmID }}</h4>
    <h4 class = "mb-4">Nombre: {{ film.filmName }}</h4>
    <h4 class = "mb-4">Director: {{ film.filmDirector }}</h4>
    <h4 class = "mb-4">Genero: {{film.genID}} - {{ film.genName }}</h4>
    <h4 class = "mb-4">Descripción: {{ film.filmDescription == undefined ? "Sin descripción" : film.filmDescription}}</h4>
    <h4 class = "mb-4">{{ comprobarType(film.filmType) }}</h4>
    <h4 class = "mb-4">Año: {{ film.filmYear }}</h4>
    <h4 class = "mb-4">Review: {{ film.filmReview == undefined ? "Sin review" : film.filmReview}}</h4>
    <h4 class = "mb-4">Score: {{ film.filmScore == undefined ? "Sin puntuación" : film.filmScore}}</h4>
    <h4 class = "mb-4">En favoritos: {{ film.favID == undefined ? "No" : "Sí"}}</h4>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Detalles",
  computed: {
    ...mapState(["film"]),
  },
  methods: {
    ...mapActions(["getFilm"]),
    comprobarType(type) {
      switch (type) {
        case 2:
          return "Movie";
        case 4:
          return "Serie";
        case 6:
          return "Documental";
        case 8:
          return "Anime";
      }
    }
  },
  mounted() {
    this.getFilm(this.$route.params.filmID);
  },
  
};
</script>

<style>
.detalles {
  text-align: center;
}
</style>