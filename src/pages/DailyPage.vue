<template>
    <section>
        <p class="text">У вас нет ежедневных заданий :(</p>
        <button @click="router.push('/token')">страница с токеном</button>
        <ul>
            <Task progress="30%" :title="task.title" :description="task.description" :max-steps="task.maxSteps"
                :completed-steps="task.comoletedSteps" :exp-reward="task.expReward" :gold-reward="task.goldReward"
                v-for="task in userTasks" />
        </ul>
        {{ userTasks }}
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
.text {
    text-align: center;
    color: black;
    opacity: 0.5;
}

section {
    padding: 10px;
}
</style>