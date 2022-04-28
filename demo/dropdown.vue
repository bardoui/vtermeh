<template>
    <div class="column is-half is-mobile-full">
        <form action="Some.php" method="post" class="card">
            <div></div>
            <div class="section is-attached">
                <div class="header is-left-decorated is-primary">
                    <h3>Dropdown with search</h3>
                    <div>
                        <div class="gaper is-auto">
                            <div class="meta is-action" @click="doClear">
                                Clear
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <vDropdown
                    :search="true"
                    :multiple="true"
                    :items="itemsM"
                    identifier="_id"
                    v-model="modelM"
                    v-model:searchValue="searchM"
                    ref="dp"
                >
                    <template #action>
                        <div class="meta is-action" @click.stop="dp && dp.close()">
                            Close
                        </div>
                        <div class="gutter"></div>
                    </template>
                    <template #selected="{remove, item}">
                        <div class="tag is-light is-primary">
                            <div class="gaper is-auto">
                                <Remove
                                    class="is-primary is-action"
                                    @click="remove(item)"
                                />
                                <div>
                                    {{
                                        [item.first_name, item.last_name].join(
                                            " "
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #="{item}">
                        {{ [item.first_name, item.last_name].join(" ") }}
                    </template>
                </vDropdown>
            </div>
            <div class="section">
                <vDropdown
                    :search="true"
                    :failed="true"
                    :items="items"
                    :delete="false"
                    :key-handler="handler"
                    identifier="_id"
                    v-model="model"
                    v-model:searchValue="search"
                >
                    <template #selected="{item}">
                        {{
                            item
                                ? [item.first_name, item.last_name].join(" ")
                                : ""
                        }}
                    </template>
                    <template #="{item}">
                        {{ [item.first_name, item.last_name].join(" ") }}
                    </template>
                </vDropdown>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
    <div class="column is-half is-mobile-full">
        <form action="Some.php" class="card">
            <div></div>
            <div class="section is-attached">
                <div class="header is-left-decorated is-primary">
                    <h3>Dropdown</h3>
                    <div>
                        <div class="gaper is-auto">
                            <div class="meta is-action" @click="doClear">
                                Clear
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <vDropdown
                    class="is-success"
                    :disabled="true"
                    :multiple="true"
                    :items="itemsM"
                    identifier="_id"
                    v-model="modelM"
                    v-model:searchValue="searchM"
                >
                    <template #selected="{remove, item, disabled}">
                        <div
                            class="tag is-light is-action"
                            :class="{ 'is-success': !disabled }"
                            @click="remove(item)"
                        >
                            {{ [item.first_name, item.last_name].join(" ") }}
                        </div>
                    </template>
                    <template #="{item}">
                        {{ [item.first_name, item.last_name].join(" ") }}
                    </template>
                </vDropdown>
            </div>
            <div class="section">
                <vDropdown
                    :disabled="true"
                    :items="items"
                    identifier="_id"
                    v-model="model"
                    v-model:searchValue="search"
                >
                    <template #selected="{item}">
                        {{
                            item
                                ? [item.first_name, item.last_name].join(" ")
                                : ""
                        }}
                    </template>
                    <template #="{item}">
                        {{ [item.first_name, item.last_name].join(" ") }}
                    </template>
                </vDropdown>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { vDropdown } from "@/vTermeh";
import Data from "./data";
import Remove from "./remove.vue";

const search = ref("");
const model = ref();
const dp = ref();
const items = computed(() =>
    Data.filter(i =>
        [i.first_name, i.last_name]
            .join(" ")
            .toLowerCase()
            .includes(search.value.toLowerCase())
    )
);

const searchM = ref("");
const modelM = ref();
const itemsM = computed(() =>
    Data.filter(i =>
        [i.first_name, i.last_name]
            .join(" ")
            .toLowerCase()
            .includes(searchM.value.toLowerCase())
    )
);

const doClear = () => {
    model.value = null;
    modelM.value = null;
};

function handler(e: KeyboardEvent): boolean {
    if (e.key == "Enter") {
        console.log("Enter called");
        // return true;
    }
    return false;
}
</script>
