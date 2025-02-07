import type { UserConfig } from '@src/common/types/interfaces/user-config';

const classNamePrefix = 'pf-';

export const defaultConfig: UserConfig = {
  actions: {
    showOnlyFirstErrorPerInput: true,
    showListWithAllFormErrors: true,
    scrollToFirstError: true,
    validateOnBlur: true,
  },
  classNames: {
    prefix: classNamePrefix,
    form: {
      default: `${classNamePrefix}form`,
    },
    fieldset: {
      default: `${classNamePrefix}fieldset`,
      legend: `${classNamePrefix}legend`,
    },
    group: {
      default: `${classNamePrefix}elements`,
    },
    inputs: {
      container: `${classNamePrefix}input-container`,
      group: `${classNamePrefix}input-group`,
      label: `${classNamePrefix}label`,
      description: `${classNamePrefix}description`,
      text: `${classNamePrefix}input`,
      error: `${classNamePrefix}has-error`,
    },
    buttons: {
      container: `${classNamePrefix}buttons`,
      submit: `${classNamePrefix}button-submit`,
      reset: `${classNamePrefix}button-reset`,
      back: `${classNamePrefix}button-back`,
    },
    errors: {
      group: `${classNamePrefix}errors`,
      error: `${classNamePrefix}error`,
    },
  },
};
