<template>
    <div>
        <ul class="item-list">
            <li class="item" v-for="item in items" :key="item.id">
                <div class="item-img-wrapper">
                    <img :src="item.url" alt="" class="item-img">
                </div>
                <div class="item-desc">
                    <p>{{ item.cost }}</p>
                </div>
            </li>
        </ul>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';


const baseUrl = import.meta.env.VITE_BASE
const items = ref()

async function getAllItems(){
    let resp = await fetch(`${baseUrl}/items`, {mode:"cors"})
    console.log(resp)
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

.item-list{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

.item{
    width: 30%;
}

.item-desc{
    /* border-top: 1px solid black; */
    padding-top: 10px;
}

.item-img{
    width: 100%;
}

.item-img-wrapper{
    border-bottom: 1px solid black;
}

</style>