import React from 'react';
import styles from './button.module.scss';

function Button({
  children,
  ...delegated
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={styles.button} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
