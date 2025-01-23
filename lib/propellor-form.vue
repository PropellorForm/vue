<script lang="ts" setup>
import { onMounted, provide, ref, unref, type PropType } from 'vue';
import { getData } from '@src/common/functions/database';

import FormFieldset from './components/form-fieldset.vue';
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
const model = ref<DataModel>();

onMounted(async () => {
  formData.value = await getData(props.space, props.form);

  if (unref(formData) !== undefined) {
    model.value = createModel(unref(formData) as Form);
  }
});

const updateModel = (id: string, value: string | number | string[] | number[]) => {
  model.value!.items[id].$value = value;
};

provide('config', config);
provide('class-names', config.classNames);
provide('formData', formData);
provide('model', model);
provide('update-model', updateModel);
</script>

<template>
  <form v-if="formData" :class="config.classNames.form.default">
    <template v-for="group in formData.elements" :key="group.title">
      <FormFieldset :group="group" />
    </template>

    <button type="submit" :class="config.classNames.form.submit">Submit</button>
  </form>
</template>
