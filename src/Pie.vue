<template>
    <div class="v-pie">
        <div class="vp-content">
            <slot></slot>
        </div>
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle class="vp-bar" cx="50" cy="50" r="42"></circle>
            <circle
                class="vp-fill"
                cx="50"
                cy="50"
                r="42"
                :style="{ strokeDashoffset: amount }"
            ></circle>
        </svg>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    percent: Number
});

const amount = computed(() => {
    let num = props.percent ? +props.percent || 0 : 0;
    num = num < 0 ? 0 : num;
    num = num > 100 ? 100 : num;
    num = Math.floor((num * 205) / 100);
    num = 205 - num;
    return num + 165;
});
</script>
