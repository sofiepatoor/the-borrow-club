import { InputWrapper } from './InputWrapper';
import type { TextInputProps } from './types';

export function Input({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  defaultValue,
}: TextInputProps) {
  const fieldId = id ?? name;
  return (
    <InputWrapper label={label} htmlFor={fieldId}>
      <input
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </InputWrapper>
  );
}
