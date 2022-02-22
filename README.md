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

## Field

Field wrapper component (based on termeh form field).

```vue
<template>
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
        <input :id="id" v-model="name" />
      </div>
    </template>
  </vField>
</template>
<script lang="ts" setup>
import { vField } from "@bardoui/vtermeh";
</script>
```

| Property | Type           | Description                                                 |
| :------- | :------------- | :---------------------------------------------------------- |
| errors   | `Array|Object` | list of error keys or error with message                    |
| messages | `Object`       | list of error messages (can override default error message) |
| label    | `string`       | label text                                                  |
| help     | `string`       | help text                                                   |
| default  | `string`       | default error message                                       |
| required | `bool`         | mark field as required                                      |
| fit      | `bool`         | add `is-marginless` to field                                |

## FileUpload

File upload with preview. You can get selected files from `@select` event.

**Note:** You can call `clear` inner method to clear input (e.g. `refVar.value.clear()`);

```vue
<template>
  <vFileUpload
    :multiple="true"
    accept="image-*"
    :icons="{ '.*/x-zip.*': 'zip.png', '*': 'default.png' }"
    @select="log_file_list"
  >
    <template v-slot="{ count }">
      <div v-if="count == 0">Please select image</div>
      <div v-else>{{ count }} Image</div>
    </template>
  </vFileUpload>
</template>

<script lang="ts" setup>
import { vFileUpload } from "@bardoui/vtermeh";
const page = ref(0);
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/file-upload.scss";
</style>
```

| Property | Type      | Description                                                                    |
| :------- | :-------- | :----------------------------------------------------------------------------- |
| multiple | `boolean` | allow select multiple file                                                     |
| accept   | `string`  | accept pattern                                                                 |
| icons    | `object`  | key/value object of file type pattern (regex or \* for default) with icon path |

File upload component use default termeh `.input` for styling.

| variable | description           | default |
| :------- | :-------------------- | :------ |
| width    | thumbnail icon width  | `4em`   |
| height   | thumbnail icon height | `4em`   |

You must use `"file-upload"` as component name for overriding variable in termeh.

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

| variable | description                                                 | default |
| :------- | :---------------------------------------------------------- | :------ |
| colors   | list of non-iterable colors to include in pagination colors | `()`    |
