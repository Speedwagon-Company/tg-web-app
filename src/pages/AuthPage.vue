<template>
    <div>
        <input type="text" placeholder="Auth токен">
        <button @click="saveToken">сохранить</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const token = ref("")

function saveToken(){
    localStorage.setItem("token", token.value)
}

</script>