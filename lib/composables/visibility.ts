import { computed, inject, unref, type Ref } from 'vue';
import type { DataModel } from '@src/common/types/interfaces/data';
import type { Input, VisibilityRule, LogicalOperator, Group } from '@src/common/types/interfaces/forms';
import { LOGICAL_OPERATORS, VISIBILITY_RULES_OPERATORS } from '@src/common/types/enums/settings';

export default function useVisibilityLogic(element: Input | Group) {
  const model = inject('model') as Ref<DataModel>;

  const contains = (element: string, value: string | number) => {
    const modelValue = unref(model).items[element].$value;

    if (typeof modelValue === 'number') {
      return false;
    }

    if (typeof modelValue === 'object') {
      return (modelValue as Record<string, boolean>)[value] === true;
    }

    return modelValue.includes(value as never);
  };

  const isBetween = (element: string, minValue: number, maxValue: number) => {
    const modelValue = unref(model).items[element].$value;

    return Number(modelValue) > minValue && Number(modelValue) < maxValue;
  };

  const isMinimal = (element: string, minValue: number) => {
    const modelValue = unref(model).items[element].$value;

    return Number(modelValue) >= minValue;
  };

  const isMaximal = (element: string, maxValue: number) => {
    const modelValue = unref(model).items[element].$value;

    return Number(modelValue) <= maxValue;
  };

  const isEqual = (element: string, value: string | number) => {
    const modelValue = unref(model).items[element].$value;

    return modelValue === value;
  };

  const isAnswered = (element: string) => {
    const modelValue = unref(model).items[element].$value;

    if (typeof modelValue === 'object') {
      return Object.values(modelValue).includes(true);
    }

    return modelValue !== '';
  };

  const hasAmountOfSelectedItems = (element: string, value: number) => {
    const modelValue = unref(model).items[element].$value as string[];

    if (Object.keys(modelValue).length > 0) {
      return Object.values(modelValue).filter((value) => value).length >= value;
    }

    return modelValue.length === value;
  };

  const isVisible = computed((): boolean => {
    if (element.visibilityRules.length === 0) {
      return true;
    }

    let expression = '';

    for (const rule of element.visibilityRules) {
      if (rule.hasOwnProperty('operator')) {
        const localRule = rule as VisibilityRule;

        switch (localRule.operator) {
          case VISIBILITY_RULES_OPERATORS.IS:
            expression += `${isEqual(localRule.element, localRule.value)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_NOT:
            expression += `${!isEqual(localRule.element, localRule.value)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_ANSWERED:
            expression += `${isAnswered(localRule.element)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_NOT_ANSWERED:
            expression += `${!isAnswered(localRule.element)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.CONTAINS:
            expression += `${contains(localRule.element, localRule.value)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.DOESNT_CONTAIN:
            expression += `${!contains(localRule.element, localRule.value)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_BETWEEN:
            expression += `${isBetween(localRule.element, Number(localRule.value), Number(localRule.maxValue)!)}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_MINIMAL:
            expression += `${isMinimal(localRule.element, Number(localRule.value))}`;
            break;
          case VISIBILITY_RULES_OPERATORS.IS_MAXIMAL:
            expression += `${isMaximal(localRule.element, Number(localRule.value))}`;
            break;
          case VISIBILITY_RULES_OPERATORS.HAS_AMOUNT_OF_SELECTED_ITEMS:
            expression += `${hasAmountOfSelectedItems(localRule.element, Number(localRule.value))}`;
            break;
        }
      } else {
        if ((rule as LogicalOperator).logicalOperator === LOGICAL_OPERATORS.AND) {
          expression += ` && `;
        } else {
          expression += ` || `;
        }
      }
    }

    return eval(expression);
  });

  return { isVisible };
}
