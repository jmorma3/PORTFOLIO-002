<template>
  <div class="searchbar-container"
    style="
      width: 30vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 5px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1;
    "
  >
    <!-- Botón desplegable de Barrios -->
    <div style="width: 100%; margin-bottom: 10px; position: relative">
      
      <button
        ref="barrioButton"
        @click="toggleDropdown"
        style="
          width: 100%;
          background-color: #f3f3f3;
          color: black;
          padding: 10px;
          border-radius: 8px;
          border: none;
        "
      >
        {{ selectedBarrio ? selectedBarrio.name : "Selecciona un barrio" }}
      </button>

      <!-- Opciones de Barrios -->
      <div
        v-show="isDropdownOpen"
        style="
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%; 
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 2;
        "
      >
        <ul style="list-style: none; padding: 5px">
          <li
            v-for="barrio in barrios"
            :key="barrio.id"
            @click.stop="selectBarrio(barrio)"
            style="padding: 5px; cursor: pointer"
          >
            {{ barrio.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Botón para abrir el modal de Filtros Adicionales -->
    <div style="width: 100%; margin-bottom: 10px">
      <button
        @click="openModal"
        style="
          width: 100%;
          background-color: #f3f3f3;
          color: black;
          padding: 10px;
          border-radius: 8px;
          border: none;
        "
      >
        Más filtros
      </button>
    </div>

    <!-- Botón de Búsqueda -->
    <div style="width: 100%; margin-bottom: 10px">
      <button
        class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        @click="performSearch"
      >
        Buscar
      </button>
    </div>
  </div>

  <!-- Modal de Filtros Adicionales -->
  <div
    v-if="isModalOpen"
    style="
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 50; 
    "
    @click="closeModal"
  >
    <div
      style="
        position: absolute;
        width: 300px; 
        top: 40%; 
        left: 2%; 
        background-color: white;
        padding: 16px; 
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 51; 
      "
      @click.stop
    >
      
      <!-- Grupo de botones de radio para Número de Habitaciones -->
      <div class="mb-4">
        <span class="text-gray-700 dark:text-gray-400"
          >Nº de Habitaciones:</span
        >
        <div class="mt-2">
          <div
            v-for="n in 4"
            :key="'bedrooms-' + n"
            class="inline-flex items-center mr-2"
          >
            <input
              type="radio"
              :id="'bedrooms-' + n"
              :value="n"
              v-model="searchParams.bedrooms"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              :for="'bedrooms-' + n"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ n }}</label
            >
          </div>
        </div>
      </div>

      <!-- Grupo de botones de radio para Número de Huéspedes -->
      <div class="mb-4">
        <span class="text-gray-700 dark:text-gray-400"
          >Máx. Huéspedes:</span
        >
        <div class="mt-2">
          <div
            v-for="n in 4"
            :key="'guests-' + n"
            class="inline-flex items-center mr-2"
          >
            <input
              type="radio"
              :id="'guests-' + n"
              :value="n"
              v-model="searchParams.guests"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              :for="'guests-' + n"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ n }}</label
            >
          </div>
        </div>
      </div>

      <!-- Campos de Precio Mínimo y Máximo -->
      <input
        v-model.number="searchParams.min_price"
        type="number"
        placeholder="Precio mínimo"
        class="mb-4 w-full p-2 border rounded"
      />
      <input
        v-model.number="searchParams.max_price"
        type="number"
        placeholder="Precio máximo"
        class="mb-4 w-full p-2 border rounded"
      />

      <!-- Botón para cerrar el modal -->
      <button
        @click="closeModal"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        Aplicar Filtros
      </button>
    </div>
  </div>
</template>
  
  <script>
import { getBarrios } from "../services/apartments.js";

export default {
  name: "Searchbar",
  data() {
    return {
      barrios: [],
      isModalOpen: false,
      isDropdownOpen: false,
      selectedBarrio: null,
      searchParams: {
        barrio_id: "",
        bedrooms: "",
        guests: "",
        min_price: "",
        max_price: "",
      },
    };
  },
  mounted() {
    // Registrar el controlador de eventos
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    // Limpiar el controlador de eventos
    document.removeEventListener("click", this.handleClickOutside);
  },

  async created() {
    try {
      this.barrios = await getBarrios();
    } catch (error) {
      console.error("Error al cargar barrios: ", error);
    }
  },
  emits: ["onSearch"], // Declarar los eventos emitidos
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    selectBarrio(barrio) {
      this.selectedBarrio = barrio;
      this.searchParams.barrio_id = barrio.id;
      this.toggleDropdown();
    },
    handleClickOutside(event) {
      // Obtener elemento barrioButton
      const barrioButton = this.$refs.barrioButton;

      // Verificar si el clic fue fuera de los elementos y si están abiertos
      if (
        this.isDropdownOpen &&
        barrioButton &&
        !barrioButton.contains(event.target)
      ) {
        this.toggleDropdown();
      }
    },
    performSearch() {
      if (this.searchParams.min_price > this.searchParams.max_price) {
        alert("El precio mínimo no puede ser mayor que el máximo.");
        return;
      }
      this.$emit("onSearch", this.searchParams);
      this.closeModal();
    },
  },
};
</script>
  

<style>

</style>
