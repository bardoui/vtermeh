<template>
    <div
        class="it-icon icon is-action"
        :class="{ 'is-active': model }"
        @click="model = !model"
    >
        <slot name="icon" v-if="!model"></slot>
        <slot name="active" v-if="model"></slot>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, computed } from "@vue/runtime-core";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Boolean });

const model = computed({
    get: () => props.modelValue,
    set: (v) => emits("update:modelValue", v),
});
</script>
