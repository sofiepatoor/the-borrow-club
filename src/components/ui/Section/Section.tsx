import clsx from 'clsx';
import styles from './section.module.scss';

type SectionProps = {
  as?: 'section' | 'div';
  children: React.ReactNode;
  verticalPadding?: '0' | 'sm' | 'md' | 'lg' | 'xl';
  topPadding?: '0' | 'sm' | 'md' | 'lg' | 'xl';
  bottomPadding?: '0' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export default function Section({
  as = 'section',
  children,
  verticalPadding = 'sm',
  topPadding = '0',
  bottomPadding = '0',
  className,
}: SectionProps) {
  const As = as;
  return (
    <As
      className={clsx(
        styles.section,
        styles[`py-${verticalPadding}`],
        styles[`pt-${topPadding}`],
        styles[`pb-${bottomPadding}`],
        className,
      )}
    >
      {children}
    </As>
  );
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.sectionHeader}>{children}</div>;
}
