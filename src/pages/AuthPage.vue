<template>
    <div>
        <input type="text" v-model="token" placeholder="Auth токен">
        <button @click="saveToken">сохранить</button>
        <input type="text" v-model="username">
        <BaseButton @click="saveUsername">сохранить</BaseButton>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';


const token = ref("")
const username = ref("")

function saveToken(){
    console.log(token.value)
    localStorage.setItem("token", token.value)
}

function saveUsername(){
    localStorage.setItem("username", username.value)
}

</script>