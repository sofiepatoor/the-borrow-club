import clsx from 'clsx';
import styles from './section.module.scss';

type SectionProps = {
  as?: 'section' | 'div';
  children: React.ReactNode;
  verticalPadding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

function Section({
  as = 'section',
  children,
  verticalPadding = 'sm',
  className,
}: SectionProps) {
  const As = as;
  return (
    <As
      className={clsx(
        styles.section,
        styles[`py-${verticalPadding}`],
        className,
      )}
    >
      {children}
    </As>
  );
}

export default Section;
