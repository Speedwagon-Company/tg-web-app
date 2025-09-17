<template>
    <div class="background" v-if="store.reportModal" >
        <div class="dark" @click="store.reportModal = false"></div>
        <div class="popup">
            <h3 class="title">Уведомить преподователя об отсутствии на паре</h3>
            <div class="content">
                <p>Предмет: {{ props.lesson }}</p>
                <p>Преподователь: {{ props.teacher }}</p>
                <p>Начало пары: {{ props.time }}</p>
                <textarea class="area" type="text" placeholder="причина" v-model="reason"></textarea>
                <button class="btn" @click="sendReport">Отправить</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counterStore';
import { useMiniApp } from 'vue-tg';
const tg = useMiniApp()
const user = tg.initDataUnsafe.user?.username || ""
const props = defineProps<
{
    teacher:any;
    lesson:any;
    time:any;
    date:any;
}>()


const store = useCounterStore()
const reason = ref()

async function sendReport() {
    await fetch("https://7e8ede83f736d6.lhr.life", {
        method:"POST",
        mode:"cors",
        headers :{
             "Content-Type": "application/json"

        },
        body:JSON.stringify({
            username:user,
            desc:`${props.teacher} ${props.lesson} ${props.time} ${reason.value}`
        })
    })
}

</script>

<style scoped>

.background {
    z-index: 1;
    background: rgba(0, 0, 0, 0.582);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.dark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.popup {
    position: relative;
    z-index: 2;
    background: white;
    border-radius: 12px;
    width: 70%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    color: white;

    padding: 10px;
    background: #142866;
}

.content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    gap: 10px;
}

.area {
    width: 100%;
    height: 50%;
    resize: none;
}

.btn {
    /* margin-top: 30px; */
    width: 100%;
    height: 40px;
}
</style>