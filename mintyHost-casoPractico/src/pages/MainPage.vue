<template>
  <div class="main-page">
    <div>
      <Navbar />
    </div>
    <!-- Asegúrate de que la altura de la Navbar sea considerada aquí -->
    <div
      style="
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translate(-50%, -50%);
      "
    >
      <Searchbar @onSearch="performSearch" />
    </div>

    <!-- Aquí puedes mostrar los resultados de la búsqueda -->
    <div
      style="
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
      "
    >
    <div v-if="message" class="search-message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Searchbar from "../components/Searchbar.vue";
import { searchApartments } from "../services/apartments.js";

export default {
  name: "MainPage",
  components: {
    Navbar,
    Searchbar,
  },
  data() {
    return {
      searchResults: [],
      isLoading: false,
      hasError: false,
    };
  },
  computed: {
    message() {
      if (this.isLoading) return "Buscando...";
      if (this.hasError)
        return "Error al realizar la búsqueda. Por favor, inténtalo de nuevo.";
      if (this.searchResults.length === 0)
        return "No se encontraron resultados.";
      return ""; // No se muestra ningún mensaje si hay resultados
    },
  },
  methods: {
    async performSearch(searchParams) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const results = await searchApartments(searchParams);
        this.searchResults = results;
      } catch (error) {
        console.error("Error en la búsqueda: ", error);
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
/* Aquí van tus estilos */
</style>
