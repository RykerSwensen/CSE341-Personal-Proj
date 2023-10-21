import JoiPasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 10,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 6,
};

export const validate = (passwordToCheck: string) => {
  return JoiPasswordComplexity(complexityOptions, 'Password').validate(passwordToCheck);
};