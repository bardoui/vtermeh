<template>
    <div :class="_class">
        <template v-for="(item, index) in _items" :key="index">
            <div
                class="item"
                :class="{ 'is-active': isSelected(item) }"
                @click="select(item)"
            >
                <slot :item="item" :disabled="disabled">{{ item }}</slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    items: Array,
    identifier: String,
    disabled: Boolean,
    multiple: Boolean,
    modelValue: { required: false }
});

// computed
const _items = computed(() => (Array.isArray(props.items) ? props.items : []));
const _class = computed(() => ({
    "v-options": true,
    "is-disabled": props.disabled
}));
const _model = computed<unknown | unknown[]>(() =>
    props.multiple
        ? Array.isArray(props.modelValue)
            ? props.modelValue
            : [props.modelValue].filter(Boolean)
        : props.modelValue
);

// methods
function getId(item: unknown) {
    return props.identifier && item
        ? (item as any)[props.identifier]
        : JSON.stringify(item);
}

function isSelected(item: unknown): boolean {
    return Array.isArray(_model.value)
        ? _model.value.findIndex(i => getId(i) == getId(item)) >= 0
        : getId(_model.value) == getId(item);
}

function select(item: unknown): void {
    if (Array.isArray(_model.value)) {
        const v: unknown[] = JSON.parse(JSON.stringify(_model.value));
        if (v.find(i => getId(i) == getId(item))) {
            emits(
                "update:modelValue",
                v.filter(i => getId(i) != getId(item))
            );
        } else {
            v.push(item);
            emits("update:modelValue", v);
        }
    } else {
        emits("update:modelValue", item);
    }
}
</script>
