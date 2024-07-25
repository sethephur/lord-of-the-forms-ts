import React, { Component } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { TextInput } from '../TextInput';
import { ClassPhoneInput, PhoneInputState } from './ClassPhoneInput';
import { isAlphabetical, isCityValid, isEmailValid } from '../utils/validations';
import { allCities } from '../utils/all-cities';
import { UserInformation } from '../types';
import { formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long and can not include numbers or special characters';
const lastNameErrorMessage = 'Last name must be at least 2 characters long and can not include numbers or special characters';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneErrorMessage = 'Invalid Phone Number';

interface ClassFormProps {
  setUserData: (userData: UserInformation) => void;
}

type ClassFormState = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: PhoneInputState;
  isSubmitted: boolean;
};

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
  constructor(props: ClassFormProps) {
    super(props);
    this.state = {
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      cityInput: '',
      phoneInput: ['', '', '', ''],
      isSubmitted: false,
    };
  }

  get isFirstNameInputValid(): boolean {
    return this.state.firstNameInput.length > 2 && isAlphabetical(this.state.firstNameInput);
  }

  get isLastNameInputValid(): boolean {
    return this.state.lastNameInput.length > 2 && isAlphabetical(this.state.lastNameInput);
  }

  get isEmailInputValid(): boolean {
    return isEmailValid(this.state.emailInput);
  }

  get isCityInputValid(): boolean {
    return isCityValid(this.state.cityInput, allCities);
  }

  get formattedPhoneNumber(): string {
    return formatPhoneNumber(this.state.phoneInput);
  }

  get shouldShowFirstNameError(): boolean {
    return this.state.isSubmitted && !this.isFirstNameInputValid;
  }

  get shouldShowLastNameError(): boolean {
    return this.state.isSubmitted && !this.isLastNameInputValid;
  }

  get shouldShowEmailError(): boolean {
    return this.state.isSubmitted && !this.isEmailInputValid;
  }

  get shouldShowCityError(): boolean {
    return this.state.isSubmitted && !this.isCityInputValid;
  }

  get shouldShowPhoneError(): boolean {
    return this.state.isSubmitted && this.formattedPhoneNumber.length < 10;
  }

  reset = () => {
    this.setState({
      firstNameInput: '',
      lastNameInput: '',
      emailInput: '',
      cityInput: '',
      phoneInput: ['', '', '', ''],
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ isSubmitted: true }, () => {
      if (this.isFirstNameInputValid && this.isLastNameInputValid && this.isEmailInputValid && this.isCityInputValid && this.state.phoneInput) {
        this.props.setUserData({
          firstName: this.state.firstNameInput,
          lastName: this.state.lastNameInput,
          email: this.state.emailInput,
          city: this.state.cityInput,
          phone: this.formattedPhoneNumber,
        });
        this.reset();
        this.setState({ isSubmitted: false });
      } else {
        alert('Bad data input');
      }
    });
  };

  handlePhoneInputChange = (newPhoneInput: PhoneInputState) => {
    this.setState({ phoneInput: newPhoneInput });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
            value: this.state.firstNameInput,
            placeholder: 'Bilbo',
          }}
          labelText='First Name'
        />
        <ErrorMessage message={firstNameErrorMessage} show={this.shouldShowFirstNameError} />

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
            value: this.state.lastNameInput,
            placeholder: 'Baggins',
          }}
          labelText='Last Name'
        />
        <ErrorMessage message={lastNameErrorMessage} show={this.shouldShowLastNameError} />

        <TextInput
          inputProps={{
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
            value: this.state.emailInput,
            placeholder: 'bilbo-baggins@adventurehobbits.net',
          }}
          labelText='Email'
        />
        <ErrorMessage message={emailErrorMessage} show={this.shouldShowEmailError} />

        <div>
          <TextInput
            inputProps={{
              onChange: (e) => {
                this.setState({ cityInput: e.target.value });
              },
              value: this.state.cityInput,
              placeholder: 'Hobbiton',
              list: 'cities',
            }}
            labelText='City'
          />
          <datalist id='cities'>
            {allCities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <ErrorMessage message={cityErrorMessage} show={this.shouldShowCityError} />

        <ClassPhoneInput phoneInputState={this.state.phoneInput} setPhoneInputState={this.handlePhoneInputChange} />

        <ErrorMessage message={phoneErrorMessage} show={this.shouldShowPhoneError} />

        <input type='submit' value='Submit' />
      </form>
    );
  }
}
