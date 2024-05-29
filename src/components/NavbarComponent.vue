<template>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Taller 3</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link active" aria-current="page" to="/">Wiki</router-link>
                    <router-link class="nav-link active" aria-current="page" to="/game">Game</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>


</script>