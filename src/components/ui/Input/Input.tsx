import { InputWrapper } from './InputWrapper';
import type { TextInputProps } from './types';

import styles from './input.module.scss';

export function Input({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  defaultValue,
  value,
  onChange,
}: TextInputProps) {
  const fieldId = id ?? name;
  return (
    <InputWrapper label={label} htmlFor={fieldId}>
      <input
        id={fieldId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={styles.input}
      />
    </InputWrapper>
  );
}
