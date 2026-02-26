import { InputWrapper } from './InputWrapper';
import type { SelectProps } from './types';

import styles from './input.module.scss';

export function Select({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  children,
  multiple = false,
}: SelectProps) {
  const fieldId = id ?? name;
  return (
    <InputWrapper label={label} htmlFor={fieldId}>
      <select
        id={fieldId}
        name={name}
        multiple={multiple}
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={onChange}
        className={styles.select}
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
    </InputWrapper>
  );
}
