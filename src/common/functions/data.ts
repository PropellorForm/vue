import type { Form } from '@src/common/types/interfaces/forms';
import type { DataModel, ItemModel } from '../types/interfaces/data';

export const createModel = (formData: Form) => {
  const data: DataModel = {
    $invalid: false,
    $touched: false,
    $errors: [],
    items: {},
  };

  formData.elements.forEach((element) => {
    element.inputs.forEach((input) => {
      const item: ItemModel = {
        $invalid: false,
        $touched: false,
        $errors: [],
        $value: (input.defaultValue as string) || '',
        validations: {},
      };

      data.items[input.id] = item;
    });
  });

  return data;
};
