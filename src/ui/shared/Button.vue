
<template>
    <button :class="class">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>

export type ButtonProps = {
    class?:string
}

</script>