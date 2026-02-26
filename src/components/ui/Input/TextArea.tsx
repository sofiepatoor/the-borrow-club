import { InputWrapper } from './InputWrapper';
import type { TextAreaProps } from './types';

import styles from './input.module.scss';

export function TextArea({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  rows,
}: TextAreaProps) {
  const fieldId = id ?? name;
  return (
    <InputWrapper label={label} htmlFor={fieldId}>
      <textarea
        id={fieldId}
        name={name}
        placeholder={placeholder}
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={onChange}
        rows={rows}
        className={styles.textarea}
      />
    </InputWrapper>
  );
}
