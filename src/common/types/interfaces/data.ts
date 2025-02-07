import type { Ref } from 'vue';
import type { LogicalOperator } from './forms';

export interface Validator {
  $name: string;
  $message: string;
  $invalid: boolean;
  $func: (value: unknown) => boolean;
}

export interface ItemModel {
  $invalid: Ref<boolean>;
  $touched: Ref<boolean>;
  $errors: string[];
  $value: string | number | string[] | number[] | Record<string, boolean>;
  validations: Ref<Validator[] | LogicalOperator[]>;
}

export interface DataModel {
  $invalid: boolean;
  $touched: boolean;
  items: {
    [key: string]: ItemModel;
  };
}
