<template>
     <li class="lesson-item">
                <div class="lesson-time">
                </div>

                <div class="lesson-main">
                    <header class="task-header">
                        <div>
                            <h4 class="lesson-name">{{ props.title }}</h4>
                            <p>{{ props.description }}</p>
                        </div>
                        <p>{{ `${props.expReward} exp ${props.goldReward} gold` }}</p>
                    </header>
                    <div class="bar-wrapper">
                        <p>{{ props.progress }}</p>
                        <div class="progress-bar-bg">
                            <div class="progress-bar" :style="{'width': props.progress}"></div>
                        </div>
                    </div>
                </div>
            </li>
</template>

<script lang="ts" setup>
export interface TaskProps {
    title:string
    description:string
    maxSteps:number
    completedSteps:number
    goldReward:number
    expReward:number
    progress:string
}

const props = defineProps<TaskProps>()

</script>

<style scoped>
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
    gap: 10px;
    padding: 10px;
    width: 100%;
}

.lesson-type{
    font-weight: normal;
    color: #142866;
}

.lesson-time{
    background: #24CC8F;
    display: flex;
    flex-direction: column;
    padding: 3px;
    justify-content: space-around;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.time{
    color: white;
}


.lesson-name{
    color: rgb(34, 33, 33);
    /* opacity: 0.5; */
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

.progress-bar-bg{
    width: 100%;
    height: 8px;
    background: #ecebf0;
    border-radius: 20px;
}

.progress-bar{
    width: 50%;
    height: 100%;
    border-radius: 20px;
    background: #24CC8F;
}

.task-header{
    display: flex;
    justify-content: space-between;
}
</style>