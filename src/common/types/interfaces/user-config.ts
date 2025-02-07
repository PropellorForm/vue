export interface Actions {
  showOnlyFirstErrorPerInput: boolean;
  showListWithAllFormErrors: boolean;
  scrollToFirstError: boolean;
  validateOnBlur: boolean;
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
  classNames: UserClassNames;
}
