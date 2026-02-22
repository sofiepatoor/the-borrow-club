import type { ReactNode } from 'react';
import styles from './input.module.scss';

type InputWrapperProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

export function InputWrapper({ label, htmlFor, children }: InputWrapperProps) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
