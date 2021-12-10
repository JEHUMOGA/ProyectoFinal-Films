import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film:{},
    genres:[],
  },
  mutations: {
    setFilm(state, film){
      state.film = film;
    },
    setGenres(state, genres){
      state.genres = genres;
    },
  },
  actions: {
    getFilm({commit}, filmID){
      axios.get('http://localhost:3000/films/' + filmID )
      .then(response => {
        commit('setFilm', response.data.data)
      })
      .catch(error => console.log(error))
    },
    editarFilm({commit}, {filmID, body, onComplete, onError}){
      axios.put(`http://localhost:3000/films/${filmID}`, body)
      .then(response =>{
        onComplete(response)
      })
      .catch(onError,error => console.log(error));
    },
    crearFilm({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/films', params)
      .then(onComplete)
      .catch(onError);
    },
    getGenres({commit}){
      console.log("Entro en genres");
      axios.get('http://localhost:3000/genres')
      .then(response => {
        commit('setGenres', response.data)
      })
      .catch(error => console.log(error))
    },
  },
  modules: {
  }
})
