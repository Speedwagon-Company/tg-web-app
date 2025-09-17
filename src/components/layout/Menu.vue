<template>
    <div>

        <div class="menu">
            <ul class="menu-list">
                <li class="menu-item">Настройки</li>
            </ul>
        </div>
        <div class="bg" @click="$emit('close-menu', null)"></div>
    </div>
    </template>

<script lang="ts" setup></script>

<style scoped>

.menu{
    position: fixed;
    width: 75%;
    height: 100svh;
    background-color: #fff;
    z-index: 101;
}
.bg{
    position: fixed;
    width: 100%;
    height: 100svh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.menu-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.menu-item{
    padding: 10px;
}
</style>