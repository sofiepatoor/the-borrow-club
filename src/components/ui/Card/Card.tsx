import clsx from 'clsx';

import styles from './card.module.scss';

type CardProps = {
  as?: 'div' | 'li' | 'section';
  children: React.ReactNode;
  className?: string;
};

function Card({ as = 'div', children, className }: CardProps) {
  const As = as;
  return <As className={clsx(styles.card, className)}>{children}</As>;
}

export default Card;
