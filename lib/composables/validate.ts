import { inject, ref, unref, type Ref } from 'vue';
import type { DataModel, Validator } from '@src/common/types/interfaces/data';
import type { Input, LogicalOperator } from '@src/common/types/interfaces/forms';
import { LOGICAL_OPERATORS } from '@src/common/types/enums/settings';

export default function Validate(element: Input) {
  const model = inject('model') as Ref<DataModel>;
  const item = ref(model.value.items[element.id]);

  const setTouched = () => {
    item.value.$touched = true;
    model.value.$touched = ref(Object.values(model.value.items).some((item) => item.$touched));
  };

  const setErrors = () => {
    const invalidValidations = item.value.validations.filter((validation) => (validation as Validator).$invalid);

    console.log(invalidValidations);

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
        const isInvalid = !localValidation.$func(item.value.$value);

        localValidation.$invalid = isInvalid;

        expression.push(`${!isInvalid}`);
      } else {
        expression.push((validation as LogicalOperator).logicalOperator === LOGICAL_OPERATORS.AND ? '&&' : '||');
      }
    });

    const isValid = eval(expression.join(''));

    item.value.$invalid = !isValid;

    model.value.$invalid = ref(Object.values(model.value.items).some((item) => item.$invalid));

    if (unref(item).$invalid) {
      setErrors();
    } else {
      removeErrors();
    }
  };

  return {
    validate,
  };
}
