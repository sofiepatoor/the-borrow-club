import clsx from 'clsx';
import styles from './section.module.scss';

type SectionProps = {
  as?: 'section' | 'div';
  children: React.ReactNode;
  verticalPadding?: 'sm' | 'md' | 'lg' | 'xl';
};

function Section({
  as = 'section',
  children,
  verticalPadding = 'md',
}: SectionProps) {
  const As = as;
  return (
    <As className={clsx(styles.section, styles[`py-${verticalPadding}`])}>
      {children}
    </As>
  );
}

export default Section;
