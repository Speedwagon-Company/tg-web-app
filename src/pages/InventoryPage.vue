<template>
    <section>
        <ul class="inventory-list">
            <li v-for="inventory in inventories" class="inventory-item">
                <div class="inventory-image">
                    <img :src="inventory.item.url" alt="">
                </div>
                <h4>{{ inventory.item.name }}</h4>
                <div>
                    <!-- {{ inventory.equipped }} -->
                    <BaseButton @click="inventory.equipped = true" v-if="!inventory.equipped">Надеть</BaseButton>
                    <BaseButton @click="inventory.equipped = false" v-else>Снять</BaseButton>
                </div>
            </li>
        </ul>
        <BaseButton @click="changeEquipped">сохранить</BaseButton>
        <SavePopup v-if="popup" @change-data="(v) => handlePopup(v)" />
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';
import SavePopup from '../components/SavePopup.vue';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const baseUrl = import.meta.env.VITE_BASE
let oldInventories: any
const inventories = ref()
const popup = ref(false)

// function changeEquippedBtn(eqq: any, v: boolean){
//     eqq = v
//     if(JSON.stringify(oldInventories) === JSON.stringify(inventories))
//         popup.value = false
//     else
//         popup.value = true
// }

function handlePopup(v: string){
    if(v == "reset")
        resetData()
    else
        changeEquipped()
}


function resetData(){
    console.log(oldInventories)
    inventories.value = oldInventories
    console.log(inventories.value)
}

async function getInventory(){
    const resp = await fetch(`${baseUrl}/inventory/get-inventory/${localStorage.getItem("username")}`, {
        mode:"cors"
    })
    if(resp.status != 200){
        $toast.error("Произошла ошибка", {position:"top"})
        return
    }
    const data = await resp.json()
    console.log(data)
    oldInventories = JSON.parse(JSON.stringify(data))
    inventories.value = data
}

async function changeEquipped(){
    console.log(JSON.stringify(inventories.value))
    const resp = await fetch(`${baseUrl}/inventory/change-equipped/${localStorage.getItem("username")}`, {
        method:"PUT",
        mode:"cors",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(inventories.value)
    })
    if(resp.status != 200){
        $toast.error("Произошла ошибка", {position:"top"})
        return
    }
    $toast.success("Успешно", {position:"top"})
    console.log(resp)
    const data = await resp.json()
    console.log(data)
}

onMounted(() => {
    getInventory()
})


</script>

<style scoped>
.inventory-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.inventory-image{
    margin-right: 25px;
}
</style>