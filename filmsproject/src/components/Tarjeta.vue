<template>
  <div class="mb-3">
    <b-card :title="name" :sub-title="director" style="width: 500px">
      <b-card-text>
        {{ type }}
      </b-card-text>

      <b-card-text>
        {{ genre }}
      </b-card-text>

      <b-card-text>
        En favoritos: {{ favorito == undefined ? "No" : "Sí" }}
      </b-card-text>

      <b-button variant="outline-primary" class="me-2" @click='$emit("eventoDetalle", $event.target.value, id)'>Detalle</b-button>
      <b-button variant="success" class="me-2" @click='$emit("eventoEditar", $event.target.value, id)'>Editar</b-button>
      <b-button variant="danger" class="me-2" @click='$emit("eventoEliminarFilm", $event.target.value, id)'>Eliminar</b-button>
      <b-button variant="outline-info" class="mt-2" @click='$emit("eventoAlternarFavorito", $event.target.value, id)'>Agregar/Quitar de favoritos</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Tarjeta",
  props: {
    id: Number,
    name: String,
    director: String,
    type: String,
    genre: String,
    year: String,
    favorito: Number
  },
};
</script>

<style>
</style>