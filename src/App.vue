<script setup lang="ts">
// import { Alert } from 'vue-tg';
import { onMounted } from "vue";
import Navbar from "./components/layout/Navbar.vue";

// import { useWebApp } from "vue-tg";
// import { useCounterStore } from "./stores/counterStore";

// import UserInfo from "./components/UserInfo.vue";

// const store = useCounterStore()
// const tg = useWebApp();

// const data = ref(tg.initDataUnsafe.user?.username)
// let second: any
onMounted(async() => {

  // localStorage.setItem("username", data.value+"")
  // let user = await store.postOrGetUser(data.value+"")
  // if(user){
  //   store.user = user
   
  // }
  // second = JSON.parse(second)
})
</script>

<template>
  <div  class="app">


    <!-- <UserInfo /> -->
    <router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component"/>
  </transition>
</router-view>
    <footer>
      <Navbar />
    </footer>
  </div>
</template>

<style scoped>

footer{
  position: fixed;
  bottom: 0;
  width: 100%;
}

.app{
  height: 100svh;
}

.wrapper{
  padding: 10px;
  display: flex;
  justify-content: space-between;
}


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

</style>
