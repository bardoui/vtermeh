<template>
    <div class="v-choose input-like" :class="dClass">
        <template v-for="(item, index) in _items" :key="index">
            <div
                class="item"
                :class="{ 'is-active': getId(modelValue) === getId(item) }"
                @click="emits('update:modelValue', item)"
            >
                <slot :item="item" :failed="failed" :disabled="disabled">{{
                    item
                }}</slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    disabled: Boolean,
    failed: Boolean,
    identifier: String,
    items: Array,
    modelValue: { required: false }
});

const _items = computed(() => (Array.isArray(props.items) ? props.items : []));
const dClass = computed(() => ({
    "is-disabled": props.disabled,
    "is-failed": props.failed
}));

function getId(item: unknown) {
    return props.identifier && item
        ? (item as any)[props.identifier]
        : JSON.stringify(item);
}
</script>
