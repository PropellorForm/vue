<script lang="ts" setup>
import { computed, inject, ref, unref, type PropType, type Ref } from 'vue';
import type { Input } from '@src/common/types/interfaces/forms';
import type { UserClassNames } from '@src/common/types/interfaces/user-config';
import type { DataModel } from '@src/common/types/interfaces/data';

import errorElement from '@lib/elements/error-element.vue';
import useVisibilityLogic from '@lib/composables/visibility';
import useValidate from '@lib/composables/validate';

const props = defineProps({
  input: {
    type: Object as PropType<Input>,
    required: true,
  },
});

const classNames = inject('class-names') as UserClassNames;
const model = inject('model') as Ref<DataModel>;
const updateModel = inject('update-model') as (id: string, value: string) => void;

const itemModel = ref(model.value.items[props.input.id]);

const { isVisible } = useVisibilityLogic(props.input);
const { validate } = useValidate(props.input);

const stepNumber = computed(() => {
  if (props.input.integer) {
    return 1;
  }

  return undefined;
});

const errorClasses = computed(() => {
  if (unref(itemModel.value.$errors).length > 0) {
    return classNames.inputs.error;
  }

  return '';
});

const onInput = (event: Event) => {
  updateModel(props.input.id, (event.target as HTMLInputElement).value);
};

const onBlur = () => {
  validate();
};
</script>

<template>
  <div v-if="isVisible" :class="[classNames.inputs.container, errorClasses]">
    <div :class="[classNames.inputs.group, errorClasses]">
      <label :for="input.id" :class="[classNames.inputs.label, errorClasses]">{{ input.title }}</label>
      <div v-if="input.description" :class="classNames.inputs.description">{{ input.description }}</div>
      <template v-if="input.amountLines && input.amountLines > 0">
        <textarea
          v-model="itemModel.$value"
          :id="input.id"
          :placeholder="input.placeholder"
          :class="[classNames.inputs.text, errorClasses]"
          :rows="input.amountLines"
          @input="onInput"
        ></textarea>
      </template>
      <template v-else>
        <input
          v-model="itemModel.$value"
          :id="input.id"
          :type="input.type"
          :placeholder="input.placeholder"
          :class="[classNames.inputs.text, errorClasses]"
          :step="stepNumber"
          @input="onInput"
          @blur="onBlur"
        />
      </template>
    </div>
    <errorElement v-if="itemModel.$errors.length > 0" :messages="itemModel.$errors" />
  </div>
</template>
