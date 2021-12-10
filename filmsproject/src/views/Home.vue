<template>
  <div class="home">
    <h1>Home</h1>
    <Table :items="personas" :fields="campos" :busy="loading"/>
      
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import Tabla from "../components/Tabla.vue";

export default {
  name: 'Home',
  components: {
    //HelloWorlds
    Tabla,
  },
  data(){
    return {
      campos: [
        { key: "filmName", label: "Nombre" },
        { key: "filmDirector", label: "Nombre" },
        
      ]
      
    }
  },
  computed: {
    ...mapState(["personas", "loading"]),
  },
  methods: {
     ...mapActions(["setPersonas", "eliminarPersona"])
    
  },
  
}
</script>
