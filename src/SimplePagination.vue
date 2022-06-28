<template>
    <div class="v-simple-pagination">
        <div class="vsp-pages" v-if="canPrev || canNext">
            <div
                class="vsp-button"
                :class="{ 'is-disabled': !canPrev }"
                @click.prevent="_prev"
            >
                <div class="gaper">
                    <slot name="prev-icon">
                        <div class="icon is-medium">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.56945 18.8201C9.37945 18.8201 9.18945 18.7501 9.03945 18.6001L2.96945 12.5301C2.67945 12.2401 2.67945 11.7601 2.96945 11.4701L9.03945 5.40012C9.32945 5.11012 9.80945 5.11012 10.0995 5.40012C10.3895 5.69012 10.3895 6.17012 10.0995 6.46012L4.55945 12.0001L10.0995 17.5401C10.3895 17.8301 10.3895 18.3101 10.0995 18.6001C9.95945 18.7501 9.75945 18.8201 9.56945 18.8201Z"
                                />
                                <path
                                    d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
                                />
                            </svg>
                        </div>
                    </slot>
                    <div class="gutter"></div>
                    <span>{{ prev }}</span>
                </div>
            </div>
            <div
                class="vsp-button"
                :class="{ 'is-disabled': !canNext }"
                @click.prevent="_next"
            >
                <div class="gaper">
                    <span>{{ next }}</span>
                    <div class="gutter"></div>
                    <slot name="next-icon">
                        <div class="icon is-medium">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.4291 18.8201C14.2391 18.8201 14.0491 18.7501 13.8991 18.6001C13.6091 18.3101 13.6091 17.8301 13.8991 17.5401L19.4391 12.0001L13.8991 6.46012C13.6091 6.17012 13.6091 5.69012 13.8991 5.40012C14.1891 5.11012 14.6691 5.11012 14.9591 5.40012L21.0291 11.4701C21.3191 11.7601 21.3191 12.2401 21.0291 12.5301L14.9591 18.6001C14.8091 18.7501 14.6191 18.8201 14.4291 18.8201Z"
                                />
                                <path
                                    d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                                />
                            </svg>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <div class="vsp-pages is-empty" v-else><slot /></div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, computed } from "vue";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    total: { type: Number, default: 0 },
    modelValue: { type: Number, default: 0 },
    prev: { type: String, default: "صفحه قبل" },
    next: { type: String, default: "صفحه بعد" },
});

// computed
const _total = computed(() => +props.total || 0);
const _page = computed(() => +props.modelValue || 0);
const canNext = computed(() => _page.value < _total.value);
const canPrev = computed(() => _page.value > 1);

// methods
function _next() {
    emits("update:modelValue", Math.min(_page.value + 1, _total.value));
}

function _prev() {
    emits("update:modelValue", Math.max(_page.value - 1, 1));
}
</script>
