<template>
  <div class="pelis">
    <h1>Visualizar films</h1>
    <Tarjeta
      v-for="f in films"
      :key="f.filmID"
      :id="f.filmID"
      :name="f.filmName"
      :director="f.filmDirector"
      :type="comprobarType(f.filmType)"
      :genre="f.genName"
      :favorito="f.favID"
      @eventoEliminarFilm="comprobarEliminar(f)"
      @eventoEditar="onEditar(f)"
      @eventoDetalle="onDetalle(f)"
      @eventoAlternarFavorito="alternarFavorito(f)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Tarjeta from "../components/Tarjeta.vue";

export default {
  name: "VisualizarFilms",
  components: {
    Tarjeta,
  },
  computed: {
    ...mapState(["films"]),
  },
  methods: {
    ...mapActions([
      "getFilms",
      "eliminarFilm",
      "añadirFavorito",
      "eliminarFavorito",
    ]),
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
    comprobarEliminar(data) {
      this.$bvModal
        .msgBoxConfirm("¿Desea eliminar este film?", {
          title: "Eliminar film",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Eliminar",
          cancelTitle: "Cancelar",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarFavorito({
              id: data.filmID,
              onComplete: (response) => {},
            });
            this.eliminarFilm({
              id: data.filmID,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setFilms(), 1000);
              },
            });
          }
        })
        .catch((err) => {});
    },
    onDetalle(f) {
      this.$router.push({
        name: "Detalles",
        params: {
          id: f.filmID,
        },
      });
    },
    onEditar(f) {
          this.$router.push({
        name: "EditarFilm",
        params: {
          filmID: f.filmID,
        },
      });
    },
    alternarFavorito(f) {
      if (f.favID == undefined)
        this.añadirFavorito({
          params: {
            filmID: f.filmID,
          },
          onComplete: (response) => {
            this.$notify({
              title: response.data.mensaje,
              type: "success",
            });
          },
          onError: (error) => {
            this.$notify({
              title: error.response.data.mensaje,
              type: "error",
            });
          },
        });
      else {
        this.eliminarFavorito({
          id: f.filmID,
          onComplete: (response) => {
            this.$notify({
              type: "success",
              title: response.data.mensaje,
            });
          },
        });
      }
    },
  },
  mounted() {
    this.getFilms();
  },
  updated() {
    this.getFilms();
  },
};
</script>

<style>
</style scoped>
.pelis{ 
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>