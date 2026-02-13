import Container from '../Container';
import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <p>
            <a
              href="https://www.sofiepatoor.be"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Made by Sofie
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
