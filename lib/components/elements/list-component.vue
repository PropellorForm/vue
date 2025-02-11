<script lang="ts" setup>
import { computed, inject, ref, unref, type PropType, type Ref } from 'vue';
import type { Input } from '@src/common/types/interfaces/forms';
import type { UserClassNames, UserConfig } from '@src/common/types/interfaces/user-config';
import type { DataModel } from '@src/common/types/interfaces/data';

import errorElement from '@lib/elements/error-element.vue';
import useVisibilityLogic from '@lib/composables/visibility';
import { Validate } from '@lib/composables/validate';

const props = defineProps({
  input: {
    type: Object as PropType<Input>,
    required: true,
  },
});

const classNames = inject('class-names') as UserClassNames;
const config = inject('config') as UserConfig;
const model = inject('model') as Ref<DataModel>;
const updateModel = inject('update-model') as (id: string, value: Record<string, boolean>) => void;

const selectedItems = ref((unref(model).items[props.input.id].$value as Record<string, boolean>) || {});

const { isVisible } = useVisibilityLogic(props.input);
const { validate } = Validate(model, props.input.id);

const itemModel = ref(model.value.items[props.input.id]);

const orderedOptions = computed(() => {
  if (!props.input.options) {
    return {};
  }

  return Object.keys(props.input.options)
    .sort()
    .reduce(
      (obj, key) => {
        obj[key] = props.input.options![key];

        return obj;
      },
      {} as Record<string, string>
    );
});

const inputType = computed(() => {
  if (props.input.multipleAnswers) {
    return 'checkbox';
  }

  return 'radio';
});

const errorClasses = computed(() => {
  if (unref(itemModel.value.$errors).length > 0) {
    return classNames.inputs.error;
  }

  return '';
});

const isChecked = (id: string) => {
  return unref(selectedItems)[id] === true;
};

const onChange = (id: string) => {
  if (!props.input.multipleAnswers) {
    selectedItems.value = {};

    selectedItems.value[id] = true;
  } else {
    if (unref(selectedItems)[id]) {
      selectedItems.value[id] = false;
    } else {
      selectedItems.value[id] = true;
    }
  }

  updateModel(props.input.id, unref(selectedItems));

  if (config.actions.validateOnBlur) {
    validate();
  }
};
</script>

<template>
  <div v-if="isVisible" :class="[classNames.inputs.container, errorClasses]">
    <div :class="[classNames.inputs.group, errorClasses]">
      <label :for="input.id" :class="[classNames.inputs.label, errorClasses]">{{ input.title }}</label>
      <div v-if="input.description" :class="classNames.inputs.description">{{ input.description }}</div>
      <ul v-if="Object.values(orderedOptions).length" :class="classNames.list.container">
        <template v-for="(value, key) in orderedOptions" :key="key">
          <li :class="classNames.list.item">
            <label :class="classNames.list.label">
              <input
                :id="key"
                :class="classNames.list.input"
                :name="input.id"
                :type="inputType"
                :checked="isChecked(key)"
                @change="onChange(key)"
              />
              {{ value }}
            </label>
          </li>
        </template>
      </ul>
    </div>
    <errorElement v-if="itemModel.$errors.length > 0" :messages="itemModel.$errors" />
  </div>
</template>
