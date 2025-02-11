import type { UserConfig } from '@src/common/types/interfaces/user-config';

const classNamePrefix = 'pf-';

export const defaultConfig: UserConfig = {
  actions: {
    showOnlyFirstErrorPerInput: true,
    showListWithAllFormErrors: true,
    scrollToFirstError: true,
    validateOnBlur: true,
  },
  translations: {
    en: {
      optional: 'Optional',
    },
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
      optional: `${classNamePrefix}optional`,
    },
    list: {
      container: `${classNamePrefix}list`,
      item: `${classNamePrefix}list-item`,
      label: `${classNamePrefix}list-item-label`,
      input: `${classNamePrefix}list-item-input`,
    },
    range: {
      container: `${classNamePrefix}range`,
      inputContainer: `${classNamePrefix}range-input-container`,
      input: `${classNamePrefix}range-input`,
      indicator: `${classNamePrefix}range-indicator`,
      minLabel: `${classNamePrefix}range-min-label`,
      maxLabel: `${classNamePrefix}range-max-label`,
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
