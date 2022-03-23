<template>
    <div class="v-dropdown input-like" :class="dClass" ref="el">
        <div class="vdp-container">
            <slot
                name="icon"
                :isEmpty="isEmpty"
                :isOpen="isOpen"
                :isFiltered="isFiltered"
                :failed="failed"
                :disabled="disabled"
            />
            <template v-if="!multiple">
                <slot
                    name="selected"
                    :item="model"
                    :failed="failed"
                    :disabled="disabled"
                >
                    <div>{{ model }}</div>
                </slot>
            </template>
            <template v-else>
                <template v-for="item in model" :key="getId(item)">
                    <slot
                        name="selected"
                        :item="item"
                        :remove="remove"
                        :failed="failed"
                        :disabled="disabled"
                    >
                        <div>{{ item }}</div>
                    </slot>
                </template>
            </template>
            <input
                ref="elI"
                type="text"
                :placeholder="_placeholder"
                v-model="_search"
                @keydown.esc="_search = ''"
                :disabled="!search"
            />
        </div>
        <div class="vdp-gap"></div>
        <div class="vdp-arrow">
            <div class="arrow"></div>
        </div>

        <div class="vdp-menu" ref="elM">
            <slot
                name="menu"
                :isEmpty="isEmpty"
                :isOpen="isOpen"
                :isFiltered="isFiltered"
                :failed="failed"
                :disabled="disabled"
            />
            <template v-for="(item, index) in _items" :key="index">
                <div
                    class="item"
                    :class="{
                        'is-active': isActive(item),
                        'is-selected': isSelected(item)
                    }"
                    @click="add(item)"
                >
                    <slot
                        :id="getId(item)"
                        :selected="isSelected(item)"
                        :active="isActive(item)"
                        :failed="failed"
                        :disabled="disabled"
                        :item="item"
                        >{{ item }}</slot
                    >
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    defineProps,
    defineEmits,
    computed,
    ref,
    onMounted,
    onUnmounted,
    watch,
    nextTick
} from "vue";

// emits and props
const emits = defineEmits(["update:modelValue", "update:searchValue"]);
const props = defineProps({
    search: { type: Boolean, default: false },
    delete: { type: Boolean, default: true },
    autoClose: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    failed: { type: Boolean, default: false },
    placeholder: { type: String, default: "Select" },
    identifier: { type: String, default: "" },
    items: { type: Array, default: () => [] },
    searchValue: { type: String, default: "" },
    modelValue: { required: true },
    keyHandler: Function
});

// stats
const el = ref<HTMLElement>();
const elI = ref<HTMLElement>();
const elM = ref<HTMLElement>();
const clicked = ref(false);
const focused = ref(false);
const selected = ref<unknown>();

// computed
const _items = computed(() =>
    Array.isArray(props.items)
        ? props.items.filter(i => !props.multiple || !isSelected(i))
        : []
);
const _search = computed({
    get(): string {
        return props.searchValue || "";
    },
    set(v: string) {
        emits("update:searchValue", v);
    }
});
const model = computed<unknown | unknown[]>(() =>
    props.multiple
        ? Array.isArray(props.modelValue)
            ? props.modelValue
            : [props.modelValue].filter(Boolean)
        : props.modelValue
);
const isEmpty = computed(() =>
    Array.isArray(model.value) ? !model.value.length : !model.value
);
const isOpen = computed(() => clicked.value || focused.value);
const isFiltered = computed(() => !!props.searchValue);
const _placeholder = computed(() =>
    (props.multiple && props.search) || !props.modelValue
        ? props.placeholder || "Select"
        : ""
);
const dClass = computed(() => ({
    "is-active": isOpen.value,
    "is-disabled": props.disabled,
    "is-failed": props.failed,
    "is-searchable": props.search,
    "is-multiple": props.multiple,
    "is-filtered": !!props.searchValue,
    "is-empty": isEmpty.value
}));

// handlers
function onClick(e: MouseEvent) {
    if (el.value && e.target) {
        if (el.value.contains(e.target as HTMLElement)) {
            clicked.value = true;
        } else {
            clicked.value = false;
        }
    }
}

const onFocus = () => {
    setTimeout(() => {
        if (el.value) {
            if (el.value.contains(document.activeElement)) {
                focused.value = true;
            } else {
                focused.value = false;
            }
        }
    });
};

