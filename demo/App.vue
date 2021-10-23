<template>
    <div class="layout">
        <div class="attachment">
            <div class="container is-padding-less">
                <h2 class="is-shade-colored is-margin-less">
                    Termeh Based Component For Vue 3
                </h2>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="container">
                    <section>
                        <h3>Stats</h3>
                        <p>Select Stats</p>
                        <vChoose :items="items" v-model="item">
                            <template #default="{item}">
                                {{ mapper(item) }}
                            </template>
                        </vChoose>
                    </section>
                    <section>
                        <h3>Choose</h3>
                        <div class="gaper is-mobile-stacked">
                            <vChoose
                                class="is-mobile-stacked"
                                :items="items"
                                v-model="item"
                                :class="classes"
                            >
                                <template #default="{item}">
                                    {{ mapper(item) }}
                                </template>
                            </vChoose>
                        </div>
                        <p>
                            <strong>Selected:</strong> <span>{{ item }}</span>
                        </p>
                    </section>
                    <section>
                        <h3>Pagination</h3>
                        <div class="flex is-mobile-stacked">
                            <div class="flex-item">
                                <vPagination
                                    :count="5"
                                    :total="total"
                                    v-model="page"
                                    :class="classes"
                                >
                                    No Records
                                </vPagination>
                            </div>
                            <div class="flex-item">
                                <vPagination
                                    :count="5"
                                    :total="total"
                                    v-model="page"
                                    :class="classes"
                                    class="is-rounded is-flat"
                                >
                                    No Records
                                </vPagination>
                            </div>
                            <div class="break"></div>
                            <div class="flex-item">
                                <button @click="page = 'bla'">invalid</button>
                                <button @click="page = 100">100</button>
                                <button @click="page = 7">7</button>
                            </div>
                            <div class="flex-item">
                                <p>
                                    <strong>Current Page:</strong>
                                    <span>{{ page }}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { vChoose, vPagination } from "@/vTermeh";

const items = ref(["none", "primary", "error", "disabled", "empty"]);
const item = ref("");
const mapper = (item: string) => {
    switch (item) {
        case "none":
            return "Simple";
        case "primary":
            return "Primary";
        case "error":
            return "Error";
        case "disabled":
            return "Disabled";
        case "empty":
            return "Empty";
    }
};

const total = computed(() => (item.value == "empty" ? 0 : 15));
const page = ref(0);

const classes = computed(() => {
    const cls: Record<string, boolean> = {};
    if (item.value == "primary") cls["is-primary"] = true;
    if (item.value == "error") cls["is-error"] = true;
    if (item.value == "disabled") cls["is-disabled"] = true;
    return cls;
});
</script>

<style lang="scss">
@import "./app.scss";
</style>
