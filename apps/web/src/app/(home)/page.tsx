import { ShortenUrlForm } from "./components/shorten-url-form/shorten-url-form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.shortenUrlFormSection}>
        <ShortenUrlForm />
      </section>
    </main>
  );
}
