<template>
    <div>
        вцфволцфлдвофцдф
        <div class="stat-bars">
            <StatsBar :progress="store.user.health+''" color="#FF5F61" :icon="HeartIcon" />
            <StatsBar :progress="store.user.exp+''" color="#FEBD5F" :icon="StarFourIcon" />
        </div>
        <div class="coins">
            <CoinIcon fill="#FEBD5F" />
            <span>{{ store.user.coins }}</span>
        </div>
    </div>

</template>

<script lang="ts" setup>
import StatsBar from './StatsBar.vue';
import HeartIcon from './icons/HeartIcon.vue';
import StarFourIcon from './icons/StarFourIcon.vue';
import CoinIcon from './icons/CoinIcon.vue';
import { useCounterStore } from '../stores/counterStore';

const store = useCounterStore()
</script>

<style scoped>
span{
    color: #4e4d53;
}
</style>