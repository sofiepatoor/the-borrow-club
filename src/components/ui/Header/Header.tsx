import Container from '@/components/ui/Container';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <p>The Borrow Club</p>
      </Container>
    </header>
  );
}

export default Header;
