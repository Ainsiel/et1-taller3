<template>
    <!-- Tu contenido actual -->
    <audio autoplay loop>
      <source :src="musicSrc" type="audio/mp3">
      Tu navegador no soporta la reproducción de audio.
    </audio>
    <!-- Resto de tu contenido -->
  </template>
  
  <script setup>
  // Importa el archivo de música
  const musicSrc = '/src/assets/sounds/medieval-star-188280.mp3';
  </script>