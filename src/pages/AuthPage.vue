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
        <h4>tg info: {{ data }}</h4>
        <h4>Пользователь</h4>
        <!-- <ul>
            <li v-for="item in myUser">
                <p>{{item}}</p>
            </li>
        </ul> -->
        {{store.user}}

        <h4>Инвентарь</h4>
       
        <!-- {{ inventories }} -->

        
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useCounterStore } from '../stores/counterStore';
import { useMiniApp } from 'vue-tg';

// const user = initData.user()?.username
const tg = useMiniApp();
const data = ref(tg.initDataUnsafe.user?.username)
// const baseUrl = import.meta.env.VITE_BASE
const token = ref("")
const username = ref("")
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







const myUser = ref()
onMounted(() => {
    // console.log(initData.user, initData.user())
    // console.log(user)
    myUser.value = store.user
})
</script>

<style scoped>
.local{
    min-width: 300px;
    max-width: 300px;
}



</style> 