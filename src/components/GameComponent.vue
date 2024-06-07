<template>
    <div>
        <canvas ref="canvasRef"></canvas>
        <div class="d-flex w-full justify-content-between">
            <div v-if="hero">
                <h3>{{ hero.name }}</h3>
                <div class="healthBar">
                    <div class="health" :style="`width: ${heroHealthPercentage}%;`"></div>
                    <div class="damage" :style="`width: ${heroDamagePercentage}%;`"></div>
                </div>
            </div>
            <div v-if="limo">
                <h3>{{ limo.name }}</h3>
                <div class="healthBar">
                    <div class="health" :style="`width: ${limoHealthPercentage}%;`"></div>
                    <div class="damage" :style="`width: ${limoDamagePercentage}%;`"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Character } from '@/assets/character';
import backgroundImage from '@/assets/background.png';
import { useStore } from 'vuex';

const props = defineProps({
    username1: String,
    username2: String,
    character1: String,
    character2: String,
})

const store = useStore();

const canvasRef = ref(null);
const hero = ref(null);
const limo = ref(null);
const heroHealthPercentage = ref(0);
const heroDamagePercentage = ref(0);
const limoHealthPercentage = ref(0);
const limoDamagePercentage = ref(0);
const lastAttackTime = ref(0);
const currentTime = ref(0);
const lastFrameTime = ref(0);
const heroFacingRight = ref(true)
const limoFacingRight = ref(false)

const attackInterval = 700;
let background = new Image();
background.src = backgroundImage;


const character1Sprite = ref(null)
const character2Sprite = ref(null)


const frameWidth = 32;
const frameHeight = 32;
const totalFrames = 4; // Total frames in the spritesheet
let currentFrame = 0;


const drawBackground = () => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

const drawCharacter = (character, sprite, isFacingRight) => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    const sx = currentFrame * frameWidth;
    const sy = 0;

    let spritesheet = new Image();
    spritesheet.src = sprite

    const scale = isFacingRight ? 1 : -1
    ctx.save(); // Guarda el estado del contexto
    ctx.scale(scale, 1); // Refleja horizontalmente el personaje si no está mirando hacia la derecha
    ctx.drawImage(spritesheet, sx, sy, frameWidth, frameHeight, isFacingRight ? character.x : -character.x - character.width, character.y, character.width, character.height);
    ctx.restore(); // Restaura el estado del contexto
};

const draw = () => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawCharacter(hero.value, character1Sprite.value, heroFacingRight.value);
    drawCharacter(limo.value, character2Sprite.value, limoFacingRight.value);
};

const checkCollision = (character1, character2) => {
    return (
        character1.x < character2.x + character2.width &&
        character1.x + character1.width > character2.x &&
        character1.y < character2.y + character2.height &&
        character1.y + character1.height > character2.y
    );
};

const handleCollision = () => {
    if (
        hero.value.isAlive() &&
        limo.value.isAlive() &&
        checkCollision(hero.value, limo.value) &&
        currentTime.value - lastAttackTime.value >= attackInterval
    ) {
        hero.value = attack(hero.value, limo.value);
        limo.value = attack(limo.value, hero.value);
        handleHealthPercentage();
        lastAttackTime.value = currentTime.value;
    }
};

const attack = (target, character) => {
    target.health -= character.damage;
    if (target.health < 0) {
        target.health = 0;
    }
    return target;
};

const handleHealthPercentage = () => {
    heroHealthPercentage.value = (hero.value.health / hero.value.maxhealth) * 100;
    heroDamagePercentage.value = 100 - heroHealthPercentage.value;
    limoHealthPercentage.value = (limo.value.health / limo.value.maxhealth) * 100;
    limoDamagePercentage.value = 100 - limoHealthPercentage.value;
};

const moveHero = (key) => {
    const move = window.innerWidth * 0.025;
    switch (key) {
        case 'KeyW':
            hero.value.y -= move;
            break;
        case 'KeyA':
            hero.value.x -= move;
            heroFacingRight.value = false
            break;
        case 'KeyS':
            hero.value.y += move;
            break;
        case 'KeyD':
            hero.value.x += move;
            heroFacingRight.value = true
            break;
    }
    checkBounds(hero);
};

