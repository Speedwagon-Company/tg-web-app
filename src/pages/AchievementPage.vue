<template>
    <div>
        <div class="tabs">
            <div @click="activeTab = 'today'" class="tab" :class="{'active-tab': activeTab == 'today'}">
                <p>На день</p>
            </div>
            <div @click="activeTab = 'week'" class="tab" :class="{'active-tab': activeTab == 'week'}">
                <p>На неделю</p>
            </div>
        </div>
        <TodaySchedule v-if="activeTab == 'today'"/>
         <WeekSchedule v-if="activeTab == 'week'" />
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TodaySchedule from '../components/TodaySchedule.vue';
import WeekSchedule from '../components/WeekSchedule.vue';

const activeTab = ref("today")


</script>

<style scoped>

.text{
    text-align: center;
    color: black;
    opacity: 0.5;
}

.tabs{
    display: flex;
    /* gap: 10px; */
}
.tab{
    padding: 5px 5px;
    border-bottom: 2px solid #bbb8b8;
    cursor: pointer;
    transition: 0.3s;
}
.active-tab{
    border-bottom: #142866 2px solid;
}

</style>