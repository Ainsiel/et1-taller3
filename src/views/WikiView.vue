<template>
    <div>
        <NavbarComponent />
    </div>
    <div class="wiki">
        <h2>Wiki</h2>
        <p>Information about the game characters...</p>

        <p>En un mundo asolado por la guerra y la oscuridad, cuatro facciones luchan por
            el control: los feroces orcos, los nobles caballeros, los astutos picaros y
            las hordas de no-muertos esqueletos.</p>

        <p>Los orcos, liderados por el poderoso Rey Korgoth,
            son guerreros salvajes que han conquistado vastas extensiones de tierra
            en su búsqueda de dominio total. Su fuerza bruta y su ferocidad en la batalla
            los convierten en una amenaza temible para cualquiera que se cruce en su camino.</p>

        <p>Los caballeros, bajo el estandarte del Rey Arturo, defienden la justicia
            y la honra en un mundo oscuro y caótico. Con su destreza en la espada y
            su lealtad inquebrantable, luchan incansablemente para proteger a los inocentes
            y restaurar la paz perdida.</p>

        <p>Los picaros, dirigidos por la astuta Reina Fennel, son maestros del sigilo y
            la traición. Operando desde las sombras, utilizan su habilidad en el combate
            cuerpo a cuerpo y en el uso de trampas para eliminar a sus enemigos con
            precisión letal, sin importar los medios necesarios.</p>

        <p>Los esqueletos, comandados por el oscuro Nigromante Malakar, son un ejército
            de no-muertos que se alza desde las profundidades de las criptas ancestrales.
            Animados por la magia oscura, marchan implacablemente para consumir toda vida
            a su paso y extender la influencia de la muerte por todo el reino.</p>

        <p>En este mundo de conflictos eternos, los jugadores asumen el papel de héroes
            que deben elegir su facción y luchar por la supervivencia de su pueblo.
            Con la guerra desatada y la oscuridad amenazando con devorarlo todo,
            solo los más valientes y poderosos prevalecerán en la lucha por el
            destino del reino.</p>

        <p>Information about the assets...</p>
        <div v-if="history">
            <h3>Records</h3>
            <div v-for="(h, index) in history" :key="index">
                <div class="d-flex">
                    <RecordCard :username1="h.u1" :character1="h.ch1" :u1Won="h.u1Won" :username2="h.u2"
                        :character2="h.ch2" :u2Won="h.u2Won" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import NavbarComponent from '@/components/NavbarComponent.vue'
import RecordCard from '@/components/RecordCard.vue'

const store = useStore();

const history = ref([])

onMounted(() => {
    history.value = store.getters.records
})
</script>

<style scoped>
.wiki {
    padding: 1rem;
}
</style>