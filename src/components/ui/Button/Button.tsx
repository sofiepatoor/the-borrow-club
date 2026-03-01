import clsx from 'clsx';
import Link from 'next/link';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink;

import styles from './button.module.scss';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(props, ref) {
    const { children, className, variant = 'primary' } = props;
    const classNames = clsx(styles.button, styles[variant], className);

    if ('href' in props && props.href) {
      const { href, ...rest } = props;
      const isExternal = href.startsWith('http') || href.startsWith('//');

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classNames}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classNames}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const buttonProps = props as ButtonAsButton;
    const { type, ...rest } = buttonProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        {...rest}
        className={classNames}
      >
        {children}
      </button>
    );
  },
);

export default Button;
