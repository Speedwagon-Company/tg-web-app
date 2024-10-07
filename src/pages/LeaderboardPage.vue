<template>
    <div>
        <p class="text">пока что ещё никто не попал в список forbes...</p>
        {{ data }}
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const data = ref()

onMounted(() => {

})
</script>

<style scoped>

.text{
    text-align: center;
    color: black;
    opacity: 0.5;
}

</style>