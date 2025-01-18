export enum LOGICAL_OPERATORS {
  AND = 'AND',
  OR = 'OR',
  EMPTY = '',
}

export enum VISIBILITY_RULES_OPERATORS {
  IS = 'is',
  IS_NOT = 'isNot',
  IS_ANSWERED = 'isAnswered',
  IS_NOT_ANSWERED = 'isNotAnswered',
  CONTAINS = 'contains',
  DOESNT_CONTAIN = 'doesntContain',
  IS_BETWEEN = 'isBetween',
  IS_MINIMAL = 'isMinimal',
  IS_MAXIMAL = 'isMaximal',
  HAS_AMOUNT_OF_SELECTED_ITEMS = 'hasAmountOfSelectedItems',
}

export enum CUSTOM_VALIDATIONS_OPERATORS {
  IS_EQUAL_TO = 'isEqualTo',
  IS_NOT_EQUAL_TO = 'isNotEqualTo',
  CONTAINS = 'contains',
  DOESNT_CONTAIN = 'doesntContain',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  SAME_AS = 'sameAs',
  REGEX = 'regex',
  MIN_VALUE = 'minValue',
  MAX_VALUE = 'maxValue',
  BETWEEN = 'between',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
}
