<template>
    <div>
        <div>
            <input type="text" v-model="token" placeholder="Auth токен">
            <button @click="saveToken">сохранить</button>
        </div>
        <div>
            <input type="text" v-model="username" placeholder="username">
            <BaseButton @click="saveUsername">сохранить </BaseButton>
        </div>
        <BaseButton @click="clearLocalStorage">Удалить username из localStorage</BaseButton>
        <!-- <p>local storage</p>
        <ul class="local">
            <li class="local" v-for="item in localStor">
{{ item }} 
            </li>
        </ul> -->
        <h4>Пользователь</h4>
        <!-- <ul>
            <li v-for="item in myUser">
                <p>{{item}}</p>
            </li>
        </ul> -->
        {{store.user}}

        <h4>Инвентарь</h4>
        {{ inventory }}
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useCounterStore } from '../stores/counterStore';

const baseUrl = import.meta.env.VITE_BASE
const token = ref("")
const username = ref("")
const inventory = ref()
// const localStor = ref({...localStorage})
const store = useCounterStore()
function saveToken(){
    console.log(token.value)
    localStorage.setItem("token", token.value)
}

function clearLocalStorage(){
    localStorage.removeItem("username")
}

function saveUsername(){
    localStorage.setItem("username", username.value)
}

async function getInventory(){
    const resp = await fetch(`${baseUrl}/inventory/get-inventory/${store.user.id}`, {
        mode:"cors"
    })
    console.log(resp)
    const data = await resp.json()
    console.log(data)
    inventory.value = data
}

const myUser = ref()
onMounted(() => {
    myUser.value = store.user
    getInventory()
})
</script>

<style scoped>
.local{
    min-width: 300px;
    max-width: 300px;
}
</style> 