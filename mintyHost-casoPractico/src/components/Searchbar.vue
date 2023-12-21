<template>
  <div
    style="width: 500px"
    class="flex flex-row items-center justify-between bg-white p-3 rounded-lg shadow space-x-10"
  >
    <!-- Botón desplegable de Barrios -->
    <div class="w-1/3">
      <button
        @click="toggleDropdown"
        class="bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        {{ selectedBarrio ? selectedBarrio.name : "Selecciona un barrio" }}
        <svg
          class="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <!-- Opciones de Barrios -->
      <div
        v-show="isDropdownOpen"
        class="absolute mt-1 w-full bg-white rounded-md shadow-lg z-20"
        @click="toggleDropdown"
      >
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
          <!-- con el compando @click.stop evito que el evento se propague hacia arriba y deje abierto el depslegable: -->
          <li
            v-for="barrio in barrios"
            :key="barrio.id"
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            @click.stop="selectBarrio(barrio)"
          >
            {{ barrio.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Botón para abrir el modal de Filtros Adicionales -->
    <div class="w-1/3 text-center">
        
        <button
          @click="openModal"
          class="bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          Más filtros
        </button>
    </div>

    <!-- Botón de Búsqueda -->
    <div class="w-1/3 text-right">

        <button
          @click="performSearch"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-4 py-2.5"
        >
          Buscar
        </button>
    </div>
  </div>

  <!-- Modal de Filtros Adicionales -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="closeModal"
  >
    <div
      class="fixed left-1/2 transform -translate-x-1/2 top-60% -translate-y-40% bg-white p-6 rounded-lg shadow-lg z-50"
      @click.stop
    >
      <!-- Grupo de botones de radio para Número de Habitaciones -->
      <div class="mb-4">
        <span class="text-gray-700 dark:text-gray-400"
          >Número de Habitaciones:</span
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
          >Número de Huéspedes:</span
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
  