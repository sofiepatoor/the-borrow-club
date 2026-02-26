import { InputWrapper } from './InputWrapper';
import type { TextAreaProps } from './types';

import styles from './input.module.scss';

export function TextArea({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  rows,
}: TextAreaProps) {
  const fieldId = id ?? name;
  return (
    <InputWrapper label={label} htmlFor={fieldId}>
      <textarea
        id={fieldId}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        className={styles.textarea}
      />
    </InputWrapper>
  );
}
