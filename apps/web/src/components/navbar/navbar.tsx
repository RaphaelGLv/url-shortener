import { getSessionAction } from "@/app/actions/session/session.action";
import { LoginButton } from "./components/login-button/login-button";
import styles from "./navbar.module.css";
import { decodeSessionToken } from "@/lib/session-token-handler";
import UserIcon from "../user-icon/user-icon";

export async function Navbar() {
  const session = await getSessionAction();

  const { email } = decodeSessionToken(session || "") || {
    email: null,
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.textLogo}>LinkDrop</h1>

      {email ? <UserIcon name={email} /> : <LoginButton />}
    </nav>
  );
}
