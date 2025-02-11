<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import type { Input } from '@src/common/types/interfaces/forms';
import { Type as InputType } from '@src/common/types/enums/input';

import textComponent from './elements/text-component.vue';
import listComponent from './elements/list-component.vue';
import rangeComponent from './elements/range-component.vue';

const props = defineProps({
  input: {
    type: Object as PropType<Input>,
    required: true,
  },
});

const inputComponent = computed(() => {
  if (
    props.input.type === InputType.TEXT ||
    props.input.type === InputType.EMAIL ||
    props.input.type === InputType.PASSWORD ||
    props.input.type === InputType.URL ||
    props.input.type === InputType.NUMBER ||
    props.input.type === InputType.PHONE
  ) {
    return textComponent;
  }

  if (props.input.type === InputType.MULTIPLE_CHOICE) {
    return listComponent;
  }

  if (props.input.type === InputType.SLIDER) {
    return rangeComponent;
  }

  return null;
});
</script>

<template>
  <component :is="inputComponent" :input="input" />
</template>
