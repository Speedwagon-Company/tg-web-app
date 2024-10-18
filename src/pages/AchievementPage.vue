<template>
    <div>
        <!-- <div class="tabs">
            <div class="tab active-tab">
                <p>На день</p>
            </div>
            <div class="tab">
                <p>На неделю</p>
            </div>
        </div> -->
        <TodaySchedule />
    </div>

</template>

<script lang="ts" setup>
// import { ref } from 'vue';
import TodaySchedule from '../components/TodaySchedule.vue';

// const activeTab = ref()


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
}
.active-tab{
    border-bottom: #142866 2px solid;
}

</style>