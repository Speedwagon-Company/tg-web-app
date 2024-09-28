<script setup lang="ts">
// import { Alert } from 'vue-tg';
import { onMounted, ref } from "vue";
import Navbar from "./components/layout/Navbar.vue";
import Stats from "./components/Stats.vue";
import Character from "./components/Character.vue";
// import { useWebApp } from "vue-tg";
import { useCounterStore } from "./stores/counterStore";

const store = useCounterStore()
// const tg = useWebApp();

// const data = ref(tg.initDataUnsafe.user?.username)
// let second: any
onMounted(() => {
  store.saveUsername("ahmde")

  // second = JSON.parse(second)
})
</script>

<template>
  <div  class="app">
    <div class="wrapper">
      <Character />
      <Stats />
    </div>
    <!-- {{ data }} -->
    {{ store.count }}
    <router-view></router-view>
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

</style>
