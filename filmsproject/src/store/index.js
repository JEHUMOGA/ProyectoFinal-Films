import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    film: {},
    filmAleatorio: {},
    films: [],
    genres: [],
    favorties: [],
  },
  mutations: {
    setFilm(state, film){
      state.film = film;
    },
    setFilms(state, films){
      state.films = films
    },
    setGenres(state, genres){
      state.genres = genres;
    },
    setFilmAleatorio(state, filmAleatorio){
      state.filmAleatorio = filmAleatorio
    }
  },
  actions: {
    getFilms({commit}){
      axios.get('http://localhost:3000/films')
      .then(response =>{
        commit('setFilms', response.data);
      })
      .catch(error => console.log("error", error))
    },
    getFilm({commit}, filmID){
      axios.get('http://localhost:3000/films/' + filmID )
      .then(response => {
        commit('setFilm', response.data.data)
      })
      .catch(error => console.log(error))
    },
    getFilmAleatorio({commit}){
      axios.get('http://localhost:3000/filmAleatorio')
      .then(response => {
        commit('setFilmAleatorio', response.data[0])
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
    añadirFavorito({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/favorites', params)
      .then(onComplete)
      .catch(onError);
    },
    eliminarFavorito({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/favorites/${id}`)
      .then(onComplete)
      .catch(onError);
    },
    eliminarFilm({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/films/${id}`)
      .then(onComplete)
      .catch(onError);
    }
  },
  modules: {
  }
})
