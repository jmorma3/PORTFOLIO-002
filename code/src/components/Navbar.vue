<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      
      <div class="flex items-center space-x-3">
        <!-- Logo -->
        <img :src="logoUrl" alt="Logo" class="h-28 w-auto" />
      </div>

      <div class="flex md:order-2 items-center space-x-3">
        <!-- Botón para cambiar el idioma -->
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
          English
        </button>

        <!-- Botón de menú para móviles -->
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      <!-- Enlaces de navegación -->
      <div
        :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
          <li>
            <a href="#" class="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Viviendas</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Contacto</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700">Preguntas</a>
          </li>
        </ul>
      </div>
      
    </div>
  </nav>
</template>


<script>
//Importo mi imagen Logo 
import logoUrl from "../assets/My_Host_logo.png";

export default {
  name: "Navbar",
  data() {
    return {
      logoUrl,
      isMenuOpen: false //Estado inicial del menú
    };
  },
  methods: {
    toggleMenu() { 
      this.isMenuOpen = !this.isMenuOpen
    }
  }
};
</script>


<style lang="">
</style>