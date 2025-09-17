<template>
    <div class="stats">
        <component :is="icon" :fill="color" />
        <div class="bar-wrapper">
            <div class="bar">
                <div class="progress" :style="{'width': progress + '%', 'background': color}"></div>
            </div>
            <span class="progress-count">{{progress}}/100</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<
{
    color:string
    progress:string
    icon:any
}>()

</script>

<style scoped>
svg{
    width: 30px;
    height: 30px;
}

span{
    color: #4e4d53;
}
.stats{
    display: flex;
    align-items: center;
    gap: 10px;
}

.bar{
    width: 100px;
    height: 10px;
    background-color: rgb(226, 223, 223);
    border-radius: 2px;
}

.progress-count{
    color: black;
}

.bar-wrapper{
    display: flex;
    flex-direction: column;
}

.progress{
    background-color: #FF5F61;
    width: 100%;
    height: 100%;
    border-radius: 2px;
}
</style>