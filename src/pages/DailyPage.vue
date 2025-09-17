<template>
    <section>
        <!-- <p class="text" v-if="userTasks">У вас нет ежедневных заданий :(</p> -->
        <button @click="router.push('/token')">страница с токеном</button>
        <ul class="task-list">
            <Task :title="task.title" :description="task.description" :max-steps="task.maxSteps"
                :completed-steps="task.comoletedSteps" :exp-reward="task.expReward" :gold-reward="task.goldReward"
                v-for="task in userTasks" />
        </ul>
        <!-- <div class="char">
            <span class="skin"></span>
            <span class="armor"></span>
            <span class="head"></span>
        </div> -->
        <!-- {{ userTasks }} -->
    </section>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Task from '../components/Task.vue';
import { onMounted, ref } from 'vue';
import { useCounterStore } from '../stores/counterStore';

const router = useRouter()
const store = useCounterStore()
const userTasks = ref()

onMounted(async () => {
    if (localStorage.getItem("username"))
        userTasks.value = await store.getUserTasks(localStorage.getItem("username"))
})
</script>



<style scoped>

.char{
    width: 90px;
    height: 90px;
    position: relative;
}

.skin{
    position: absolute;
    width: 90px;
    height: 90px;
    background-image: url("/skin.png");
}

.armor{
    position: absolute;
    width: 90px;
    height: 90px;
    background-image: url("/armor.png");
}

.text {
    text-align: center;
    color: black;
    opacity: 0.5;
}

.task-list{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px
}

section {
    padding: 10px;
}
</style>