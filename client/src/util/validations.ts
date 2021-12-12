export const validation = (message: string, regex: RegExp, value: string) =>
  regex.test(value.trim()) ? { message: '', isValid: true } : { message, isValid: false };

export const emailValidation = validation.bind(
  null,
  'Email is not valid!',
  /^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/
);
export const passwordValidation = validation.bind(
  null,
  'Password should be at least 4 characters long!',
  /[A-Za-z0-9_]{4,}/
);
export const isNumberValidation = validation.bind(
  null,
  'Input field should be a number!',
  /[0-9]+/
);
export const countryValidation = validation.bind(
  null,
  'Country should be at least 4 characters long!',
  /[a-zA-z]{4,}/
);
export const cityValidation = validation.bind(
  null,
  'City should be at least 4 characters long!',
  /[a-zA-z]{4,}/
);
export const streetValidation = validation.bind(
  null,
  'Street should be at least 4 characters long!',
  /[a-zA-z]{4,}/
);

export const streetNumberValidation = validation.bind(
  null,
  'Street Number should be a positive!',
  /^[0-9]+$/
);


export type IValidationFn = typeof emailValidation | typeof passwordValidation;