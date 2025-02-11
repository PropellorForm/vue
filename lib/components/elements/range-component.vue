<script lang="ts" setup>
import { computed, inject, ref, unref, type HTMLAttributes, type PropType, type Ref } from 'vue';

import errorElement from '@lib/elements/error-element.vue';

import type { Input } from '@src/common/types/interfaces/forms';
import type { Translations, UserClassNames, UserConfig } from '@src/common/types/interfaces/user-config';
import type { DataModel } from '@src/common/types/interfaces/data';

import useVisibilityLogic from '@lib/composables/visibility';
import { Validate } from '@lib/composables/validate';

const props = defineProps({
  input: {
    type: Object as PropType<Input>,
    required: true,
  },
});

const classNames = inject('class-names') as UserClassNames;
const translations = inject('translations') as Translations;
const config = inject('config') as UserConfig;
const model = inject('model') as Ref<DataModel>;
const updateModel = inject('update-model') as (id: string, value: string) => void;

const itemModel = ref(model.value.items[props.input.id]);

const { isVisible } = useVisibilityLogic(props.input);
const { validate } = Validate(model, props.input.id);

const inputContainerStyle = computed(() => {
  if (props.input.hideValueLabel) {
    return '';
  }

  return {
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  };
});

const moveIndicator = computed(() => {
  const position =
    ((Number(itemModel.value.$value) - props.input.minValue!) / (props.input.maxValue! - props.input.minValue!)) * 100;

  return {
    marginLeft: `${position}%`,
    transform: `translateX(-${position}%)`,
  };
});

const errorClasses = computed(() => {
  if (unref(itemModel.value.$errors).length > 0) {
    return classNames.inputs.error;
  }

  return '';
});

const onChange = (event: Event) => {
  updateModel(props.input.id, (event.target as HTMLInputElement).value);

  if (config.actions.validateOnBlur) {
    validate();
  }
};
</script>

<template>
  <div v-if="isVisible" :class="[classNames.inputs.container, errorClasses]">
    <div :class="[classNames.inputs.group, errorClasses]">
      <label :for="input.id" :class="[classNames.inputs.label, errorClasses]">
        {{ input.title }}
        <span v-if="!input.required" :class="classNames.inputs.optional">({{ translations.en.optional }})</span>
      </label>
      <div v-if="input.description" :class="classNames.inputs.description">{{ input.description }}</div>
      <div :class="classNames.range.container">
        <span v-if="!input.hideMinMaxLabels" :class="classNames.range.minLabel">{{ input.minValue }}</span>
        <div :class="classNames.range.inputContainer" :style="inputContainerStyle">
          <div v-if="!input.hideValueLabel" :class="classNames.range.indicator" :style="moveIndicator">
            {{ itemModel.$value }}
          </div>
          <input
            v-model="itemModel.$value"
            :id="input.id"
            type="range"
            :placeholder="input.placeholder"
            :class="[classNames.inputs.text, errorClasses]"
            :step="input.step"
            :min="input.minValue"
            :max="input.maxValue"
            @change="onChange"
          />
        </div>
        <span v-if="!input.hideMinMaxLabels" :class="classNames.range.maxLabel">{{ input.maxValue }}</span>
      </div>
    </div>
    <errorElement v-if="itemModel.$errors.length > 0" :messages="itemModel.$errors" />
  </div>
</template>
