<script lang="ts" setup>
import { inject, type PropType } from 'vue';
import type { Group } from '@src/common/types/interfaces/forms';
import type { UserClassNames } from '@src/common/types/interfaces/user-config';

import useVisibilityLogic from '@lib/composables/visibility';
import FormElement from './form-element.vue';

const props = defineProps({
  group: {
    type: Object as PropType<Group>,
    required: true,
  },
});

const classNames = inject('class-names') as UserClassNames;

const { isVisible } = useVisibilityLogic(props.group);
</script>

<template>
  <fieldset v-if="isVisible" :class="classNames.fieldset.default">
    <legend v-if="group.title" :class="classNames.fieldset.legend">{{ group.title }}</legend>
    <div :class="classNames.group.default">
      <template v-for="input in group.inputs" :key="input.id">
        <FormElement :input="input" />
      </template>
    </div>
  </fieldset>
</template>