const checkBounds = (character) => {
    if (character.value.x < 0) {
        character.value.x = 0;
    }
    if (character.value.x + character.value.width > canvasRef.value.width) {
        character.value.x = canvasRef.value.width - character.value.width;
    }
    if (character.value.y < 0) {
        character.value.y = 0;
    }
    if (character.value.y + character.value.height > canvasRef.value.height) {
        character.value.y = canvasRef.value.height - character.value.height;
    }
};

const moveLimo = (key) => {
    const move = window.innerWidth * 0.025;
    switch (key) {
        case 'ArrowUp':
            limo.value.y -= move;
            break;
        case 'ArrowLeft':
            limo.value.x -= move;
            limoFacingRight.value = false
            break;
        case 'ArrowDown':
            limo.value.y += move;
            break;
        case 'ArrowRight':
            limo.value.x += move;
            limoFacingRight.value = true
            break;
    }
    checkBounds(limo);
};

const gameLoop = () => {
    currentTime.value = performance.now(); // Obtener el tiempo actual en milisegundos

    const frameDelay = 100; // Delay entre frames en milisegundos (ajusta según necesites)

    const deltaTime = currentTime.value - lastFrameTime.value

    // Solo actualiza el frame si ha pasado suficiente tiempo
    if (deltaTime > frameDelay) {
        // Actualiza el tiempo del último frame
        lastFrameTime.value = currentTime.value;

        // Actualiza el frame actual
        currentFrame = (currentFrame + 1) % totalFrames;

        // Resto del código del gameLoop...
    }

    handleCollision();
    draw();

    // Comprueba si alguno de los personajes ha muerto.
    if (!hero.value.isAlive() || !limo.value.isAlive()) {
        // Detiene el game loop
        cancelAnimationFrame(gameLoop);

        // Muestra quien ha ganado
        let message;
        if (!hero.value.isAlive() && !limo.value.isAlive()) {
            message = "Ambos personajes han perdido.";
            store.dispatch('records',
                {
                    u1: props.username1,
                    ch1: props.character1,
                    u1Won: false,
                    u2: props.username2,
                    ch2: props.character2,
                    u2Won: false,
                })
        } else if (!hero.value.isAlive()) {
            message = `El personaje ${limo.value.name} ha ganado!`;
            store.dispatch('records',
                {
                    u1: props.username1,
                    ch1: props.character1,
                    u1Won: false,
                    u2: props.username2,
                    ch2: props.character2,
                    u2Won: true,
                })
        } else {
            message = `El personaje ${hero.value.name} ha ganado!`;
            store.dispatch('records',
                {
                    u1: props.username1,
                    ch1: props.character1,
                    u1Won: true,
                    u2: props.username2,
                    ch2: props.character2,
                    u2Won: false,
                })
        }

        // Muestra un mensaje de alerta de quien ha ganado
        alert(message);
    } else {
        requestAnimationFrame(gameLoop);
    }
};

onMounted(() => {
    const canvas = canvasRef.value;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const heroMaxHealth = Math.floor(Math.random() * 60) + 40;
    const enemyMaxHealth = Math.floor(Math.random() * 60) + 40;
    const heroAttk = Math.floor(Math.random() * 6) + 5;
    const enemyAttk = Math.floor(Math.random() * 6) + 5;


    character1Sprite.value = `src/assets/${props.character1}/Idle-Sheet.png`

    character2Sprite.value = `src/assets/${props.character2}/Idle-Sheet.png`

    hero.value = new Character(50, 50, window.innerHeight * 0.1, window.innerHeight * 0.1, 'blue', props.username1, heroMaxHealth, heroAttk);

    limo.value = new Character(canvas.width - 100, canvas.height - 100, window.innerHeight * 0.1, window.innerHeight * 0.1, 'red', props.username2, enemyMaxHealth, enemyAttk);

    window.addEventListener('keydown', function (event) {
        moveHero(event.code);
        moveLimo(event.code);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', function (event) {
            moveHero(event.code);
            moveLimo(event.code);
        });
    });

    handleHealthPercentage();

    gameLoop();
});
</script>

<style scoped>
.healthBar {
    width: 200px;
    height: 20px;
    border: 1px solid #000;
    display: flex;
}

.healthBar .health {
    height: 100%;
    background-color: green;
}

.healthBar .damage {
    height: 100%;
    background-color: red;
}
</style>