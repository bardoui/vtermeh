<template>
    <div
        class="field"
        :class="{
            'is-failed': !!_errors.length,
            'is-required': required,
            'is-margin-less': fit
        }"
    >
        <label :for="id" v-if="label">{{ label }}:</label>
        <slot :id="id" />
        <p class="meta help" v-if="help">{{ help }}</p>
        <template v-for="(e, index) in _errors" :key="index">
            <p class="error">{{ e }}</p>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { generate } from "shortid";
// Props and emits
const props = defineProps({
    errors: Object,
    messages: Object,
    label: String,
    help: String,
    default: { type: String, default: "مقدار نامعتبر است" },
    required: { type: Boolean, default: false },
    fit: { type: Boolean, default: false }
});

// computed
const id = computed(() => generate());
const _errors = computed(() => {
    const res = [];
    if (isObject(props.errors)) {
        for (const key in props.errors) {
            res.push(_resolve(key, props.errors[key]));
        }
    } else {
        for (const e of (props.errors || []) as Array<string>) {
            res.push(_resolve(e, ""));
        }
    }
    return res;
});

// methods
const isObject = (v: any) => v && !Array.isArray(v) && typeof v === "object";
const _resolve = (e: string, msg: string) => {
    const m = isObject(props.messages) ? props.messages || {} : {};
    if (m[e]) {
        return m[e];
    } else if (msg) {
        return msg;
    } else {
        return m["*"] ? m["*"] : props.default;
    }
};
</script>
