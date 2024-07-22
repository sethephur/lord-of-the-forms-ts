import { ChangeEvent, Component, createRef, RefObject } from 'react';

export type PhoneInputState = [string, string, string, string];

type ClassPhoneInputProps = {
  phoneInputState: PhoneInputState;
  setPhoneInputState: (newState: PhoneInputState) => void;
};

export class ClassPhoneInput extends Component<ClassPhoneInputProps> {
  phoneRefs: RefObject<HTMLInputElement>[] = [createRef(), createRef(), createRef(), createRef()];
  lengths: number[] = [2, 2, 2, 1];

  createOnChangeHandler = (index: 0 | 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
    const currentMaxLength = this.lengths[index];
    const nextRef = this.phoneRefs[index + 1];
    const prevRef = this.phoneRefs[index - 1];
    const value = e.target.value;

    // prevent user from inputting none numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // edge case prevention for inputting more than the allowed characters
    if (value.length > currentMaxLength) {
      return;
    }

    const shouldGoNextRef = currentMaxLength === value.length && nextRef?.current;
    const shouldGoPrevRef = value.length === 0 && prevRef?.current;

    const newState = this.props.phoneInputState.map((phoneInput, phoneInputIndex) =>
      index === phoneInputIndex ? value : phoneInput
    ) as PhoneInputState;

    this.props.setPhoneInputState(newState);

    if (shouldGoNextRef) {
      nextRef.current?.focus();
    }
    if (shouldGoPrevRef) {
      prevRef.current?.focus();
    }
  };

  render() {
    return (
      <>
        <div className='input-wrap'>
          <label htmlFor='phone'>Phone:</label>
          <div id='phone-input-wrap'>
            <input
              type='text'
              ref={this.phoneRefs[0]}
              value={this.props.phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)}
              maxLength={this.lengths[0]}
              id='phone-input-1'
              placeholder='55'
            />
            -
            <input
              type='text'
              ref={this.phoneRefs[1]}
              value={this.props.phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
              maxLength={this.lengths[1]}
              id='phone-input-2'
              placeholder='55'
            />
            -
            <input
              type='text'
              ref={this.phoneRefs[2]}
              value={this.props.phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
              maxLength={this.lengths[2]}
              id='phone-input-3'
              placeholder='55'
            />
            -
            <input
              type='text'
              ref={this.phoneRefs[3]}
              value={this.props.phoneInputState[3]}
              onChange={this.createOnChangeHandler(3)}
              maxLength={this.lengths[3]}
              id='phone-input-4'
              placeholder='5'
            />
          </div>
        </div>
      </>
    );
  }
}
