<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { Engine } from './core/Engine';

const canvas: Ref<Node | null> = ref(null);

onMounted(async () => {

    const application = Engine.getInstance();
    application.init();


    // await PixiEngine.init(800, 600);
    // const canvasInfo = PixiEngine.getCanvas();
    canvas.value?.appendChild(application.getCanvas());
});
</script>

<template>
    <div>
        <div ref="canvas"></div>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
