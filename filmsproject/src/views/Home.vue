<template>
  <div class="home">
    <h1>Home</h1>
    <b-container>
      <label class="mb-2">Genero: </label><br />
      <select
        v-model="selected"
        class="mb-3"
        mensajeError="El genero es obligatorio"
        @change="seleccionGenero()"
      >
        <option value="0">Todas</option>
        <option
          v-for="(genre, index) in genres"
          :key="index"
          :value="genre.genID"
        >
          {{ genre.genName }}
        </option>
      </select>
    </b-container>
    <Tabla :items="filtrados" :fields="campos" >  </Tabla>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from "vuex";
import axios from "axios";
import Tabla from "../components/Tabla.vue";

export default {
  name: "Home",
  components: {
    //HelloWorlds
    Tabla,
  },
  data() {
    return {
      selected: 0,
      campos: [
        { key: "filmName", label: "Nombre" },
        { key: "filmDirector", label: "Director" },
        {
          key: "filmType",
          label: "Tipo",
          formatter: (value) => {
            return this.comprobarType(value);
          },
        },
        { key: "filmYear", label: "Año" },
        { key: "genName", label: "Genero" },
      ],
    };
  },
  computed: {
    ...mapState(["favorites", "genres", "filtrados"]),
  },
  methods: {
    ...mapActions(["getFavorites", "getGenres", "getFiltrados"]),
    seleccionGenero() {
      if (this.selected === "0") {
        console.log("Entro ");
        this.getFavorites();
        return;
      }
      let filmAux;
      let Aux = [];
      Object.keys(this.favorites).forEach((key) => {
        filmAux = this.favorites[key];
        if (filmAux.genID == this.selected) {
          filmAux._rowVariant = this.colorRow(filmAux.filmType);
          Aux = Aux.concat(filmAux);
        }
      });
      this.getFiltrados({ params: Aux });
    },
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
    colorRow(type) {
      let color;
      switch (type) {
        case 2:
          color = "success";
          break;
        case 4:
          color = "warning";
          break;
        case 6:
          color = "primary";
          break;
        case 8:
          color = "danger";
          break;
      }
      return color;
    },
    
  },
  created() {
    this.getFavorites();
    console.log("created");
    console.log(this.favorites);
    this.getGenres();
  },
};
</script>