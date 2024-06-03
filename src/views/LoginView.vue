<template>
    <div class="login">
        <h2>Inicio de Sesión</h2>
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>

        <h2>Registro</h2>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label for="regUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="regUsername" v-model="regUsername" required>
            </div>
            <div class="mb-3">
                <label for="regEmail" class="form-label">Correo</label>
                <input type="email" class="form-control" id="regEmail" v-model="regEmail" required>
            </div>
            <div class="mb-3">
                <label for="regPassword" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="regPassword" v-model="regPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>

        <p><a href="#" @click="recoverPassword">Olvido su Contraseña?</a></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { users } from '@/assets/users.js';

const username = ref('');
const password = ref('');
const regUsername = ref('');
const regEmail = ref('');
const regPassword = ref('');
const store = useStore();
const router = useRouter();

const login = () => {
    // Validar campos vacíos
    if (!username.value || !password.value) {
        alert('Por favor. Completa todos los Campos.');
        return;
    }
    
    const user = users.find(u => u.username === username.value && u.password === password.value);
    if (user) {
        store.dispatch('login', user);
        router.push({ name: 'wiki' });
    } else {
        alert('Invalid username or password');
    }
};

const register = () => {
    // Validar campos vacíos
    if (!regUsername.value || !regEmail.value || !regPassword.value) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail.value)) {
        alert('Invalid email format');
        return;
    }

    // Verificar si el usuario ya está registrado
    const existingUser = users.find(u => u.username === regUsername.value);
    if (existingUser) {
        alert('Username already exists');
        return;
    }

    // Registrar el nuevo usuario
    users.push({ username: regUsername.value, email: regEmail.value, password: regPassword.value });
    alert('Registration successful');
};
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
}
</style>