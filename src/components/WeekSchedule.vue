<template>
    <div class="shedule-wrapper">
        <div class="buttons">
            <BaseButton @click="prevWeek">Пред. неделя</BaseButton>
            <BaseButton @click="nextWeek">След. неделя</BaseButton>
        </div>
        <div v-for="day in weekDataArr" class="week-shedule">
            <h4>{{ `${day.dayInfo.dayName} ${day.dayInfo.day} ${day.dayInfo.monthName}` }}</h4>
            <TransitionGroup name="list" tag="ul" :class="'lesson-list'">
                <li class="lesson-item" v-for="lesson, i in day.week" :key="i">
                    <div class="lesson-time">
                        <span class="time">{{ lesson.time }}</span>
                        <!-- <span class="time">{{ getEndLessonTime(lesson.time) }}</span> -->
                    </div>

                    <div class="lesson-main">
                        <h4 class="lesson-name">{{ lesson.disciplineName }} <span class="lesson-type">({{
                                lesson.lessonType }})</span></h4>
                        <div class="lesson-footer">
                            <span class="lesson-audience">{{ lesson.audience }}
                                <!-- <span class="now" v-show="matchInterval(lesson.time, getEndLessonTime(lesson.time), new Date())">Now</span> -->
                            </span>
                            <span>{{ lesson.teacherName }}</span>
                        </div>
                    </div>
                </li>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCounterStore } from '../stores/counterStore';
import { ScheduleWeek } from '../assets/types/enums/ScheduleWeek';
import BaseButton from './ui/BaseButton.vue';


const store = useCounterStore()
let weekData: any
const weekDataArr = ref<any>([])
const date = ref()

async function nextWeek() {
    weekDataArr.value = []
    date.value = getMonday(new Date(date.value)).toLocaleDateString().split(".").reverse().join("-")
    console.log("DATE", date.value);
    weekData = await store.getScheduleJSON(504, store.addDaysToDate(date.value, 7), ScheduleWeek.CURRENT);
    for (let i = 0; i <= 6; i++) {
        if (store.getNDay(i) == "SUNDAY")
            continue
        console.log("iter")
        let dayInfo = await date.value.split("-")
        let lastNdayInfo
        lastNdayInfo = store.addDaysToDate(new Date(dayInfo.join("-")), i-1).split("-")[2]
        console.log("added days",dayInfo,store.addDaysToDate(new Date(dayInfo.join("-")), i-1))
        dayInfo[2] = lastNdayInfo
        dayInfo = await dayInfo.join("-")
        dayInfo = store.addDaysToDate(new Date(dayInfo), 7)
        await weekDataArr.value.push({ week: await store.getNDaySchedule(weekData, store.getNDay(i)), dayInfo: getNDayInfo(dayInfo) })
    }
}



async function prevWeek() {
    weekDataArr.value = []
    date.value = getMonday(new Date(date.value)).toLocaleDateString().split(".").reverse().join("-")
    console.log("DATE", date.value);
    weekData = await store.getScheduleJSON(504, store.addDaysToDate(date.value, -7), ScheduleWeek.CURRENT);
    for (let i = 0; i <= 6; i++) {
        if (store.getNDay(i) == "SUNDAY")
            continue
        console.log("iter")
        let dayInfo = await date.value.split("-")
        let lastNdayInfo
        lastNdayInfo = store.addDaysToDate(new Date(dayInfo.join("-")), i-1).split("-")[2]
        console.log("added days",dayInfo,store.addDaysToDate(new Date(dayInfo.join("-")), -i+1))
        dayInfo[2] = lastNdayInfo
        dayInfo = await dayInfo.join("-")
        dayInfo = store.addDaysToDate(new Date(dayInfo), -7)
        await weekDataArr.value.push({ week: await store.getNDaySchedule(weekData, store.getNDay(i)), dayInfo: getNDayInfo(dayInfo) })
    }
}


function getNDayInfo(date: string) {
    const daysOfWeek = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    const today = new Date(date);
    console.log(today.toLocaleDateString())
    const dayIndex = today.getDay();
    const monthName = today.toLocaleDateString('ru-RU', { month: 'long' });
    return { dayName: daysOfWeek[dayIndex], day: today.getDate(), monthName: monthName };
}


function getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
    console.log("START", diff, new Date(d.setDate(diff)))
    return new Date(d.setDate(diff));
}

onMounted(async () => {
    date.value = getMonday(new Date())
    console.log("DATE", date.value.toLocaleDateString().split(".").reverse().join("-"))
    date.value = await date.value.toLocaleDateString().split(".").reverse().join("-")
    weekData = await store.getScheduleJSON(504, date.value, ScheduleWeek.CURRENT)
    for (let i = 0; i < 6; i++) {
        if (store.getNDay(i) == "SUNDAY")
            continue

        let dayInfo = await date.value.split("-")
        let lastNdayInfo = parseInt(dayInfo[2]) + i - 1
        let daysInNMounth = daysInMonth(parseInt(dayInfo[0]), parseInt(dayInfo[1]))
        if (lastNdayInfo > daysInNMounth)
            dayInfo[1] = String(daysInNMounth - lastNdayInfo)
        dayInfo[2] = lastNdayInfo
        dayInfo = await dayInfo.join("-")
        console.log("day info", getNDayInfo(dayInfo), dayInfo)
        await weekDataArr.value.push({ week: await store.getNDaySchedule(weekData, store.getNDay(i)), dayInfo: getNDayInfo(dayInfo) })
    }
})
function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}
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

.shedule-wrapper {
    margin-bottom: 100px;
    margin-top: 20px;
}

.buttons{
    display: flex;
    gap: 10px;
    padding-left: 10px;
}

.week-shedule {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    width: 100%;
    /* margin-bottom: 100px; */
}

.lesson-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* border: 1px solid black; */
    width: 100%;
    /* padding: 10px 2px; */
    border-radius: 12px;
}

.lesson-item {
    box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f !important;
    display: flex;
    font-size: 14px;
    border-radius: 8px;
    min-height: 80px;
}

.lesson-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.lesson-type {
    font-weight: normal;
    color: #142866;
}

.lesson-time {
    background: #142866;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: space-around;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.time {
    color: white;
}

.now {
    padding: 2px 4px;
    background: rgb(245, 93, 38);
    border-radius: 4px;
    color: white;
}

.lesson-name {
    color: #142866;
}

.lesson-time {
    color: #142866;
}

.lesson-footer {

    display: flex;
    justify-content: space-between;
}

.lesson-audience {
    color: #142866;
    font-weight: bold;
}

.inactive {
    background: #b7b7b74f;
}

.wrapper {
    display: flex;
    gap: 10px;
}
</style>