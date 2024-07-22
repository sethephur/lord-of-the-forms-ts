import { Dispatch, SetStateAction, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { TextInput } from '../TextInput';
import { FunctionalPhoneInput, PhoneInputState } from './FunctionalPhoneInput';
import { isCityValid, isEmailValid } from '../utils/validations';
import { allCities } from '../utils/all-cities';
import { UserInformation } from '../types';
import { formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneErrorMessage = 'Invalid Phone Number';

type FunctionalFormProps = {
  setUserData: Dispatch<SetStateAction<UserInformation | null>>;
};

export const FunctionalForm: React.FC<FunctionalFormProps> = ({ setUserData }) => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid = firstNameInput.length > 2;
  const isLastNameInputValid = lastNameInput.length > 2;
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput, allCities);
  const formattedPhoneNumber: string = formatPhoneNumber(phoneInput);

  const shouldShowFirstNameError = isSubmitted && !isFirstNameInputValid;
  const shouldShowLastNameError = isSubmitted && !isLastNameInputValid;
  const shouldShowEmailError = isSubmitted && !isEmailInputValid;
  const shouldShowCityError = isSubmitted && !isCityInputValid;
  const shouldShowPhoneError = isSubmitted && formattedPhoneNumber.length < 10;

  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
    setCityInput('');
    setPhoneInput(['', '', '', '']);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (isFirstNameInputValid && isLastNameInputValid && isEmailInputValid && isCityInputValid && phoneInput) {
      setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: formattedPhoneNumber,
      });
      reset();
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      <TextInput
        inputProps={{
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
          value: firstNameInput,
          placeholder: 'Bilbo',
        }}
        labelText='First Name'
      />
      <ErrorMessage message={firstNameErrorMessage} show={shouldShowFirstNameError} />

      {/* last name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
          value: lastNameInput,
          placeholder: 'Baggins',
        }}
        labelText='Last Name'
      />
      <ErrorMessage message={lastNameErrorMessage} show={shouldShowLastNameError} />

      {/* Email Input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
          value: emailInput,
          placeholder: 'bilbo-baggins@adventurehobbits.net',
        }}
        labelText='Email'
      />
      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      {/* City Input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: 'Hobbiton',
        }}
        labelText='City'
      />
      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      <FunctionalPhoneInput phoneInputState={phoneInput} setPhoneInputState={setPhoneInput} />

      <ErrorMessage message={phoneErrorMessage} show={shouldShowPhoneError} />

      <input type='submit' value='Submit' />
    </form>
  );
};
