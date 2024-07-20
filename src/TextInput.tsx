import { ComponentProps } from 'react';

export const TextInput = ({ labelText, inputProps }: { labelText: string; inputProps: ComponentProps<'input'> }) => {
  return (
    <>
      <div className='input-wrap'>
        <label htmlFor='name'>{labelText}:</label>
        <input type='text' {...inputProps} />
      </div>
    </>
  );
};
