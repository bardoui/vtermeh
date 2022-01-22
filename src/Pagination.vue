<template>
    <div class="v-pagination">
        <template v-if="N(total)">
            <div
                class="page"
                :class="{ 'is-disabled': modelValue == 1 }"
                @click="value = 1"
            >
                <i class="arrow is-left"></i>
            </div>
            <div
                v-for="page in pages"
                :key="page"
                class="page"
                :class="{ 'is-active': page == modelValue }"
                @click="value = page"
            >
                {{ page }}
            </div>
            <div
                class="page"
                :class="{ 'is-disabled': modelValue == total }"
                @click="value = total"
            >
                <i class="arrow is-right"></i>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineProps, defineEmits, onMounted } from "vue";
// Props and emmits
const emits = defineEmits(["update:modelValue", "format"]);
const props = defineProps({
    count: { type: Number, default: 5 },
    total: { type: Number, default: 0 },
    modelValue: { type: Number, default: 0 }
});

// Methods
const N = (v: any) => (v && Number.isFinite(+v) ? +v : 0);
// States
const _v = ref(0);
const value = computed({
    get: () => _v.value,
    set: v => {
        _v.value = N(v);
        _v.value > N(props.total) && (_v.value = N(props.total));
        _v.value < 1 && (_v.value = 1);
        emits("update:modelValue", _v.value);
    }
});
const pages = computed(() => {
    const res: number[] = [];
    if (N(props.total) && N(props.count)) {
        let start = props.modelValue - Math.floor(props.count / 2);
        let end = props.modelValue + Math.floor(props.count / 2);
        start < 1 && (end = end + (-start + 1));
        end > props.total && (start = start - (end - props.total));
        start < 1 && (start = 1);
        end > props.total && (end = props.total);
        for (let i = start; i <= end; i++) {
            res.push(i);
        }
    }
    return res;
});

// Watch props change
onMounted(() => {
    watch(
        () => props.modelValue,
        v => (value.value = +v),
        { immediate: true }
    );
    watch(
        () => props.total,
        v => N(v) < N(value.value) && (value.value = v),
        { immediate: true }
    );
});
</script>
