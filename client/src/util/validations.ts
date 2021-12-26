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

export const usernameValidation = validation.bind(
  null,
  'Username should be at least 4 characters long!',
  /^[A-Za-z0-9_\-. ]{4,}$/
);

export const phoneValidation = validation.bind(
  null,
  'Phone number is not correct! (+359899888888)',
  /^\+359[0-9]{9}$/
);

export const productValidations = {
  name: validation.bind(
    null,
    'Product name should be at least 4 characters long!',
    /^[A-Za-z0-9_\-. ]{4,}$/
  ),
  price: validation.bind(null, 'Price should be a positive number!', /^[0-9]+(\.[0-9]+)?$/),
  year: (value: string) =>
    Number(value) <= new Date().getFullYear() && Number(value) >= new Date().getFullYear() - 20
      ? { message: '', isValid: true }
      : {
          message: `Year should be between ${
            new Date().getFullYear() - 20
          } and ${new Date().getFullYear()}!`,
          isValid: false,
        },
  availablePieces: validation.bind(
    null,
    'Available pieces should be greater than zero!',
    /^[1-9]+$/
  ),
  brand: validation.bind(
    null,
    'Brand should be at least 3 characters long!',
    /^[A-Za-z0-9_\-. ]{3,}$/
  ),
  model: validation.bind(
    null,
    'Model should be at least 3 characters long!',
    /^[A-Za-z0-9_\-. ]{3,}$/
  ),
  description: validation.bind(
    null,
    'Description should be at least 20 characters long!',
    /^.{20,}$/
  ),
};

export const reviewValidation = validation.bind(
  null,
  'Comment should be at least 20 characters long!',
  /^.{20,}$/
);

export type IValidationFn = typeof emailValidation | typeof passwordValidation;
