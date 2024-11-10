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
        <Transition name="fade">
            <TodaySchedule v-show="activeTab == 'today'"/>

        </Transition>
        <Transition name="fade">
            <WeekSchedule v-show="activeTab == 'week'" />

        </Transition>
    </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TodaySchedule from '../components/TodaySchedule.vue';
import WeekSchedule from '../components/WeekSchedule.vue';

const activeTab = ref("today")


</script>

<style scoped>
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