function onKeydown(e: KeyboardEvent) {
    if (isOpen.value) {
        if (props.keyHandler && props.keyHandler(e, selected.value) == true) {
            return;
        }
        switch (e.key) {
            case "ArrowUp":
                if (_items.value.length) {
                    let i = selectedIndex();
                    if (i === -1) {
                        i = _items.value.length - 1;
                    } else {
                        if (i > 0) {
                            i = i - 1;
                        }
                    }
                    selected.value = _items.value[i];
                }
                break;
            case "ArrowDown":
                if (_items.value.length) {
                    let i = selectedIndex();
                    if (i === -1) {
                        i = 0;
                    } else {
                        if (i < _items.value.length - 1) {
                            i = i + 1;
                        }
                    }
                    selected.value = _items.value[i];
                }
                break;
            case "Backspace":
                if (e.ctrlKey && props.delete) {
                    Array.isArray(model.value)
                        ? model.value.length &&
                          remove(model.value[model.value.length - 1])
                        : emits("update:modelValue", null);
                }
                break;
            case "Enter":
                if (selected.value) {
                    let idx = selectedIndex();
                    add(selected.value);
                    if (Array.isArray(model.value)) {
                        nextTick(() => {
                            if (_items.value.length) {
                                if (idx == _items.value.length - 1) {
                                    idx > 0 && idx--;
                                }
                                if (idx > _items.value.length - 1) {
                                    idx = _items.value.length - 1;
                                }
                                selected.value = _items.value[idx];
                                e.preventDefault();
                            }
                        });
                    }
                }
                break;
            case "Escape":
                setTimeout(() => {
                    emits("update:searchValue", "");
                });
                break;
        }
    }
}

// methods
function add(item: unknown) {
    if (Array.isArray(model.value)) {
        const v: unknown[] = JSON.parse(JSON.stringify(model.value));
        v.push(item);
        emits("update:modelValue", v);
    } else {
        emits("update:modelValue", item);
        if (props.autoClose) {
            setTimeout(() => {
                clicked.value = false;
                elI.value && elI.value.blur();
            });
        }
    }
}

function remove(item: unknown) {
    if (Array.isArray(model.value)) {
        emits(
            "update:modelValue",
            model.value.filter(i => getId(i) != getId(item))
        );
    } else {
        emits("update:modelValue", null);
    }
}

function getId(item: any) {
    return props.identifier && item
        ? item[props.identifier]
        : JSON.stringify(item);
}

function isSelected(item: unknown): boolean {
    return Array.isArray(model.value)
        ? model.value.findIndex(i => getId(i) == getId(item)) >= 0
        : getId(model.value) == getId(item);
}

function isActive(item: unknown): boolean {
    return selected.value
        ? getId(selected.value) == getId(item)
        : isSelected(item);
}

function selectedIndex(): number {
    if (selected.value) {
        return _items.value.findIndex(i => getId(i) == getId(selected.value));
    } else if (props.modelValue && !Array.isArray(model.value)) {
        return _items.value.findIndex(i => getId(i) == getId(model.value));
    }
    return -1;
}

function scrollToView() {
    nextTick(() => {
        if (elM.value && elM.value.scrollHeight > elM.value.clientHeight) {
            let _el: HTMLElement = elM.value.querySelector(
                ".is-active"
            ) as HTMLElement;
            if (_el) {
                const top = _el.offsetTop - elM.value.scrollTop;
                const bottom = top + _el.clientHeight;
                if (top < 0 || bottom >= elM.value.clientHeight) {
                    elM.value.scrollTo({
                        top: _el.offsetTop,
                        behavior: "smooth"
                    });
                }
            }
        }
    });
}
// Hooks
watch(isOpen, v => {
    if (v) {
        const idx = selectedIndex();
        if (idx != -1) {
            selected.value = _items.value[idx];
        }
    } else {
        selected.value = null;
    }
});
watch(
    () => props.modelValue,
    () => (selected.value = null)
);
watch(selected, () => scrollToView());
watch(_items, v => {
    if (
        selected.value &&
        v.findIndex(i => getId(i) == getId(selected.value)) == -1
    ) {
        selected.value = null;
    }
});

onMounted(() => {
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
});

onUnmounted(() => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeydown);
    document.removeEventListener("focusin", onFocus);
    document.removeEventListener("focusout", onFocus);
});
</script>
