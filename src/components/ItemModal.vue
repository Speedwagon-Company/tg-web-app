<template>
    <div>
        <div class="bg" @click="$emit('closeModal', null)">

        </div>
        <div class="modal">
            <div class="modal-header">
                <CoinIcon fill="#FEBD5F" />
                <p v-show="store.user">{{ store.user.coins }}</p>
            </div>
            <div class="modal-main">
                <div class="modal-img">
                    <img :src="item.url" alt="">
                </div>
                <h4 class="item-title">{{ item.name }}</h4>
                <p class="item-desc">{{ item.description }}</p>
                <p class="item-cost">cost - {{ item.cost }}</p>
            </div>
            <div class="modal-footer">
                <BaseButton @click="$emit('closeModal', null)">Close</BaseButton>
                <BaseButton @click="buyItem">buy</BaseButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Item } from '../assets/types/Item';
import { useCounterStore } from '../stores/counterStore';
import CoinIcon from './icons/CoinIcon.vue';
import BaseButton from './ui/BaseButton.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useToast} from 'vue-toast-notification';


export type ItemModalProps = {
    item:Item
}

const $toast = useToast();
const baseUrl = import.meta.env.VITE_BASE
const store = useCounterStore()
const props = defineProps<ItemModalProps>()
const item = props.item


async function buyItem() {
    if(store.user.coins < item.cost)
        $toast.error("У вас недостаточно средств", {position:"top"})
    console.log(JSON.stringify({item:item,username:localStorage.getItem("username")}))
    let resp = await fetch(`${baseUrl}/inventory/buy-item`,{
        method:"POST",
        mode:"cors",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({item:item,username:localStorage.getItem("username")})
    })
    if(resp.status != 200){
        $toast.error("Произошла ошибка", {position:"top"})
        return
    }
    $toast.success("Вы успешно купили предмет", {position:"top"})
    let data = await resp.json()
    console.log(data)
}

</script>

<style scoped>

.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: white;
    z-index: 2;
    width: 90%;
    border-radius: 8px;
    box-shadow: 0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 40px #0000001f;
}

.modal-header{
    width: 100%;
    background: #f9f9f9;
    display: flex;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    justify-content: end;
    padding: 10px;
}

.modal-img{
    margin-left: -25px;
    text-align: center;
}

.modal-main{
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.modal-footer{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    /* border-top: 1px solid black; */
    margin-top: 20px;
}
.bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.item-title{
    color: #4b4b4d;
    text-align: center;
}

.item-desc{
    color: #b0afb4;
    text-align: center;
}

.item-cost{
    text-align: center;
}
</style>