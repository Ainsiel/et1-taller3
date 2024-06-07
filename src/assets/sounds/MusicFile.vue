<template>
    <audio autoplay loop>
      <source :src="musicSrc" type="audio/mp3">
      Tu navegador no soporta la reproducción de audio.
    </audio>
  </template>
  
  <script setup>
  // Importa los archivos de música
  const musicSrc = {
    intenseBackgroundMusic: '/src/assets/sounds/intense-background-music-relaxing-medieval-style-lofi-176284.mp3',
    medievalStar: '/src/assets/sounds/medieval-star-188280.mp3',
    success: '/src/assets/sounds/success-1-6297.mp3',
    swordSound: '/src/assets/sounds/sword-sound-2-36274.mp3'
  };
  </script>