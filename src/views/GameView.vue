<template>
    <div>
        <NavbarComponent />
    </div>
    <div class="game my-5">
        <div v-if="isSelectingCharacter" class="container d-flex flex-column justify-content-center align-items-center w-100 my-5" style="height: 100vh;">
            <div class="d-flex flex-column justify-content-center w-100 my-5" >
                <h3>{{ text1 }}</h3>
                <div class="d-flex w-100 justify-content-around my-5">
                    <img src="@/assets/knight/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Knight" @click="() => onCharacterSelected(`knight`, `player1`)">
                    <img src="@/assets/rogue/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Rogue" @click="() => onCharacterSelected(`rogue`, `player1`)">
                    <img src="@/assets/orc/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Orc" @click="() => onCharacterSelected(`orc`, `player1`)">
                    <img src="@/assets/skeleton/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Skeleton" @click="() => onCharacterSelected(`skeleton`, `player1`)">
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center w-100">
                <h3>{{ text2 }}</h3>
                <div class="d-flex w-100 justify-content-around my-5">
                    <img src="@/assets/knight/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Knight" @click="() => onCharacterSelected(`knight`, `player2`)">
                    <img src="@/assets/rogue/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Rogue" @click="() => onCharacterSelected(`rogue`, `player2`)">
                    <img src="@/assets/orc/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Orc" @click="() => onCharacterSelected(`orc`, `player2`)">
                    <img src="@/assets/skeleton/idle.gif" style="max-width: 20vh; max-height: 20vh;" class="m-5 border border-5 border-secondary-subtle rounded w-100 h-100 " alt="Skeleton" @click="() => onCharacterSelected(`skeleton`, `player2`)">
                </div>
            </div>
            <button @click="() => onButtonClicked()" type="button" class="btn btn-danger btn-lg">Play!</button>
        </div>
        <div v-if="isBothPlayersReady" class="d-flex flex-column align-items-center">
            <h2>Game</h2>
            <GameComponent :username1="userLogged.username" :username2="userRandom.username" :character1="player1" :character2="player2" />
        </div>
    </div>
</template>

<script setup>
import GameComponent from '@/components/GameComponent.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import { users } from '@/assets/users.js';
import NavbarComponent from '@/components/NavbarComponent.vue'

const store = useStore();

const isBothPlayersReady = ref(false)
const isSelectingCharacter = ref(true)
const text1 = ref("Seleccion Personaje Usuario Logeado")
const text2 = ref("Seleccion Personaje Usuario No Logeado")
const player1 = ref(null)
const player2 = ref(null)
const userLogged = ref(null)
const userRandom = ref(null)

const onButtonClicked = () => {
    if (player1.value != null && player2.value != null){
        isSelectingCharacter.value = false
        isBothPlayersReady.value = true
    }
}

const onCharacterSelected = (character, player) => {
    if(player === "player1"){
        player1.value = character
        text1.value = `Seleccion Personaje ${userLogged.value.username}: ${character}`
    } else if(player === "player2"){
        player2.value = character
        text2.value = `Seleccion Personaje ${userRandom.value.username}: ${character}`
    }
}

onMounted(() => {
    userLogged.value = store.getters.user
    userRandom.value = users.filter(u => u.username !== userLogged.value.username).shift();
    text1.value = `Seleccion Personaje ${userLogged.value.username}: `
    text2.value = `Seleccion Personaje ${userRandom.value.username}: `
})

</script>

<style scoped>
.game {
    padding: 1rem;
}
</style>