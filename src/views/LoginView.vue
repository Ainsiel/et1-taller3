<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { users } from '@/assets/users.js';

const username = ref('');
const password = ref('');
const store = useStore();
const router = useRouter();

const login = () => {
    const user = users.find(u => u.username === username.value && u.password === password.value);
    if (user) {
        store.dispatch('login', user);
        router.push({ name: 'home' });
    } else {
        alert('Invalid username or password');
    }
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
}
</style>