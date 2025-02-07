import { inject, ref, unref, type Ref } from 'vue';
import type { DataModel } from '@src/common/types/interfaces/data';
import { Validate } from './validate';

export function FormValidation() {
  const model = inject('model') as Ref<DataModel>;
  const items = ref(model.value.items);

  const validate = () => {
    Object.keys(unref(items)).forEach((id) => {
      Validate(model, id).validate();
    });
  };

  const reset = () => {
    Object.values(unref(items)).forEach((item) => {
      item.$value = '';
    });

    validate();
  };

  return {
    validate,
    reset,
  };
}
