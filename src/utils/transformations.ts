import { PhoneInputState } from '../FunctionalApp/FunctionalPhoneInput';

export const capitalize = (str: string | null | undefined): string => {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
};

export const formatPhoneNumber = (phoneInput: PhoneInputState): string => {
  return phoneInput.reduce((formatted: string, part: string, index: number) => {
    return formatted + part + (index !== phoneInput.length - 1 ? '-' : '');
  }, '');
};
