const required = (value: unknown): boolean => {
  return value !== undefined && value !== null && value !== '';
};

const isEqualTo = (requiredValue = '') => {
  return (value: unknown) => {
    return value === requiredValue;
  };
};

const isNotEqualTo = (requiredValue = '') => {
  return (value: unknown) => {
    return value !== requiredValue;
  };
};

const contains = (requiredValue = '') => {
  return (value: string) => {
    return value.includes(requiredValue);
  };
};

const doesntContain = (requiredValue = '') => {
  return (value: string) => {
    return !value.includes(requiredValue);
  };
};

const between = (min = 0, max = 0) => {
  return (value: number) => {
    return Number(value) >= min && Number(value) <= max;
  };
};

const minLength = (minLength = 0) => {
  return (value: string | number) => {
    if (typeof value === 'number') {
      return value >= minLength;
    }

    return value.length >= minLength;
  };
};

const maxLength = (maxLength = 0) => {
  return (value: string | number) => {
    if (typeof value === 'number') {
      return value <= maxLength;
    }

    return value.length <= maxLength;
  };
};

const regex = (regexString: string) => {
  const regex = new RegExp(regexString);

  return (value: string) => {
    return regex.test(value);
  };
};

const startsWith = (requiredValue = '') => {
  return (value: string) => {
    return value.startsWith(requiredValue);
  };
};

const endsWith = (requiredValue = '') => {
  return (value: string) => {
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
