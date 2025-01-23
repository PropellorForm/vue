export interface UserClassNames {
  prefix: string;
  form: {
    default: string;
    submit: string;
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
  errors: {
    group: string;
    error: string;
  };
}

export interface UserConfig {
  showOnlyFirstError: boolean;
  classNames: UserClassNames;
}
