<!-- Estructura HTML de mi componente/página -->
<template>
  <div class="main-page">
    <select v-model="searchParams.barrio_id">
      <option disabled value="">Barrio</option>
      <option v-for="barrio in barrios" :value="barrio.id" :key="barrio.id">
        {{ barrio.name }}
      </option>
    </select>
    <select v-model="searchParams.bedrooms">
      <option disabled value="">Número de habitaciones</option>
      <option v-for="n in 5" :value="n" :key="n">{{ n }} Habitaciones</option>
    </select>

    <select v-model="searchParams.guests">
      <option disabled value="">Número de huéspedes</option>
      <option v-for="n in 5" :value="n" :key="n">{{ n }} Huéspedes</option>
    </select>
    <input
      v-model.number="searchParams.min_price"
      type="number"
      placeholder="Precio mínimo"
    />
    <input
      v-model.number="searchParams.max_price"
      type="number"
      placeholder="Precio máximo"
    />
    <button @click="performSearch">Buscar</button>

    <!-- Resultados y mensaje -->
    <div v-if="searchResults.length">
      <div
        v-for="apartment in searchResults"
        :key="apartment.id"
        class="apartment-info"
      >
        <h3>{{ apartment.apartment_title }}</h3>
        <p>Dirección: {{ apartment.address }}</p>
        <p>Barrio: {{ apartment.barrio.name }}</p>
        <p>Máximo de huéspedes: {{ apartment.accommodates_max }}</p>
        <p>Baños: {{ apartment.bathrooms }}</p>
        <p>Habitaciones: {{ apartment.bedrooms }}</p>
        <p>Precio mensual: {{ apartment.monthly_price }}</p>
        <p>Metraje cuadrado: {{ apartment.square_meter }}</p>
        <div v-for="(pic, index) in apartment.pic" :key="index">
          <img
            :src="pic"
            :alt="`Imagen ${index + 1} de ${apartment.apartment_title}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

  

<!-- Lógica del componente  -->
<script>
// Importación de los servicios getBarrios y searchApartments desde mis servicios
import { getBarrios, searchApartments } from "../services/apartments.js";

// Definición y exportación del componente Vue
export default {
  // Nombre del componente
  name: "MainPage",

  // La función data devuelve un objeto que representa el estado local del componente
  data() {
    return {
      barrios: [], //Array para almacenar los barrios
      //Parámetros de búsqueda:
      searchParams: {
        barrio_id: "",
        bedrooms: "",
        guests: "",
        min_price: "",
        max_price: "",
      },
      searchResults: [], //Array para almacenar los resultados de la búsqueda
      message: "Introduce criterios de búsqueda...",
    };
  },

  async created() {
    try {
      const barriosData = await getBarrios();
      this.barrios = barriosData;
    } catch (error) {
      console.error("Error al cargar barrios: ", error);
    }
  },

  //Método para realizar la búsqueda ("performSearch")
  methods: {
    async performSearch() {
      this.message = "Buscando...";
      try {
        const results = await searchApartments(this.searchParams); //El método performSearch utiliza searchParams con los criterios anteriores para realizar la búsqueda.
        this.searchResults = results; //Resultados de la búsqueda...
        this.message = results.length ? "" : "No se encontraron resultados";
      } catch (error) {
        console.error("Error en la búsqueda: ", error);
        this.message = "Error al realizar la búsqueda";
      }
    },
  },
};
</script>
  

<!-- Estilos CSS de mi componente/página -->
<style>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
}

.apartment-info {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
}

.apartment-info h3 {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.apartment-info img {
  max-width: 200px;
  max-height: 200px;
  margin-right: 10px;
}
</style>
  