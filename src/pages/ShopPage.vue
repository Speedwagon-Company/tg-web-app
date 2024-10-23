<template>
    <div>
        {{ items }}
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';


const baseUrl = import.meta.env.VITE_BASE
const items = ref()

async function getAllItems(){
    let resp = await fetch(`${baseUrl}/items`, {mode:"cors"})
    let data = await resp.json()
    items.value = data

}

onMounted(() => {
    getAllItems()
})
</script>

<style scoped>

.text{
    text-align: center;
    color: black;
    opacity: 0.5;
}

</style>