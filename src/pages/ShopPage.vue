<template>
    <section class="shop">
        <ul class="item-list">
            <li class="item" v-for="item in items" :key="item.id" @click="selectedItem = item">
                <div class="item-img-wrapper">
                    <img :src="item.url" alt="" class="item-img">
                </div>
                <div class="item-desc">
                    <p>{{ item.cost }}</p>
                </div>
            </li>
        </ul>
        <ItemModal v-if="selectedItem" @close-modal="(n) => selectedItem = n" :item="selectedItem"/>
    </section>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ItemModal from '../components/ItemModal.vue';


const baseUrl = import.meta.env.VITE_BASE
const items = ref()
const selectedItem = ref()
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

.shop{
    padding: 10px;
}

.text{
    text-align: center;
    color: black;
    opacity: 0.5;
}

.item-list{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
}

.item{
    width: 100px;
    border-radius: 6px;
}

.item-desc{
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-top: 1px solid black; */
    padding: 3px 0;
    background: #f5f5f5;
}

.item-img{
    width: 100%;
}

.item-img-wrapper{
    /* border-bottom: 1px solid black; */
    background: #f9f9f9;
}
.item-img-wrapper > img{
    margin-left: -10px;

}

</style>