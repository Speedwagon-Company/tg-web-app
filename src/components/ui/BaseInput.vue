<script setup lang="ts">
import { ref, watch } from 'vue'

export type BaseInputProps = {
    class?:string
    placeholder?:string
    modelValue?:string
    value?:any
    type:string
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});

const updateValue = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    inputValue.value = value;
    emit('update:modelValue', value);
};
</script>

<template>
     <input 
        :type="props.type" 
        class="input" 
        :class="props.class"
        :placeholder="props.placeholder"
        :value="props.value" 
        @input="updateValue"/>
</template>

<style >
.input {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 4px;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

}

.input:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}
</style>