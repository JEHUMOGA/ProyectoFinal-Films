<template>
  <div class="home">
    <h1>Home</h1>
    <form>
      <input v-model="filmID" class="form-input" id="filmID" required placeholder="ID">
      <b-button to="/AgregarFilm" variant="outline-primary">Agregar</b-button>
      <b-button @click="editar(filmID)">Editar</b-button>
    </form>
    {{filmID}}
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    //HelloWorld
  },
  data(){
    return {
      filmID: 0
    }
  },
  methods: {
    editar(ID){
      console.log("ID paraeditar: " + ID)
      this.$router.push({ name: 'EditarFilm' , params:{filmID: ID}});
    }
  },
  
}
</script>
