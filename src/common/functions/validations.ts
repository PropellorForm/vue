const required = (value: unknown): boolean => {
  if (typeof value === 'object' && Object.keys(value as object).length > 0) {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    const validKeys = keys.filter((key) => obj[key]);

    return validKeys.length > 0;
  }

  return value !== undefined && value !== null && value !== '';
};

const isEqualTo = (isRequired = true, requiredValue = '') => {
  return (value: unknown) => {
    if (!isRequired && !value) {
      return true;
    }

    return value === requiredValue;
  };
};

const isNotEqualTo = (isRequired = true, requiredValue = '') => {
  return (value: unknown) => {
    if (!isRequired && !value) {
      return true;
    }

    return value !== requiredValue;
  };
};

const contains = (isRequired = true, requiredValue = '') => {
  return (value: string) => {
    if (!isRequired && !value) {
      return true;
    }

    if (typeof value === 'string') {
      return value.includes(requiredValue);
    }

    const keys = Object.keys(value);
    const valueArray = keys.filter((key) => value[key]);

    return valueArray.includes(requiredValue);
  };
};

const doesntContain = (isRequired = true, requiredValue = '') => {
  return (value: string) => {
    if (!isRequired && !value) {
      return true;
    }

    return !value.includes(requiredValue);
  };
};

const between = (isRequired = true, min = 0, max = 0) => {
  return (value: number) => {
    if (!isRequired && !value) {
      return true;
    }

    return Number(value) >= min && Number(value) <= max;
  };
};

const minLength = (isRequired = true, minLength = 0) => {
  return (value: string | number) => {
    if (!isRequired && !value) {
      return true;
    }

    if (typeof value === 'number') {
      return value >= minLength;
    }

    return value.length >= minLength;
  };
};

const maxLength = (isRequired = true, maxLength = 0) => {
  return (value: string | number) => {
    if (!isRequired && !value) {
      return true;
    }

    if (typeof value === 'number') {
      return value <= maxLength;
    }

    return value.length <= maxLength;
  };
};

const regex = (isRequired = true, regexString: string) => {
  const regex = new RegExp(regexString);

  return (value: string) => {
    if (!isRequired && !value) {
      return true;
    }

    return regex.test(value);
  };
};

const startsWith = (isRequired = true, requiredValue = '') => {
  return (value: string) => {
    if (!isRequired && !value) {
      return true;
    }

    return value.startsWith(requiredValue);
  };
};

const endsWith = (isRequired = true, requiredValue = '') => {
  return (value: string) => {
    if (!isRequired && !value) {
      return true;
    }

    return value.endsWith(requiredValue);
  };
};

export default {
  required,
  isEqualTo,
  isNotEqualTo,
  contains,
  doesntContain,
  minLength,
  maxLength,
  regex,
  startsWith,
  endsWith,
  between,
};
