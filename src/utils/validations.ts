import { PhoneInputState } from '../FunctionalApp/FunctionalPhoneInput';

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export const isCityValid = (cityInput: string, allCities: string[]) => {
  return allCities.some((city) => city.toLowerCase() === cityInput.toLowerCase());
};
