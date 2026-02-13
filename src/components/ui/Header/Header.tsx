import Link from 'next/link';
import Container from '@/components/ui/Container';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logoText}>
            The Borrow Club
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/library" className={styles.navLink}>
              My Library
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
