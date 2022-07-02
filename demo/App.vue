<template>
    <div class="layout">
        <div class="content">
            <div>
                <div class="container">
                    <vTile ref="tile" :rtl="false">
                        <div class="tile is-2">
                            <div class="card">
                                <div class="header is-primary is-marginless">
                                    <h5
                                        class="is-primary-colored is-marginless"
                                    >
                                        Termeh Based Component For Vue 3
                                    </h5>
                                    <div class="meta">
                                        layout created by tile component
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tile">
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
                                        <template #default="{ item }">
                                            {{ mapper(item) }}
                                        </template>
                                    </vChoose>
                                </div>
                            </div>
                        </div>
                        <div class="tile">
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
                                <div class="section is-secondary">
                                    <h5>Simple</h5>
                                    <vSimplePagination
                                        :total="total"
                                        v-model="page"
                                        :class="classes"
                                    >
                                        No Records
                                    </vSimplePagination>
                                </div>
                            </div>
                        </div>
                        <div class="tile">
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
                        <div class="tile">
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
                                        <template #thumbnails>
                                            <img />
                                            <img />
                                            <img />
                                        </template>
                                        <template v-slot="{ count }">
                                            <strong>{{ count }} </strong>Doc
                                        </template>
                                    </vFileUpload>
                                </div>
                            </div>
                        </div>
                        <div class="tile">
                            <Dropdown @update="update" />
                        </div>
                        <div class="tile">
                            <div class="card">
                                <div class="field">
                                    <vToggle v-model="toggleA"
                                        >Reporting Service</vToggle
                                    >
                                </div>
                                <div class="field">
                                    <vToggle
                                        v-model="toggleB"
                                        class="is-rounded"
                                    />
                                </div>
                                <div class="field">
                                    <vToggle
                                        v-model="toggleA"
                                        :disabled="true"
                                    />
                                </div>
                                <div>
                                    <vToggle
                                        v-model="toggleB"
                                        :disabled="true"
                                        class="is-rounded"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="tile">
                            <div class="card">
                                <vField>
                                    <vOptions v-model="opt" :items="optItems" />
                                </vField>
                                <vField>
                                    <vOptions
                                        class="is-primary is-mini-gaped"
                                        v-model="opt2"
                                        :mutiple="true"
                                        :items="optItems"
                                    />
                                </vField>
                                <vField>
                                    <vOptions
                                        v-model="opt"
                                        :disabled="true"
                                        :items="optItems"
                                    />
                                </vField>
                            </div>
                        </div>
                        <div class="tile">
                            <Pie @update="update" />
                        </div>
                        <div class="tile">
                            <div class="card">
                                <vJalaaliPicker
                                    v-model="jalaali"
                                    type="datetime"
                                    color-class="success"
                                    color="#0ead69"
                                    clear="clear"
                                />
                                <br />
                                <vJalaaliPicker v-model="jalaali" :icon="true">
                                    <template #icon="{ show }">
                                        <div
                                            class="button is-primary"
                                            @click="show()"
                                        >
                                            Select
                                        </div>
                                    </template>
                                </vJalaaliPicker>
                                <br />
                                <vJalaaliPicker
                                    v-model="jalaalies"
                                    :range="true"
                                    clear="CLS"
                                />
                                <br />
                                <vJalaaliPicker
                                    v-model="jalaalies"
                                    :multiple="true"
                                    :icon="true"
                                    clear="CLEAR"
                                />
                            </div>
                        </div>
                        <div class="tile">
                            <div class="card">
                                <div class="gaper is-auto">
                                    <vIconToggle
                                        v-model="iconToggle"
                                        class="is-large"
                                    >
                                        <template #icon>
                                            <Star />
                                        </template>
                                        <template #active>
                                            <StarFill />
                                        </template>
                                    </vIconToggle>
                                    <vIconToggle
                                        v-model="iconToggle"
                                        class="is-medium is-primary"
                                    >
                                        <template #icon>
                                            <Star />
                                        </template>
                                        <template #active>
                                            <StarFill />
                                        </template>
                                    </vIconToggle>
                                </div>
                            </div>
                        </div>
                        <div class="tile">
                            <div class="card">
                                <div class="gaper is-auto">
                                    <h1>
                                        <vToman :value="1200000" />
                                    </h1>
                                    <h4>
                                        <vToman
                                            :value="1200000"
                                            class="is-primary"
                                        />
                                    </h4>
                                    <vToman :value="1200000" class="is-error" />
                                </div>
                            </div>
                        </div>
                    </vTile>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, onUpdated } from "vue";
import {
    vChoose,
    vField,
    vFileUpload,
    vIconToggle,
    vJalaaliPicker,
    vOptions,
    vPagination,
    vSimplePagination,
    vTile,
    vToggle,
    vToman,
} from "@/vTermeh";
import Dropdown from "./dropdown.vue";
import Pie from "./Pie.vue";
import Star from "./Star.vue";
import StarFill from "./StarFill.vue";

const tile = ref();
const items = ref(["none", "primary", "error", "disabled", "empty"]);
const item = ref("");
const fileUP = ref();
const toggleA = ref(false);
const toggleB = ref(true);
const optItems = [
    "Firstname",
    "Lastname",
    "Some Long Option",
    "Some Long Option",
    "Age",
    "Skills",
    "Some Long Option",
    "School",
    "Some Long Option",
];

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
const opt = ref("");
const opt2 = ref([]);

const jalaali = ref();
const jalaalies = ref([]);

const iconToggle = ref(false);

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
            max: "can't greater than max!",
        };
    }
    return [];
});
const messages = computed(() => {
    if (err.value) {
        return {
            required: "REQUIRED",
        };
    }
    return {};
});

const log = (v: unknown) => console.log(v);
const doClear = () => {
    fileUP.value && fileUP.value.clear();
};

// hooks
onUpdated(update);
function update() {
    tile.value && tile.value.update();
}
</script>

<style lang="scss">
@import "./app.scss";
</style>
