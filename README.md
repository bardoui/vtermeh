# vTermeh

[Termeh](https://github.com/bardoui/termeh) based component for vue 3.

## Installation

You must import and register components manually.

### CDN

This package published as `vTermeh` module in umd.

```html
<script src="https://unpkg.com/@bardoui/vtermeh"></script>
```

### NPM

```bash
npm i @bardoui/vtermeh
```

## Choose

Choose component. You can set default slot to change default item template.

```vue
<template>
  <vChoose :items="items" v-model="item">
    <template #default="{ item }">
      {{ item == "first" ? "1th" : item == "second" ? "2th" : item }}
    </template>
  </vChoose>
</template>
<script lang="ts" setup>
import { vChoose } from "@bardoui/vtermeh";
const items = ref(["first", "second", "third"]);
const item = ref("");
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/choose.scss";
</style>
```

| Property | Type            | Description   |
| :------- | :-------------- | :------------ |
| items    | `Array<string>` | List of items |

Choose component have following classes:

- **is-disabled**: disable choose component.
- **is-stacked**: set choose direction as vertical.
- **is-{device}-stacked**: set choose direction as vertical for device.
- **is-{color}**: set choose color to registered iterable colors.

| variable | description                                             | default |
| :------- | :------------------------------------------------------ | :------ |
| colors   | list of non-iterable colors to include in choose colors | `()`    |

## Pagination

Pagination component. You can fill default slot for change template of empty pagination.

```vue
<template>
  <vPagination :count="5" :total="23" v-model="page">
    No Records
  </vPagination>
</template>
<script lang="ts" setup>
import { vPagination } from "@bardoui/vtermeh";
const page = ref(0);
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/pagination.scss";
</style>
```

| Property | Type     | Description                  |
| :------- | :------- | :--------------------------- |
| count    | `number` | number of pagination buttons |
| total    | `number` | total page count             |

pagination component have following classes:

- **is-flat**: remove paginator border and paddings.
- **is-disabled**: disable pagination component.
- **is-rounded**: make page buttons corner round.
- **is-{color}**: set pagination color to registered iterable colors.

| variable | description                                             | default |
| :------- | :------------------------------------------------------ | :------ |
| colors   | list of non-iterable colors to include in pagination colors | `()`    |
