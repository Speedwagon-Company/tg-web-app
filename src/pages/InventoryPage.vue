<template>
    <section class="inventory">
        <ul class="inventory-list">
            <li v-for="inventory,i in inventories" class="inventory-item">
                <div class="inventory-image">
                    <img :src="inventory.item.url" alt="">
                </div>
                <h4>{{ inventory.item.name }}</h4>
                <div>
                    <BaseButton @click="changeEquippedBtn(true, i)" v-if="!inventory.equipped">Надеть</BaseButton>
                    <BaseButton @click="changeEquippedBtn(false, i)" v-else>Снять</BaseButton>
                </div>
            </li>
        </ul>
        <!-- <BaseButton @click="changeEquipped">сохранить</BaseButton> -->
         <Transition name="fade">
             <SavePopup v-if="popup" @change-data="(v: any) => handlePopup(v)" />
         </Transition>
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
function getChanges(){
    let res = []
    console.log(oldInventories, inventories.value)
    for(let i = 0; i < inventories.value.length; i++){
        if(oldInventories[i].equipped != inventories.value[i].equipped)
            res.push(inventories.value[i])
    }
    return res
}

function changeEquippedBtn(v: boolean, index: number){
    inventories.value[index].equipped = v
    console.log("changes", getChanges().length)
    if(getChanges().length > 0)
        popup.value = true
    else
        popup.value = false
    
}

function handlePopup(v: string){
    console.log("emit", v)
    if(v == "reset")
        resetData()
    else
        changeEquipped()
}


function resetData(){
    console.log(oldInventories)
    inventories.value = oldInventories
    popup.value = false
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
    // console.log(JSON.stringify(inventories.value))
    popup.value = false
    console.log(getChanges())
    const resp = await fetch(`${baseUrl}/inventory/change-equipped/${localStorage.getItem("username")}`, {
        method:"PUT",
        mode:"cors",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(getChanges())
    })
    if(resp.status != 200){
        $toast.error("Произошла ошибка", {position:"top"})
        return
    }
    $toast.success("Успешно", {position:"top"})
    console.log(resp)
    const data = await resp.json()
    console.log(oldInventories)
    console.log(data)
}

onMounted(() => {
    getInventory()
})


</script>


<style scoped>


.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  transition: .2s;
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transition: 1s;
}

.inventory{
    margin-bottom: 100px;
}

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