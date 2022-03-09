<template>
    <div class="layout">
        <div class="attachment">
            <div class="container is-paddingless">
                <h2 class="is-shade-colored is-marginless">
                    Termeh Based Component For Vue 3
                </h2>
            </div>
        </div>
        <div class="content">
            <div>
                <div class="container">
                    <div class="grid">
                        <div class="column is-half is-mobile-full">
                            <div class="card">
                                <div></div>
                                <div class="section is-attached">
                                    <div
                                        class="header is-left-decorated is-primary"
                                    >
                                        <h3 class="is-marginless">Choose</h3>
                                        <div>
                                            <div class="gaper is-auto">
                                                <div class="meta">
                                                    Change to choose theme
                                                </div>
                                                <div class="filler"></div>
                                                <div
                                                    class="meta is-primary is-action"
                                                    @click="item = ''"
                                                >
                                                    Clear
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="section">
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
                            </div>
                        </div>
                        <div class="column is-half is-mobile-full">
                            <div class="card">
                                <div></div>
                                <div class="section is-attached">
                                    <div
                                        class="header is-left-decorated is-primary"
                                    >
                                        <h3 class="is-marginless">
                                            Pagination
                                        </h3>
                                        <div>
                                            <div class="gaper is-auto">
                                                <div class="meta">
                                                    Change page
                                                </div>
                                                <div class="filler"></div>
                                                <div
                                                    class="meta is-action is-error"
                                                    @click="page = 'bla'"
                                                >
                                                    Invalid
                                                </div>
                                                <div
                                                    class="meta is-action is-primary"
                                                    @click="page = 100"
                                                >
                                                    100
                                                </div>
                                                <div
                                                    class="meta is-action is-success"
                                                    @click="page = 7"
                                                >
                                                    7
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="section is-secondary">
                                    <h5>Normal</h5>
                                    <vPagination
                                        :count="5"
                                        :total="total"
                                        v-model="page"
                                        :class="classes"
                                    >
                                        No Records
                                    </vPagination>
                                </div>
                                <div class="section">
                                    <h5>Flat (no background)</h5>
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
                            </div>
                        </div>
                        <div class="column is-half is-mobile-full">
                            <div class="card">
                                <div></div>
                                <div class="section is-attached">
                                    <div
                                        class="header is-left-decorated is-primary"
                                    >
                                        <h3>Field</h3>
                                        <div></div>
                                        <div class="gaper is-auto">
                                            <div class="meta">Errors</div>
                                            <div class="filler"></div>
                                            <div
                                                class="meta is-action"
                                                @click="err = ''"
                                            >
                                                Clear
                                            </div>
                                            <div
                                                class="meta is-action"
                                                @click="err = 'array'"
                                            >
                                                Array
                                            </div>
                                            <div
                                                class="meta is-action"
                                                @click="err = 'object'"
                                            >
                                                Object
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <vField
                                    :errors="errors"
                                    :messages="messages"
                                    label="Enter name"
                                    help="enter your full name"
                                    default="name is invalid"
                                    :required="true"
                                    :fit="true"
                                >
                                    <template #default="{ id }">
                                        <div class="input">
                                            <input :id="id" />
                                        </div>
                                    </template>
                                </vField>
                            </div>
                        </div>
                        <div class="column is-half is-mobile-full">
                            <div class="card">
                                <div></div>
                                <div class="section is-attached">
                                    <div
                                        class="header is-left-decorated is-primary"
                                    >
                                        <h3>File Upload</h3>
                                        <div>
                                            <div class="gaper is-auto">
                                                <div
                                                    class="meta is-action"
                                                    @click="doClear"
                                                >
                                                    Clear
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="section">
                                    <vFileUpload
                                        ref="fileUP"
                                        :multiple="true"
                                        accept="image-*"
                                        @select="log"
                                    >
                                        <template v-slot="{ count }">
                                            <strong>{{ count }} </strong>Doc
                                        </template>
                                    </vFileUpload>
                                </div>
                            </div>
                        </div>
                            <Dropdown />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { vChoose, vField, vFileUpload, vPagination } from "@/vTermeh";
import Dropdown from "./dropdown.vue";

const items = ref(["none", "primary", "error", "disabled", "empty"]);
const item = ref("");
const fileUP = ref();

const mapper = (item: string) => {
    switch (item) {
        case "none":
            return "Success";
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
    if (item.value == "none") cls["is-success"] = true;
    if (item.value == "primary") cls["is-primary"] = true;
    if (item.value == "error") cls["is-error"] = true;
    if (item.value == "disabled") cls["is-disabled"] = true;
    return cls;
});

const err = ref("");
const errors = computed(() => {
    if (err.value == "array") {
        return ["required", "max"];
    } else if (err.value == "object") {
        return {
            required: "This field is required!",
            max: "can't greater than max!"
        };
    }
    return [];
});
const messages = computed(() => {
    if (err.value) {
        return {
            required: "REQUIRED"
        };
    }
    return {};
});

const log = (v: unknown) => console.log(v);
const doClear = () => {
    fileUP.value && fileUP.value.clear();
};
</script>

<style lang="scss">
@import "./app.scss";
</style>
