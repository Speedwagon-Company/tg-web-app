<template>
    <div class="shedule">
        <h4>{{ `${todayInfo.todayName} ${todayInfo.day} ${todayInfo.monthName}` }}</h4>
        <ul class="lesson-list">
            <li class="lesson-item" v-for="lesson,i in day" :key="i">
                <div class="lesson-time">
                    <span class="time">{{ lesson.time }}</span>
                    <span class="time">{{ getEndLessonTime(lesson.time) }}</span>
                </div>

                <div class="lesson-main">
                    <h4 class="lesson-name">{{ lesson.disciplineName}} <span class="lesson-type">({{ lesson.lessonType }})</span></h4>
                    <div class="lesson-footer">
                        <span class="lesson-audience">{{ lesson.audience }}</span>
                        <span>{{ lesson.teacherName }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useCounterStore } from '../stores/counterStore';
import { ScheduleWeek } from '../assets/types/enums/ScheduleWeek';
import { WeekDays } from '../assets/types/enums/WeekDays';

const store = useCounterStore()
const day = ref();
function getEndLessonTime(time: string): string {
    let [hours, minutes] = time.split(':').map(Number);
    const lessonDuration = 95; 

    
    minutes += lessonDuration;

    hours += Math.floor(minutes / 60); 
    minutes %= 60;

    hours %= 24; 

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

function getTodayDay(){
    const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    ];

    const today = new Date();
    const dayIndex = today.getDay();
    const monthName = today.toLocaleDateString('ru-RU', { month: 'long' });
    return {dayName:daysOfWeek[dayIndex], day:today.getDate(), monthName:monthName};
}

function getCurrTime(){
    const currDate = new Date()
    const hours = currDate.getHours()
    const minutes = currDate.getMinutes()
    return [hours,minutes]
}



const todayInfo = reactive({todayName:"", day:0, monthName:""})
onMounted( async() => {
    const data = await store.getScheduleJSON(504, "2024-10-06", ScheduleWeek.CURRENT)
    day.value = await store.getNDaySchedule(data, WeekDays.MONDAY)
    console.log("DWADWA",day)
    console.log(getEndLessonTime("8:30"))
    let todayDay = getTodayDay()
    todayInfo.todayName = todayDay.dayName
    todayInfo.day = todayDay.day
    todayInfo.monthName = todayDay.monthName
    console.log(getCurrTime())
})
</script>

<style scoped>

.shedule{
    display: flex;
    flex-direction: column;
    padding: 10px;

}

.lesson-list{
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* border: 1px solid black; */
    width: fit-content;
    /* padding: 10px 2px; */
    border-radius: 12px;
}

.lesson-item{
    box-shadow: 0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f !important;
    display: flex;
    font-size: 14px;
    border-radius: 8px;
    min-height: 80px;
}

.lesson-main{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.lesson-type{
    font-weight: normal;
    color: #142866;
}

.lesson-time{
    background: #142866;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: space-around;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.time{
    color: white;
}

.lesson-name{
    color: #142866;
}

.lesson-time{
    color: #142866;
}

.lesson-footer{

    display: flex;
    justify-content: space-between;
}

.lesson-audience{
    color: #142866;
    font-weight: bold;
}
</style>