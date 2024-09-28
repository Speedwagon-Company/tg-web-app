<template>
    <nav>
        <!-- <AchievementIcon :fill="color" /> -->
        <ul class="nav-list">
            <li class="nav-item"  v-for="(navItem) in navItems" :key="navItem.text" @click="changePage(navItem)">
                <component :is="navItem.icon"  :fill="color" :fillOpacity="navItem.opacity" />
                <p class="nav-item-text">{{ navItem.text }}</p>
            </li>
        </ul>
    </nav>

</template>

<script lang="ts" setup>
import AchievementIcon from '../icons/AchievementIcon.vue';
import DailyIcon from '../icons/DailyIcon.vue';
import LeaderboardIcon from '../icons/LeaderboardIcon.vue';
import ShopIcon from '../icons/ShopIcon.vue';
import {  ref, markRaw } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
type navItemsType = {
    icon:any,
    text:string,
    href:string,
    active:boolean,
    opacity: number
}

const color = ref("#ffff")

const navItems= ref([
    {
        icon:markRaw(DailyIcon),
        text:"Дейлики",
        href:"/daily",
        active: true,
        opacity:1
    },
    {
        icon:markRaw(ShopIcon),
        text:"Магазин",
        href:"/shop",
        active: false,
        opacity:0.5
    },
    {
        icon:markRaw(LeaderboardIcon),
        text:"Лидерборд",
        href:"/leaderboard",
        active: false,
        opacity:0.5
    },
    {
        icon:markRaw(AchievementIcon),
        text:"Достижения",
        href:"/achievements",
        active: false,
        opacity:0.5
    }
])

function changePage(item: navItemsType){
    markItem(item)
    router.push(item.href)

}

function markItem(givenItem: navItemsType){
    navItems.value.forEach((item) => { 
        if (item == givenItem){
            item.opacity = 1
            return
        }
        
        item.opacity = 0.5 
        
    })
}

</script>

<style>

nav{
    background: #52C3F1;
    padding: 5px;
}
svg>path {
    transition: all 1s;
}

.nav-list{
    display: flex;
    /* gap: 20px; */
    justify-content: space-around;
    align-items: center;

}

.nav-item{
    display: flex;
    flex-direction: column;
    align-items: center;
}


li > svg {
    width: 30px;
    height: 40px;
}

li > svg > path{
    width: 100%;
    height: 100%;
}

.nav-item-text{
    font-size: 10px;
    color: white;
}
</style>