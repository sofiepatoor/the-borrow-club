import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './input.module.scss';

type FieldsetProps = {
  legend: string;
  children: ReactNode;
  className?: string;
};

export function Fieldset({ legend, children, className }: FieldsetProps) {
  return (
    <fieldset className={clsx(styles.fieldset, className)}>
      <legend className="vh">{legend}</legend>
      {children}
    </fieldset>
  );
}
