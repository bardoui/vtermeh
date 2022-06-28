<template>
    <div class="card">
        <vPie :percent="amount" class="is-success">
            <strong>A</strong>
        </vPie>
        <vPie :percent="amount" class="is-primary" />
        <vPie :percent="amount" class="is-large" />
        <vPie :percent="amount" class="is-massive is-error" />
        <div class="gaper">
            <button class="button" @click="random">Random</button>
            <div class="gutter"></div>
            <p>Percent: {{ amount }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { vPie } from "@/vTermeh";
import { onUpdated, defineEmits, ref } from "vue";

const amount = ref(0);

function random() {
    amount.value = Math.floor(Math.random() * 100);
}

const emits = defineEmits(["update"]);
onUpdated(() => emits("update"));
</script>
