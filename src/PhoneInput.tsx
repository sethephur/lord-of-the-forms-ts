import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';

export type PhoneInputState = [string, string, string, string];
export const PhoneInput = ({
  phoneInputState,
  setPhoneInputState,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const lengths = [2, 2, 2, 1];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
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

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) => (index === phoneInputIndex ? value : phoneInput)) as PhoneInputState;

      setPhoneInputState(newState);

      if (shouldGoNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoPrevRef) {
        prevRef.current?.focus();
      }
    };

  return (
    <>
      <div className='input-wrap'>
        <label htmlFor='phone'>Phone:</label>
        <div id='phone-input-wrap'>
          <input
            type='text'
            ref={refs[0]}
            value={phoneInputState[0]}
            onChange={createOnChangeHandler(0)}
            maxLength={lengths[0]}
            id='phone-input-1'
            placeholder='55'
          />
          -
          <input
            type='text'
            ref={refs[1]}
            value={phoneInputState[1]}
            onChange={createOnChangeHandler(1)}
            maxLength={lengths[1]}
            id='phone-input-2'
            placeholder='55'
          />
          -
          <input
            type='text'
            ref={refs[2]}
            value={phoneInputState[2]}
            onChange={createOnChangeHandler(2)}
            maxLength={lengths[2]}
            id='phone-input-3'
            placeholder='55'
          />
          -
          <input
            type='text'
            ref={refs[3]}
            value={phoneInputState[3]}
            onChange={createOnChangeHandler(3)}
            maxLength={lengths[3]}
            id='phone-input-4'
            placeholder='5'
          />
        </div>
      </div>
    </>
  );
};
