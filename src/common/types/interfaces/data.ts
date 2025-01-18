export interface Validator {
  $message: string;
  $invalid: boolean;
}

export interface ItemModel {
  $invalid: boolean;
  $touched: boolean;
  $errors: string[];
  $value: string | number | string[] | number[] | Record<string, boolean>;
  validations: {
    [key: string]: Validator;
  };
}

export interface DataModel {
  $invalid: boolean;
  $touched: boolean;
  $errors: string[];
  items: {
    [key: string]: ItemModel;
  };
}
