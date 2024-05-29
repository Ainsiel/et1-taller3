<template>
    <div>
        <NavbarComponent />
    </div>
    <div class="wiki">
        <h2>Wiki</h2>
        <p>Information about the game characters...</p>
        <p>Information about the assets...</p>
        <div v-if="history">
            <h3>Records</h3>
            <div v-for="(h, index) in history" :key="index">
                <div class="d-flex">
                    <div class="d-flex flex-column">
                        <h6>{{ h.u1 }}</h6>
                        <p>{{ h.ch1 }}</p>
                        <p>{{ h.u1Won }}</p>
                    </div>
                    <div class="d-flex flex-column">
                        <h6>{{ h.u2 }}</h6>
                        <p>{{ h.ch2 }}</p>
                        <p>{{ h.u2Won }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex';
import NavbarComponent from '@/components/NavbarComponent.vue'

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