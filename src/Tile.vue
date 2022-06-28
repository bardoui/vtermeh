<template>
    <div class="v-tile" ref="container">
        <div class="tile-sizer"></div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, onUpdated, ref, watchEffect } from "vue";
import Masonry from "masonry-layout";

// props and stats
const props = defineProps({
    rtl: { type: Boolean, default: false },
    horizontalOrder: { type: Boolean, default: true },
    originTop: { type: Boolean, default: true },
});
const container = ref();
const instance = ref();

// methods
const update = () => instance.value && instance.value.layout();

// hooks
watchEffect(() => {
    if (!container.value) return;
    instance.value = new Masonry(container.value, {
        itemSelector: ".tile",
        columnWidth: ".tile-sizer",
        percentPosition: true,
        originLeft: !!props.rtl,
        horizontalOrder: !!props.horizontalOrder,
        originTop: !!props.originTop,
    });
});

onUpdated(update);

// exposes
defineExpose({ update });
</script>
