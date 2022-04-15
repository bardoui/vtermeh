<template>
    <label :class="dClass">
        <div class="v-toggle-label">
            <slot>Toggle Me</slot>
        </div>
        <input type="checkbox" :disabled="disabled" v-model="model" />
        <div class="v-toggle-slider"></div>
    </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    disabled: Boolean,
    modelValue: { type: Boolean, required: false }
});

const model = computed({
    get: () => props.modelValue,
    set: v => emits("update:modelValue", v)
});

const dClass = computed(() => ({
    "v-toggle": true,
    "is-checked": !!props.modelValue,
    "is-disabled": props.disabled
}));
</script>
