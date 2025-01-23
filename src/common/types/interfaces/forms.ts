import type { LOGICAL_OPERATORS, VISIBILITY_RULES_OPERATORS, CUSTOM_VALIDATIONS_OPERATORS } from '../enums/settings';
import { type Type as InputType, Properties as InputProperties } from '../enums/input';

export interface LogicalOperator {
  logicalOperator: LOGICAL_OPERATORS;
}

export interface Validation {
  operator: CUSTOM_VALIDATIONS_OPERATORS;
  value: boolean | number | string;
  maxValue: boolean | number | string;
  message: string;
}

export interface VisibilityRule {
  element: string;
  operator: VISIBILITY_RULES_OPERATORS;
  value: string | number;
  maxValue?: number;
}

export interface ChildSetting {
  component: any;
  label?: string;
  helpText?: string;
  inputType?: string;
}

export type Settings = {
  [key in InputProperties]?: {
    component: any;
    label: string;
    placeholder?: string;
    helpText?: string;
    inputType?: string;
    childs?: ChildSetting[];
  };
};

export interface Options {
  [key: string]: string;
}

export interface Input {
  id: string;
  title: string;
  description: string;
  type: InputType;
  [InputProperties.REQUIRED]: boolean;
  [InputProperties.VISIBILITY_RULES]: VisibilityRule[] | LogicalOperator[];
  [InputProperties.VALIDATIONS]: Validation[] | LogicalOperator[];
  [InputProperties.DEFAULT_VALUE]?: unknown;
  [InputProperties.PLACEHOLDER]?: string;
  [InputProperties.AMOUNT_LINES]?: number;
  [InputProperties.INTEGER]?: boolean;
  [InputProperties.PHONE_FORMAT]?: string;
  [InputProperties.DATES_PAST]?: boolean;
  [InputProperties.DATES_FUTURE]?: boolean;
  [InputProperties.MULTIPLE_ANSWERS]?: boolean;
  [InputProperties.OPTIONS]?: Options;
  [InputProperties.MIN_VALUE]?: number;
  [InputProperties.MAX_VALUE]?: number;
  [InputProperties.STEP]?: number;
  [InputProperties.HIDE_VALUE_LABEL]?: boolean;
  [InputProperties.HIDE_MIN_MAX_LABELS]?: boolean;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  visibilityRules: VisibilityRule[];
  inputs: Input[];
}

export interface Form {
  id: string;
  title: string;
  spaceId: string;
  updated: {
    date: string;
    user: string;
  };
  created: {
    date: string;
    user: string;
  };
  elements: Group[];
}
