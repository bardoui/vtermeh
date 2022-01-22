<template>
    <div class="v-choose">
        <template v-for="(item, index) in items" :key="index">
            <div
                class="item"
                :class="{ 'is-active': modelValue === item }"
                @click="emits('update:modelValue', item)"
            >
                <slot :item="item">{{ item }}</slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const emits = defineEmits(["update:modelValue"]);
defineProps({
    items: {
        type: Array,
        default: () => []
    },
    modelValue: {
        required: false
    }
});
</script>
