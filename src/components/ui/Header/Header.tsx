import Container from '@/components/ui/Container';

import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.wrapper}>
      <Container>
        <p>The Borrow Club</p>
      </Container>
    </header>
  );
}

export default Header;
