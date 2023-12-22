<template>
  <div
    class="main-page"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
    "
  >
    <!-- Navbar componente -->
    <div>
      <Navbar />
    </div>

    <!-- Searchbar componente -->
    <div
      class="searchbar-container"
      :style="{
        backgroundImage: 'url(' + backgroundImage + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: 'fit-content',
        position: 'fixed',
        left: '0',
        top: '11%',
        padding: '5px',
      }"
    >
      <Searchbar @onSearch="performSearch" />
    </div>

    <!-- Lista de Apartamentos -->
    <div
      class="apartments-container"
      style="
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        top: 14%;
        right: 5%;
        height: 85%;
        width: 60%;
        padding: 10px;
        gap: 20px;
        overflow-y: scroll;
        z-index: 0;
      "
    >
      <ApartmentCard
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartmentTitle="apartment.apartment_title"
        :town="apartment.town"
        :barrioName="apartment.barrio.name"
        :address="apartment.address"
        :monthlyPrice="apartment.monthly_price"
        :accommodatesMax="apartment.accommodates_max"
        :bathrooms="apartment.bathrooms"
        :bedrooms="apartment.bedrooms"
        :pics="apartment.pic"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Searchbar from "../components/Searchbar.vue";
import ApartmentCard from "../components/ApartmentCard.vue";
import searchbarBackgroundImage from "@/assets/Searchbar-background.jpg";
import { searchApartments } from "../services/apartments.js";

export default {
  name: "MainPage",
  components: {
    Navbar,
    Searchbar,
    ApartmentCard,
  },
  data() {
    return {
      apartments: [],
      searchResults: [],
      backgroundImage: searchbarBackgroundImage,
    };
  },
  methods: {
    async loadAllApartments() {
      try {
        const results = await searchApartments(); // Llamada sin parámetros para obtener todos los apartamentos
        this.apartments = results;
      } catch (error) {
        console.error("Error al cargar apartamentos: ", error);
      }
    },
    async performSearch(searchParams) {
      try {
        const results = await searchApartments(searchParams);
        this.searchResults = results;
        this.apartments = results;
      } catch (error) {
        console.error("Error en la búsqueda: ", error);
      }
    },
  },
  mounted() {
    this.loadAllApartments(); // Cargar todos los apartamentos al montar
  },
};
</script>

<style>
</style>

