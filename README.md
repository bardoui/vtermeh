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
    <template #default="{ item, failed, disabled }">
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

| Property   | Type      | Description                                             |
| :--------- | :-------- | :------------------------------------------------------ |
| items      | `Array`   | List of items                                           |
| disabled   | `Boolean` | disabled state                                          |
| failed     | `Boolean` | failed state (error)                                    |
| identifier | `String`  | id field of item, empty identifier for non-object items |

Choose component have following classes:

- **is-stacked**: set choose direction as vertical.
- **is-{device}-stacked**: set choose direction as vertical for device.
- **is-{size}**: set choose size to size.
- **is-{color}**: set choose color to registered iterable colors.

| variable | description                                           | default |
| :------- | :---------------------------------------------------- | :------ |
| sizes    | list of non-iterable sizes to include in choose sizes | `()`    |

## Dropdown

Dropdown component.

```vue
<template>
  <vDropdown :items="items" v-model="item" v-model:searchValue="search">
    <template #icon="{ isEmpty, isOpen, isFiltered, failed, disabled}">
      Icon
    </template>
    <template #selected="{ item, failed, disabled}">
      Single item
    </template>
    <template #selected="{ item, remove, failed, disabled}">
      Multi Select items
    </template>
    <template #menu="{ isEmpty, isOpen, isFiltered, failed, disabled}">
      <div class="item" v-if="isFiltered">Add new</div>
    </template>
    <template #default="{ id, selected, active, failed, disabled, item }">
      Menu Item
    </template>
  </vDropdown>
</template>
<script lang="ts" setup>
import { vDropdown } from "@bardoui/vtermeh";
const items = ref([{...}, {...}]);
const item = ref();
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/dropdown.scss";
</style>
```

**Note:** if you return true from key handler function, default dropdown keyboard handler not fired!

| Property    | Type                                               | default     | Description                                             |
| :---------- | :------------------------------------------------- | :---------- | ------------------------------------------------------- |
| search      | `Boolean`                                            | `false`     | allow search                                            |
| delete      | `Boolean`                                            | `true`      | allow delete item with `ctrl+backspace`                 |
| autoClose   | `Boolean`                                            | `true`      | close dropdown after select on single mode              |
| multiple    | `Boolean`                                            | `false`     | allow multiple selection                                |
| disabled    | `Boolean`                                            | `false`     | disabled state                                          |
| failed      | `Boolean`                                            | `false`     | failed state (error)                                    |
| placeholder | `String`                                             | `'Select'`  | placeholder text                                        |
| identifier  | `String`                                             | `''`        | id field of item, empty identifier for non-object items |
| items       | `Array`                                              | `[]`        | items list                                              |
| searchValue | `String`                                             | `''`        | search model value                                      |
| modelValue  | `any`                                                | `undefined` | model value                                             |
| keyHandler  | `(e: KeyboardEvent, selected: unknown) => boolean` | `undefined` | custom keyboard handler                                 |

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
    <template #thumbnails>
      <img src="default thumb.jpg" />
    </template>
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
| opacity  | hover state opacity   | `0.1`   |

You must use `"file-upload"` as component name for overriding variable in termeh.

## Options

options component. You can set default slot to change default item template.

```vue
<template>
  <vOptions :items="items" v-model="item">
    <template #default="{ item, disabled }">
      {{ item == "first" ? "1th" : item == "second" ? "2th" : item }}
    </template>
  </vOptions>
</template>
<script lang="ts" setup>
import { vOptions } from "@bardoui/vtermeh";
const items = ref(["first", "second", "third"]);
const item = ref("");
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/options.scss";
</style>
```

| Property   | Type    | Description                                             |
| :--------- | :------ | :------------------------------------------------------ |
| items      | `Array` | List of items                                           |
| identifier | String  | id field of item, empty identifier for non-object items |
| disabled   | Boolean | disabled state                                          |
| multiple   | Boolean | allow multiple selection                                |

Options component have following classes:

- **is-gapless**: remove item gaps.
- **is-{gap}-gaped**: set options gap to registered iterable gaps.
- **is-{color}**: set options color to registered iterable colors.

| variable | description                                         | default |
| :------- | :-------------------------------------------------- | :------ |
| gaps     | list of non-iterable gaps to include in choose gaps | `()`    |

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

## Toggle

Toggle component. You can fill default slot to change label content.

```vue
<template>
  <vToggle :disabled="false" v-model="isEnabled">
    Reporting Service
  </vToggle>
</template>
<script lang="ts" setup>
import { vToggle } from "@bardoui/vtermeh";
const isEnabled = ref(true);
</script>

<style lang="scss">
@import "@bardoui/vtermeh/dist/toggle.scss";
</style>
```

| Property | Type      | Description            |
| :------- | :-------- | :--------------------- |
| disabled | `boolean` | disable toggle control |

pagination component have following classes:

- **is-rounded**: make page buttons corner round.
- **is-{color}**: set toggle color to registered iterable colors.

| variable | description                                             | default |
| :------- | :------------------------------------------------------ | :------ |
| colors   | list of non-iterable colors to include in toggle colors | `()`    |
