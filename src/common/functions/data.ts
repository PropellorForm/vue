import { ref, type Ref } from 'vue';

import type { Form, Input, LogicalOperator, Validation } from '@src/common/types/interfaces/forms';
import type { DataModel, ItemModel, Validator } from '../types/interfaces/data';
import Validations from './validations';
import { LOGICAL_OPERATORS } from '../types/enums/settings';

const getValidations = (input: Input): Ref<Validator[] | LogicalOperator[]> => {
  const validations: Ref<Validator[] | LogicalOperator[]> = ref([]);

  if (input.required) {
    (validations.value as Validator[]).push({
      $name: 'required',
      $message: 'This field is required',
      $invalid: false,
      $func: Validations.required,
    });

    if (input.validations.length > 0) {
      (validations.value as LogicalOperator[]).push({
        logicalOperator: LOGICAL_OPERATORS.AND,
      });
    }
  }

  input.validations.forEach((rule) => {
    if (rule.hasOwnProperty('operator')) {
      const localRule = rule as Validation;

      (validations.value as Validator[]).push({
        $name: localRule.operator,
        $message: localRule.message,
        $invalid: false,
        $func: Validations[localRule.operator](input.required, localRule.value, localRule.maxValue),
      });
    } else {
      (validations.value as LogicalOperator[]).push(rule as LogicalOperator);
    }
  });

  return validations;
};

export const createModel = (formData: Form) => {
  const data: DataModel = {
    $invalid: ref(false),
    $touched: ref(false),
    items: {},
  };

  formData.elements.forEach((element) => {
    element.inputs.forEach((input) => {
      const validations = getValidations(input);
      let defaultValue = input.defaultValue as string;

      if (defaultValue === undefined) {
        defaultValue = '';
      }

      const item: ItemModel = {
        $invalid: ref(false),
        $touched: ref(false),
        $errors: [],
        $value: defaultValue,
        validations: validations,
      };

      data.items[input.id] = item;
    });
  });

  return data;
};
