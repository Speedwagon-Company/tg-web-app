<script setup lang="ts">
// import { Alert } from 'vue-tg';
import { onMounted, ref } from "vue";
import Navbar from "./components/layout/Navbar.vue";
import Menu from "./components/layout/Menu.vue";
// import { useWebApp } from "vue-tg";
// import { useHomeScreen } from 'vue-tg'
import { addToHomeScreen } from "@telegram-apps/sdk-vue";
import { useCounterStore } from "./stores/counterStore";
// import ReportModal from "./components/ReportModal.vue"

// import UserInfo from "./components/UserInfo.vue";

const store = useCounterStore()
// const tg = useWebApp();
// const home = useHomeScreen()
// const data = ref(tg.initDataUnsafe.user?.username)
const menuBool = ref(false)
// let second: any
onMounted(async () => {
  if(addToHomeScreen.isAvailable()) {
    addToHomeScreen()
  }
  // localStorage.setItem("username", data.value + "")
  let user = await store.getUser("undefined")
  console.log(user)
  if (user != undefined) {
    store.user = user

  }else{
    // let user = await store.postOrGetUser(data.value+"")
    // store.user = user
  }
  // second = JSON.parse(second)
})
</script>

<template>
  <div class="app">

    <Menu v-if="menuBool" @close-menu="() => menuBool = false"/>
    <!-- <UserInfo /> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer>
      <Navbar />
    </footer>
    <!-- <ReportModal /> -->
  </div>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.v-toast__text {
  color: white;
}

.app {
  height: 100svh;
}

.wrapper {
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
