import { useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { TextInput } from '../TextInput';
import { PhoneInput, PhoneInputState } from '../PhoneInput';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export const FunctionalForm = () => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(['', '', '', '']);

  const reset = () => {
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
    setCityInput('');
    setPhoneInput(['', '', '', '']);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        reset();
      }}
    >
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
      <ErrorMessage message={firstNameErrorMessage} show={true} />

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
      <ErrorMessage message={lastNameErrorMessage} show={true} />

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
      <ErrorMessage message={emailErrorMessage} show={true} />

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
      <ErrorMessage message={cityErrorMessage} show={true} />

      <PhoneInput phoneInputState={phoneInput} setPhoneInputState={setPhoneInput} />

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type='submit' value='Submit' />
    </form>
  );
};
