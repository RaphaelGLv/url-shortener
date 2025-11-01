import { LoginButton } from './components/login-button/login-button';
import styles from './navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.textLogo}>LinkDrop</h1>

            <LoginButton />
        </nav>
    )
}