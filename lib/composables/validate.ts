import { ref, unref, type Ref } from 'vue';
import type { DataModel, Validator } from '@src/common/types/interfaces/data';
import type { LogicalOperator } from '@src/common/types/interfaces/forms';
import { LOGICAL_OPERATORS } from '@src/common/types/enums/settings';

export const Validate = (model: Ref<DataModel>, elementId: string) => {
  const item = ref(model.value.items[elementId]);

  const setTouched = () => {
    item.value.$touched = true;
    model.value.$touched = Object.values(model.value.items).some((item) => item.$touched);
  };

  const setErrors = () => {
    const invalidValidations = item.value.validations.filter((validation) => (validation as Validator).$invalid);

    item.value.$errors = invalidValidations.map((validation) => {
      return (validation as Validator).$message;
    });
  };

  const removeErrors = () => {
    item.value.$errors = [];
  };

  const validate = () => {
    setTouched();

    const expression: string[] = [];

    item.value.validations.forEach((validation) => {
      if (validation.hasOwnProperty('$func')) {
        const localValidation = validation as Validator;

        console.log(item.value);

        const isInvalid = !localValidation.$func(item.value.$value);

        localValidation.$invalid = isInvalid;

        expression.push(`${!isInvalid}`);
      } else {
        expression.push((validation as LogicalOperator).logicalOperator === LOGICAL_OPERATORS.AND ? '&&' : '||');
      }
    });

    const isValid = eval(expression.join(''));

    item.value.$invalid = !isValid;

    model.value.$invalid = Object.values(model.value.items).some((item) => item.$invalid.value);

    if (unref(item).$invalid) {
      setErrors();
    } else {
      removeErrors();
    }
  };

  return {
    validate,
  };
};
