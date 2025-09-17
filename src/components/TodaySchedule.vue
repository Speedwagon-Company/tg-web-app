<template>
    <div class="shedule">
        <ReportModal :lesson="modalData.lesson" :teacher="modalData.teacher" :time="modalData.time" :date="''" />
        <div class="wrapper">
            <BaseInput @change="onDateInputChange($event.target.value)" :value="date" type="date" v-model="date" />
            <BaseButton @click="prevDay" >пред. день</BaseButton>
            <BaseButton @click="nextDay" >след. день</BaseButton>
        </div>
        <h4 v-if="day">{{ day.dayInfo }}</h4>
        <TransitionGroup name="list" tag="ul" :class="'lesson-list'" v-if="day">
            <li class="lesson-item" v-for="lesson,i in day.schedule" :key="i" :class="{'inactive': isLessonInactive(lesson.time, todayInfo.day)}">
                <div class="lesson-time">
                    <span class="time">{{ lesson.time }}</span>
                    <span class="time">{{ getEndLessonTime(lesson.time) }}</span>
                </div>

                <div class="lesson-main">
                    <h4 class="lesson-name">{{ lesson.disciplineName}} <span class="lesson-type">({{ lesson.lessonType }})</span></h4>
                    <div class="lesson-footer">
                        <span class="lesson-audience">{{ lesson.audience }}
                            <span class="now" v-show="matchInterval(lesson.time, getEndLessonTime(lesson.time), new Date())">Now</span>
                        </span>
                        <span>{{ lesson.teacherName }}</span>
                    </div>
                    <div class="icon" @click="handleReportModal(lesson)">
                        <FlagIcon :fill="'None'" />
                    </div>
                </div>
            </li>
        </TransitionGroup>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useCounterStore } from '../stores/counterStore';
import { ScheduleWeek } from '../assets/types/enums/ScheduleWeek';
import BaseInput from './ui/BaseInput.vue';
import BaseButton from './ui/BaseButton.vue';
import FlagIcon from './icons/FlagIcon.vue';
// import { WeekDays } from '../assets/types/enums/WeekDays';;
import ReportModal from './ReportModal.vue';

const store = useCounterStore()
const day = ref();
const date = ref()
const modalData = ref<ModalData>({})
interface ModalData {
  lesson?: any; 
  teacher?: any; 
  time?: string;  
  date?: string
}
function handleReportModal(lessonInfo: any) {
    store.reportModal = true
    modalData.value = {
        time:lessonInfo.time,
        teacher:lessonInfo.teacherName,
        date:"",
        lesson:lessonInfo.disciplineName
    }
}

function matchInterval(start: string, end: string, date: Date): boolean{
    let currDate = new Date().getDate()
    if(currDate != date.getDate())
        return false

    let splitedStart = start.split(":")
    let splitedEnd = end.split(":")

    let startHours = parseInt(splitedStart[0])
    let startMin = parseInt(splitedStart[1])
    let endHours = parseInt(splitedEnd[0])
    let endMin = parseInt(splitedEnd[1])
    let dateMin = date.getMinutes()
    let dateHours = date.getHours() 

    let startConverted = (startHours * 60) + startMin
    let endConverted = (endHours * 60) + endMin
    let dateConverted = (dateHours * 60) + dateMin
    return dateConverted >= startConverted && dateConverted <= endConverted


}

function nextDay(){
    let splitedDate = date.value.split("-")
    let day = parseInt(splitedDate[2])
    day+=1
    splitedDate[2] = day.toString()
    date.value = splitedDate.join("-")
    console.log(splitedDate)
    changeData()
}


function prevDay(){
    let splitedDate = date.value.split("-")
    let day = parseInt(splitedDate[2])
    day-=1
    splitedDate[2] = day.toString()
    date.value = splitedDate.join("-")
    console.log(splitedDate)
    changeData()
}
function isLessonInactive(time: string, passedDate: number): boolean{
    const date = new Date()
    if(passedDate != date.getDate())
        return false
    const dateMin = date.getMinutes()
    const dateHours = date.getHours()

    const splitedTime = time.split(":")
    const timeHours = parseInt(splitedTime[0])
    const timeMin = parseInt(splitedTime[1])

    const dateConverted = (dateHours * 60) + dateMin
    const timeConverted = (timeHours * 60) + timeMin

    return dateConverted > timeConverted+95
}

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

function getNDayInfo(date: string){
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
    const dayIndex = today.getDay();
    const monthName = today.toLocaleDateString('ru-RU', { month: 'long' });
    return {dayName:daysOfWeek[dayIndex], day:today.getDate(), monthName:monthName};
}

// function getCurrTime(){
//     const currDate = new Date()
//     const hours = currDate.getHours()
//     const minutes = currDate.getMinutes()
//     return [hours,minutes]
// }


let today: any
let data = ref("")
const todayInfo = reactive({todayName:"", day:0, monthName:""})
onMounted( async() => {
    today = store.getNDay(new Date().getDay())
    date.value = new Date().toISOString().split('T')[0]
 
    console.log(getEndLessonTime("8:30"))
    let todayDay = getNDayInfo(date.value)
    todayInfo.todayName = todayDay.dayName
    todayInfo.day = todayDay.day
    todayInfo.monthName = todayDay.monthName
    data.value = await store.getScheduleJSON(504, date.value, ScheduleWeek.CURRENT)
    day.value = await store.getNDaySchedule(data.value, today)
})

async function changeData(){

    let todayDay = getNDayInfo(date.value)
    todayInfo.todayName = todayDay.dayName
    todayInfo.day = todayDay.day
    todayInfo.monthName = todayDay.monthName

    day.value = await store.getNDaySchedule(data.value, store.getNDay(new Date(date.value).getDay()))
    // day.value = ...day.value
    console.log("changed cal",day.value)
}

async function onDateInputChange(e: any){
    date.value = e
    data.value = await store.getScheduleJSON(504, date.value, ScheduleWeek.CURRENT)
    await changeData()
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
.shedule{
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    margin-bottom: 100px;
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
    position: relative;
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

.now{
    padding: 2px 4px;
    background: rgb(245, 93, 38);
    border-radius: 4px;
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

.inactive{
    background: #b7b7b74f;
}

.wrapper{
    display: flex;
    gap: 10px;
}

.icon {
    
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
}
</style>