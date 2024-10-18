<template>
    <div class="lessons">
        <div>
            <div class="input-wrapper">
                <BaseInput @change="getData" v-model="date" :type="'date'"/>
                <!-- <BaseButton @click="getData">Получить информацию</BaseButton> -->
            </div>
            <TransitionGroup name="list" tag="ul" :class="'lessons-list'">
                <li class="lessons-item" v-for="item,i in data" :key="i">
                    <div class="lessons-item-wrapper" v-if="item.description">
                        <span>{{ item.description.join(" ")}}</span>
                        <span>{{ item.date }}</span>
                    </div>
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import BaseButton from '../components/ui/BaseButton.vue';
import BaseInput from '../components/ui/BaseInput.vue';

const data = ref()
const date = ref("")
const day = ref("")
const whiteList = new Set(["Вход","Выход","турникет","ауд","501Н,","507Н,","404Н,","504Н,","512Н","412Н,","401Н,","",""])
for(let i = 1; i <= 512; i++){
    whiteList.add(`${i}Н,`)
}

async function getData(){

    day.value.padStart(2,"0")
    await fetch(`https://lms3.sseu.ru/api/v1/event-orion/by-student-id-and-date/8945?date=${date.value}`,
        {
            method:"GET",
            mode:"cors",
            headers:{
                "Authorization":`${localStorage.getItem("token")}`
            }
        }
    ).then((resp) => {
        console.log(resp)
        return resp.json()
    }).then((res) => {
        console.log(res)
       
        data.value = res
        data.value.forEach((item: any) => {
            const date = new Date(item.date);
            const formatedDesc = formatDataDescription(item.description)
            item.description = formatedDesc
            const formattedDate = date.toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            item.date = formattedDate
        }) 
    })
    // console.log(formatedDesc)
}



function formatDataDescription(item: any){
    const res: any = []

        let splitedDesc = item.split(" ")
        splitedDesc.forEach((item: any) => {
            if(whiteList.has(item)){
                res.push(item)
            }
        })


    return res
}

onMounted(() => {
    console.log(whiteList)
    getData()
    
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.text{
    text-align: center;
    color: black;
    opacity: 0.5;
}

.input-wrapper{
    display: flex;
    gap: 10px;
}

.lessons{
    padding: 10px;
}

.lessons-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.lessons-item{
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;
    padding: 5px;
}

.lessons-item-wrapper{
    display: flex;
    flex-direction: column;
    gap: 2px;
}

</style>