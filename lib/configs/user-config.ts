import type { UserConfig } from '@src/common/types/interfaces/user-config';

const classNamePrefix = 'pf-';

export const defaultConfig: UserConfig = {
  showOnlyFirstError: true,
  classNames: {
    prefix: classNamePrefix,
    form: {
      default: `${classNamePrefix}form`,
      submit: `${classNamePrefix}submit`,
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
    errors: {
      group: `${classNamePrefix}errors`,
      error: `${classNamePrefix}error`,
    },
  },
};
