<template>
  <div class="detalles">
    <h1 class="mb-5">Film aleatorio</h1>
    <h4 class="mb-4">FilmID: {{ filmAleatorio.filmID }}</h4>
    <h4 class="mb-4">Nombre: {{ filmAleatorio.filmName }}</h4>
    <h4 class="mb-4">Director: {{ filmAleatorio.filmDirector }}</h4>
    <h4 class="mb-4">Genero: {{filmAleatorio.genID}} - {{ filmAleatorio.genName }}</h4>
    <h4 class="mb-4">
      Descripción:
      {{
        filmAleatorio.filmDescription == undefined
          ? "Sin descripción"
          : filmAleatorio.filmDescription
      }}
    </h4>
    <h4 class="mb-4">{{ comprobarType(filmAleatorio.filmType) }}</h4>
    <h4 class="mb-4">Año: {{ filmAleatorio.filmYear }}</h4>
    <h4 class="mb-4">
      Review:
      {{
        filmAleatorio.filmReview == undefined
          ? "Sin review"
          : filmAleatorio.filmReview
      }}
    </h4>
    <h4 class="mb-4">
      Score:
      {{
        filmAleatorio.filmScore == undefined
          ? "Sin puntuación"
          : filmAleatorio.filmScore
      }}
    </h4>
    <h4 class="mb-4">
      En favoritos: {{ filmAleatorio.favID == undefined ? "No" : "Sí" }}
    </h4>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "FilmAleatorio",
  computed: {
    ...mapState(["filmAleatorio"]),
  },
  methods: {
    ...mapActions(["getFilmAleatorio"]),
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
    },
  },
  mounted() {
    this.getFilmAleatorio();
  },
};
</script>

<style>
.detalles {
  text-align: center;
}
</style>