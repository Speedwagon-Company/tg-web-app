<template>
    <section class="char-page">
        <!-- {{ inventory }} -->
        <!-- <div v-for="item,i in inventory" :key="i">
            <div>{{ item }}</div>
        </div> -->
        <div class="wrapper">
            <div class="char">
                <div v-for="item in items">
                    <img :src="item.url" alt="" class="item" :style="{'z-index': item.zindex}"
                </div>
            </div>
            <Stats />

        </div>
        <BaseButton class="inventory-btn" @click="router.push('/character/inventory')">Инвентарь</BaseButton>
        <div>
            <!-- <img class="item skin" src="https://media.discordapp.net/attachments/1290330381807128651/1301197712787640390/skin.png?ex=67239a4d&is=672248cd&hm=d3221eee2114b46f0203880449e1c5b7c4cafb3b9d4072caaf026a1b2b03458e&=&format=webp&quality=lossless" alt=""> -->
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseButton from '../components/ui/BaseButton.vue';
import { useRouter } from 'vue-router';
import Stats from '../components/Stats.vue';


const baseUrl = import.meta.env.VITE_BASE
const inventory = ref()
const router = useRouter()
const items: any = ref([])

async function getCharEquippedItems(){
    const resp = await fetch(`${baseUrl}/inventory/equipped/${localStorage.getItem("username")}`, { mode:"cors"})
    const data = await resp.json()
    inventory.value = data
}

function collectItemsImgs(){
    inventory.value.forEach((item: any) => items.value.push(item["item"]))
}
onMounted(async () => {
    await getCharEquippedItems()
    collectItemsImgs()
})
</script>

<style scoped>

.char-page{
    margin-top: 50px;
}

.inventory-btn{
    display: flex;
    margin: 0 auto;
    margin-top: 50px;
}



.char{
    position: relative;
    width: 90px;
    height: 90px;
}

.wrapper{
    display: flex;
    justify-content: space-around;
}
.item{
    position: absolute;

}

.skin{
    z-index: -1;
}
</style>