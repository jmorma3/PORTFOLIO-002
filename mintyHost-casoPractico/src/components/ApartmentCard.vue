<template lang="">
    <div>
        <div class="max-w-2xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">

              <!-- Insertamos aquí el carousel de imágenes: -->
              <div id="default-carousel" class="relative w-full" data-carousel="slide">
                   
                    <!-- Carousel de imágenes -->
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <!-- Imágenes del Carousel -->
                        <div class="duration-700 ease-in-out" data-carousel-item 
                            v-for="(image, index) in pics" 
                            :key="index"
                            :class="{ 'active': index === activeIndex,'hidden': index !== activeIndex }" 
                            style="transition: transform 0.5s ease;">
                            <img :src="image" class="block w-full object-cover" alt="Imagen del apartamento">
                        </div>
                    </div>

                    <!-- Indicadores del Carousel -->
                    <div class="carousel-indicators absolute z-30 flex space-x-3 justify-center bottom-4 w-full">
                        <button
                            v-for="(image, index) in pics"
                            :key="'indicator-' + index"
                            class="w-3 h-3 rounded-full"
                            :class="{ 'bg-white': index === activeIndex, 'bg-gray-500': index !== activeIndex }"
                            @click="activeIndex = index"
                            aria-label="Go to slide"
                        ></button>
                    </div>

                    <!-- Controles del Carousel -->
                    <button 
                    type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                         @click="prevSlide"
                        aria-label="Previous slide">
                        <!-- Icono SVG para "Previous" -->
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button" 
                        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
                        @click="nextSlide"
                        aria-label="Next slide">
                        <!-- Icono SVG para "Next" -->
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                        
                    </button>
                </div>

                <!-- Resto de la Card: -->
                <div class="grid grid-cols-2 gap-4 p-2">
                    <div>
                        <h3 class="font-bold text-xl mb-3">{{ apartmentTitle }}</h3> 
                        
                        <div class="flex items-center mb-2"> 
                            <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
                                
                                <!-- Icono de ubicación -->
                                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z"/>
                                </g>
                                <!-- ... -->
                            </svg>
                            
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-400">
                                {{ town }}, {{ barrioName }}
                            </p>
                        </div>
                        
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ address }}</p> 
                    </div>
                    
                    <div class="text-right"> 
                        <p class="font-semibold text-gray-700 dark:text-gray-400 inline-block">Precio mensual: &nbsp;</p>
                        <p class="text-xl font-bold text-gray-900 dark:text-white inline-block"> {{ monthlyPrice }} €</p>
                    </div>

                    <div class="col-span-2">
                        <div class= "flex justify-between"> 
                            <div>
                                <p class="font-semibold text-gray-700 dark:text-gray-400">Máximo huéspedes:</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ accommodatesMax }}</p>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-700 dark:text-gray-400">Baños:</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ bathrooms }}</p>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-700 dark:text-gray-400">Habitaciones:</p>
                                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ bedrooms }}</p>
                            </div>
                            </div>
                            <div class="text-center mt-3"> 
                                <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                    Resérvalo ya!
                                </button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
            </div>
</template>


<script>
export default {
  name: "ApartmentCard",
  props: {
    apartmentTitle: String,
    town: String,
    barrioName: String,
    address: String,
    monthlyPrice: Number,
    accommodatesMax: Number,
    bathrooms: Number,
    bedrooms: Number,
    pics: Array,
  },
  data() {
    return {
      activeIndex: 0, // Índice de la imagen activa
    };
  },
  methods: {
    nextSlide() {
      // Incrementa el activeIndex para mostrar la siguiente imagen
      // Reinicia a 0 si es la última imagen
      this.activeIndex = (this.activeIndex + 1) % this.pics.length;
    },
    prevSlide() {
      // Decrementa el activeIndex para mostrar la imagen previa
      // Va a la última imagen si es la primera imagen
      this.activeIndex =
        (this.activeIndex + this.pics.length - 1) % this.pics.length;
    },
  },
};
</script>


<style lang="">
</style>