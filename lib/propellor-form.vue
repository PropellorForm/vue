<script lang="ts" setup>
import { computed, onMounted, provide, ref, unref, type PropType } from 'vue';
import { getData } from '@src/common/functions/database';

import FormFieldset from './components/form-fieldset.vue';
import FormButtons from './components/form-buttons.vue';
import type { Form } from '@src/common/types/interfaces/forms';
import { defaultConfig } from './configs/user-config';
import type { UserConfig } from '@src/common/types/interfaces/user-config';
import type { DataModel } from '@src/common/types/interfaces/data';
import { createModel } from '@src/common/functions/data';

const props = defineProps({
  space: {
    type: String,
    required: true,
  },

  form: {
    type: String,
    required: true,
  },

  config: {
    type: Object as PropType<UserConfig>,
    default: () => ({}),
  },
});

const config = Object.assign({}, defaultConfig, props.config);

const formData = ref<Form>();

onMounted(async () => {
  formData.value = await getData(props.space, props.form);
});

const model = computed((): DataModel => {
  return createModel(unref(formData) as Form);
});

const updateModel = (id: string, value: string | number | string[] | number[]) => {
  model.value!.items[id].$value = value;
};

provide('config', config);
provide('class-names', config.classNames);
provide('translations', config.translations);
provide('formData', formData);
provide('model', model);
provide('update-model', updateModel);
</script>

<template>
  <form v-if="formData && model" @submit.prevent :class="config.classNames.form.default">
    <template v-for="group in formData.elements" :key="group.title">
      <FormFieldset :group="group" />
    </template>

    <FormButtons />
  </form>
</template>
