<template>
    <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
            <div class="text-center" v-if="props.character1" >
                <img :src="`src/assets/${props.character1}/idle.gif`" class="character-img" alt="Character 1">
                <h5 class="card-title">{{ props.username1 }}</h5>
                <p class="card-text" :class="{ 'text-success': props.u1Won, 'text-danger': !props.u1Won }">
                    {{ props.u1Won ? 'GANO' : 'PERDIO' }}
                </p>
            </div>
            <div class="vs text-center">
                <h3>VS</h3>
            </div>
            <div class="text-center" v-if="props.character2" >
                <img :src="`src/assets/${props.character2}/idle.gif`" class="character-img" alt="Character 2">
                <h5 class="card-title">{{ props.username2 }}</h5>
                <p class="card-text" :class="{ 'text-success': props.u2Won, 'text-danger': !props.u2Won }">
                    {{ props.u2Won ? 'GANO' : 'PERDIO' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    username1: String,
    character1: String,
    u1Won: Boolean,
    username2: String,
    character2: String,
    u2Won: Boolean
});
</script>

<style>
.character-img {
    width: 100px;
    height: 100px;
}

.text-success {
    color: green;
}

.text-danger {
    color: red;
}

.vs {
    font-weight: bold;
    font-size: 24px;
}
</style>