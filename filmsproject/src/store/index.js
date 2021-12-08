import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film:{},
  },
  mutations: {
    setFilm(state, film){
      state.film = film;
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
      .then(onComplete)
      .catch(onError);
    },
    crearFilm({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/films', params)
      .then(onComplete)
      .catch(onError);
    },
  },
  modules: {
  }
})
