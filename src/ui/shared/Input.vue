<template>
    <input :type="props.type" v-model="props.model" :class="props.class">
</template>

<script lang="ts" setup>

export type InputProps = {
    class?:string
    placeholder?:string
    model?:string
    type:string
}

const props = defineProps<InputProps>()

</script>