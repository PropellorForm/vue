<script lang="ts" setup>
import { inject, unref, type Ref } from 'vue';
import type { UserClassNames } from '@src/common/types/interfaces/user-config';
import { FormValidation } from '@lib/composables/form';
import type { Form } from '@src/common/types/interfaces/forms';
import type { DataModel } from '@src/common/types/interfaces/data';

const classNames = inject('class-names') as UserClassNames;
const formData = inject('formData') as Ref<Form>;
const model = inject('model') as Ref<DataModel>;

const { validate, reset } = FormValidation();

const onResetForm = () => {
  reset();
};

const onSubmitForm = () => {
  validate();

  if (unref(model).$invalid) {
    console.log('form is invalid');

    return;
  }

  console.log('form is valid');
};
</script>

<template>
  <div :class="classNames.buttons.container">
    <button
      v-if="formData.buttons.resetButtonLabel"
      type="reset"
      :class="classNames.buttons.reset"
      @click="onResetForm"
    >
      {{ formData.buttons.resetButtonLabel }}
    </button>
    <button type="submit" :class="classNames.buttons.submit" @click="onSubmitForm">Submit</button>
  </div>
</template>
