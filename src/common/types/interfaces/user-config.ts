export interface Actions {
  showOnlyFirstErrorPerInput: boolean;
  showListWithAllFormErrors: boolean;
  scrollToFirstError: boolean;
  validateOnBlur: boolean;
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface UserClassNames {
  prefix: string;
  form: {
    default: string;
  };
  fieldset: {
    default: string;
    legend: string;
  };
  group: {
    default: string;
  };
  inputs: {
    container: string;
    group: string;
    label: string;
    description: string;
    text: string;
    error: string;
    optional: string;
  };
  list: {
    container: string;
    item: string;
    label: string;
    input: string;
  };
  range: {
    container: string;
    input: string;
    inputContainer: string;
    indicator: string;
    minLabel: string;
    maxLabel: string;
  };
  buttons: {
    container: string;
    submit: string;
    reset: string;
    back: string;
  };
  errors: {
    group: string;
    error: string;
  };
}

export interface UserConfig {
  actions: Actions;
  translations: Translations;
  classNames: UserClassNames;
}
