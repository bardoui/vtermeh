<template>
    <div class="v-file-upload input">
        <div class="v-file-thumbnails" v-if="thumbnails.length > 0">
            <img v-for="(src, i) in thumbnails" :src="src" :key="i" />
        </div>
        <div
            class="v-file-thumbnails"
            v-if="thumbnails.length == 0 && hasThumbnails"
        >
            <slot name="thumbnails" />
        </div>
        <div class="gutter"></div>
        <slot :id="id" :count="count" :files="files">
            <span v-if="count == 0">Select File</span>
            <span v-else>{{ count }} File Selected</span>
        </slot>
        <input
            :id="id"
            ref="fInput"
            type="file"
            :multiple="multiple"
            :accept="accept"
            @change="handleChange($event)"
        />
        <label :for="id"></label>
    </div>
</template>

<script lang="ts" setup>
import {
    defineProps,
    defineEmits,
    defineExpose,
    computed,
    ref,
    useSlots
} from "vue";
import { generate } from "shortid";
// Props and emits
const slots = useSlots();
const emits = defineEmits(["select"]);
const props = defineProps({
    multiple: Boolean,
    accept: String,
    icons: Object
});
defineExpose({ clear });

// stats
const files = ref<FileList | null>(null);
const fInput = ref();

// computed
const id = computed(() => generate());
const count = computed(() => (files.value ? files.value.length : 0));
const hasThumbnails = computed(() => !!slots["thumbnails"]);
const thumbnails = computed(() => {
    const res = [];
    if (files.value && files.value.length) {
        const icons =
            props.icons &&
            !Array.isArray(props.icons) &&
            typeof props.icons === "object"
                ? props.icons
                : {};
        const thumbFor = (f: File) => {
            if (f.type.startsWith("image/")) {
                return URL.createObjectURL(f);
            } else {
                for (const pt in icons) {
                    if (pt == "*") continue;
                    const rx = new RegExp(pt, "i");
                    if (rx.test(f.type)) {
                        return icons[pt];
                    }
                }
            }
            return icons["*"] ? icons["*"] : null;
        };
        for (const f of files.value) {
            const thumb = thumbFor(f);
            if (thumb) {
                res.push(thumb);
            }
            if (res.length == 3) {
                break;
            }
        }
    }
    return res;
});

// methods
function handleChange($e: Event) {
    const target = $e.target as HTMLInputElement;
    if (target && target.files) {
        files.value = target.files;
    }
    emits("select", files.value);
}

function clear() {
    files.value = null;
    fInput.value && (fInput.value.value = "");
    emits("select", null);
}
</script>
