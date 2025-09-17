<template>
    <div class="bg">
        <button class="cancel-btn" @click="$emit('change-data', 'reset')">Сброс</button>
        <button class="save-btn" @click="$emit('change-data', 'save')">Сохранить изменения</button>
    </div>

</template>

<script lang="ts" setup>
</script>

<style scoped>

.bg{
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    display: flex;
    justify-content: space-between;
    background-color: #111214;
    /* margin: 10px; */
    padding: 10px;
    border-radius: 4px;
    /* margin-bottom: ; */
}

.cancel-btn{
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.save-btn{
    background-color: #27a844;
    border: none;
    padding: 6px 10px;
    font-size: 16px;
    border-radius: 2px;
    cursor: pointer;
    color: white;
}

</style>

